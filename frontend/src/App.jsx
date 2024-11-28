import { useEffect, useState, useRef } from "react";
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
  const [lessonLength, setLessonLength] = useState(5);
  const port = process.env.REACT_APP_PORT || 5000;
  const host = process.env.REACT_APP_HOSTNAME || "98.82.11.196";
  const [userId, setUserId] = useState(null);

  async function postReservation(userSelectedLessonId) {
    try {
      const response = await fetch(`http://${host}:3000/api/reservation`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_id: userId,
          lesson_id: userSelectedLessonId,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
    } catch (error) {
      console.error("エラーが発生しました:", error);
    }
  }

  async function getPlans() {
    try {
      let startDatePlus1 = new Date(startDate);
      startDatePlus1.setDate(startDatePlus1.getDate() + 1);
      startDatePlus1 = startDatePlus1.toISOString().slice(0, 10);
      const queryString = new URLSearchParams({
        location: "特になし",
        startDate: startDatePlus1,
        endDate: endDate,
      }).toString();
      const response = await fetch(
        `http://${host}:3000/api/user/${userId}/lesson?${queryString}`
      );
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
      let startDatePlus1 = new Date(startDate);
      startDatePlus1.setDate(startDatePlus1.getDate() + 1);
      startDatePlus1 = startDatePlus1.toISOString().slice(0, 10);
      const queryString = new URLSearchParams({
        location: "特になし",
        startDate: startDatePlus1,
        endDate: endDate,
      }).toString();
      const response = await fetch(
        `http://${host}:3000/api/lesson/popular?${queryString}`
      );
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
    const responseData = await getPlans(userId);
    setLesson(responseData);
    return Object.keys(responseData).length;
    // console.log("取得したレッスン:", responseData);
  }

  async function fetchPopularLesson() {
    const responseData = await getPopularLesson();
    setPopularLesson(responseData);
    // console.log("取得した人気レッスン:", responseData);
  }

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
        <ReservationPopular
          popularLesson={popularLesson}
          lessonNumber={lessonNumber}
          setStart={setStart}
          setClickPopular={setClickPopular}
          setFlick={setFlick}
          setInputDate={setInputDate}
          setP2Swipe={setP2Swipe}
          setLogin={setLogin}
          setUserInput={setUserInput}
          postReservation={postReservation}
          userId={userId}
        />
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
          postReservation={postReservation}
          userId={userId}
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
          lesson={lesson}
          setFlick={setFlick}
          setClickPopular={setClickPopular}
          reserveLesson={reserveLesson}
          handleSwipeType={handleSwipeType}
          popularLesson={popularLesson}
          startDate={startDate}
          endDate={endDate}
          fetchPopularLesson={fetchPopularLesson}
        />
      ) : login ? (
        <SelectDate
          setInputDate={setInputDate}
          setStartDate={setStartDate}
          setEndDate={setEndDate}
          setP2Swipe={setP2Swipe}
          fetchPlans={fetchPlans}
          setLessonLength={setLessonLength}
        />
      ) : userInput ? (
        <UserInputForMultiStep
          profile={profile}
          handleLogin={handleLogin}
          sendFormData={receiveFormData}
          setUserId={setUserId}
          userId={userId}
        />
      ) : (
        console.log("error")
      )}
    </>
  );
}
