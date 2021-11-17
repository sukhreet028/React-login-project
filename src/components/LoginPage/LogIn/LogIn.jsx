import React, { useState } from "react";
import "./Login.css";
import Axios from "axios";
import { useNavigate } from "react-router";

const LogIn = () => {
  let printData;
  const [input, setInput] = useState({
    username: "",
    password: "",
  });
  const navigatePage = useNavigate();
  const myData = (e) => {
    const { name, value } = e.target;
    console.log("name of input field", name);
    console.log("value of input field ", value);
    setInput((prevData) => {
      return {
        ...prevData,
        [name]: value,
      };
    });
    // setInput({
    //   [name]: value,
    // });
  };

  const storeInput = () => {
    Axios.get("https://reqres.in/api/login/").then((res) => {
      console.log(typeof res);
      console.log(res);
      if (res.status == 200) {
        alert("Logged in successfully");
        setInput({
          username: "",
          password: "",
        });
        navigatePage("/userInfo");
      }
    });
  };

  //   let name = "Log In ";
  return (
    <div>
      <form className="form-class">
        <input
          type="email"
          placeholder="Enter Username"
          name="username"
          value={input.username}
          onChange={myData}
        ></input>
        <input
          type="password"
          placeholder="Enter Password"
          name="password"
          value={input.password}
          onChange={myData}
        ></input>
      </form>
      <div>
        <button className="mybutton" onClick={storeInput} buttonType="submit">
          Log In
        </button>
      </div>
      {/* <div>
        <p>Email: {input.username}</p>
        <p>Password: {input.password}</p>
      </div> */}
    </div>
  );
};
export default LogIn;
