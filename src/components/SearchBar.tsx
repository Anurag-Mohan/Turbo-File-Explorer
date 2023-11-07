import { useNavigate } from "react-router-dom";
import { FaArrowLeft ,FaArrowRight , FaSearch} from "react-icons/fa";
import React, { useState } from 'react';

export function SearchBar({ onSearch }) {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [query, setQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();
    onSearch(searchQuery);
  };
  
  const arrowButtonStyle=
    {
    border:"0",
    padding:"0",
    backgroundColor:"inherit",
    margin:"0 30px 0 30px"
    }
    
  
    return (
      <nav className="navbar bg-body-tertiary" data-bs-theme="dark">
        <div className="container-fluid">
          <div >
            <button
              style={{ border: "0", padding: "0", backgroundColor: "inherit", margin: "0 30px 0 30px" }}
              onClick={() => {
                navigate(-1);
              }}
            >
              <FaArrowLeft  color="aqua"/>
            </button>
            <button
              style={{ border: "0", padding: "0", backgroundColor: "inherit", margin: "0 30px 0 30px" }}
              onClick={() => {
                navigate(1);
              }}
            >
              <FaArrowRight color="aqua" />
            </button>
          </div>
  
          <a className="navbar-brand text-white ">
            <h2>
              Turbo<h1>X</h1>plorer
            </h2>
          </a>
  
          <form className="d-flex" role="search" onSubmit={handleSearch}>
            <input
              className="form-control me-2"
              type="search"
              placeholder="Search File"
              aria-label="Search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button className="btn btn-outline-info" type="submit"  >
             <FaSearch/>
            </button>
          </form>
  
      
        </div>
      </nav>
    );
}

export default SearchBar;
