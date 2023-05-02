import React, { useState } from "react";
import { Button, Container, Form, Header, Input, Warning } from "./RegisterSty";

// import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";
// import "./Calendar/Calendar.css";
// import styled from "styled-components";
import axios from "axios";
import apiServer from "./../../api/api";
import { useNavigate } from "react-router-dom";

// export const RegContainer = styled.form`
//   border: none;
//   box-shadow: 1px 5px 10px 5px lightgray;
//   position: absolute;
//   top: 0;
//   bottom: 0;
//   left: 0;
//   right: 0;
//   margin: auto;
//   padding: 1rem;
//   width: 800px;
//   height: 60vh;
//   display: flex;
//   flex-direction: column;
// `;

const RegisterForm = () => {
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [passwordOk, setPasswordOk] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [email, setEmail] = useState("");
  const [idOk, setIdOk] = useState(false);
  const [phonenumber, setPhonenumber] = useState("");
  const [phoneOk, setPhoneOk] = useState("");
  const [birth, setBirth] = useState("");
  const [birthOk, setBirthOk] = useState("");
  const navigate = useNavigate();

  const containsSpecialCharacter = (password) => {
    const specialCharacterRegex = /[!@#$%^&*(),.?":{}|<>]/;
    return specialCharacterRegex.test(password);
  };

  const isValidEmail = (username) => {
    const emailRegex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
    return emailRegex.test(username);
  };
  const isValidBirth = (birth) => {
    const birthRegex = /^\d{4}\/\d{2}\/\d{2}$/;
    return birthRegex.test(birth);
  };
  const isValidPhone = (phonenumber) => {
    const PhoneRegex = /^01([0|1|6|7|8|9])-?([0-9]{3,4})-?([0-9]{4})$/;
    return PhoneRegex.test(phonenumber);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("Id:", username);
    console.log("Password:", password);
    console.log("Confirm Password:", confirmPassword);
    console.log("name:", name);
    console.log("PhoneNumber:", phonenumber);
    console.log("Email:", email);
    console.log("Birth:", birth);

    if (!isValidEmail(email)) {
      alert("올바른 이메일 형식이 아닙니다.");
      return;
    }
    if (password !== confirmPassword) {
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }
    if (!containsSpecialCharacter(password)) {
      alert("비밀번호에는 최소 1개의 특수 문자가 포함되어야 합니다.");
      return;
    }

    try {
      const response = await axios.post(`${apiServer}/api/user/create`, {
        username,
        password,
        name,
        email,
        phonenumber,
        birth,
      });
      alert("회원가입 성공");
      navigate("/login");
      console.log(response);
    } catch (error) {
      console.log(error);
      // if (error.response.data.detail === "Username already registered") {
      //   alert("이미 존재하는 아이디입니다.");
      // }
    }
  };
  return (
    <>
      {/* <meta
        http-equiv="Content-Security-Policy"
        content="upgrade-insecure-requests"
      ></meta> */}
      <Container>
        <Form onSubmit={handleSubmit}>
          <Header>회원가입</Header>
          <Input
            type="text"
            placeholder="아이디"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <Input
            type="text"
            placeholder="이름"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <Input
            type="password"
            placeholder="비밀번호"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              if (containsSpecialCharacter(e.target.value)) {
                setPasswordOk(true);
              } else {
                setPasswordOk(false);
              }
            }}
            required
          />
          {!passwordOk ? (
            <Warning>특수문자를 1개 이상 포함해야 합니다.</Warning>
          ) : (
            <div style={{ marginBottom: "0" }} />
          )}
          <Input
            type="password"
            placeholder="비밀번호 확인"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          <Input
            type="text"
            placeholder="이메일"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              if (isValidEmail(e.target.value)) {
                setIdOk(true);
              } else {
                setIdOk(false);
              }
            }}
            required
          />
          {!idOk ? (
            <Warning>반드시 이메일 형식이어야 합니다.</Warning>
          ) : (
            <div style={{ marginBottom: "0" }} />
          )}
          <Input
            type="text"
            placeholder="전화번호(- 빼고 입력해주세요)"
            value={phonenumber}
            maxLength={13}
            onChange={(e) => {
              setPhonenumber(e.target.value);
              if (isValidPhone(e.target.value)) {
                setPhoneOk(true);
              } else {
                setPhoneOk(false);
              }
            }}
            required
          />
          {!phoneOk ? (
            <Warning>잘못된 전화번호 형식입니다.</Warning>
          ) : (
            <div style={{ marginBottom: "0" }} />
          )}
          {/* <DatePicker
            placeholderText="생년월일"
            selected={birth}
            onChange={(date) => setBirth(date)}
            showYearDropdown
            dateFormatCalendar="MMMM"
            yearDropdownItemNumber={80}
            scrollableYearDropdown
            withPortal
            portalId="root-portal"
          /> */}
          <Input
            type="text"
            placeholder="생년월일 ex)2023/07/07"
            value={birth}
            onChange={(e) => {
              setBirth(e.target.value);
              if (isValidBirth(e.target.value)) {
                setBirthOk(true);
              } else {
                setBirthOk(false);
              }
            }}
            required
          />
          {!birthOk ? (
            <Warning>잘못된 생년월일 형식입니다.</Warning>
          ) : (
            <div style={{ marginBottom: "0" }} />
          )}
          <Button type="submit">회원가입</Button>
        </Form>
      </Container>
    </>
  );
};

export default RegisterForm;
