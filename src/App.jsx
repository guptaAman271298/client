import { Outlet, createBrowserRouter } from "react-router-dom";
import Home from "./components/Home";
import { Provider } from "react-redux";
import CreateUser from "./components/CreateUser";
import UpdateUser from "./components/UpdateUser";
import { Toaster } from "react-hot-toast";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";
import store from "./redux/store";
import Navbar from "./components/Navbar";

const Layout = () => {

  const persister = persistStore(store);

  return (
    <Provider store={store}>
      <PersistGate persistor={persister}>
        <Navbar />
        <Outlet />
        <Toaster />
      </PersistGate>
    </Provider>
  )
}

// Creating react router for navigation
const appRouter = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <Home />
      },
      {
        path: '/page/:pageNo',
        element: <Home />
      },
      {
        path: '/create',
        element: <CreateUser />
      },
      {
        path: '/update/:id',
        element: <UpdateUser />
      },
    ]
  }
])


export default appRouter;
