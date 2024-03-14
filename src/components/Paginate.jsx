import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserData } from "../redux/actions/userActions";

const Paginate = () => {
  const { users, pages, pageNo } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const handleNavigation = (pageNumber) => {
    dispatch(fetchUserData(pageNumber));
  };

  return (
    <nav aria-label="Page navigation example">
      <ul className="pagination justify-content-center">
        <li className="page-item disabled">
          <a className="page-link">Previous</a>
        </li>
        {Array(pages)
          .fill(undefined)
          ?.map((_, ind) => (
            <li className="page-item">
              <button className="page-link" onClick={() => handleNavigation(ind + 1)}>
                {ind + 1}
              </button>
            </li>
          ))}
        <li className="page-item">
          <a className="page-link" href="#">
            Next
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default Paginate;
