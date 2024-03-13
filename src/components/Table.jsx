import React, { useEffect, useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { deleteUserData } from "../redux/actions/userActions";
import { reset } from "../redux/slices/userSlice";

const Table = ({ allUsers: data }) => {
  const [id, setId] = useState("")
  const { isDeleting: isLoading, deletingError: error, isDeletingSuccess } = useSelector((state) => state.user);
  console.log(isDeletingSuccess)
  const navigate = useNavigate();
  const dispatch = useDispatch()

  const handleDeleteUser = (id) => {
    setId(id)
    dispatch(deleteUserData(id));
  };

  useEffect(() => {
    if (error && "data" in error) {
      toast.error(error?.data?.message);
    }

    if (isDeletingSuccess) {
      toast.success("Deleted successfully")
      setId("")
      dispatch(reset())
    }
  }, [error, isDeletingSuccess]);

  return (
    <table class="table table-striped">
      <thead>
        <tr>
          <th scope="col">ID</th>
          <th scope="col">Name</th>
          <th scope="col">Email</th>
          <th scope="col">Is Active</th>
          <th scope="col">Update/Delete</th>
        </tr>
      </thead>
      <tbody>
        {data &&
          data?.map((user) => (
            <tr>
              <th scope="row">{user?._id}</th>
              <td>{user?.name}</td>
              <td>{user?.email}</td>
              <td>{user?.isActive ? "Active" : "Inactive"}</td>
              <td className="d-flex align-items-center">
                <button
                  className="btn btn-sm btn-danger me-2"
                  onClick={() => handleDeleteUser(user?._id)}
                >
                  {isLoading && id === user._id ? (
                    <div class="spinner-border" role="status">
                    <span class="visually-hidden">Loading...</span>
                  </div>
                    ) : (
                    <FaTrash />  
                  )}
                </button>
                <button
                  className="btn btn-sm btn-info me-2"
                  onClick={() => navigate(`/update/${user?._id}`)}
                >
                  <FaEdit />
                </button>
              </td>
            </tr>
          ))}
      </tbody>
    </table>
  );
};

export default Table;
