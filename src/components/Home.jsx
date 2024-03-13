import { useEffect } from "react";
import Table from "./Table";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchUserData } from "../redux/actions/userActions";
import { reset } from "../redux/slices/userSlice";

const Home = () => {
  const dispatch = useDispatch();
  const { users, isLoading, loadingError, isLoadingSuccess } = useSelector((state) => state.user);
  const navigate = useNavigate();

  useEffect(() => {
      dispatch(fetchUserData());
  }, []);

  useEffect(() => {
    if (isLoadingSuccess) {
      dispatch(reset())
    }
  }, [isLoadingSuccess])

  if (isLoading)
    return (
      <div
        className="w-100 d-flex align-items-center justify-content-center"
        style={{ minHeight: "100vh" }}
      >
        <div
          className="spinner-grow"
          style={{ width: "6rem", height: "6rem" }}
          role="status"
        >
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );

  if (loadingError && 'data' in loadingError)
    return (
      <div class="alert alert-danger m-2" role="alert">
        Some Error Happened!!
      </div>
    );

  return (
    <div className="container">
      <h1 className="my-5">User Data:({users?.length})</h1>
      <div className="d-flex mb-3 align-items-center justify-content-end">
        <button className="btn btn-success" onClick={() => navigate("/create")}>
          Create User
        </button>
      </div>
      {users?.length ? (
        <Table allUsers={users}/>
      ) : (
        <div class="alert alert-info" role="alert">
          No Data Found!!
        </div>
      )}
    </div>
  );
};

export default Home;
