import styled from "styled-components";

export const Brand = styled.img`
  height: 50px;
  cursor: pointer;
  z-index: 3;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
  margin-bottom: 45px;
`;
export const BnContainer = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
  width: 380px;
  display: flex;
  align-items: center;
`;
export const LButtonBox = styled.div`
  height: 80px;
  width: 50%;
  border: none;
  border-top-right-radius: 50px;
  box-shadow: 1px 10px 10px 5px gray;
  background-color: white;
  z-index: 1;
`;
export const RButtonBox = styled.div`
  height: 80px;
  width: 50%;
  border: none;
  border-top-left-radius: 50px;
  box-shadow: -1px 10px 10px 5px gray;
  background-color: white;
  z-index: 1;
`;
