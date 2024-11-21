import { useEffect, useState, useRef } from "react";
import ExtButton from "./components/extButton";
import "./App.css";

export default function App() {
  const [plans, setPlans] = useState({});

  async function getPlans() {
    try {
      const response = await fetch("http://localhost:3001/api/view");
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      // const responseData = await response.json()
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

  return (
    <div>
      <h1>入力フォーム</h1>
      <form action="/submit" method="post">
        <label for="name">名前:</label>
        <input
          type="text"
          id="name"
          name="name"
          placeholder="お名前を入力してください"
          required
        />
        
        <label for="gender">性別:</label>
        <select id="gender" name="gender" required><br />
          <option value="">選択してください</option><br />
          <option value="male">男性</option><br />
          <option value="female">女性</option><br />
          <option value="other">その他</option><br />
        </select>
        
        <br />
        
        <label for="age">年齢:</label>
        <input
          type="age"
          id="age"
          name="age"
          placeholder="20"
          required
        />

        <br />
        <label for="address">住所:</label>
        <input
          type="address"
          id="address"
          name="address"
          placeholder="東京都XXXXXXXX"
          required
        />
        
        <label>趣味:</label> <br />
        <label>
          <input type="checkbox" name="hobbies" value="sports" /> スポーツ <br />
        </label>
        <label>
          <input type="checkbox" name="hobbies" value="reading" /> 読書 <br />
        </label>
        <label>
          <input type="checkbox" name="hobbies" value="music" /> 音楽鑑賞 <br />
        </label>
        <label>
          <input type="checkbox" name="hobbies" value="travel" /> 旅行<br />
        </label>

        <label for="name">どこで:</label>
      <input
        type="text"
        id="where"
        name="where"
        placeholder="取り組みたい場所を選択してください"
        required/>
        <br></br>

        <label for="inout"></label>
        インドア派
        <input 
          type="range"
          name="inout"
          min="0"
          max="100"
        /> 
        アウトドア派<br />

        <label>規模感</label>
        小
        <input type="range" name="scale" min="0" max="100" step="5"/> 大<br />
        
        <label>距離の近さ</label>
        近い方が良い
        <input type="range" name="distance" min="0" max="100" step="5"/> 遠くても良い<br />

        <label>静かさ</label>
        黙々とやりたい
        <input type="range" name="silent" min="0" max="100" step="5" /> 和気藹々とやりたい<br />
        
        <button type="submit">送信</button>
      </form>
    </div>
  );
}
