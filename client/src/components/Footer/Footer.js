import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import "./style.css";

const Footer = () => {
  return (
    <footer>
      <Container>
        <Row>
          <Col className="text-center">Copyright &copy;</Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
