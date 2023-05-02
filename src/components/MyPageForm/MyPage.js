import styled from "styled-components";

export const SideMenus = styled.div`
  border: none;
  /* background-color: white; */
  position: absolute;
  display: flex;
  z-index: 1;
  top: 135px;
  left: 10;
  border-radius: 5px;
  /* box-shadow: 2px 1px 1.7px 1px gray; */
  height: 275px;
  width: 40px;
  padding: 1rem 1rem 1rem 0;
`;

export const Container = styled.ul`
  padding: 0px;
`;

export const InfoButton = styled.li`
  color: gray;
  border: none;
  background-color: #c7e8ca;
  margin-bottom: 10px;
  border-top-right-radius: 18px;
  border-bottom-right-radius: 18px;
  padding: 10px;
  height: 40px;
  overflow: hidden;
  width: 40px;
  transition-property: width;
  transition-duration: 0.1s;
  transition-timing-function: linear;
  cursor: pointer;
  &:hover {
    background-color: #5d9c59;
    color: white;
    height: 40px;
    width: 200px;
  }
`;
export const InfoBox = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  margin: auto;
  border: none;
  width: 800px;
  height: 70%;

  box-shadow: 1px 2px 2px 2px gray;
`;
