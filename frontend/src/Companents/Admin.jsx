import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { useState, useEffect } from 'react';

// Импорт изображений
import Audi from '../media/audi.png';
import Kovor from '../media/kovor.png';
import Kino from '../media/kino.png';

function AdminPanel() {
    const [applications, setApplications] = useState([]);
    const [filterStatus, setFilterStatus] = useState("");

    useEffect(() => {
        fetch("http://localhost:1234/applications")
            .then(res => res.json())
            .then(data => setApplications(data))
            .catch(err => console.error("Ошибка загрузки:", err)); 
    }, []);

    // Функция для получения изображения по названию помещения
    const getPlatformImage = (platform) => {
        if (platform && platform.toLowerCase().includes('аудитория')) return Audi;
        if (platform && platform.toLowerCase().includes('коворкинг')) return Kovor;
        if (platform && platform.toLowerCase().includes('кинозал')) return Kino;
        return Audi; // по умолчанию
    };

    const handleStatusChange = (id, newStatus) => {
        setApplications(prevApps =>
            prevApps.map(app =>
                app.idapplications === id ? { ...app, status: newStatus } : app
            )
        );

        fetch(`http://localhost:1234/applications/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ status: newStatus }),
        })
        .then(res => {
            if (!res.ok) throw new Error('Ошибка сети');
        })
        .catch(err => {
            console.error("Не удалось обновить статус:", err);
            alert("Ошибка при сохранении статуса");
        });
    };

    const handleDelete = (id) => {
        if (!window.confirm("Удалить заявку?")) return;

        fetch(`http://localhost:1234/applications/${id}`, {
            method: "DELETE",
        })
        .then(res => {
            if (!res.ok) throw new Error('Ошибка удаления');
            setApplications(prev => prev.filter(app => app.idapplications !== id));
        })
        .catch(err => {
            console.error("Не удалось удалить заявку:", err);
            alert("Ошибка при удалении заявки");
        });
    };

    const visibleApplications = filterStatus
        ? applications.filter(app => app.status === filterStatus)
        : applications;

    return (
        <Container fluid>
            <h1 className="mb-4">Панель администратора</h1>

            <Form.Group className="mb-4" style={{ maxWidth: 320 }}>
                <Form.Label>Фильтр по статусу</Form.Label>
                <Form.Control
                    as="select"
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                >
                    <option value="">Все заявки</option>
                    <option value="Новая">Новая</option>
                    <option value="Мероприятие назначено">Мероприятие назначено</option>
                    <option value="Завершено">Завершено</option>
                </Form.Control>
            </Form.Group>

            <Row>
                {visibleApplications.map((application) => (
                    <Col md={6} lg={4} className="mb-4" key={application.idapplications} data-testid="admin-row">
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
                                    <strong>Статус:</strong>
                                    <Form.Control 
                                        as="select"
                                        className="mt-2"
                                        data-testid="admin-status"
                                        value={application.status || ""} 
                                        onChange={(e) => handleStatusChange(application.idapplications, e.target.value)}
                                    >
                                        <option value="" disabled>-- Выберите --</option>
                                        <option value="Новая">Новая</option>
                                        <option value="Мероприятие назначено">Мероприятие назначено</option>
                                        <option value="Завершено">Завершено</option>
                                    </Form.Control>
                                </Card.Text>
                                
                                <div className="mt-3">
                                    <strong>Отзыв:</strong>
                                    <p className="text-muted mt-2">
                                        {application.rewiest || "Нет отзыва"}
                                    </p>
                                </div>
                            </Card.Body>
                            <Card.Footer>
                                <Button
                                    variant="primary"
                                    size="sm"
                                    onClick={() => handleDelete(application.idapplications)}
                                >
                                    Удалить
                                </Button>
                            </Card.Footer>
                        </Card>
                    </Col>
                ))}
            </Row>
            
            <div className="mb-4">
                <Button href='/applF' variant="primary" className="me-2">
                    Подать заявку
                </Button>
                <Button href='/log' variant="primary">
                    Назад
                </Button>
            </div>
        </Container>
    );
}

export default AdminPanel;