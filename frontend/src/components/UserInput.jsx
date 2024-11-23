import { useEffect, useState } from "react";
import React from "react";
import "../css/userInput.css";
// import { useSwipeable } from "react-swipeable";

export function UserInput({ handleLogin, sendFormData }) {
  const [formData, setFormData] = useState({
    name: "",
    brithday: "",
    sex: "",
    calendar: "2024-11-29 16:00-17:00",
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
          <label htmlFor="name"><pre>名前</pre></label>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="お名前を入力してください"
            value={formData.name}
            // value="test"
            onChange={handleChange}
            className="input-text"
            // required
          />
          <label htmlFor="sex"><pre>性別</pre></label>
          <select
            id="sex"
            name="sex"
            value={formData.sex}
            // value="male"
            onChange={handleChange}
            className="input-text"
            // required
          >
            <option value="">選択してください</option>
            <option value="male">男性</option>
            <option value="female">女性</option>
            <option value="other">その他</option>
          </select>
          <label htmlFor="birthday"><pre>生年月日</pre></label>
          <input
            type="date"
            id="brithday"
            name="birthday"
            placeholder="生年月日を入力してください"
            value={formData.age}
            // value="1990-01-01"
            onChange={handleChange}
            className="input-text"
            // required
          />
          <label htmlFor="address"><pre>住所</pre></label>
          <input
            type="address"
            id="address"
            name="address"
            placeholder="東京都〇〇区〇〇町〇〇番地"
            // value={formData.address}
            value="東京都〇〇区〇〇町〇〇番地"
            className="input-text"
            // required
          />
          <label><pre>趣味</pre></label>
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
          </select>
          <label htmlFor="location"><pre>受講場所</pre></label>
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
          <div className="beak"></div>
          <label className="slide-bar" htmlFor="inout">
          <pre>インドア派　　　<input type="range" name="inout" min="0" max="100" step="1"/>　アウトドア派</pre>
          </label>
          <label className="slide-bar" htmlFor="scale">
          <pre>少人数　　　　　<input type="range" name="scale" min="0" max="100" step="1"/>　大人数</pre>
          </label>
          <label className="slide-bar" htmlFor="distance">
          <pre>近い方が良い　　<input type="range" name="distance" min="0" max="100" step="1"/>　遠くても良い</pre>
          </label>
          <label className="slide-bar" htmlFor="silent">
          <pre>黙々とやりたい　<input type="range" name="silent" min="0" max="100" step="1"/>　和気藹々とやりたい</pre>
          </label>
          <button class="button-deco" id="user-submit" type="submit">送信</button>
        </form>
      </div>
    </>
  );
}
