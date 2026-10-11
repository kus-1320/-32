import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import CardGroup from 'react-bootstrap/CardGroup';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { useState, useEffect } from 'react';

// Импорт изображений
import Audi from '../media/audi.png';
import Kovor from '../media/kovor.png';
import Kino from '../media/kino.png';

function ApplicationsF() {
    const [applications, setApplications] = useState([]);
    const [reviewTexts, setReviewTexts] = useState({});

    useEffect(() => {
        fetch("http://localhost:1234/applications")
            .then(res => res.json())
            .then(data => setApplications(data))
            .catch(err => console.error("Ошибка загрузки:", err));
    }, []);

    const currentUserId = localStorage.getItem("user_id");

    
    const getPlatformImage = (platform) => {
        if (platform && platform.toLowerCase().includes('аудитория')) return Audi;
        if (platform && platform.toLowerCase().includes('коворкинг')) return Kovor;
        if (platform && platform.toLowerCase().includes('кинозал')) return Kino;
        return Audi; 
    };

    const handleReviewChange = (id, text) => {
        setReviewTexts(prev => ({ ...prev, [id]: text }));
    };

    const submitReview = async (id) => {
        const text = reviewTexts[id];
        if (!text || !text.trim()) {
            alert("Пожалуйста, напишите текст отзыва");
            return;
        }

        try {
            const response = await fetch(`http://localhost:1234/applications/${id}/review`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ rewiest: text }),
            });

            if (response.ok) {
                setApplications(prevApps =>
                    prevApps.map(app =>
                        app.idapplications === id ? { ...app, rewiest: text } : app
                    )
                );

                setReviewTexts(prev => {
                    const newState = { ...prev };
                    delete newState[id];
                    return newState;
                });
                alert("Отзыв успешно отправлен!");
            } else {
                alert("Ошибка при отправке отзыва");
            }
        } catch (error) {
            console.error("Ошибка сети:", error);
            alert("Ошибка сети");
        }
    };

    const userApplications = applications.filter(app =>
        String(app.user_id) === String(currentUserId)
    );

    return (
        <Container fluid>
            <h1 className="mb-4">Ваши заявки</h1>
            <Row data-testid="req-list">
                {userApplications.map((application) => (
                    <Col md={6} lg={4} className="mb-4" key={application.idapplications}>
                        <Card style={{ height: '100%' }}>
                            <Card.Img
                                variant="top"
                                src={getPlatformImage(application.platform)}
                                style={{ height: '200px', objectFit: 'cover' }}
                            />
                            <Card.Body>
                                <Card.Title><strong>Помещение:</strong> {application.platform}</Card.Title>
                                <Card.Text>
                                    <strong>Дата:</strong> {application.date}<br />
                                    <strong>Оплата:</strong> {application.payment}<br />
                                    <strong>Статус:</strong> {application.status || "Не указан"}
                                </Card.Text>

                                <div className="mt-3">
                                    <strong>Отзыв:</strong>
                                    {application.status === 'Завершено' ? (
                                        application.rewiest ? (
                                            <p className="text-success mt-2">{application.rewiest}</p>
                                        ) : (
                                            <div className="mt-2">
                                                <Form.Control
                                                    as="textarea"
                                                    rows={2}
                                                    placeholder="Напишите ваш отзыв..."
                                                    data-testid="req-review"
                                                    value={reviewTexts[application.idapplications] || ""}
                                                    onChange={(e) => handleReviewChange(application.idapplications, e.target.value)}
                                                />
                                                <Button
                                                    variant="primary"
                                                    size="sm"
                                                    className="mt-2"
                                                    onClick={() => submitReview(application.idapplications)}
                                                >
                                                    Отправить отзыв
                                                </Button>
                                            </div>
                                        )
                                    ) : (
                                        <p className="text-muted fst-italic mt-2">
                                            {application.rewiest || "Отзыв можно оставить после завершения"}
                                        </p>
                                    )}
                                    <Form.Control
                                        as="textarea"
                                        rows={2}
                                        placeholder="Напишите ваш отзыв..."
                                        data-testid="req-review"
                                        disabled={application.status !== 'Завершено'}
                                        style={{ display: application.status === 'Завершено' && !application.rewiest ? 'none' : 'block' }}
                                        className="mt-2"
                                    />
                                </div>
                            </Card.Body>
                            <Card.Footer>
                            </Card.Footer>
                        </Card>
                    </Col>
                ))}
            </Row>

            <div className="mb-4">
                <Button href='/appl' variant="primary" className="me-2">
                    Подать заявку
                </Button>
                <Button href='/log' variant="primary">
                    Назад
                </Button>
            </div>
        </Container>
    );
}

export default ApplicationsF;