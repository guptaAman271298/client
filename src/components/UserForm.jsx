import { useFormik } from "formik";
import React, { useEffect } from "react";
import toast from "react-hot-toast";
import formValidation from "../utils/formValidation";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { reset } from "../redux/slices/userSlice";

// Making a "UserForm" component which will be reuseable in "CreatUser" and "UpdateUser" component
const UserForm = ({
  userData,
  title,
  onSubmit: onDataSubmit,
  isLoading,
  error,
  type,
  isSuccess
}) => {
  const initialValues = {
    name: userData?.name || "",
    email: userData?.email || "",
    isActive: userData?.isActive || false,
  };

  const navigate = useNavigate()
  const dispatch = useDispatch()

  // Using formik and yup for form validation.
  const {
    values,
    errors: formError,
    touched,
    handleChange,
    handleBlur,
    handleSubmit,
  } = useFormik({
    initialValues,
    validationSchema: formValidation,
    onSubmit: (values) => {
      if (type === "create") {
        onDataSubmit(values);
      } else {
        onDataSubmit({ userId: userData?._id, data: values });
      }
    },
  });

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
    if (isSuccess) {
      if (type === "create") {
        toast.success("Created successfully");
      } else {
        toast.success("Updated successfully");
      }
      navigate("/")
    }
    dispatch(reset())
  }, [error, isSuccess]);

  return (
    <div
      className="w-100 d-flex align-items-center justify-content-center"
      style={{ minHeight: "100vh" }}
    >
      <form className="w-50" onSubmit={handleSubmit}>
          <h2 className="my-4">{title}</h2>
          <div className="mb-3">
            <label for="name" className="form-label">
              <b>Name</b>
            </label>
            <input
              type="name"
              className="form-control"
              id="name"
              name="name"
              value={values?.name}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Name.."
            />
            {formError?.name && touched?.name ? (
              <p className="text-danger">{formError.name}</p>
            ) : null}
          </div>
          <div className="mb-3">
            <label for="email" className="form-label">
              <b>Email</b>
            </label>
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              value={values?.email}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Email.."
            />
            {formError?.email && touched?.email ? (
              <p className="text-danger">{formError.email}</p>
            ) : null}
          </div>
          <div className="form-check form-switch mb-3">
            <input
              className="form-check-input"
              type="checkbox"
              role="switch"
              id="isactive"
              name="isActive"
              checked={values?.isActive}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            <label className="form-check-label" htmlFor="isactive">
              <b>Is User Active ?</b>
            </label>
          </div>
          <button
            className="w-100 btn btn-success"
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? (
              <div class="spinner-border" role="status">
                <span class="visually-hidden">Loading...</span>
              </div>
            ) : (
              <b>{title}</b>
            )}
          </button>
      </form>
    </div>
  );
};

export default UserForm;
