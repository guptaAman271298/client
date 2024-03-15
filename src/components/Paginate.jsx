import React from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

const Paginate = ({ pageNumber }) => {
  const { pages, pageNo, disable } = useSelector((state) => state.user);
  const navigate = useNavigate();

  return (
    <nav aria-label="Page navigation example">
      <ul className="pagination justify-content-center">
        <li className="page-item">
          <button
            className="page-link"
            onClick={() => navigate(`/page/${pageNo - 1}`)}
            disabled={pageNumber <= 1 || disable}
          >
            Previous
          </button>
        </li>
        {Array(pages)
          .fill(undefined)
          ?.map((_, ind) => (
            <li className="page-item">
              <button
                className="page-link"
                disabled={disable}
                onClick={() => navigate(`/page/${ind + 1}`)}
              >
                {ind + 1}
              </button>
            </li>
          ))}
        <li className="page-item">
          <button
            className="page-link"
            onClick={() => navigate(`/page/${pageNo + 1}`)}
            disabled={pageNumber >= pages || disable}
          >
            Next
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Paginate;
