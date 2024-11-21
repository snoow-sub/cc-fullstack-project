import React, { useState } from "react";
import "./ShowActivity.css";

export function ShowActivity({ profile, lesson }) {
  return (
    <>
      <div className="profile-info">
        <p className="greeting">Hello! {profile.name}さん</p>
        <p className="details">
          あなたの条件
          <br />
          年齢：{profile.age}
          <br />
          性別：{profile.gender}
        </p>
      </div>

      <div className="activity-box">
        <img className="activity-image" src="image/ike.png" alt="生け花" />
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
