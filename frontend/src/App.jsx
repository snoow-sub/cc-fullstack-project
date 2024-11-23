import { useEffect, useState, useRef } from "react";
import { Login, UserInput } from "./components/UserInput";
import { ShowActivity, SwipeLessons } from "./components/SwipeLessons";

import "./css/App.css";

export default function App() {
  const [flick, setFlick] = useState(true);
  const [swipeType, setSwipeType] = useState("");
  const [login, setLogin] = useState(false);
  const [profile, setProfile] = useState(null);
  const [lesson, setLesson] = useState([]);

  async function getPlans() {
    try {
      const response = await fetch("http://localhost:3001/api/lesson");
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
      const responseData = await getPlans();
      setLesson((prevLessons) => [...prevLessons, responseData]);
      console.log("取得したデータ:", responseData);
    }
    fetchPlans();
  }, [profile]);

  return (
    <>
      {/* <button onClick={() => {
        getPlans();
      }}>
        プランを取得
      </button> */}
      {login ? (
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
