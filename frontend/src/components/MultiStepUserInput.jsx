import React, { useState } from "react";

/**
 * MultiStepUserInput Component
 * @param {Object[]} steps - 配列形式の質問データ（id, question, type, name を含む）
 * @param {function} onComplete - フォーム入力完了時のコールバック関数
 */

const questions3 = [
  {
    id: 1,
    label: "名前",
    type: "text",
    name: "name",
    characterMainMessage: "早速だけど、あなたのお名前を教えて！",
    characterSubMessage: "フルネームでね、僕はディコ！",
  },
  {
    id: 2,
    label: "性別",
    type: "select",
    name: "sex",
    characterMainMessage: "メインメッセージ",
    characterSubMessage: "サブメッセージ",
    options: ["男性", "女性", "その他"],
  },
  {
    id: 3,
    label: "生年月日",
    type: "date",
    name: "birthdate",
    characterMainMessage: "メインメッセージ",
    characterSubMessage: "サブメッセージ",
  },
  {
    id: 4,
    label: "住所",
    type: "text",
    name: "address",
    characterMainMessage: "メインメッセージ",
    characterSubMessage: "サブメッセージ",
  },
  {
    id: 5,
    label: "趣味",
    type: "select",
    name: "hobby",
    characterMainMessage: "メインメッセージ",
    characterSubMessage: "サブメッセージ",
  },
  {
    id: 6,
    label: "受講場所",
    type: "select",
    name: "location",
    characterMainMessage: "メインメッセージ",
    characterSubMessage: "サブメッセージ",
  },
];

const questions = [
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

export function MultiStepUserInput({ handleLogin }) {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    name: "",
    sex: "",
    birthdate: "",
    address: "",
    hobby: "",
    location: "",
    inoutdoor: 0.5,
    scale: 0.5,
    distance: 0.5,
    silent: 0.5,
    momentum: 0.5,
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleNext = () => {
    if (currentStep < questions.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      alert("送る処理が入る: " + JSON.stringify(formData, null, 2));
      handleLogin(true); // ログイン状態にする
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const renderInput = (step) => {
    const inputId = `input-${step.name}`;
    if (step.type === "select") {
      return (
        <>
          <label
            for={inputId}
            style={{
              display: "block",
              marginBottom: "5px",
              pointerEvents: "none",
              textAlign: "left",
            }}
          >
            {step.label}
          </label>
          <select
            id={inputId}
            name={step.name}
            value={formData[step.name]}
            onChange={handleChange}
            style={{ padding: "10px", width: "80%", fontSize: "16px" }}
          >
            <option value="">選択してください</option>
            {step.options.map((option, index) => (
              <option key={index} value={option}>
                {option}
              </option>
            ))}
          </select>
        </>
      );
    }
    if (typeof step.label === "object") {
      return (
        <label className="slide-bar" htmlFor="scale">
          <pre>
            {step.label[0] + " "}
            <input
              type="range"
              name={step.name}
              min="0"
              max="1"
              step="0.1"
              value={Number(formData[step.name])}
              onChange={handleChange}
            />
            {" " + step.label[1]}
          </pre>
        </label>
      );
    }
    return (
      <>
        <label
          for={inputId}
          style={{
            display: "block",
            marginBottom: "5px",
            pointerEvents: "none",
            textAlign: "left",
            paddingLeft: "20px",
          }}
        >
          {step.label}
        </label>
        <input
          type={step.type}
          name={step.name}
          value={formData[step.name]}
          onChange={handleChange}
          style={{ padding: "10px", width: "80%", fontSize: "16px" }}
        />
      </>
    );
  };

  const progress = ((currentStep + 1) / questions.length) * 100;
  return (
    <div style={{ margin: "50px", textAlign: "center" }}>
      {/* プログレスバー */}
      <div style={{ marginBottom: "20px", width: "80%", margin: "0 auto" }}>
        <div
          style={{
            height: "10px",
            backgroundColor: "#E9E9E9",
            borderRadius: "5px",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              height: "100%",
              width: `${progress}%`,
              backgroundColor: "#6AAADE",
              transition: "width 0.3s ease",
            }}
          />
        </div>
      </div>
      <div>{questions[currentStep].characterMainMessage}</div>
      <div>{questions[currentStep].characterSubMessage}</div>
      <img
        src={"./image/dico.png"}
        style={{ width: "100px", height: "100px" }}
      />
      {renderInput(questions[currentStep])}
      <div style={{ marginTop: "20px" }}>
        <button
          onClick={handleBack}
          disabled={currentStep === 0}
          style={{
            marginRight: "10px",
            fontSize: "16px",
          }}
        >
          戻る
        </button>
        <button
          onClick={handleNext}
          style={{
            fontSize: "16px",
          }}
        >
          {currentStep === questions.length - 1 ? "完了" : "次へ"}
        </button>
      </div>
    </div>
  );
}
