import React, { useEffect } from "react";
import { Form, Button, Container } from "react-bootstrap";

import { textRead } from "@Utils/TextToSpeech";
import Header from "@Components/Header";
const Index = () => {
  useEffect(() => {
    textRead("a");
  }, []);
  return (
    <div>
      <Header />
      <Container>
        <p className="mt-3">신청페이지</p>
        <Form>
          <Form.Group>
            <Form.Label>이메일 주소</Form.Label>
            <Form.Control type="email" placeholder="name@example.com" />
          </Form.Group>
          <Button type="submit" className="mt-3">
            전송
          </Button>
        </Form>
      </Container>
    </div>
  );
};

export default Index;
