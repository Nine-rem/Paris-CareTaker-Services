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
    <>
      <div>
        <div id="hero-principal-image" className="px-4 py-5 d-flex justify-content-center align-items-center hero-secondary hero-position">
          <div className="py-5 box-margin-left">
            <h1 className="display-5 fw-bold">Catalogue des biens</h1>
          </div>
        </div>
        <div id="search-stay" className="box centered-text">
          <h2>Trouvez la location de vos rêves !</h2>
        </div>
      </div>
      <Container>
        <Row>
          {biens.map(bien => {
            const couverturePhoto = bien.photos?.find(photo => photo.est_couverture);

            return (
              <Col md={4} key={bien.id_bien} className="mb-4">
                <Link to={`/account/places/${bien.id_bien}`} className="text-decoration-none">
                  <Card className="property-card">
                    {couverturePhoto && couverturePhoto.chemin_photo && (
                      <Card.Img
                        variant="top"
                        src={`http://localhost:5000/assets/images/stay/${bien.id_bien}${couverturePhoto.chemin_photo}`}
                        alt={bien.nom_bien}
                        className="property-card-img"
                      />
                    )}
                    <Card.Body>
                      <Card.Title>{bien.nom_bien}</Card.Title>
                      <Card.Text>
                        <strong>{bien.tarif_bien} € / nuit</strong>
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
};

export default StayAllPage;
