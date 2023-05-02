import React from "react";

import { Link, useNavigate } from "react-router-dom";
import logo from "../Image/fook_logo3.png";
import { Button } from "../NavBar/NavBarSty";
import { BnContainer, Brand, LButtonBox, RButtonBox } from "./BotNavSty";

const BotNav = () => {
  const navigate = useNavigate();

  // const onClickMy = () => {
  //   navigate(`/mypage/${localStorage.getItem("id")}`);
  // };
  const onClickMy = () => {
    navigate(`/mypage`);
  };

  return (
    <>
      <Link to="/">
        <Brand src={logo} alt=""></Brand>
      </Link>
      <BnContainer>
        <LButtonBox>
          <Button
            style={{ float: "right", marginRight: "15px" }}
            onClick={onClickMy}
          >
            <span>MyPage</span>
            <span class="material-symbols-outlined">
              settings_accessibility
            </span>
          </Button>
        </LButtonBox>

        <RButtonBox>
          <Link to="/login">
            <Button>
              <span class="material-symbols-outlined">login</span>
              <span>Login</span>
            </Button>
          </Link>
        </RButtonBox>
      </BnContainer>
    </>
  );
};

export default BotNav;
