import React from "react";
import {
  Boards,
  Btn,
  Button,
  Home,
  MainRecipe,
  Notice,
  TodayRecipe,
} from "./HomePageSty";
import SimpleSlider from "./Slider/SimpleSlider";
import random from "../Image/foodImg.jpg";

const HomeForm = () => {
  return (
    <Home style={{ display: "block" }}>
      <Boards>
        <MainRecipe>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div
              style={{
                textAlign: "center",
                fontSize: "20px",
                fontWeight: "bold",
                color: "#333",
                marginBottom: "10px",
              }}
            >
              인기 레시피
            </div>
            <Btn>
              <Button>주간</Button>
              <Button>월간</Button>
            </Btn>
          </div>
          <SimpleSlider></SimpleSlider>
        </MainRecipe>
        <TodayRecipe>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div
              style={{
                textAlign: "center",
                fontSize: "20px",
                fontWeight: "bold",
                color: "#333",
                marginBottom: "10px",
              }}
            >
              오늘의 레시피
            </div>
          </div>
          <img src={random} alt="random"></img>
        </TodayRecipe>
        <Notice>
          <div
            style={{
              fontSize: "20px",
              fontWeight: "bold",
              color: "#333",
              marginBottom: "10px",
            }}
          >
            공지사항
          </div>
          <p>1.aaaa</p>
          <p>2.aaaa</p>
          <p>3.aaaa</p>
          <p>4.aaaa</p>
          <p>5.aaaa</p>
        </Notice>
      </Boards>
    </Home>
  );
};

export default HomeForm;
