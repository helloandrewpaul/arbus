import React, { useState } from "react";
import { NavLink, useHistory } from "react-router-dom";
import styled from "styled-components";
import { BiSearchAlt2 } from "react-icons/bi";
import { GoMail } from "react-icons/go";
import useToken from "../Hooks/useToken";
import SearchModal from "../Modals/SearchModal";

const HomeHeader = ({
  allBooks,
  value,
  setValue,
  searchResults,
  setSearchResults,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const { token, setToken } = useToken();

  let history = useHistory();

  const handleSearch = () => {
    console.log("all", allBooks);
    console.log("value", value);
    const filteredResults = allBooks.filter((book) => {
      let checkedBook = "";
      let lowerCaseSearchResults = book.title.toLowerCase();
      let lowerCaseInputValue = value.toLowerCase();
      let checkedCategory = "";
      if (lowerCaseSearchResults.includes(lowerCaseInputValue)) {
        checkedBook = book.title;
      }
      return checkedBook;
    });
    setSearchResults(filteredResults);
    history.push("/search-results");
    setIsOpen(false);
    console.log("search",searchResults)
  };

  const handleLogOut = (e) => {
    e.preventDefault();
    localStorage.clear();
    history.go(0);
  };

  const handleContactClick = (e) => {
    e.preventDefault();
    history.push("/contact");
  };

  return (
    <HeadWrap>
      <Link to="/">Arbus</Link>
      <Link to="/catalogue/collection">Collection</Link>
      {token ? (
        <Link to="/admin/all-submissions">View Submissions</Link>
      ) : (
        <Link to="/submissions">Submissions</Link>
      )}
      <StyledBiSearchAlt2 onClick={() => setIsOpen(true)} />
      {token ? (
        <LogOut onClick={handleLogOut}>Log Out</LogOut>
      ) : (
        <StyledGoMail onClick={handleContactClick} />
      )}
      <SearchModal open={isOpen}>
        <SearchWrap>
          <X onClick={() => setIsOpen(false)}>X</X>

          <Input
            type="text"
            placeholder="Search"
            value={value}
            onChange={(ev) => setValue(ev.target.value)}
            onKeyDown={(ev) => {
              if (ev.key === "Enter") {
                handleSearch(ev.target.value);
              }
            }}
          ></Input>
          <SearchBtn
            onClick={(ev) => {
              handleSearch(ev.target.value);
            }}
          >
            Search
          </SearchBtn>
        </SearchWrap>
      </SearchModal>
    </HeadWrap>
  );
};
const SearchBtn = styled.button`
  border: 2px solid #000;
  padding: 5px 10px;
  background-color: #000;
  color: #fff;
  font-weight: bold;
  &:hover {
    background-color: #fff;
    color: #000;
    cursor: pointer;
    transition: all 0.3s ease-in-out;
  }
`;
const X = styled.div`
  border: 2px solid #000;
  padding: 5px 5px 5px 8px;
  background-color: #000;
  color: #fff;
  width: 30px;
  height: 30px;
  line-height: 15px;
  font-size: 16px;
  display: inline-block;
  margin-right: 15px;
  font-weight: bold;
  &:hover {
    background-color: #fff;
    color: #000;
    cursor: pointer;
    transition: all 0.3s ease-in-out;
  }
`;
const SearchWrap = styled.div`
  width: 100%;
  display: flex;
  padding: 15px;
  justify-content: space-between;
  border: solid 2px #000;
`;

const Input = styled.input`
  border: solid 2px #000;
  margin-right: 15px;
  padding: 5px;
  width: 200px;
  &:focus {
    border: none;
  }
`;

const LogOut = styled.div`
  color: #000;
  font-size: 20px;
  padding: 20px;
  &:hover {
    color: #c25557;
    transition: all 0.2s ease-in-out;
    cursor: pointer;
  }
`;

const Link = styled(NavLink)`
  color: #000;
  font-size: 20px;
  padding: 20px;
  &:hover {
    color: #c25557;
    transition: all 0.2s ease-in-out;
    cursor: pointer;
  }
  &:focus {
    color: #c25557;
  }
`;

const StyledBiSearchAlt2 = styled(BiSearchAlt2)`
  color: #000;
  width: 25px;
  height: auto;
  margin: 20px;
  &:hover {
    color: #c25557;
    transition: all 0.2s ease-in-out;
    cursor: pointer;
  }
`;

const StyledGoMail = styled(GoMail)`
  color: #000;
  width: 25px;
  height: auto;
  margin: 20px;
  &:hover {
    color: #c25557;
    transition: all 0.2s ease-in-out;
    cursor: pointer;
  }
`;

const HeadWrap = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: flex-end;
  position: relative;
  z-index: 10;
  width: 100vw;
  animation: fadein 1s ease-out;
  @keyframes fadein {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
`;

export default HomeHeader;
