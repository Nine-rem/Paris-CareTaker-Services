import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, Row, Col, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import '../stayAll.css';

const StayAllPage = () => {
  const [biens, setBiens] = useState([]);

  useEffect(() => {
    const fetchBiens = async () => {
      try {
        const response = await axios.get('/biens');
        setBiens(response.data);
      } catch (error) {
        console.error('Erreur récupération de Bien', error);
      }
    };

    fetchBiens();
  }, []);

  return (
    <Container>
      <Row>
        {biens.map(bien => {
          // Vérifiez si la propriété photos est définie
          const couverturePhoto = bien.photos?.find(photo => photo.est_couverture);
          
          return (
            <Col md={4} key={bien.id_bien} className="mb-4">
              <Card className="property-card">
                {couverturePhoto && couverturePhoto.chemin_photo && (
                  <Card.Img
                    variant="top"
                    src={`http://localhost/client/src/assets/images/stay/${bien.id_bien}${couverturePhoto.chemin_photo}`}
                    alt={bien.nom_bien}
                    className="property-card-img"
                  />
                )}
                <Card.Body>
                  <Card.Title>{bien.nom_bien}</Card.Title>
                  <Card.Text>
                    <strong>{bien.tarif_bien} € / nuit</strong>
                  </Card.Text>
                  <Link to={`/account/places/${bien.id_bien}`} className="btn btn-dark btn-sm">
                    Voir
                  </Link>
                </Card.Body>
              </Card>
            </Col>
          );
        })}
      </Row>
    </Container>
  );
};

export default StayAllPage;
