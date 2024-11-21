import { useEffect, useState, useRef } from "react";
import ExtButton from "./components/extButton";
import { Login } from "./Login";
import { ShowActivity } from "./ShowActivity";

import "./App.css";

export default function App() {
  const [profile, setProfiles] = useState({});
  const [login, setLogin] = useState(false);

  // const [profiles, setProfiles] = useState([]);

  // mock的なもの
  const returnValue= [{id:1, store_id:1, date:'2024-11-24', start_time:'8:00', end_time:'22:00',tags:'test', review:3, indicator:2},
    {id:1, store_id:1, date:'2024-11-24', start_time:'8:00', end_time:'22:00',tags:'test', review:3, indicator:2},
    {id:1, store_id:1, date:'2024-11-24', start_time:'8:00', end_time:'22:00',tags:'test', review:3, indicator:2}]

  async function getPlans() {
    try {
      const response = await fetch("http://localhost:3001/api/activities");
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const responseData = await response.json()
      return responseData;
      // let cookData = responseData.filter((item) => item.cooking === true)
      // cookData = cookData.map((item) => {
      // return {
      //   title: item.cookTitle,
      //   start: item.date,
      //   end: item.date,
      //   color: 'orange',
      //   textColor: 'black'
      // }
      // }
      // setCooking(cookData)
      // let drinkData = responseData.filter((item) => item.drinking === true)
      // drinkData = drinkData.map((item) => {
      //   return {
      //     title: item.drinkTitle,
      //     start: item.date,
      //     end: item.date,
      //     color: 'purple',
      //     textColor: 'white'
      //   }
      // })
      // setDrinking(drinkData)
    } catch (error) {
      console.error("An error occurred:", error);
    }
  }

  function handleLogin(state) {
    setLogin(state);
  }

  useEffect(() => {
   const responseData = getPlans();
  }, [profile]);

  return (
    <>
      {/* <button onClick={() => {
        getPlans();
      }}>
        プランを取得
      </button> */}
       {login ? (
      <ShowActivity /> 
    ) : (
      <Login profile={profile} handleLogin={handleLogin} /> 
    )}
    </>
  );
}
