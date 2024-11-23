import React, { useState } from "react";
import { useSwipeable } from "react-swipeable";
import "../css/swipe.css";

export function SwipeLessons({ profile, setFlick, handleSwipeType, lesson }) {
  const currentPath = process.env.REACT_APP_BASE_DIR;

  const handlers = useSwipeable({
    onSwipedLeft: () => {
      handleSwipeType("left");
      // setFlick(false);
      // console.log("呼ばれてますよ左");
      // setTimeout(() => {
      //   setFlick(true);
      //   handleSwipeType("なし");
      // }, 1000);
    },
    onSwipedRight: () => {
      handleSwipeType("right");
      setFlick(false);
      console.log("呼ばれてますよ右");
      // setTimeout(() => {
      //   setFlick(true); // 元に戻す
      //   handleSwipeType("なし");
      // }, 1000);
    },
  });

  return (
    <>
      <div className="profile-info">
        <p>{currentPath}</p>
        {/* <p className="greeting"></p>
        <p className="profile_details">
          Hello! {profile.name}さん
          <br />
          生年月日：{profile.birthday}
          <br />
          性別：{profile.sex}
        </p> */}
        <p className="set-calendar">検索日時: {profile.birthday}</p>
        <br />
      </div>

      <div className="activity-box" {...handlers}>
        <img
          className="activity-image"
          src="./image/ike.png"
          alt="生け花"
          {...handlers}
        />
        <div className="activity-details">
          <p>{profile.calendar}</p>
          <p>生け花教室</p>
          {/* <p>講座番号：{lesson[0][0].store_id}</p> */}
          <p>一緒に生け花で遊びませんか？</p>
          <p>
            簡単なキットをお送りしますので、当日はオンラインでご参加いただけます！
          </p>
          <p>興味がある方は一緒に生花について学びましょう！</p>
          <p>講師：Rena</p>
        </div>
      </div>
    </>
  );
}
