import React from "react";
import "../css/multiStepUserInput.css"; // 必要に応じてCSSファイルを調整してください

export function ProgressToSwipe({ profile, lesson, startDate, endDate, onComplete }) {
  // console.log("ProgressToSwipeが表示されました", { profile, lesson, startDate, endDate }); // デバッグ用

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
      
      {/* メッセージ */}
      <div className="chat-container">
        <p className="chat-content">
          <span className="chat-main">
          よし、じゃあ早速レッスンを探そう！
          </span>
          <br />
          <span className="chat-secondary">
          どうやって探すか、説明したほうがいいかな？
          </span>
        </p>
      </div>

      {/* キャラクターの画像 */}
      <img
        src={"./images/dico.png"} // currentTouchに応じて画像を切り替え
        alt="キャラクター"
        className="character-image"
      />

      {/* ボタン */}
      <button
        onClick={handleNext}
        className="button-next"
      >
        レッスンを探す
      </button>
    </div>
  );
}
