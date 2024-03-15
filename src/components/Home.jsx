import { useEffect } from "react";
import Table from "./Table";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { fetchUserData } from "../redux/actions/userActions";
import { reset } from "../redux/slices/userSlice";
import toast from "react-hot-toast";
import Paginate from "./Paginate";

const Home = () => {
  const dispatch = useDispatch();
  const {
    users,
    isLoading,
    loadingError,
    isLoadingSuccess,
    deletingError,
    isDeletingSuccess,
    totalCount,
    pages,
    isStatusChanged,
    statusChangedError,
  } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const { pageNo } = useParams();

  useEffect(() => {
    if (totalCount && pageNo) {
      dispatch(fetchUserData(pageNo));
    } else {
      dispatch(fetchUserData());
    }
  }, [pageNo, totalCount, isDeletingSuccess]);

  useEffect(() => {
    if (deletingError) {
      toast.error(deletingError);
    }
    if (isDeletingSuccess) {
      toast.success("Deleted successfully");
      if (!users.length && pageNo > 1) {
        navigate(`/page/${pageNo - 1}`);
      }
    }
    dispatch(reset());
  }, [deletingError, isDeletingSuccess]);

  useEffect(() => {
    if (statusChangedError) {
      toast.error(statusChangedError);
    }
    if (isStatusChanged) {
      toast.success("Status changed successfully");
    }
    dispatch(reset());
  }, [statusChangedError, isStatusChanged]);

  useEffect(() => {
    if (isLoadingSuccess) {
      dispatch(reset());
    }
  }, [isLoadingSuccess]);

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

  if (loadingError)
    return (
      <div class="alert alert-danger m-2" role="alert">
        {loadingError}
      </div>
    );

  return (
    <div className="container">
      <h2 className="my-3">User Data</h2>
      {users?.length ? (
        <>
          <Table allUsers={users} />
        </>
      ) : (
        <div class="alert alert-info" role="alert">
          No Data Found!!
        </div>
      )}
      {pages > 1 && (
        <div className="position-absolute bottom-0 py-3">
          <Paginate pageNumber={pageNo} />
        </div>
      )}
    </div>
  );
};

export default Home;
