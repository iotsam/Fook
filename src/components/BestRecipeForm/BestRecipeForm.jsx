import React from "react";
import {
  Container,
  DateLike,
  Header,
  LikeButton,
  NewPostButton,
  Post,
  PostContainer,
  PostContent,
  PostDate,
  PostDescription,
  PostImage,
  PostTitle,
  Title,
} from "./BestRecipeSty";
import { Link } from "react-router-dom";
import { useState } from "react";

const BestRecipeForm = () => {
  const [like, setLike] = useState(false);
  const [likeNumber, setLikeNumber] = useState(0);

  const ChangeLike = () => {
    if (!like) {
      setLikeNumber(likeNumber + 1);
    }
    if (like) {
      setLikeNumber(likeNumber - 1);
    }
  };

  return (
    <Container>
      <Header>
        <Title>게시글 목록</Title>
        <Link to="/best/newpost">
          <NewPostButton>새 게시글</NewPostButton>
        </Link>
      </Header>
      <PostContainer>
        <Post>
          <Link to="/best/view">
            <PostImage src="https://picsum.photos/200" />
          </Link>
          <PostContent>
            <PostTitle>게시글 제목</PostTitle>
            <PostDescription>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Pellentesque consequat sapien eu eros varius sagittis.
            </PostDescription>
            <DateLike>
              <PostDate>2023.04.23</PostDate>
              <LikeButton>
                <span
                  onClick={() => {
                    setLike((e) => !e);
                    ChangeLike();
                  }}
                  class="material-icons"
                >
                  {!like ? "favorite_border" : "favorite"}
                </span>
                <p
                  style={{
                    fontSize: "3px",
                    textAlign: "center",
                    marginRight: "9px",
                  }}
                >
                  {likeNumber}
                </p>
              </LikeButton>
            </DateLike>
          </PostContent>
        </Post>
        <Post>
          <PostImage src="https://picsum.photos/200" />
          <PostContent>
            <PostTitle>게시글 제목</PostTitle>
            <PostDescription>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Pellentesque consequat sapien eu eros varius sagittis.
            </PostDescription>
            <PostDate>2023.04.23</PostDate>
          </PostContent>
        </Post>
        <Post>
          <PostImage src="https://picsum.photos/200" />
          <PostContent>
            <PostTitle>게시글 제목</PostTitle>
            <PostDescription>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Pellentesque consequat sapien eu eros varius sagittis.
            </PostDescription>
            <PostDate>2023.04.23</PostDate>
          </PostContent>
        </Post>
        <Post>
          <PostImage src="https://picsum.photos/200" />
          <PostContent>
            <PostTitle>게시글 제목</PostTitle>
            <PostDescription>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Pellentesque consequat sapien eu eros varius sagittis.
            </PostDescription>
            <PostDate>2023.04.23</PostDate>
          </PostContent>
        </Post>
        <Post>
          <PostImage src="https://picsum.photos/200" />
          <PostContent>
            <PostTitle>게시글 제목</PostTitle>
            <PostDescription>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Pellentesque consequat sapien eu eros varius sagittis.
            </PostDescription>
            <PostDate>2023.04.23</PostDate>
          </PostContent>
        </Post>
      </PostContainer>
    </Container>
  );
};

export default BestRecipeForm;
