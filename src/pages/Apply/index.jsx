import React, { useEffect } from "react";
import { Form, Button, Container } from "react-bootstrap";
import { textRead } from "../../utils/TextToSpeech";
const Index = () => {
  useEffect(() => {
    textRead("abcd");
    console.log("apply page");
  }, []);
  return (
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
  );
};

export default Index;
