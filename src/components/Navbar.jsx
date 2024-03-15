import React from "react";
import { Link } from "react-router-dom";
// import { fetchUserData } from "../redux/actions/userActions";

const Navbar = () => {

//   const [searchedKey, setSearchedKey] = useState("")

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (searchedKey) {
//         fetchUserData(1, searchedKey)
//     }
//   }

  return (
    <nav class="navbar navbar-expand-lg bg-secondary">
      <div class="container">
        <Link class="navbar-brand" to="/">
          MERN Task
        </Link>
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item">
              <Link class="nav-link active" to="/">
                Home
              </Link>
            </li>
            <li class="nav-item">
              <Link class="nav-link" to="/create">
                Create User
              </Link>
            </li>
          </ul>
          <form class="d-flex" role="search">
            <input
              class="form-control me-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
            //   value={searchedKey}
            //   onChange={(e) => setSearchedKey(e.target.value)}
            />
            <button class="btn btn-outline-light" type="submit">
              Search
            </button>
          </form>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
