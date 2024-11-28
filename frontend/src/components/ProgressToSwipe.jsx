import React from "react";
import "../css/multiStepUserInput.css"; // 必要に応じてCSSファイルを調整してください

export function ProgressToSwipe({ profile, lesson, startDate, endDate, onComplete }) {
  console.log("ProgressToSwipeが表示されました", { profile, lesson, startDate, endDate }); // デバッグ用

  const handleNext = () => {
    // 次の画面に進むため、`inputDate`を`true`に設定
    onComplete(true);
  };

  return (
    <div
      style={{
        textAlign: "center",
        width: "100%",
        height: "100vh", // ビューポート全体の高さ
        display: "flex",
        flexDirection: "column",
        justifyContent: "center", // 縦方向の中央揃え
        alignItems: "center", // 横方向の中央揃え
        // backgroundColor: "#fdf5e6", // 背景色（例: クリーム色）
      }}
    >
      {/* キャラクターの画像 */}
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
      <br />
      <br />
      {/* メッセージ */}
      <p
        style={{
          fontSize: "18px",
          fontWeight: "bold",
          color: "#333",
          margin: "10px 0",
          textAlign: "center",
          lineHeight: "1.5",
        }}
      >
        よし、じゃあ早速レッスンを探そう！
      </p>
      <p
        style={{
          fontSize: "14px",
          color: "#555",
          textAlign: "center",
          marginBottom: "30px",
        }}
      >
        どうやって探すか、説明したほうがいいかな？
      </p>

      {/* ボタン */}
      <button
        onClick={handleNext}
        style={{
          width: "200px",
          padding: "10px",
          backgroundColor: "#f39867", // ボタンの色
          color: "white",
          border: "none",
          borderRadius: "5px",
          fontSize: "16px",
          cursor: "pointer",
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)", // 軽いシャドウ
        }}
      >
        レッスンを探す
      </button>
    </div>
  );
}
