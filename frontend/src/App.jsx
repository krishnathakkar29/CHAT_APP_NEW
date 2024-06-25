import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Suspense, lazy, useEffect } from "react";
import ProtectRoute from "./components/auth/ProtectRoute";
import { LayoutLoader } from "./components/layout/Loaders";
import axios from "axios";
import { server } from "./constant/config";
import { useDispatch, useSelector } from "react-redux";
import { userExists, userNotExists } from "./redux/reducers/auth";
import { Toaster } from "react-hot-toast";

const Home = lazy(() => import("./pages/Home"));
const Login = lazy(() => import("./pages/Login"));
const Chat = lazy(() => import("./pages/Chat"));
const Groups = lazy(() => import("./pages/Groups"));
const NotFound = lazy(() => import("./pages/NotFound"));

function App() {
  const dispatch = useDispatch();
  const { user, loader } = useSelector((state) => state.auth);

  useEffect(() => {
    axios
      .get(`${server}/api/v1/user/me`, { withCredentials: true })
      .then(({ data }) => {
        
        console.log(data.user);
        dispatch(userExists(data.user));
      })
      .catch((err) => {
        console.log(err);
        dispatch(userNotExists());
      });
  }, [dispatch]);
  return loader ? (
    <LayoutLoader />
  ) : (
    <>
      <BrowserRouter>
        <Suspense fallback={<LayoutLoader />}>
          <Routes>
            <Route element={<ProtectRoute user={user} />}>
              <Route path="/" element={<Home />} />
              <Route path="/chat/:chatId" element={<Chat />} />
              <Route path="/groups" element={<Groups />} />
            </Route>
            <Route
              path="/login"
              element={
                <ProtectRoute user={!user} redirect="/">
                  <Login />
                </ProtectRoute>
              }
            />

            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>

        <Toaster position="bottom-center" />
      </BrowserRouter>
    </>
  );
}

export default App;
