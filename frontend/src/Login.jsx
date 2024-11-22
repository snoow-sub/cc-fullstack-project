import { useEffect, useState } from "react";
import React from "react";
import "./login.css";
import "./css/user-input.css";
// import { useSwipeable } from "react-swipeable";

export function Login({ handleLogin, sendFormData }) {
  const [formData, setFormData] = useState({
    name: "",
    brithday: "",
    sex: "",
  });

  function handleSubmit(e) {
    // e.preventDefault();
    sendFormData(formData);
    console.log("送信されたデータ : ", formData);
    handleLogin(true);
  }

  const handleChange = (e) => {
    console.log(e.target);
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <>
      <div className="form-group">
        <h5 className="hello-comment">最初にあなたのことを教えてください！</h5>
        <div className="beak"></div>
        <form onSubmit={handleSubmit}>
          <label htmlFor="name">名前</label>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="お名前を入力してください"
            // value={formData.name}
            value="test"
            onChange={handleChange}
            className="input-text"
            // required
          /><br /><br />
          <label htmlFor="sex">性別</label>
          <select
            id="sex"
            name="sex"
            // value={formData.gender}
            value="male"
            onChange={handleChange}
            className="input-text"
            // required
          >
            <option value="">選択してください</option>
            <option value="male">男性</option>
            <option value="female">女性</option>
            <option value="other">その他</option>
          </select> <br /><br />
          <label htmlFor="birthday">生年月日</label>
          <input
            type="date"
            id="brithday"
            name="birthday"
            placeholder="生年月日を入力してください"
            // value={formData.age}
            value="1990-01-01"
            onChange={handleChange}
            className="full-width-input"
            // required
          /><br /><br />
          <label for="address">住所</label>
          <input
            type="address"
            id="address"
            name="address"
            placeholder="東京都〇〇区〇〇町〇〇番地"
            // value={formData.address}
            value="東京都〇〇区〇〇町〇〇番地"
            className="full-width-input"
            // required
          /><br /><br />
          <label>趣味</label>
          <select
            id="hobby"
            name="hobby"
            // value={formData.gender}
            value="none"
            onChange={handleChange}
            className="input-text"
            // required
          >
            <option value="">選択してください</option>
            <option value="sports">スポーツ</option>
            <option value="book">読書</option>
            <option value="music">音楽</option>
            <option value="game">ゲーム</option>
            <option value="cook">料理</option>
            <option value="none">特になし</option>
          </select> <br /><br />
          <label for="location">受講場所</label>
          <select
            id="hobby"
            name="hobby"
            // value={formData.gender}
            value="none"
            onChange={handleChange}
            className="input-text"
            // required
          >
            <option value="">選択してください</option>
            <option value="kantou"></option>
            <option value="chiba">千葉県</option>
            <option value="tokyo">東京都</option>
            <option value="saitama">埼玉県</option>
            <option value="kanagawa">神奈川県</option>
            <option value="ibaraki">茨城県</option>
            <option value="none">住所近くであればどこでも可</option>
          </select> <br /><br /><br />
          <h5 className="hello-comment">次にあなたの興味について教えてください！</h5>
          <div className="beak"></div><br />
          <label className="slide-bar" for="inout">
            インドア派<input type="range" name="inout" min="0" max="100" step="1"/>アウトドア派
          </label><br  /><br />
          <label className="slide-bar" for="scale">
           少人数<input type="range" name="scale" min="0" max="100" step="1" />大人数
          </label><br /><br />
          <label className="slide-bar" for="distance">
            近い方が良い<input type="range" name="distance" min="0" max="100" step="1" />遠くても良い
          </label><br /><br />
          <label className="slide-bar" for="silent">
            黙々とやりたい<input type="range" name="silent" min="0" max="100" step="1" />和気藹々とやりたい
          </label><br /><br />
          <button class="button-deco" id="user-submit" type="submit">
            送信
          </button>
        </form>
      </div>
    </>
  );
}
