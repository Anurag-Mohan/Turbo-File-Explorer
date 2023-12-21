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

  const [buttonText, setButtonText] = useState('Search');
  const [buttonDisabled, setButtonDisabled] = useState(false); 

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const searchText = searchValue.trim();

    if (searchText === "") {
      return;
    } else {
      setButtonText('Searching');
      setButtonDisabled(true); 

      context.setGlobalSearchState(
        await invoke("search_function", {
          path: context.globalState,
          searchInp: searchText,
        })
      );

      setButtonText('Search');
      setButtonDisabled(false);
    }

    setSearchValue("");
    navigate("Slist");
  }

  return (
    <nav class="navbar navbar-expand-lg navbar-light custom-navbar">
      <div className="container-fluid">
        <div>
          <button
            style={arrowButtonStyle}
            onClick={() => {
              navigate(-1);
            }}
          >
            <FaArrowLeft color="aqua"/>
          </button>
          <button
            style={arrowButtonStyle}
            onClick={() => {
              navigate(+1);
            }}
          >
            <FaArrowRight color="aqua" />
          </button>
        </div>

        <a className="navbar-brand text-white ">
          <h2 >
            Turbo
            <span className="animated-x"
             
            >
             
            </span>
            plorer
          </h2>
        </a>
        <form className="d-flex" role="search" onSubmit={(event) => { handleSubmit(event) }}>
        <input
          className="form-control me-2"
          type="search"
          placeholder={context.globalState}
          aria-label="Search"
          onChange={(event) => { handleChange(event) }}
          style={{ backgroundColor: '#c2b693', color: 'black' }}
        />
        <button className="btn btn-outline-info" type="submit" disabled={buttonDisabled}>
          {buttonText}
        </button>
      </form>
      </div>
    </nav>
  );
}

export default SearchBar;