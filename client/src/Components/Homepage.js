import React from "react";
import styled from "styled-components";
import AllBooks from "./AllBooks";
import { useViewport } from "../Hooks";

const Homepage = ({ allBooks }) => {
  const { width } = useViewport();
  const breakpoint = 659;

  return (
    <><BigWrap>
      {width > breakpoint ? (
        <BookWrap>
          {allBooks.slice(0, 3).map((book) => {
            return <AllBooks key={book._id} book={book} />;
          })}
        </BookWrap>
      ) : (
        <BookWrap>
          {allBooks.slice(0, 1).map((book) => {
            return <AllBooks key={book._id} book={book} />;
          })}
        </BookWrap>
      )}</BigWrap>
    </>
    
  );
};
const BigWrap = styled.div`
width:100vw;
height:84vh;`
const BookWrap = styled.div`

  margin-top: 15px;
  display: flex;
  flex-flow: row wrap;
  justify-content: center;
  animation: fadein 0.5s ease-out;
  @keyframes fadein {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
`;

export default Homepage;



