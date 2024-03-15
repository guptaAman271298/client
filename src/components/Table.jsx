import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { changeUserStatus, deleteUserData } from "../redux/actions/userActions";
import { BsThreeDotsVertical } from "react-icons/bs";
import { FaTrash, FaEdit } from "react-icons/fa";
import { CgDetailsMore } from "react-icons/cg";
import { formatDate, formatTime } from "../utils/dateTimeFormatter";
import { setAllDisable } from "../redux/slices/userSlice";

const Table = ({ allUsers: data }) => {
  const [id, setId] = useState("");
  const { disable } = useSelector(state => state.user)
  const [selectedProfile, setSelectedProfile] = useState(null);
  const {
    isDeleting: isLoading,
    isDeletingSuccess,
    users,
  } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleDeleteUser = (id) => {
    setId(id);
    dispatch(setAllDisable(true));
    dispatch(deleteUserData(id));
  };

  const handleSelectButton = (id) => {
    const user = users.find((item) => item?._id === id);
    setSelectedProfile(user);
  };

  const handleChangeStatus = (id) => {
    dispatch(setAllDisable(true));
    dispatch(changeUserStatus(id));
  }

  useEffect(() => {
    if (isDeletingSuccess) {
      setId("");
    }
  }, [isDeletingSuccess]);

  return (
    <table className="table table-striped">
      <thead>
        <tr>
          <th scope="col">ID</th>
          <th scope="col">Name</th>
          <th scope="col">Email</th>
          <th scope="col">Status</th>
          <th scope="col">Actions</th>
        </tr>
      </thead>
      <tbody>
        {data &&
          data?.map((user, ind) => (
            <tr key={ind}>
              <th scope="row">{ind + 1}</th>
              <td>{user?.name}</td>
              <td>{user?.email}</td>
              <td>
              <div className="form-check form-switch">
            <input
              className="form-check-input"
              type="checkbox"
              role="switch"
              id="isactive"
              name="isActive"
              checked={user?.isActive}
              onChange={() => handleChangeStatus(user._id)}
            />
            <label className="form-check-label" htmlFor="isactive">
              <b>{user?.isActive ? "Active" : "Inactive"}</b>
            </label>
          </div>
              </td>
              <td className="d-flex align-items-center">
                <div className="dropdown">
                  <div
                    className="btn btn-sm btn-light dropdown-toggle"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    <BsThreeDotsVertical />
                  </div>

                  <ul className="dropdown-menu">
                    <li>
                      <button
                        className="btn btn-sm btn-light w-100 text-start"
                        onClick={() => handleDeleteUser(user?._id)}
                        disabled={disable}
                      >
                        {isLoading && id === user._id ? (
                          <div>
                            <FaTrash /> Deleting...
                          </div>
                        ) : (
                          <>
                            <FaTrash /> {"Delete"}
                          </>
                        )}
                      </button>
                    </li>
                    <li>
                      <button
                        className="btn btn-sm btn-light w-100 text-start"
                        onClick={() => navigate(`/update/${user?._id}`)}
                        disabled={disable}
                      >
                        <>
                          <FaEdit /> {"Edit"}
                        </>
                      </button>
                    </li>
                    <li>
                      <button
                        className="btn btn-sm btn-light w-100 text-start"
                        onClick={() => handleSelectButton(user?._id)}
                        data-bs-toggle="modal"
                        data-bs-target="#exampleModal"
                        disabled={disable}
                      >
                        <>
                          <CgDetailsMore /> {"Details"}
                        </>
                      </button>
                    </li>
                  </ul>
                </div>
              </td>
            </tr>
          ))}
      </tbody>
      <div
        className="modal fade"
        id="exampleModal"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                {selectedProfile?.name.split(" ")[0] + "'s Profile:"}
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <div className="mb-2">
                <span className="me-2">
                  <b>Full Name:</b>
                </span>
                <span>{selectedProfile?.name}</span>
              </div>
              <div className="mb-2">
                <span className="me-2">
                  <b>Email:</b>
                </span>
                <span>{selectedProfile?.email}</span>
              </div>
              <div className="mb-2">
                <span className="me-2">
                  <b>Is Active User:</b>
                </span>
                <span>{selectedProfile?.isActive.toString()}</span>
              </div>
              <div className="mb-2">
                <span className="me-2">
                  <b>Created Date:</b>
                </span>
                <span>{formatDate(selectedProfile?.createdAt)}</span>
              </div>
              <div className="mb-2">
                <span className="me-2">
                  <b>Created Time:</b>
                </span>
                <span>{formatTime(selectedProfile?.createdAt)}</span>
              </div>
              {selectedProfile?.createdAt.toString() !==
                selectedProfile?.updatedAt.toString() && (
                  <div>
                  <div className="mb-2">
                    <span className="me-2">
                      <b>Updated Date:</b>
                    </span>
                    <span>{formatDate(selectedProfile?.updatedAt)}</span>
                  </div>
                  <div className="mb-2">
                    <span className="me-2">
                      <b>Updated Time:</b>
                    </span>
                    <span>{formatTime(selectedProfile?.updatedAt)}</span>
                  </div>
                  </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </table>
  );
};

export default Table;
