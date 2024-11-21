import { useEffect, useState } from "react";
import React from "react";
// import { useSwipeable } from "react-swipeable";

export function Login({ handleLogin, sendFormData }) {
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    gender: "",
  });

  function handleSubmit(e) {
    // e.preventDefault();
    sendFormData(formData);
    console.log("送信されたデータ:", formData);
    handleLogin(true);
  }

  const handleChange = (e) => {
    console.log(e.target);
    console.log("どゆことととととt");
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <>
      <div>
        <h1>入力フォーム</h1>
        <form onSubmit={handleSubmit}>
          <label htmlFor="name">名前:</label>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="お名前を入力してください"
            required
            value={formData.name}
            onChange={handleChange}
          />
          <br></br>
          <label htmlFor="gender">性別:</label>
          <select
            id="gender"
            name="gender"
            required
            value={formData.gender}
            onChange={handleChange}
          >
            <br />
            <option value="">選択してください</option>
            <br />
            <option value="male">男性</option>
            <br />
            <option value="female">女性</option>
            <br />
            <option value="other">その他</option>
            <br />
          </select>
          <br />
          <label htmlFor="age">年齢:</label>
          <input
            type="number"
            id="age"
            name="age"
            placeholder="20"
            required
            value={formData.age}
            onChange={handleChange}
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
            <input type="checkbox" name="hobbies" value="sports" /> スポーツ{" "}
            <br />
          </label>
          <label>
            <input type="checkbox" name="hobbies" value="reading" /> 読書 <br />
          </label>
          <label>
            <input type="checkbox" name="hobbies" value="music" /> 音楽鑑賞{" "}
            <br />
          </label>
          <label>
            <input type="checkbox" name="hobbies" value="travel" /> 旅行
            <br />
          </label>
          <label for="name">どこで:</label>
          <input
            type="text"
            id="location"
            name="location"
            placeholder="取り組みたい場所を選択してください"
            required
          />
          <br></br>
          <label for="inout"></label>
          インドア派
          <input type="range" name="inout" min="0" max="100" />
          アウトドア派
          <br />
          <label>規模感</label>
          小
          <input type="range" name="scale" min="0" max="100" step="5" /> 大
          <br />
          <label>距離の近さ</label>
          近い方が良い
          <input type="range" name="distance" min="0" max="100" step="5" />{" "}
          遠くても良い
          <br />
          <label>静かさ</label>
          黙々とやりたい
          <input type="range" name="silent" min="0" max="100" step="5" />{" "}
          和気藹々とやりたい
          <br />
          <button id="" type="submit">
            送信
          </button>
        </form>
      </div>
    </>
  );
}
