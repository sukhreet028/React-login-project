import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import { useParams } from 'react-router-dom';
function View() {
  //   const navigatePage = useNavigate();

  const { id } = useParams();

  const [userInput, setUserInput] = useState();
  let userData;

  useEffect(() => {
    myData();
  }, []);

  const myData = () => {
    Axios.get('https://reqres.in/api/login').then((res) =>
      setUserInput(res.data.data)
    );
  };

  if (id && userInput) {
    userData = userInput?.find((data) => data.id == id);
  }

  return (
    <>
      { userData && 
        <div className="container">
          <div>
            <p>User: {userData.id}</p>
            <p>Name : {userData.name}</p>
            <p>Year: {userData.year}</p>
            <p>Color: {userData.color}</p>
            <p>Pantone Value: {userData.pantone_value}</p>
          </div>
        </div>
      }
    </>
  );
}
export default View;
