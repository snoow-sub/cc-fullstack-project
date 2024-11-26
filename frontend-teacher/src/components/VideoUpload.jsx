import { useEffect, useState } from "react";
import React from "react";
import axios from "axios";

export function VideoUpload() {
  const [file, setFile] = useState(null);
  const [uploadURL, setUploadURL] = useState("");

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) {
      alert("ファイルを選択してください");
      return;
    }

    try {
      const bucketName = "discoveru-s3";
      const region = "us-east-1";
      const fileName = file.name;
      const uploadURL = `https://${bucketName}.s3.${region}.amazonaws.com/${fileName}`;

      // S3 に直接 PUT リクエストでファイルをアップロード
      const response = await axios.put(uploadURL, file, {
        headers: {
          "Content-Type": file.type,
        },
      });

      if (response.status === 200) {
        alert("アップロード成功！");
        setUploadURL(uploadURL);
      }
    } catch (error) {
      console.error("アップロードエラー:", error);
      alert("アップロードに失敗しました");
    }
  };

  return (
    <div>
      <h1>S3 公開バケット アップローダー</h1>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>アップロード</button>
      {uploadURL && (
        <div>
          <p>
            アップロードされたファイルのURL(こちらはメモしておいてください):
          </p>
          <a href={uploadURL} target="_blank" rel="noopener noreferrer">
            {uploadURL}
          </a>
        </div>
      )}
    </div>
  );
}
