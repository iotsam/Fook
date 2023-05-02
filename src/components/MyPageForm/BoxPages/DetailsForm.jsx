import axios from "axios";
import React, { useState } from "react";
import { Form } from "react-bootstrap";
import apiServer from "../../../api/api";
import { Navigate } from "react-router-dom";
import { Button } from "../../QuestionForm/NewQuestion";

const DetailsForm = () => {
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phonenumber, setPhonenumber] = useState("");
  const [birth, setBirth] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("id:", username);
    console.log("name:", name);
    console.log("email:", email);
    console.log("phone:", phonenumber);
    console.log("birth:", birth);

    try {
      const response = await axios.put(`${apiServer}/~~~`, {
        username,
        name,
        email,
        phonenumber,
        birth,
      });
      alert("수정 성공");
      Navigate("/mypage");
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="container">
      <h1>내 정보</h1>
      <Form>
        {/* <Form onSubmit={handleSubmit}> */}
        <Form.Group className="mb-3" controlId="formBasicId">
          <Form.Label>ID</Form.Label>
          <Form.Control
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicNickname">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPhone">
          <Form.Label>Phone number</Form.Label>
          <Form.Control
            type="text"
            value={phonenumber}
            onChange={(e) => setPhonenumber(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicAddress">
          <Form.Label>Birth</Form.Label>
          <Form.Control
            type="text"
            value={birth}
            onChange={(e) => setBirth(e.target.value)}
          />
        </Form.Group>

        <Button type="submit" onClick={handleSubmit}>
          Submit
        </Button>
      </Form>
    </div>
  );
};

export default DetailsForm;
