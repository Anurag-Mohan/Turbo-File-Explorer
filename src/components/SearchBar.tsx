import { useNavigate } from "react-router-dom";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { useMyContext } from "../Context/globalPathContext";
import { invoke } from "@tauri-apps/api/tauri";
import { useState } from "react";

export const searchedList = " ";

export function SearchBar() {
  const navigate = useNavigate();

  const context = useMyContext();

  const arrowButtonStyle = {
    border: "0",
    padding: "0",
    backgroundColor: "inherit",
    margin: "0 30px 0 30px",
  };

  const [searchValue, setSearchValue] = useState('');

  const handleChange = (event:React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
  };


   async function handleSubmit  (event:React.FormEvent<HTMLFormElement>)  {
    
    event.preventDefault();

    const searchText = searchValue;

    
    if(searchText==" "){
      return;
    }
    else{
    context.setGlobalSearchState(
      await invoke("search_function", {
        path: context.globalState,
        searchInp: searchText,
      })
    );
    }
    console.log(searchedList);

    setSearchValue(" ");
    navigate("Slist");
  };


  return (
    <nav className="navbar bg-body-tertiary " data-bs-theme="dark">
      <div className="container-fluid">
        <div>
          <button
            style={arrowButtonStyle}
            onClick={() => {
              navigate(-1);
            }}
          >
            <FaArrowLeft />
          </button>
          <button
            style={arrowButtonStyle}
            onClick={() => {
              navigate(+1);
            }}
          >
            <FaArrowRight />
          </button>
        </div>

        <a className="navbar-brand text-white ">
          <h2>
            Turbo
            <span
              style={{
                fontSize: "40px",
                color: "#0dcaf0",
              }}
            >
              X
            </span>
            plorer
          </h2>
        </a>
        <form className="d-flex" role="search" onSubmit={(event)=>{handleSubmit(event)}}>
          <input
            className="form-control me-2"
            type="search"
            placeholder={context.globalState}
            aria-label="Search"
            onChange={(event)=>{handleChange(event)}}
          />
          <button className="btn btn-outline-info" type="submit">
            Search
          </button>
        </form>
      </div>
    </nav>
  );
}

export default SearchBar;