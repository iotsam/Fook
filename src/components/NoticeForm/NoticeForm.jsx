import React from "react";

import { Table } from "react-bootstrap";
import { Container, Header } from "./NoticeFormSty";
// import ReactPaginate from "react-paginate";

const NoticeForm = () => {
  return (
    <Container>
      <Header>
        <h2 style={{ margin: "15px" }}>공지사항</h2>
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
            <td>공지사항입니다.</td>
            <td>admin</td>
            <td>2023/04/26</td>
          </tr>
          <tr>
            <td>2</td>
            <td>회원분들께 알려드립니다.</td>
            <td>admin</td>
            <td>2023/04/26</td>
          </tr>
          <tr>
            <td>3</td>
            <td>안녕하세요.</td>
            <td>admin</td>
            <td>2023/04/26</td>
          </tr>
          <tr>
            <td>3</td>
            <td>안녕하세요.</td>
            <td>admin</td>
            <td>2023/04/26</td>
          </tr>
          <tr>
            <td>3</td>
            <td>안녕하세요.</td>
            <td>admin</td>
            <td>2023/04/26</td>
          </tr>
          <tr>
            <td>3</td>
            <td>안녕하세요.</td>
            <td>admin</td>
            <td>2023/04/26</td>
          </tr>
          <tr>
            <td>3</td>
            <td>안녕하세요.</td>
            <td>admin</td>
            <td>2023/04/26</td>
          </tr>
          <tr>
            <td>3</td>
            <td>안녕하세요.</td>
            <td>admin</td>
            <td>2023/04/26</td>
          </tr>
          <tr>
            <td>3</td>
            <td>안녕하세요.</td>
            <td>admin</td>
            <td>2023/04/26</td>
          </tr>
          <tr>
            <td>3</td>
            <td>안녕하세요.</td>
            <td>admin</td>
            <td>2023/04/26</td>
          </tr>
          <tr>
            <td>3</td>
            <td>안녕하세요.</td>
            <td>admin</td>
            <td>2023/04/26</td>
          </tr>
          <tr>
            <td>3</td>
            <td>안녕하세요.</td>
            <td>admin</td>
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

export default NoticeForm;
