import React, { useState, useEffect } from "react";
import Axios from "axios";
// import { useNavigate } from "react-router-dom";
function View() {
  //   const navigatePage = useNavigate();
  const [userInput, setUserInput] = useState();
  let userData;
  useEffect(() => {
    myData();
  }, []);
  const myData = () => {
    Axios.get("https://reqres.in/api/login").then((res) =>
      setUserInput(res.data.data)
    );
  };

  if (userInput) {
    console.log(userInput);
    userData = userInput.map((data, index) => (
      <div className="container">
        <div className="user-container" key={index}>
          <div>
            <p>User: {data.id}</p>
            <p>Name : {data.name}</p>
            <p>Year: {data.year}</p>
            <p>Color: {data.color}</p>
            <p>Pantone Value: {data.pantone_value}</p>
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
export default View;
