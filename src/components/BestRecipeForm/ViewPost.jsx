import React from "react";
import styled from "styled-components";
import boardImg from "../Image/foodImg.jpg";

export const ViewContainer = styled.div`
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

export const Header = styled.div`
  width: 100%;
  height: 37px;
  text-align: center;
  margin-bottom: 15px;
`;

export const Content = styled.div`
  width: 100%;
  height: 490px;
`;

export const Img = styled.img`
  width: 500px;
  height: 300px;
  margin-left: 180px;
  margin-bottom: 5px;
`;

export const Date = styled.div`
  margin-top: 120px;
  margin-left: 700px;
  text-align: center;
`;

export const LikeContainer = styled.div`
  width: 100%;
  height: 30px;
  text-align: right;
  .material-icons {
    margin-right: 60px;
    font-size: 24px;
    color: #ff4c4c;
    &:hover {
      cursor: pointer;
    }
  }
`;

const ViewPost = () => {
  return (
    <ViewContainer>
      <Header>
        <h3>제목</h3>
      </Header>
      <Content>
        <div>
          <Img src={boardImg} alt="img"></Img>
        </div>
        <div style={{ textAlign: "center" }}>내용~~~~~~~~~~~~</div>
        <Date>
          <div>2023.05.02</div>
        </Date>
      </Content>
      <LikeContainer>
        <span class="material-icons">favorite_border</span>
      </LikeContainer>
    </ViewContainer>
  );
};

export default ViewPost;
