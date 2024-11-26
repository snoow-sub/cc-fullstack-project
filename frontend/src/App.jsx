import { useEffect, useState, useRef } from "react";
import { Login, UserInput } from "./components/UserInput";
import { ShowActivity, SwipeLessons } from "./components/SwipeLessons";
import { MultiStepUserInput } from "./components/MultiStepUserInput";
import { Reservation } from "./components/Reservation";

import "./css/App.css";

export default function App() {
  const [flick, setFlick] = useState(true);
  const [swipeType, setSwipeType] = useState("");
  const [login, setLogin] = useState(false);
  const [profile, setProfile] = useState(null);
  const [lesson, setLesson] = useState([]);
  const [start, setStart] = useState(false);
  const [lessonNumber, setlessonNumber] = useState(0);
  const [popularLesson, setPopularLesson] = useState([]);
  const port = process.env.PORT || 3000;
  const hostname = process.env.HOSTNAME || "localhost";

  async function getPlans(userId) {
    try {
      const startDate = new Date("2024-12-01");
      const endDate = new Date("2024-12-31");
      const queryString = new URLSearchParams({
        location: "特になし",
        startDate: startDate.toISOString().split("T")[0], //"2024-12-01",
        endDate: endDate.toISOString().split("T")[0], //"2024-12-31",
      }).toString();
      const response = await fetch(
        `http://localhost:3000/api/user/${userId}/lesson?${queryString}`
      );
      console.log(response);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const responseData = await response.json();
      return responseData;
    } catch (error) {
      const mockData = [
        {
          date: "2024-12-02T15:00:00.000Z",
          description: "テニスを一緒にしませんか？",
          end_time: "20:00:00",
          id: 1,
          imagePath: "/image/tennis_1.gif",
          indicator: 92.1,
          location: "関東",
          momentum: null,
          moviePath: "./movie/lesson3.mp4",
          review: 4,
          start_time: "18:00:00",
          store_id: 1,
        },
        {
          date: "2024-12-02T15:00:00.000Z",
          description: "ヨガや瞑想の基本から学びましょう！",
          end_time: "20:00:00",
          id: 2,
          imagePath: "./image/yoga_1.gif",
          indicator: 92.1,
          location: "関東",
          momentum: null,
          moviePath: "./movie/lesson3.mp4",
          review: 4,
          start_time: "18:00:00",
          store_id: 1,
        },
        {
          date: "2024-12-02T15:00:00.000Z",
          description:
            "一緒に生け花で遊びませんか?簡単なキットをお送りしますので、当日はオンラインでご参加いただけます！",
          end_time: "20:00:00",
          id: 3,
          imagePath: "./image/hana_1.gif",
          indicator: 92.1,
          location: "関東",
          momentum: null,
          moviePath: "./movie/lesson3.mp4",
          review: 4,
          start_time: "18:00:00",
          store_id: 1,
        },
        {
          date: "2024-12-02T15:00:00.000Z",
          description: "テニスを一緒にしませんか？",
          end_time: "20:00:00",
          id: 4,
          imagePath: "/image/tennis.png",
          indicator: 92.1,
          location: "関東",
          momentum: null,
          moviePath: "./movie/lesson3.mp4",
          review: 4,
          start_time: "18:00:00",
          store_id: 1,
        },
        {
          date: "2024-12-02T15:00:00.000Z",
          description: "ヨガや瞑想の基本から学びましょう！",
          end_time: "20:00:00",
          id: 5,
          imagePath: "./image/yoga.png",
          indicator: 92.1,
          location: "関東",
          momentum: null,
          moviePath: "./movie/lesson3.mp4",
          review: 4,
          start_time: "18:00:00",
          store_id: 1,
        },
      ];
      console.error("An error occurred:", error);
      return mockData;
    }
  }

  async function getPopularLesson() {
    try {
      const startDate = new Date("2024-12-01");
      const endDate = new Date("2024-12-31");
      const queryString = new URLSearchParams({
        location: "特になし",
        startDate: startDate.toISOString().split("T")[0], //"2024-12-01",
        endDate: endDate.toISOString().split("T")[0], //"2024-12-31",
      }).toString();
      const response = await fetch(
        `http://localhost:3000/api/lesson/popular?${queryString}`
      );
      console.log(response);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const responseData = await response.json();
      return responseData;
    } catch (error) {
      const mockData = [
        {
          date: "2024-12-02T15:00:00.000Z",
          description: "テニスを一緒にしませんか？",
          end_time: "20:00:00",
          id: 1,
          imagePath: "/image/tennis_1.gif",
          indicator: 92.1,
          location: "関東",
          momentum: null,
          moviePath: "./movie/lesson3.mp4",
          review: 4,
          start_time: "18:00:00",
          store_id: 1,
        },
        {
          date: "2024-12-02T15:00:00.000Z",
          description: "ヨガや瞑想の基本から学びましょう！",
          end_time: "20:00:00",
          id: 2,
          imagePath: "./image/yoga_1.gif",
          indicator: 92.1,
          location: "関東",
          momentum: null,
          moviePath: "./movie/lesson3.mp4",
          review: 4,
          start_time: "18:00:00",
          store_id: 1,
        },
        {
          date: "2024-12-02T15:00:00.000Z",
          description:
            "一緒に生け花で遊びませんか?簡単なキットをお送りしますので、当日はオンラインでご参加いただけます！",
          end_time: "20:00:00",
          id: 3,
          imagePath: "./image/hana_1.gif",
          indicator: 92.1,
          location: "関東",
          momentum: null,
          moviePath: "./movie/lesson3.mp4",
          review: 4,
          start_time: "18:00:00",
          store_id: 1,
        },
      ];
      console.error("An error occurred:", error);
      return mockData;
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

  function reserveLesson(lessonNumber) {
    setlessonNumber(lessonNumber);
  }

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
            <img src="./image/logo.png" alt="logo" width={300} />
            <br />
            <a href="javascript:void(0);" onClick={() => setStart(true)}>
              Tap to Start
            </a>
          </div>
        </div>
      ) : !flick ? ( // flickがfalseならReservationを表示
        <Reservation lesson={lesson} lessonNumber={lessonNumber} />
      ) : login ? (
        <SwipeLessons
          profile={profile}
          lesson={lesson}
          popularLesson={popularLesson}
          setFlick={setFlick}
          reserveLesson={reserveLesson}
          handleSwipeType={handleSwipeType}
        />
      ) : (
        <MultiStepUserInput
          profile={profile}
          handleLogin={handleLogin}
          sendFormData={receiveFormData}
        />
      )}
    </>
  );
}
