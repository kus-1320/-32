import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
// import Container from 'react-bootstrap/Container';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import CardGroup from 'react-bootstrap/CardGroup';

import Audi from '../media/audi.png'
import Kovor from '../media/kovor.png'
import Kino from '../media/kino.png'

function Applications() {

    const [platform, setPlatform] = useState("")
    const [date, setDate] = useState("")
    const [payment, setPayment] = useState("")


    const [error, setError] = useState("")
    const navigate = useNavigate()


    const handleSubmit = async (e) => {
        e.preventDefault()

        setError("")
        if (!e.currentTarget.checkValidity()) {
            setError("Заполните все поля")
            return
        }

        const application = {

            user_id: JSON.parse(localStorage.getItem("user_id")),
            platform,
            date,
            payment
        }
        console.log(application.user_id);

        console.log(application);

        try {
            const response = await fetch("http://localhost:1234/appl", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(application),
            });

            const result = await response.json()
            console.log(result);

            navigate("/applF")


        } catch (error) {
            console.error(error);
        }

    }

    return (

        <>
            <CardGroup>
                <Card>
                    <Card.Img variant="top" src={Audi} style={{ height: '200px', objectFit: 'cover' }} />
                    <Card.Body>
                        <Card.Title>Аудитория</Card.Title>
                        <Card.Text>
                            Выбирай дату и записывайся
                        </Card.Text>
                    </Card.Body>
                    <Card.Footer>
                        <small className="text-muted" >3000 P /час</small>
                    </Card.Footer>
                </Card>
                <Card>
                    <Card.Img variant="top" src={Kovor} style={{ height: '200px', objectFit: 'cover' }} />
                    <Card.Body>
                        <Card.Title>Коворкинг</Card.Title>
                        <Card.Text>
                            Выбирай дату и записывайся
                        </Card.Text>
                    </Card.Body>
                    <Card.Footer>
                        <small className="text-muted">1500 Р / час</small>
                    </Card.Footer>
                </Card>
                <Card>
                    <Card.Img variant="top" src={Kino} style={{ height: '200px', objectFit: 'cover' }} />
                    <Card.Body>
                        <Card.Title>Кинозал</Card.Title>
                        <Card.Text>
                            Выбирай дату и записывайся
                        </Card.Text>
                    </Card.Body>
                    <Card.Footer>
                        <small className="text-muted">4600 Р /час</small>
                    </Card.Footer>
                </Card>
            </CardGroup>

            <br />


            <h1>Создать заявку </h1>
            <br />
            <Form onSubmit={handleSubmit} style={{ "marginLeft": 300, "marginRight": 300 }}>
                <Form.Group >
                    <Form.Label>Помещение для конференции</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Помещение для конференции"
                        required
                        data-testid="req-room"
                        onChange={(e) => setPlatform(e.target.value)} />
                </Form.Group>
                <br />
                <Form.Group >
                    <Form.Label>Дата</Form.Label>
                    <Form.Control
                        type="date"
                        placeholder="Желаемая дата"
                        required
                        data-testid="req-date"
                        onChange={(e) => setDate(e.target.value)} />
                </Form.Group>
                <br />

                <Form.Group>
                    <Form.Label >Способ оплаты</Form.Label>
                    <Form.Control
                        as="select"
                        required
                        data-testid="req-payment"
                        value={payment}
                        onChange={(e) => setPayment(e.target.value)}>
                        <option value="">-- Выберите способ --</option>
                        <option value="при очном посещении">при очном посещении</option>
                        <option value="переводом СПБ">переводом по системе СБП</option>
                    </Form.Control>
                </Form.Group>

                <br />
                <Button variant="primary" type="submit" data-testid="req-submit"> Отправить </Button>

                <Button variant="primary" style={{ "marginLeft": 30 }}>
                    <a href='/applF' style={{ "color": "white", "textDecoration": "none" }} >Назад</a>
                </Button>

                {error && <p>{error}</p>}
            </Form>
        </>
    )

}

export default Applications;