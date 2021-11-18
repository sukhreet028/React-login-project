import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import './userInfo.css';
import { useNavigate } from 'react-router';
function UserInfo() {
  const [userInput, setUserInput] = useState();
  const [updateId, setUpdateId] = useState();
  const [showModal, setShowModal] = useState(false);
  const [name, setName] = useState();
  let userData;
  useEffect(() => {
    myData();
  }, []);
  const myData = () => {
    Axios.get('https://reqres.in/api/login').then((res) =>
      setUserInput(res.data.data)
    );
  };
  const navigatePage = useNavigate();
  const deleteData = (id) => {
    Axios.delete(`https://reqres.in/api/login/user/${id}`).then((res) => {
      if (res.status === 204) {
        setUserInput(userInput.filter((data) => data.id !== id));
        alert('user data deleted successfully');
      }
    });
  };

  const updateData = (id) => {
    if (name && name !== '') {
      const onePersonData = {
        name: name,
        user: id,
      };
      Axios.patch(`https://reqres.in/api/users/${id}`, onePersonData).then(
        (res) => {
          console.log(res);
          if (res.status === 200) {
            setShowModal(false);
            setUserInput((prev) => {
              return [
                ...prev,
                (prev.find((data) => data.id === id).name = name),
              ];
            });
            alert('user updated successfully');
          }
        }
      );
    } else {
      alert('please enter value');
    }
  };

  const updateModal = (id, name) => {
    setUpdateId(id);
    setShowModal(true);
    setName(name);
  };

  if (userInput) {
    console.log(userInput);
    userData = userInput.map((data, index) => {
      if (data.name) {
        return (
          <div className="container" key={index}>
            <div className="user-container">
              <div>
                <p>User: {data.id}</p>
                <p>Name : {data.name}</p>
              </div>
              <div className="button-container">
                <div className="buttons">
                  <button
                    onClick={() => navigatePage(data.id.toString())}
                    className="user-btn"
                    type="button"
                  >
                    View
                  </button>
                  <button
                    onClick={() => deleteData(data.id)}
                    className="user-btn"
                    type="button"
                  >
                    Delete
                  </button>
                  <button
                    onClick={() => updateModal(data.id, data.name)}
                    className="user-btn"
                    type="button"
                  >
                    Update
                  </button>
                </div>
                {/* <button onClick={() => navigatePage(+1)}>Next</button> */}
                {/* <button onClick={() => navigatePage(-1)}>Back</button> */}
              </div>
            </div>
          </div>
        );
      }
    });
  }
  return (
    <>
      <div>{userData}</div>;
      {showModal && (
        <div className="updateInput-container">
          <div className="updateInput">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              name="name"
            />
            <button type="button" onClick={() => updateData(updateId)}>
              Update
            </button>
            <button type="button" onClick={() => setShowModal(false)}>
              cancel
            </button>
          </div>
        </div>
      )}
    </>
  );
}
export default UserInfo;
