import React, { useEffect, useState } from 'react';
import { Card, Row, Col, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';
import AccountNav from '../accountNav';
import '../stayAll.css';
import { differenceInCalendarDays, format } from 'date-fns';

export default function BookingsPage() {
    const [bookings, setBookings] = useState([]);

    useEffect(() => {
        const fetchBookings = async () => {
            try {
                const response = await axios.get('/bookings');
                setBookings(response.data);
            } catch (error) {
                console.error('Erreur lors de la récupération des réservations :', error);
            }
        };

        fetchBookings();
    }, []);

    return (
        <>
            <AccountNav />
            <Container>
                <div id="hero-principal-image" className="px-4 py-5 d-flex justify-content-center align-items-center hero-secondary hero-position">
                    <div className="py-5 box-margin-left">
                        <h1 className="display-5 fw-bold">Mes réservations</h1>
                    </div>
                </div>
                <Row>
                    {bookings.length > 0 && bookings.map(booking => {
                        const couverturePhoto = booking.chemin_photo;

                        return (
                            <Col md={4} key={booking.id_reservation} className="mb-4">
                                <Link to={`/account/bookings/${booking.id_reservation}`} className="text-decoration-none">
                                    <Card className="property-card">
                                        {couverturePhoto && (
                                            <Card.Img
                                                variant="top"
                                                src={`http://localhost/client/src/assets/images/stay/${booking.bien_reserve}${couverturePhoto}`}
                                                alt={booking.nom_bien}
                                                className="property-card-img"
                                            />
                                        )}
                                        <Card.Body>
                                            <Card.Title>Réservation n°{booking.id_reservation}</Card.Title>
                                            <Card.Text>
                                                <strong>{booking.nom_bien}</strong>
                                                <br />
                                                <strong>{booking.prix_total} €</strong>
                                            </Card.Text>
                                            <Card.Text>
                                                <div className="d-flex align-items-center mb-2">
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 me-2" style={{ width: '20px', height: '20px' }}>
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5m-9-6h.008v.008H12v-.008ZM12 15h.008v.008H12V15Zm0 2.25h.008v.008H12v-.008ZM9.75 15h.008v.008H9.75V15Zm0 2.25h.008v.008H9.75v-.008ZM7.5 15h.008v.008H7.5V15Zm0 2.25h.008v.008H7.5v-.008Zm6.75-4.5h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V15Zm0 2.25h.008v.008h-.008v-.008Zm2.25-4.5h.008v.008H16.5v-.008Zm0 2.25h.008v.008H16.5V15Z" />
                                                    </svg>
                                                    Date de début : {format(new Date(booking.date_debut_reservation), 'dd/MM/yyyy')}
                                                </div>
                                                <div className="d-flex align-items-center mb-2">
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 me-2" style={{ width: '20px', height: '20px' }}>
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5m-9-6h.008v.008H12v-.008ZM12 15h.008v.008H12V15Zm0 2.25h.008v.008H12v-.008ZM9.75 15h.008v.008H9.75V15Zm0 2.25h.008v.008H9.75v-.008ZM7.5 15h.008v.008H7.5V15Zm0 2.25h.008v.008H7.5v-.008Zm6.75-4.5h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V15Zm0 2.25h.008v.008h-.008v-.008Zm2.25-4.5h.008v.008H16.5v-.008Zm0 2.25h.008v.008H16.5V15Z" />
                                                    </svg>
                                                    Date de fin : {format(new Date(booking.date_fin_reservation), 'dd/MM/yyyy')}
                                                </div>
                                                <div className="d-flex align-items-center mb-2">
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 me-2" style={{ width: '20px', height: '20px' }}>
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z" />
                                                    </svg>
                                                    Nombre de voyageurs : {booking.nb_voyageurs}
                                                </div>
                                                <div className="d-flex align-items-center mb-2">
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 me-2" style={{ width: '20px', height: '20px' }}>
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z" />
                                                    </svg>
                                                    Nombre de nuits : {differenceInCalendarDays(new Date(booking.date_fin_reservation), new Date(booking.date_debut_reservation))} nuits
                                                </div>
                                            </Card.Text>
                                        </Card.Body>
                                    </Card>
                                </Link>
                            </Col>
                        );
                    })}
                </Row>
            </Container>
        </>
    );
}
