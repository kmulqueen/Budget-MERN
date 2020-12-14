import React from "react";
import { LinkContainer } from "react-router-bootstrap";
import { Button, Row } from "react-bootstrap";

const NotFoundPage = () => {
  return (
    <>
      <Row>
        <h1>404 Page Not Found</h1>
      </Row>
      <Row>
        <LinkContainer to="/">
          <Button>Go Home</Button>
        </LinkContainer>
      </Row>
    </>
  );
};

export default NotFoundPage;
