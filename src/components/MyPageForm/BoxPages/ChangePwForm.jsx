import React from "react";
import { useState } from "react";
import {
  Button,
  Container,
  Form,
  Header,
  Input,
} from "../../LoginForm/LoginFormSty";

const ChangePwForm = () => {
  const [password, setPassword] = useState("");
  const [newpassword, setNewPassword] = useState("");
  const [confirmpassword, setConfirmPassword] = useState("");

  return (
    <Container>
      <Form>
        <Header>비밀번호 변경</Header>
        <Input
          type="password"
          placeholder="현재 비밀번호"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <Input
          type="password"
          placeholder="새 비밀번호"
          value={newpassword}
          onChange={(e) => setNewPassword(e.target.value)}
          required
        />
        <Input
          type="password"
          placeholder="새 비밀번호 확인"
          value={confirmpassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
        <Button type="submit">확인</Button>
      </Form>
    </Container>
  );
};

export default ChangePwForm;
