import React from 'react';

const ExtButton = ({ alldeleteCook, alldeleteDrink }) => {
  return (
    <div>
      <button onClick={alldeleteCook}>夕食予定の一括削除</button>
      <button onClick={alldeleteDrink}>飲み会予定の一括削除</button>
    </div>
  );
};

export default ExtButton;