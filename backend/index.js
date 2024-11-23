const app = require("./server");
const cors = require("cors");
const port = 3000;

// const port = process.env.PORT || 3001;
app.set("port", port);

app.get("/", (req, res) => {
  res.send("Welcome to the server!");
});

// CORSミドルウェアを使用
app.use(cors());

// サーバースタート
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
