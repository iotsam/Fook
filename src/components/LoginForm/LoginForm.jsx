import React, { useState } from "react";
import {
  Button,
  Button2,
  Container,
  Form,
  Header,
  Input,
} from "./LoginFormSty";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
import apiServer from "../../api/api";

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(`${apiServer}/login/`, {
        username,
        password,
      });
      console.log(response);
      alert("로그인 성공");
      localStorage.setItem("id", response.data.username);
      navigate("/");
      // localStorage.setItem("username", response.data.name);
    } catch (error) {
      alert("아이디나 비밀번호를 다시 확인해주세요.");
      console.log(error);
    }
  };

  const navigate = useNavigate();
  useEffect(() => {
    if (localStorage.getItem("id")) {
      // navigate("/login");
    }
  }, [navigate]);

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <Header>로그인</Header>
        <Input
          type="text"
          placeholder="Id"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <Input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <Button type="submit">로그인</Button>
        <Link
          to="/signup"
          style={{ justifyContent: "center", marginTop: "10px" }}
        >
          <Button2 type="submit">회원가입</Button2>
        </Link>
      </Form>
    </Container>
  );
};

export default LoginForm;
