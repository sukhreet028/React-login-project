import "./App.css";
import Home from "./components/HomePage/Home";
import LogIn from "./components/LoginPage/LogIn/LogIn";
import { Suspense } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import List from "./components/LoginPage/List-com/List2";
import UserInfo from "./components/LoginPage/User-Info/UserInfo";
import View from "./components/LoginPage/User-Info/View";

function App() {
  const dataList = [
    // {
    //   name: "home",
    //   path: "/home",
    // },
    {
      name: "login",
      path: "/login",
    },
    {
      name: "userInfo",
      path: "/userInfo",
    },
    {
      name: "view user",
      path: "/viewuser",
    },
  ];
  let routes = [
    <Routes>
      {/* <Route path="/home" element={<Home />} /> */}
      <Route path="/login" element={<LogIn />} />
      <Route path="/userInfo" element={<UserInfo />} />
      <Route path="/viewuser" element={<View />} />
      <Route path="*" element={<Home />} />
    </Routes>,
  ];

  return (
    <>
      <List classType="small-nav" myBar={dataList} />
      <Suspense fallback={<p>Please Wait Data is Loading ...</p>}>
        {routes}
      </Suspense>
    </>
  );
}
export default App;
