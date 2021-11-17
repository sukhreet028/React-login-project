import React, { useState, useEffect } from "react";
import Axios from "axios";
import "./userInfo.css";
import { useNavigate } from "react-router";
function UserInfo() {
  const [userInput, setUserInput] = useState();
  let userData;
  let onePersonData;
  useEffect(() => {
    myData();
  }, []);
  const myData = () => {
    Axios.get("https://reqres.in/api/login").then((res) =>
      setUserInput(res.data.data)
    );
    onePersonData = {
      user: 5,
      name: "abc singh",
    };
  };
  const navigatePage = useNavigate();
  const deleteData = (id) => {
    Axios.delete("https://reqres.in/api/login/user/2").then((res) => {
      console.log(res);
      //   setUserInput((prevData) => {
      //     return prevData.filter((data, index) => {
      //       return index !== id;
      //     });
      //   });
      console.log("delete data res", res);
      if (res.status == 204) {
        console.log("delete button clicked");
        alert("user data deleted successfully");
        navigatePage("/login");
      }
    });
  };

  const updateData = () => {
    Axios.patch("'https://reqres.in/api/users/2", onePersonData).then((res) => {
      console.log("data updated successfully");
      if (res.status == 204) {
        console.log("delete button clicked");
        alert("user data deleted successfully");
        navigatePage("/login");
      }
    });
  };
  if (userInput) {
    console.log(userInput);
    userData = userInput.map((data, index) => (
      <div className="container">
        <div className="user-container" key={index}>
          <div>
            <p>User: {data.id}</p>
            <p>Name : {data.name}</p>
            {/* <p>Year: {data.year}</p>
            <p>Color: {data.color}</p>
            <p>Pantone Value: {data.pantone_value}</p> */}
          </div>
          <div className="button-container">
            <div className="buttons">
              <button className="user-btn" type="button">
                View
              </button>
              <button onClick={deleteData} className="user-btn" type="button">
                Delete
              </button>
              <button onClick={updateData} className="user-btn" type="button">
                Update
              </button>
            </div>
            {/* <button onClick={() => navigatePage(+1)}>Next</button> */}
            {/* <button onClick={() => navigatePage(-1)}>Back</button> */}
          </div>
        </div>
      </div>
    ));
  }
  return (
    <>
      <div>{userData}</div>;
    </>
  );
}
export default UserInfo;
