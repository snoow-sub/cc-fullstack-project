import { useEffect, useState } from "react";
import React from "react";
import "../css/userInput.css";

export function UserInput({ handleLogin, sendFormData }) {
  const [formData, setFormData] = useState({
    id: 13,
    name: "test",
    birthday: "1992-02-20",
    sex: 2,
    address: "test",
    calendar: "2024-11-29 16:00-17:00",
    hobby: "test",
    location: "test",
  });

  // ログインが面倒なので上にしておく
  // const [formData, setFormData] = useState({
  //   id: 13,
  //   name: "",
  //   birthday: "",
  //   sex: 2,
  //   address: "",
  //   calendar: "2024-11-29 16:00-17:00",
  //   hobby: "",
  //   location: "",
  // });

  const [answer, setAnswer] = useState({
    user_id: null,
    user_answer: [
      { question_id: 1, answer: 0.5 },
      { question_id: 2, answer: 0.5 },
      { question_id: 3, answer: 0.5 },
      { question_id: 4, answer: 0.5 },
    ],
  });
  const [page, setPage] = useState(1);
  const [errorMessage, setErrorMessage] = useState("");
  // const [responseData, setResponseData] = useState();
  const port = process.env.PORT || 4000;

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:${port}/api/user`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const responseData = await response.json();
      console.log("登録成功:", responseData.id);

      const updatedAnswer = {
        ...answer,
        user_id: responseData.id,
      };

      setAnswer(updatedAnswer);

      const responseAnswer = await fetch(
        `http://localhost:${port}/api/user_answer`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedAnswer),
        }
      );
      if (!responseAnswer.ok) {
        throw new Error(`HTTP error! Status: ${responseAnswer.status}`);
      }
      console.log("回答登録成功:", await responseAnswer.json());

      sendFormData(formData);
      handleLogin(true); // ログイン状態にする
    } catch (error) {
      console.error("エラーが発生しました:", error);
      setErrorMessage("ユーザー登録に失敗しました。もう一度お試しください。");
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleRangeChange = (questionId, value) => {
    console.log("handleRangeChange", questionId, value);
    setAnswer((prevAnswer) => ({
      ...prevAnswer,
      user_answer: prevAnswer.user_answer.map((item) =>
        item.question_id === questionId ? { ...item, answer: value } : item
      ),
    }));
  };

  return (
    <div className="form-group">
      <form onSubmit={handleSubmit}>
        { page === 1 ? (
          <div>
            <div class="hello-comment">
              <div class="text">最初にあなたのことを教えてください！</div>
              <span class="ornament"></span>
            </div><br />
            <label htmlFor="name">
              <pre>名前</pre>
            </label>
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
            /><br /><br />
            <label htmlFor="sex">
              <pre>性別</pre>
            </label>
            <select
              id="sex"
              name="sex"
              value={formData.sex}
              // value="male"
              onChange={handleChange}
              className="input-text"
              // required
            ><br /><br />
              <option value="">選択してください</option>
              <option value="0">男性</option>
              <option value="1">女性</option>
              <option value="2">その他</option>
            </select><br /><br />
            <label htmlFor="birthday">
              <pre>生年月日</pre>
            </label>
            <input
              type="date"
              id="brithday"
              name="birthday"
              placeholder="生年月日を入力してください"
              value={formData.birthday}
              // value="1990-01-01"
              onChange={handleChange}
              className="input-text"
              // required
            /><br /><br />
            <label htmlFor="address">
              <pre>住所</pre>
            </label>
            <input
              type="address"
              id="address"
              name="address"
              placeholder="東京都〇〇区〇〇町〇〇番地"
              onChange={handleChange}
              value={formData.address}
              // value="東京都〇〇区〇〇町〇〇番地"
              className="input-text"
              // required
            /><br /><br />
            <label>
              <pre>趣味</pre>
            </label>
            <select
              id="hobby"
              name="hobby"
              // value={formData.gender}
              // value="none"
              value={formData.hobby}
              onChange={handleChange}
              className="input-text"
              // required
            ><br /><br />
              <option value="">選択してください</option>
              <option value="sports">スポーツ</option>
              <option value="book">読書</option>
              <option value="music">音楽</option>
              <option value="game">ゲーム</option>
              <option value="cook">料理</option>
              <option value="none">特になし</option>
            </select><br /><br />
            <label htmlFor="location">
              <pre>受講場所</pre>
            </label>
            <select
              id="location"
              name="location"
              value={formData.location}
              // value="none"
              onChange={handleChange}
              className="input-text"
              // required
            ><br /><br />
              <option value="">選択してください</option>
              <option value="kantou"></option>
              <option value="chiba">千葉県</option>
              <option value="tokyo">東京都</option>
              <option value="saitama">埼玉県</option>
              <option value="kanagawa">神奈川県</option>
              <option value="ibaraki">茨城県</option>
              <option value="none">住所近くであればどこでも可</option>
            </select>{" "}<br /><br /><br />
            <button class="button-deco" id="user-submit" type="button" onClick={() => setPage(page+1)}>
              次へ
            </button>
          </div>
        ) : (
          <div>
            <div class="hello-comment">
              <div class="text">次にあなたの興味について教えてください！</div>
              <span class="ornament"></span>
            </div><br />
            <label className="slide-bar" htmlFor="inout">
              <pre>
                　　インドア派　　　
                <input
                  type="range"
                  name="inout"
                  min="0"
                  max="1"
                  step="0.1"
                  value={answer.user_answer[0].answer}
                  onChange={(e) => handleRangeChange(1, Number(e.target.value))}
                />
                　アウトドア派　　　
              </pre>
            </label><br />
            <label className="slide-bar" htmlFor="scale">
              <pre>
                　　少人数　　　　　
                <input
                  type="range"
                  name="scale"
                  min="0"
                  max="1"
                  step="0.1"
                  value={answer.user_answer[1].answer}
                  onChange={(e) => handleRangeChange(2, Number(e.target.value))}
                />
                　大人数　　　　　　
              </pre>
            </label><br />
            <label className="slide-bar" htmlFor="distance">
              <pre>
                　　近い方が良い　　
                <input
                  type="range"
                  name="distance"
                  min="0"
                  max="1"
                  step="0.1"
                  value={answer.user_answer[2].answer}
                  onChange={(e) => handleRangeChange(3, Number(e.target.value))}
                />
                　遠くても良い　　　
              </pre>
            </label><br />
            <label className="slide-bar" htmlFor="silent">
              <pre>
                　　黙々とやりたい　
                <input
                  type="range"
                  name="silent"
                  min="0"
                  max="1"
                  step="0.1"
                  value={answer.user_answer[3].answer}
                  onChange={(e) => handleRangeChange(4, Number(e.target.value))}
                />
                　和気藹々とやりたい
              </pre>
            </label><br />
            <center><table>
              <tr>
                <td>
                <button class="button-deco" id="user-submit" type="button" onClick={() => setPage(page-1)}>
                  戻る
                </button>
                </td>
                <td>
                <button class="button-deco" id="user-submit" type="submit">
                  確定
                </button>
                </td>
              </tr>
            </table></center>
          </div>
        )}
      </form>
    </div>
  );
}
