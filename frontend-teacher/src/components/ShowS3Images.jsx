import { useState } from "react";
import React from "react";

export function ShowS3Images() {
  const [fileName, setFileName] = useState("");
  const [fileURL, setFileURL] = useState("");
  const [imageContent, setImageContent] = useState(null);

  const handleFileNameChange = (e) => {
    setFileName(e.target.value);
  };

  const handleFetch = () => {
    if (!fileName) {
      alert("画像ファイル名を入力してください (例: example.jpg)");
      return;
    }

    const bucketName = "discoveru-s3";
    const region = "us-east-1";
    const fileURL = `https://${bucketName}.s3.${region}.amazonaws.com/${fileName}`;

    // 画像URLをセットし、画像を表示
    setFileURL(fileURL);
    setImageContent(<img src={fileURL} alt={fileName} style={{ maxWidth: "100%", maxHeight: "500px" }} />);
  };

  return (
    <div>
      <h1>S3 画像表示</h1>
      <input
        type="text"
        placeholder="画像ファイル名を入力 (例: example.jpg)"
        value={fileName}
        onChange={handleFileNameChange}
      />
      <button onClick={handleFetch}>画像取得</button>
      {fileURL && (
        <div>
          <p>
            画像URL:
            <a href={fileURL} target="_blank" rel="noopener noreferrer">
              {fileURL}
            </a>
          </p>
          <div>{imageContent}</div>
        </div>
      )}
    </div>
  );
}
