import { useEffect, useState, useRef } from "react";
import { Login, UserInput } from "./components/UserInput";
import { UserInputForMultiStep } from "./components/UserInputForMultiStep";
import { ShowActivity, SwipeLessons } from "./components/SwipeLessons";
import { MultiStepUserInput } from "./components/MultiStepUserInput";
import { Reservation } from "./components/Reservation";
import { SelectDate } from "./components/SelectDate";
import { ProgressToSwipe } from "./components/ProgressToSwipe";
import { ReservationPopular } from "./components/ReservationPopular";

import "./css/App.css";

export default function App() {
  const [flick, setFlick] = useState(true);
  const [clickPopular, setClickPopular] = useState(false);
  const [swipeType, setSwipeType] = useState("");
  const [login, setLogin] = useState(false);
  const [p2Swipe, setP2Swipe] = useState(false);
  const [inputDate, setInputDate] = useState(false);
  const [profile, setProfile] = useState(null);
  const [lesson, setLesson] = useState([]);
  const [start, setStart] = useState(false);
  const [lessonNumber, setlessonNumber] = useState(0);
  const [popularLesson, setPopularLesson] = useState([]);
  const [userInput, setUserInput] = useState(false);
  const [startDate, setStartDate] = useState("2024-11-29");
  const [endDate, setEndDate] = useState("2024-12-31");
  const port = process.env.REACT_APP_PORT || 5000;
  const host = process.env.REACT_APP_HOSTNAME || "98.82.11.196";

  async function getPlans(userId) {
    try {
      const queryString = new URLSearchParams({
        location: "特になし",
        startDate: startDate,
        endDate: endDate,
      }).toString();
      const response = await fetch(`http://${host}:3000/api/user/${userId}/lesson?${queryString}`);
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
        startDate: startDate,
        endDate: endDate,
      }).toString();
      const response = await fetch(`http://${host}:3000/api/lesson/popular?${queryString}`);
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

  function handleProgressToSwipeComplete() {
    setP2Swipe(false);
    setInputDate(true); // SwipeLessonsに進むフラグ
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
    console.log("取得したレッスン:", responseData);
  }

  async function fetchPopularLesson() {
    const responseData = await getPopularLesson();
    setPopularLesson(responseData);
    console.log("取得した人気レッスン:", responseData);
  }

  useEffect(() => {
    console.log(startDate, endDate);
    fetchPlans();
    fetchPopularLesson();
  }, [startDate, endDate]);

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
      ) : clickPopular ? ( //clickPopularがtrueなら表示
        <ReservationPopular popularLesson={popularLesson} lessonNumber={lessonNumber} />
      ) : !flick ? ( // flickがfalseならReservationを表示
        <Reservation
          lesson={lesson}
          lessonNumber={lessonNumber}
          setStart={setStart}
          setClickPopular={setClickPopular}
          setFlick={setFlick}
          setInputDate={setInputDate}
          setP2Swipe={setP2Swipe}
          setLogin={setLogin}
          setUserInput={setUserInput}
        />
      ) : p2Swipe ? (
        <ProgressToSwipe
          profile={profile}
          lesson={lesson}
          startDate={startDate}
          endDate={endDate}
          onComplete={handleProgressToSwipeComplete}
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
          setInputDate={setInputDate}
          setStartDate={setStartDate}
          setEndDate={setEndDate}
          setP2Swipe={setP2Swipe}
        />
      ) : userInput ? (
        <UserInputForMultiStep profile={profile} handleLogin={handleLogin} sendFormData={receiveFormData} />
      ) : (
        console.log("error")
      )}
    </>
  );
}
