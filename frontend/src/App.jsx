import { useEffect, useState, useRef } from "react";
import { Login, UserInput } from "./components/UserInput";
import { UserInputForMultiStep } from "./components/UserInputForMultiStep";
import { ShowActivity, SwipeLessons } from "./components/SwipeLessons";
import { MultiStepUserInput } from "./components/MultiStepUserInput";
import { Reservation } from "./components/Reservation";
import { SelectDate } from "./components/SelectDate";
import { ReservationPopular } from "./components/ReservationPopular";

import "./css/App.css";

export default function App() {
  const [flick, setFlick] = useState(true);
  const [clickPopular, setClickPopular] = useState(false);
  const [swipeType, setSwipeType] = useState("");
  const [login, setLogin] = useState(false);
  const [inputDate, setInputDate] = useState(false);
  const [profile, setProfile] = useState(null);
  const [lesson, setLesson] = useState([]);
  const [start, setStart] = useState(false);
  const [lessonNumber, setlessonNumber] = useState(0);
  const [popularLesson, setPopularLesson] = useState([]);
  const [userInput, setUserInput] = useState(false);
  const [startDate, setStartDate] = useState(new Date("2024-11-29"));
  const [endDate, setEndDate] = useState(new Date("2024-12-31"));
  const port = process.env.REACT_APP_PORT || 5000;
  const host = process.env.REACT_APP_HOSTNAME || "98.82.11.196";
  console.log(host);

  async function getPlans(userId) {
    try {
      const queryString = new URLSearchParams({
        location: "特になし",
        startDate: startDate.toISOString().split("T")[0], //"2024-12-01",
        endDate: endDate.toISOString().split("T")[0], //"2024-12-31",
      }).toString();
      const response = await fetch(
        `http://${host}:3000/api/user/${userId}/lesson?${queryString}`
      );
      // console.log(response);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const responseData = await response.json();
      return responseData;
    } catch (error) {
      console.error("An error occurred:", error);
    }
  }

  async function getPopularLesson() {
    try {
      const queryString = new URLSearchParams({
        location: "特になし",
        startDate: startDate.toISOString().split("T")[0], //"2024-12-01",
        endDate: endDate.toISOString().split("T")[0], //"2024-12-31",
      }).toString();
      const response = await fetch(
        `http://${host}:3000/api/lesson/popular?${queryString}`
      );
      // console.log(response);
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
      const response = await fetch(`http://${host}:3000/api/user/`);
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

  function handleInputCheck(state) {
    setInputDate(true);
  }

  function handleInputStartDate(date) {
    setStartDate(date);
  }

  function handleInputEndDate(date) {
    setEndDate(date);
  }

  function handleSwipeType(direction) {
    setSwipeType(direction);
  }

  function receiveFormData(data) {
    setProfile(data);
  }

  function reserveLesson(lessonNumber) {
    setlessonNumber(lessonNumber);
  }

  const [formData, setFormData] = useState({
    startDate: "2024-11-29",
    endDate: "2024-12-01",
  });

  async function fetchPlans() {
    const responseData = await getPlans(1);
    // const userData = await getUser();
    // setLesson((prevLessons) => [...prevLessons, responseData]);
    setLesson(responseData);
    console.log("取得したデータ:", responseData);
  }

  async function fetchPopularLesson() {
    const responseData = await getPopularLesson();
    setPopularLesson(responseData);
    console.log("取得したデータ:", responseData);
  }

  useEffect(() => {
    fetchPlans();
    fetchPopularLesson();
  }, [profile]);

  return (
    <>
      {!start ? (
        <div className="start-screen">
          <div>
            <img src="./images/logo.png" alt="logo" width={300} />
            <br />
            <a
              href="javascript:void(0);"
              onClick={() => {
                setStart(true);
                setUserInput(true);
              }}
            >
              Tap to Start
            </a>
          </div>
        </div>
      ) : clickPopular ? (
        <ReservationPopular popularLesson={popularLesson} lessonNumber={lessonNumber} />
      ) : !flick ? ( // flickがfalseならReservationを表示
        <Reservation
          lesson={lesson}
          lessonNumber={lessonNumber}
        />
      ) : inputDate ? (
        <SwipeLessons
          profile={profile}
          lesson={lesson}
          setFlick={setFlick}
          setClickPopular={setClickPopular}
          reserveLesson={reserveLesson}
          handleSwipeType={handleSwipeType}
          popularLesson={popularLesson}
          startDate={startDate}
          endDate={endDate}
        />
      ) : login ? (
        <SelectDate
          handleInputStartDate={handleInputStartDate}
          handleInputEndDate={handleInputEndDate}
          handleInputDate={handleInputCheck}
        />
      ) : userInput ? (
        <UserInputForMultiStep
          profile={profile}
          handleLogin={handleLogin}
          sendFormData={receiveFormData}
        />
      ) : (
        console.log("error")
      )}
    </>
  );
}
