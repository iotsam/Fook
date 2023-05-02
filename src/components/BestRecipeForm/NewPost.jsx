// import React from "react";
// import {
//   Button,
//   Container,
//   Form,
//   Header,
//   Input,
//   Textarea,
//   Title,
// } from "./NewPostSty";

// const NewPost = () => {
//   return (
//     <Container>
//       <Header>
//         <Title>새 게시글 작성</Title>
//       </Header>
//       <Form>
//         <Input type="text" placeholder="제목" />
//         <Textarea placeholder="내용" />
//         <Button>게시하기</Button>
//       </Form>
//     </Container>
//   );
// };

// export default NewPost;

import axios from "axios";
import React, { useEffect, useMemo, useRef, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import apiServer from "../../api/api";

export const WriteContainer = styled.div`
  width: 900px;
  height: 600px;
  margin: 0 auto;
  box-shadow: 1px 5px 15px 5px lightgray;
  margin-top: 30px;
  padding: 20px;
  input {
    width: 850px;
    height: 40px;
    background-color: transparent;
    border: 1px solid lightgray;
    outline: none;
  }
`;

export const ButtonContainer = styled.div`
  width: 850px;
  height: 50px;
  display: flex;
  justify-content: center;
`;

export const Button = styled.button`
  padding: 10px;
  background-color: #c7e8ca;
  color: gray;
  border: none;
  border-radius: 4px;
  font-size: 14px;
  cursor: pointer;

  &:hover {
    background-color: #5d9c59;
    color: white;
  }
`;

const NewPost = () => {
  const quillRef = useRef();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    if (!localStorage.getItem("id")) {
      navigate("/login");
      alert("로그인 후 이용가능합니다.");
      return;
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("제목: ", title);
    console.log("내용: ", content);

    if (title === "") {
      alert("제목을 작성해주세요.");
      return;
    }
    if (content === "") {
      alert("내용을 작성해주세요.");
      return;
    }

    try {
      const response = await axios.post(`${apiServer}/~~~`, {
        title,
        content,
      });
      alert("게시물 등록 성공");
      navigate("/best");
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  const modules = useMemo(() => {
    return {
      toolbar: [
        [{ header: [1, 2, 3, 4, 5, 6, false] }],
        ["bold", "italic", "underline", "strike", "blockquote"],
        [
          { list: "ordered" },
          { list: "bullet" },
          { indent: "-1" },
          { indent: "+1" },
        ],
        ["image"],
        [{ align: [] }, { color: [] }, { background: [] }],
        ["clean"],
      ],
    };
  }, []);

  return (
    <WriteContainer onSubmit>
      <input
        placeholder="제목을 입력해주세요."
        value={title}
        type="text"
        onChange={(e) => setTitle(e.target.value)}
      ></input>
      <ReactQuill
        style={{ width: "850px", height: "430px", marginBottom: "50px" }}
        placeholder="내용을 입력해주세요. "
        modules={modules}
        theme="snow"
        ref={quillRef}
        value={content}
        onChange={setContent}
      ></ReactQuill>
      <ButtonContainer>
        <Button
          type="submit"
          variant="success"
          style={{ margin: "0", marginLeft: "30px" }}
          onClick={handleSubmit}
        >
          업로드하기
        </Button>{" "}
      </ButtonContainer>
    </WriteContainer>
  );
};

export default NewPost;
