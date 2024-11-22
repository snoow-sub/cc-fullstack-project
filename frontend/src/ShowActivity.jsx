import React, { useState } from "react";
import { useSwipeable } from "react-swipeable";
import "./ShowActivity.css";

export function ShowActivity({ profile, setFlick, handleSwipeType, lesson }) {
  const handlers = useSwipeable({
    onSwipedLeft: () => {
      handleSwipeType("left");
      setFlick(false);
      console.log("呼ばれてますよ");
      setTimeout(() => {
        setFlick(true);
        handleSwipeType("なし");
      }, 1000);
    },
    onSwipedRight: () => {
      handleSwipeType("right");
      setFlick(false);
      console.log("呼ばれてますよ右");
      setTimeout(() => {
        setFlick(true); // 元に戻す
        handleSwipeType("なし");
      }, 1000);
    },
  });

  return (
    <>
      <div className="profile-info">
        <p className="greeting">Hello! {profile.name}さん</p>
        <p className="profile_details">
          あなたの条件
          <br />
          生年月日：{profile.birthday}
          <br />
          性別：{profile.sex}
        </p>
      </div>

      <div className="activity-box" {...handlers}>
        <img
          className="activity-image"
          src="image/ike.png"
          alt="生け花"
          {...handlers}
        />
        <div className="activity-details">
          <p>講座番号：{lesson[0][0].store_id}</p>
          <p>講座内容：一緒に生け花で遊びませんか</p>
          <p>講義時間：30分</p>
          <p>講義形態：オンライン(お家でできます)</p>
        </div>
      </div>
    </>
  );
}
