import React from 'react'
import "../noAppointment/noAppointement.css"
import { Container,Button,Image,Row, Col } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom';



const NoAppointmentPrueba = () => {
    const navigate = useNavigate()
  return (
    <Container fluid="md" className="d-flex flex-column justify-content-center align-items-center">
      <Row>
        <Col className='p-0 m-0'>
        <Image fluid src='https://i.ibb.co/ZKH9Fxh/no-Appointment.png' className='img-no-appointment'></Image>
        </Col>
      </Row>
      <Row>
        <Col className='textContainer '>
        <p className="title">¡Lo sentimos!</p>
          <p className="description">
            En estos momentos no contamos con turnos disponibles. Por favor, espera
            a que la farmacia habilite los turnos e inténtelo de nuevo más tarde.
          </p></Col>
      </Row>
      <Row>
        <Col className='divBtn '> 
        <Button className='btnInicio 'onClick={e=>navigate('/')} >Volver al inicio</Button>
        </Col>
      </Row>
    </Container>
  )
}

export default NoAppointmentPrueba