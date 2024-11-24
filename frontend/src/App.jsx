import { useEffect, useState, useRef } from "react";
import { Login, UserInput } from "./components/UserInput";
import { ShowActivity, SwipeLessons } from "./components/SwipeLessons";

import { Reservation } from "./components/Reservation";

import "./css/App.css";

export default function App() {
  const [flick, setFlick] = useState(true);
  const [swipeType, setSwipeType] = useState("");
  const [login, setLogin] = useState(false);
  const [profile, setProfile] = useState(null);
  const [lesson, setLesson] = useState([]);
  const [start, setStart] = useState(false);

  async function getPlans(userId) {
    try {
      const response = await fetch(
        `http://localhost:3000/api/user/${userId}/lesson`
      );
      console.log("レスポンス取れるか確認");
      console.log(response);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const responseData = await response.json();
      return responseData;
    } catch (error) {
      console.error("An error occurred:", error);
    }
  }

  async function getUser() {
    try {
      const response = await fetch(`http://localhost:3000/api/user/`);
      console.log("userレスポンス取れるか確認");
      console.log(response);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const responseData = await response.json();
      return responseData;
    } catch (error) {
      console.error("An error occurred:", error);
    }
  }

  function handleLogin(state) {
    setLogin(state);
  }

  function handleSwipeType(direction) {
    setSwipeType(direction);
  }

  function receiveFormData(data) {
    setProfile(data);
  }

  useEffect(() => {
    async function fetchPlans() {
      const responseData = await getPlans(1);
      // const userData = await getUser();
      setLesson((prevLessons) => [...prevLessons, responseData]);
      console.log("取得したデータ:", responseData);
    }
    fetchPlans();
  }, [profile]);

  return (
    <>
      {!start ? (
        <div className="start-screen">
          <h1>-- Tap to Start --</h1>
          <button onClick={() => setStart(true)}>
            ボタンを押して新たな旅に出かけよう
          </button>
        </div>
      ) : !flick ? ( // flickがfalseならReservationを表示
        <Reservation lesson={lesson} />
      ) : login ? (
        <SwipeLessons
          profile={profile}
          lesson={lesson}
          setFlick={setFlick}
          handleSwipeType={handleSwipeType}
        />
      ) : (
        <UserInput
          profile={profile}
          handleLogin={handleLogin}
          sendFormData={receiveFormData}
        />
      )}
    </>
  );
}
