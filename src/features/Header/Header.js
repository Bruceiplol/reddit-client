import React, { useState, useEffect } from "react";
import "./Header.css";
import { FaReddit } from "react-icons/fa";
import { IoSearchCircleOutline } from "react-icons/io5";
import { setSearchTerm } from "../../store/redditSlice";
import { useDispatch, useSelector } from "react-redux";

const Header = () => {
  const [searchTermLocal, setSearchTermLocal] = useState("");
  const searchTerm = useSelector((state) => state.reddit.searchTerm);
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setSearchTermLocal(e.target.value);
  };

  useEffect(() => {
    setSearchTermLocal(searchTerm);
  }, [searchTerm]);

  const submitSearch = (e) => {
    e.preventDefault();
    dispatch(setSearchTerm(searchTermLocal));
  };

  return (
    <header>
      <div className="logo-container">
        <FaReddit className="logo blue" />
        <h2>
          <span className="blue">Reddit</span>Minimal
        </h2>
      </div>
      <form className="search-bar" onSubmit={submitSearch}>
        <input
          type="text"
          placeholder="Search"
          value={searchTermLocal}
          onChange={handleChange}
          aria-label="Search posts"
        />
        <button type="submit" onClick={submitSearch} aria-label="Search">
          <IoSearchCircleOutline className="logo" />
        </button>
      </form>
    </header>
  );
};

export default Header;
