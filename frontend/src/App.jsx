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

        <label for="email">メールアドレス:</label>
        <input
          type="email"
          id="email"
          name="email"
          placeholder="example@example.com"
          required
        />

        <label for="password">パスワード:</label>
        <input
          type="password"
          id="password"
          name="password"
          placeholder="パスワードを入力してください"
          required
        />

        <label for="gender">性別:</label>
        <select id="gender" name="gender" required>
          <option value="">選択してください</option>
          <option value="male">男性</option>
          <option value="female">女性</option>
          <option value="other">その他</option>
        </select>

        <label>趣味:</label>
        <label>
          <input type="checkbox" name="hobbies" value="sports" /> スポーツ
        </label>
        <label>
          <input type="checkbox" name="hobbies" value="reading" /> 読書
        </label>
        <label>
          <input type="checkbox" name="hobbies" value="music" /> 音楽鑑賞
        </label>
        <label>
          <input type="checkbox" name="hobbies" value="travel" /> 旅行
        </label>

        <label for="comments">コメント:</label>
        <textarea
          id="comments"
          name="comments"
          placeholder="自由にコメントをお書きください"
          rows="5"
        ></textarea>

        <button type="submit">送信</button>
      </form>
    </div>
  );
}
