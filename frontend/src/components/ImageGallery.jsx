import React, { useRef, useEffect, useState } from "react";
import "../css/multiStepUserInput.css";
import "../css/imageGallery.css";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import YouTube from "react-youtube";

// https://www.npmjs.com/package/react-alice-carousel
export function ImageGallery({ imgPaths, youtubeIds, disableButtons }) {
  const carouselRef = useRef(null);
  const youtubePlayers = useRef({});
  const autoPlayIntervalParam = 4000; //ms

  const imageItems = imgPaths.map((imgPath, index) => (
    <div key={`image-${index}`} className="galleryItems">
      <img
        src={imgPath}
        alt={`image${index + 1}`}
        style={{ maxWidth: "100%", maxHeight: "100%" }}
      />
    </div>
  ));

  const youtubeItems = youtubeIds.map((videoId, index) => (
    <div key={`youtube-${index}`} className="galleryItems">
      <YouTube
        videoId={videoId}
        opts={{
          height: "180",
          width: "280",
          playerVars: {
            playlist: videoId,
            autoplay: 1,
            controls: 0,
            modestbranding: 1,
            rel: 0,
            loop: 1, // ループ再生
          },
        }}
        onReady={(event) => {
          youtubePlayers.current[videoId] = event.target;
          event.target.mute(); // 音声をミュート
        }}
        style={{
          pointerEvents: "none", // クリック操作を無効化
        }}
      />
    </div>
  ));

  const items = [...imageItems, ...youtubeItems];

  const handleNext = () => {
    carouselRef.current.slideNext();
  };

  const handlePrev = () => {
    carouselRef.current.slidePrev();
  };

  return (
    <>
      <div className="imageGallery" style={{ width: "100%" }}>
        <AliceCarousel
          ref={carouselRef}
          items={items}
          autoWidth={false} // 自動幅計算を無効化（初回ロード時画面サイズがうまく取得できないため）
          responsive={{
            0: { items: 1 },
            1024: { items: 3 },
          }}
          autoPlay={true}
          infinite={true}
          swipeDisabled={true}
          autoPlayInterval={autoPlayIntervalParam}
          animationDuration={800}
          disableButtonsControls={true}
          disableDotsControls={false}
        />
      </div>
      {!disableButtons ? (
        <div className="prevAndNextButtonArea">
          <button className="prevAndNextButton prevButton" onClick={handlePrev}>
            ＜
          </button>
          <button className="prevAndNextButton nextButton" onClick={handleNext}>
            ＞
          </button>
        </div>
      ) : (
        <></>
      )}
    </>
  );
}
