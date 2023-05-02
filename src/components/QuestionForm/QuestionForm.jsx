import React from "react";
import { Container, Header, NewQuestionBtn } from "./QuestionFormSty";
import { Link } from "react-router-dom";
import { Table } from "react-bootstrap";
// import ReactPaginate from "react-paginate";

const QuestionForm = () => {
  return (
    <Container>
      <Header>
        <h2 style={{ margin: "15px" }}>Q&A 게시판</h2>
        <div>
          <Link to="/q&a/newpost">
            <NewQuestionBtn>새 질문</NewQuestionBtn>
          </Link>
        </div>
      </Header>
      <Table striped bordered hover size="sm">
        <thead>
          <tr>
            <th>no.</th>
            <th>Title</th>
            <th>Username</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>영상이 안 떠요!</td>
            <td>aaa</td>
            <td>2023/04/26</td>
          </tr>
          <tr>
            <td>2</td>
            <td>회원 수정은 어디서 하나요?</td>
            <td>bbb</td>
            <td>2023/04/26</td>
          </tr>
          <tr>
            <td>3</td>
            <td>안녕하세요.</td>
            <td>ccc</td>
            <td>2023/04/26</td>
          </tr>
          <tr>
            <td>3</td>
            <td>안녕하세요.</td>
            <td>ccc</td>
            <td>2023/04/26</td>
          </tr>
          <tr>
            <td>3</td>
            <td>안녕하세요.</td>
            <td>ccc</td>
            <td>2023/04/26</td>
          </tr>
          <tr>
            <td>3</td>
            <td>안녕하세요.</td>
            <td>ccc</td>
            <td>2023/04/26</td>
          </tr>
          <tr>
            <td>3</td>
            <td>안녕하세요.</td>
            <td>ccc</td>
            <td>2023/04/26</td>
          </tr>
          <tr>
            <td>3</td>
            <td>안녕하세요.</td>
            <td>ccc</td>
            <td>2023/04/26</td>
          </tr>
          <tr>
            <td>3</td>
            <td>안녕하세요.</td>
            <td>ccc</td>
            <td>2023/04/26</td>
          </tr>
          <tr>
            <td>3</td>
            <td>안녕하세요.</td>
            <td>ccc</td>
            <td>2023/04/26</td>
          </tr>
          <tr>
            <td>3</td>
            <td>안녕하세요.</td>
            <td>ccc</td>
            <td>2023/04/26</td>
          </tr>
          <tr>
            <td>3</td>
            <td>안녕하세요.</td>
            <td>ccc</td>
            <td>2023/04/26</td>
          </tr>
        </tbody>
      </Table>
      {/* <ReactPaginate
        pageCount={12}
        pageRangeDisplayed={10}
        marginPagesDisplayed={0}
        breakLabel={""}
        previousLabel={"이전"}
        nextLabel={"다음"}
        onPageChange={changePage}
        containerClassName={"pagination-ul"}
        activeClassName={"currentPage"}
        previousClassName={"pageLabel-btn"}
        nextClassName={"pageLabel-btn"}
      /> */}
    </Container>
  );
};

export default QuestionForm;
