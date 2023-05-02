import styled from "styled-components";

export const Container = styled.div`
  margin: 0 auto;
  max-width: 900px;
  height: 1000px;
  padding: 20px;
  margin-bottom: 100px;
`;
export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  height: 40px;
  align-items: center;
`;

export const Title = styled.h2`
  margin: 0;
`;

export const NewPostButton = styled.button`
  border: none;
  background-color: transparent;
  color: #c7e8ca;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  &:hover {
    color: #5d9c59;
  }
`;

export const PostContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  height: 960px;
  justify-content: left;
  margin-top: 20px;
`;

export const Post = styled.div`
  width: 250px;
  height: 450px;
  margin-bottom: 20px;
  margin-right: 25px;
`;

export const PostImage = styled.img`
  width: 100%;
  height: 60%;
`;

export const PostContent = styled.div`
  border: 1px solid #dbdbdb;
  padding: 10px;
  height: 40%;
`;

export const PostTitle = styled.h3`
  margin: 0;
  font-size: 18px;
  height: 18%;
`;

export const PostDescription = styled.p`
  margin: 0;
  margin-top: 3px;
  height: 60%;
  font-size: 14px;
`;

export const DateLike = styled.div`
  height: 22%;
  width: 100%;
  display: flex;
`;

export const PostDate = styled.p`
  margin: 0;
  margin-top: 12px;
  width: 85%;
  height: 17px;
  font-size: 12px;
  color: #8e8e8e;
`;

export const LikeButton = styled.div`
  width: 15%;
  height: 100%;
  right: 0;
  display: flex;
  flex-direction: column;
  .material-icons {
    font-size: 24px;
    color: #ff4c4c;
    &:hover {
      cursor: pointer;
    }
  }
`;
