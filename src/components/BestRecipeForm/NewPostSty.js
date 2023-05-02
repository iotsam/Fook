import styled from "styled-components";

export const Container = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
  width: 100%;
  height: 100%;

  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 20px;
`;

export const Title = styled.h2`
  position: absolute;
  top: 25%;
  margin: 0;
  font-size: 20px;
  color: gray;
`;

export const Form = styled.form`
  position: absolute;
  margin: auto;
  top: 20%;
  bottom: 0;
  left: 0;
  right: 0;
  width: 80%;
  height: 70%;
  display: flex;
  flex-direction: column;
`;

export const Input = styled.input`
  border: none;
  border-radius: 5px;
  box-shadow: 1px 1px 1px 1px gray;
  border-bottom: 1px solid #dbdbdb;
  margin-bottom: 20px;
  font-size: 16px;
`;

export const Textarea = styled.textarea`
  border: none;
  border-radius: 5px;
  box-shadow: 1px 1px 1px 1px gray;
  border-bottom: 1px solid #dbdbdb;
  margin-bottom: 20px;
  font-size: 16px;
  resize: none;
  height: 200px;
`;

export const Button = styled.button`
  border: none;
  border-radius: 5px;
  box-shadow: 1px 1px 1px 1px gray;
  background-color: #c7e8ca;
  color: gray;
  border: none;
  padding: 10px 20px;
  cursor: pointer;
  &:hover {
    background-color: #5d9c59;
    color: white;
  }
`;
