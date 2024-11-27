import { useEffect, useState } from "react";
import React from "react";
import "../css/userInput.css";
import "../css/multiStepUserInput.css";
import { MultiStepUserInput } from "./MultiStepUserInput";

const baseQuestions = [
  {
    id: 1,
    label: "名前",
    type: "text",
    name: "name",
    characterMainMessage: "早速、あなたのお名前を教えて！",
    characterSubMessage: "フルネームでね、僕はディコ！",
  },
  {
    id: 2,
    label: "性別",
    type: "select",
    name: "sex",
    characterMainMessage: "つぎに、あなたの性別を教えて！",
    characterSubMessage: "よろしくね！",
    options: { keys: ["男性", "女性", "その他"], values: [0, 1, 9] },
  },
  {
    id: 3,
    label: "生年月日",
    type: "date",
    name: "birthday",
    characterMainMessage: "生年月日も教えてほしいな！",
    characterSubMessage: "よろしくね！",
  },
  {
    id: 4,
    label: "住所",
    type: "text",
    name: "address",
    characterMainMessage: "住所も教えてほしい",
    characterSubMessage: "え、僕がどこに住んでるかって…？南",
  },
  {
    id: 5,
    label: "趣味",
    type: "select",
    name: "hobby",
    characterMainMessage: "今やってる趣味があれば、教えてほしいな！",
    characterSubMessage: "僕とご近所さんなんだねぇ",
    options: { keys: ["スポーツ", "読書", "その他"] },
  },
  {
    id: 6,
    label: "受講場所",
    type: "select",
    name: "location",
    characterMainMessage: "了解！そしたら希望の受講場所はある？",
    characterSubMessage: "え、僕がどこに住んでるかって…？南麻布。",
    options: { keys: ["自宅", "東京都", "千葉県"] },
  },
];

const addisionalQuestions_ = [
  {
    id: 1,
    label: ["インドア派", "アウトドア派"],
    type: "text",
    name: "inoutdoor",
    characterMainMessage: "メインメッセージ",
    characterSubMessage: "サブメッセージ",
  },
  {
    id: 2,
    label: ["少人数でやりたい", "大人数でやりたい"],
    type: "text",
    name: "scale",
    characterMainMessage: "メインメッセージ",
    characterSubMessage: "サブメッセージ",
  },
  {
    id: 3,
    label: ["近くでやりたい", "遠くてもよい"],
    type: "text",
    name: "distance",
    characterMainMessage: "メインメッセージ",
    characterSubMessage: "サブメッセージ",
  },
  {
    id: 4,
    label: ["黙々とやりたい", "和気藹々とやりたい"],
    type: "text",
    name: "silent",
    characterMainMessage: "メインメッセージ",
    characterSubMessage: "サブメッセージ",
  },
  {
    id: 5,
    label: ["運動量少なめ", "運動量多め"],
    type: "text",
    name: "momentum",
    characterMainMessage: "メインメッセージ",
    characterSubMessage: "サブメッセージ",
  },
];

const addisionalQuestions = [
  {
    id: 1,
    label: ["インドア派", "アウトドア派"],
    type: "text",
    name: "inoutdoor",
    characterMainMessage: "メインメッセージ",
    characterSubMessage: "サブメッセージ",
  },
  {
    id: 2,
    label: ["少人数でやりたい", "大人数でやりたい"],
    type: "text",
    name: "scale",
    characterMainMessage: "メインメッセージ",
    characterSubMessage: "サブメッセージ",
  },
  {
    id: 3,
    label: ["近くでやりたい", "遠くてもよい"],
    type: "text",
    name: "distance",
    characterMainMessage: "メインメッセージ",
    characterSubMessage: "サブメッセージ",
  },
  {
    id: 4,
    label: ["黙々とやりたい", "和気藹々とやりたい"],
    type: "text",
    name: "silent",
    characterMainMessage: "メインメッセージ",
    characterSubMessage: "サブメッセージ",
  },
];

export function UserInputForMultiStep({ handleLogin, sendFormData }) {
  const host = process.env.ENDPOINT || "localhost";

  const mock = {
    name: "テスト太郎",
    sex: 1,
    birthday: "2024-12-01",
    address: "名古屋",
    hobby: "スポーツ",
    location: "東京都",
    inoutdoor: 0.5,
    scale: 0.5,
    distance: 0.5,
    silent: 0.5,
    momentum: 0.5,
  };

  const honban = {
    name: "",
    sex: "",
    birthday: "",
    address: "",
    hobby: "",
    location: "",
    inoutdoor: 0.5,
    scale: 0.5,
    distance: 0.5,
    silent: 0.5,
    momentum: 0.5,
  };

  const [errorMessage, setErrorMessage] = useState("");
  const [currentPage, setCurrentPage] = useState("userBaseQuestions");
  const [userId, setUserId] = useState(null);
  const [formData, setFormData] = useState(mock);

  function navigateToUserAddisionalQuestions() {
    setCurrentPage("userAddisionalQuestions");
  }

  async function handleSubmitUser() {
    try {
      const response = await fetch(`http://${host}:3000/api/user`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          sex: formData.sex,
          birthday: formData.birthday,
          address: formData.address,
        }),
      });
      // hobby: formData.hobby,
      //location: formData.location,

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const responseData = await response.json();
      console.log("登録成功:", responseData.id);
      setUserId(responseData.id);

      sendFormData(formData);
      navigateToUserAddisionalQuestions();
    } catch (error) {
      console.error("エラーが発生しました:", error);
      setErrorMessage("ユーザー登録に失敗しました。もう一度お試しください。");
    }
  }

  async function handleSubmitUserAnswer() {
    try {
      const formatedAnswer = addisionalQuestions.map((q) => {
        return {
          question_id: q.id,
          answer: formData[q.name],
        };
      });

      console.log(formatedAnswer);

      const responseAnswer = await fetch(
        `http://${host}:3000/api/user_answer`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            user_id: userId,
            user_answer: formatedAnswer,
          }),
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

  return (
    <>
      {currentPage === "userBaseQuestions" ? (
        <MultiStepUserInput
          handleLogin={handleLogin}
          questions={baseQuestions}
          formData={formData}
          setFormData={setFormData}
          finalCallback={handleSubmitUser}
        />
      ) : (
        <MultiStepUserInput
          handleLogin={handleLogin}
          questions={addisionalQuestions}
          formData={formData}
          setFormData={setFormData}
          finalCallback={handleSubmitUserAnswer}
        />
      )}
    </>
  );
}
