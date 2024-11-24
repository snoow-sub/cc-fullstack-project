import React from "react";
import YouTube from "react-youtube";
import "../css/youtubePlayer.css";

export function YoutuvePlayer({ youtubeVideoId }) {
  const videoOptions = {
    height: "350",
    width: "400",
    playerVars: {
      autoplay: 1, // 自動再生用
      loop: 1, // ループ再生
      playlist: youtubeVideoId, // ループ再生用動画ID
      modestbranding: 1, // YouTubeロゴ非表示
      rel: 0, // 関連動画を非表示
      controls: 0, // プレイヤーコントロールを非表示
      disablekb: 1, // キーボード操作無効
      mute: 1, // ミュート状態で開始（ブラウザ制限対応）
    },
  };

  const onPlayerReady = (event) => {
    event.target.playVideo();
  };

  return (
    <div>
      <h1>React YouTube Container</h1>
      <div className="video-container">
        <YouTube
          videoId={youtubeVideoId}
          opts={videoOptions}
          onReady={onPlayerReady}
        />
        <div className="overlay"></div>
      </div>
    </div>
  );
}

export default YoutuvePlayer;
