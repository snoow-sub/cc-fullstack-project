import React, { useState } from "react";

/**
 * MultiStepUserInput Component
 * @param {Object[]} steps - 配列形式の質問データ（id, question, type, name を含む）
 * @param {function} onComplete - フォーム入力完了時のコールバック関数
 */

export function MultiStepUserInput({
  handleLogin,
  questions,
  formData,
  setFormData,
  finalCallback,
}) {
  const [currentStep, setCurrentStep] = useState(0);
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
      setCurrentStep(0);
      finalCallback();
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const sharedInputStyle = {
    padding: "10px",
    width: "100%",
    fontSize: "16px",
    boxSizing: "border-box",
  };

  const renderInput = (step) => {
    const inputId = `input-${step.name}`;
    const isDate = step.type === "date";

    if (step.type === "select") {
      return (
        <>
          <label
            htmlFor={inputId}
            style={{
              display: "block",
              marginBottom: "5px",
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
            style={{
              ...sharedInputStyle,
              ...(isDate && {
                appearance: "none",
                border: "1px solid #ccc",
                borderRadius: "5px",
              }),
            }}
          >
            <option value="">選択してください</option>
            {step.options.keys.map((option, index) => (
              <option
                key={index}
                value={
                  !step.options.values ? option : step.options.values[index]
                }
              >
                {option}
              </option>
            ))}
          </select>
        </>
      );
    }
    if (typeof step.label === "object") {
      return (
        <>
          <label
            className="slide-bar"
            htmlFor="scale"
            style={{
              display: "block",
              marginBottom: "5px",
              textAlign: "left",
            }}
          >
            <div style={{ fontSize: "10px" }}>
              {step.label[0] + " "}
              <input
                type="range"
                name={step.name}
                min="0"
                max="1"
                step="0.1"
                value={Number(formData[step.name])}
                onChange={handleChange}
                style={{
                  height: "20px",
                  backgroundColor: "blue",
                }}
              />
              {" " + step.label[1]}
            </div>
          </label>
        </>
      );
    }
    return (
      <>
        <label
          htmlFor={inputId}
          style={{
            display: "block",
            marginBottom: "5px",
            textAlign: "left",
          }}
        >
          {step.label}
        </label>
        <input
          type={step.type}
          name={step.name}
          value={formData[step.name]}
          onChange={handleChange}
          style={{
            ...sharedInputStyle,
          }}
        />
      </>
    );
  };
  const progress = ((currentStep + 1) / questions.length) * 100;
  return (
    <div
      style={{
        textAlign: "center",
        width: "100%",
        overflowX: "hidden",
        minWidth: "300px",
        display: "flex",
        justifyContent: "center", // 横方向の中央揃え
        alignItems: "center", // 縦方向の中央揃え
        height: "100dvh", // ビューポート全体の高さ
        position: "relative", // 子要素を絶対位置で配置可能
      }}
    >
      {/* 戻るボタン（左上に固定） */}
      <button
        onClick={handleBack}
        disabled={currentStep === 0}
        style={{
          position: "absolute",
          top: "2.5%",
          left: "1%",
          padding: "10px",
          backgroundColor: "#6AAADE",
          color: "white",
          border: "none",
          borderRadius: "5px",
          fontSize: "16px",
          cursor: currentStep === 0 ? "not-allowed" : "pointer",
        }}
      >
        戻る
      </button>

      {/* プログレスバー */}
      <div
        style={{
          marginBottom: "20px",
          width: "80%",
          position: "absolute",
          top: "5%",
          left: "20%",
          height: "15px",
        }}
      >
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

      {/* 質問と説明 */}

      <div
        style={{
          position: "absolute",
          top: "12%",
          width: "100%",
          maxWidth: "500px",
          minWidth: "200px",
          minHeight: "100px",
          padding: "20px",
          textAlign: "center",
          backgroundColor: "#fff",
          borderRadius: "8px",
          boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
        }}
      >
        <p
          style={{
            fontSize: "16px",
            fontWeight: "bold",
            textAlign: "center",
            margin: "0 auto", // 中央揃え
            width: "100%", // 親幅に合わせる
            wordWrap: "break-word", // 長い単語を折り返し
            whiteSpace: "normal", // 折り返し有効化
            overflow: "hidden", // オーバーフロー防止
            //textOverflow: "ellipsis", // 長すぎる場合に省略
            //backgroundColor: "blue",
          }}
        >
          {`${questions[currentStep].characterMainMessage}`}
        </p>
        <p
          style={{
            fontSize: "14px",
            color: "#555",
            textAlign: "center",
            margin: "10px auto 0", // 上に余白を追加
            width: "100%", // 親幅に合わせる
            wordWrap: "break-word",
            whiteSpace: "normal",
          }}
        >
          {questions[currentStep].characterSubMessage}
        </p>
      </div>

      {/* イラスト */}
      <img
        src={"./images/dico.png"}
        alt="キャラクター"
        style={{
          width: "180px",
          height: "180px",
          marginBottom: "20px",
          position: "absolute",
          top: "25%",
        }}
      />

      {/* 入力 */}
      <div
        style={{
          position: "absolute",
          bottom: "40%",
          width: "90%",
          maxWidth: "500px",
          padding: "0px",
          textAlign: "center",
          overflowY: "visible",
        }}
      >
        {/* 質問の入力欄 */}
        {renderInput(questions[currentStep])}
      </div>
      {/* 次へボタン */}
      <button
        onClick={handleNext}
        style={{
          position: "absolute",
          bottom: "8%",
          left: "5%",
          width: "90%",
          padding: "10px",
          backgroundColor: "#6AAADE",
          color: "white",
          border: "none",
          borderRadius: "5px",
          fontSize: "16px",
          cursor: "pointer",
        }}
      >
        {currentStep === questions.length - 1 ? "完了" : "次へ"}
      </button>
    </div>
  );
}
