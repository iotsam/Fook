import styled from "styled-components";

export const Nav = styled.nav`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1rem;
  background-color: transparent;
  position: relative;
  z-index: 1;
  /* width: 80%; */
  margin: auto;
`;

export const Brand = styled.img`
  height: 10vh;
  cursor: pointer;
`;

export const Search = styled.div`
  position: relative;
  height: 34px;
  margin-top: 30px;
  margin-left: 100px;
  input {
    width: 300px;
    height: inherit;
    padding: 4px 10px;
    border: 1px solid black;
    box-sizing: border-box;
    border-radius: 5px;
    /* outline: none; */
    background-color: #fff;
    color: #777;
    font-size: 13px;
    transition: width 0.4s;
  }
  .material-icons {
    height: 24px;
    position: absolute;
    top: 0;
    bottom: 0;
    right: 5px;
    margin: auto;
    &:hover {
      color: #5d9c59;
      cursor: pointer;
    }
  }
`;

export const NavButtons = styled.div`
  display: flex;
`;

export const Button = styled.button`
  width: 190px;
  background-color: transparent;
  margin-top: 30px;
  border: none;
  border-radius: 1px;
  font-size: 14px;
  text-align: center;
  font-weight: bold;
  cursor: pointer;
  &:hover {
    color: #5d9c59;
    transition: 0.3s;
  }
`;
export const Click = styled.ul`
  position: absolute;
  display: flex;
  flex-direction: column;
`;
export const UserListForm = styled.div`
  position: absolute;
  color: #333;
  width: 88px;
  &:not(:last-of-type) {
    border-bottom: 1px solid black;
  }
  &:last-of-type {
    color: black;
  }
`;

export const UserList = styled.li`
  padding: 10px 0 20px;
  list-style: none;
  background-color: #c7e8ca;
  border: none;
  border-radius: 5px;
  box-shadow: 2px 1px 1.7px 1px gray;
  color: gray;
  height: 10px;
  width: 80px;
  transition-property: height;
  transition-duration: 0.2s;
  transition-timing-function: linear;
  cursor: pointer;
  &:hover {
    background-color: #5d9c59;
    color: white;
    height: 40px;
  }
`;
