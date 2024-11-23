const chai = require("chai");
const chaiHttp = require("chai-http");
const sinon = require("sinon");
const expect = chai.expect;
const app = require("../server");
chai.should();

chai.use(chaiHttp);
describe("APIテスト", () => {
  describe("POSTで/api/userにアクセスされたとき", () => {
    describe("リクエストが不正な場合", () => {
      it("ステータスコード500を返す", async () => {
        const res = await chai.request(app).post("/api/user");
        res.should.have.status(500);
      });
    });
    describe("リクエストが正しい場合", () => {
      const postDataTemplate = {
        name: "山田 太郎",
        birthday: "1975-04-25",
        sex: 1,
        address: "京都府京都市左京区",
        hobby: "山登り",
        location: "関東",
      };
      it("ステータスコード201を返す", async () => {
        const res = await chai
          .request(app)
          .post("/api/user")
          .send(postDataTemplate);
        res.should.have.status(201);
      });
      it("userテーブルにデータを登録し、DBで発行されたユーザIDを返す", async () => {
        // const expectedOutput = { id: DBで発行されたuserid };
        const res = await chai
          .request(app)
          .post("/api/user")
          .send(postDataTemplate);
        res.should.have.status(201);
        const jsonParseRes = JSON.parse(res.text);
        jsonParseRes.should.have.property("id");
        jsonParseRes["id"].should.be.a("number");
      });
    });
  });

  describe("GETで/api/user/:user_id/lessonにアクセスされたとき", () => {
    it("5件の講習データをリストで返し、ステータスコード200を返す", async () => {
      const res = await chai.request(app).get("/api/user/1/lesson");
      const expectedOutput = [
        {
          id: 1,
          store_id: 1,
          date: "2024-11-30T15:00:00.000Z",
          start_time: "10:00:00",
          end_time: "12:00:00",
          location: "関東",
          description: "初心者向けヨガレッスン",
          imagePath: "/images/lesson1.jpg",
          moviePath: "/movies/lesson1.mp4",
          review: 5,
          indicator: 85,
          momentum: 100,
        },
        {
          id: 3,
          store_id: 1,
          date: "2024-12-02T15:00:00.000Z",
          start_time: "18:00:00",
          end_time: "20:00:00",
          location: "関東",
          description: "上級者向けヨガレッスン",
          imagePath: "/images/lesson3.jpg",
          moviePath: "/movies/lesson3.mp4",
          review: 4,
          indicator: 92.1,
          momentum: null,
        },
        {
          id: 9,
          store_id: 1,
          date: "2024-12-08T15:00:00.000Z",
          start_time: "18:00:00",
          end_time: "20:00:00",
          location: "関東",
          description: "ナイトヨガ",
          imagePath: "/images/lesson9.jpg",
          moviePath: "/movies/lesson9.mp4",
          review: 4,
          indicator: 88,
          momentum: null,
        },
        {
          id: 12,
          store_id: 1,
          date: "2024-12-11T15:00:00.000Z",
          start_time: "15:00:00",
          end_time: "16:30:00",
          location: "関東",
          description: "上級ヨガクラス",
          imagePath: "/images/lesson12.jpg",
          moviePath: "/movies/lesson12.mp4",
          review: 5,
          indicator: 90,
          momentum: 100,
        },
        {
          id: 14,
          store_id: 1,
          date: "2024-12-13T15:00:00.000Z",
          start_time: "16:00:00",
          end_time: "17:30:00",
          location: "関東",
          description: "中級ヨガレッスン",
          imagePath: "/images/lesson14.jpg",
          moviePath: "/movies/lesson14.mp4",
          review: 5,
          indicator: 85,
          momentum: 110,
        },
      ];
      expect(JSON.parse(res.text)).to.have.lengthOf(5);
      JSON.parse(res.text).should.deep.equal(expectedOutput);
      res.should.have.status(200);
    });
  });

  describe("GETで/api/questionにアクセスされたとき", () => {
    it("質問一覧を返し、ステータスコード200を返す", async () => {
      const expectedOutput = [
        { id: 1, content: "inoutdoor" },
        { id: 2, content: "scale" },
        { id: 3, content: "distance" },
        { id: 4, content: "silent" },
      ];
      const res = await chai.request(app).get("/api/question");
      JSON.parse(res.text).should.deep.equal(expectedOutput);
      res.should.have.status(200);
    });
  });

  describe("POSTで/api/reccomendにアクセスされたとき", () => {
    describe("リクエストが不正な場合", () => {
      it("ステータスコード500を返す", async () => {
        const res = await chai.request(app).post("/api/recommend");
        res.should.have.status(500);
      });
    });

    describe("リクエストが正しい場合", () => {
      const postDataTemplate = {
        user_id: 1,
        lesson_id: 1,
        like: 1.0,
      };
      it("ステータスコード201を返す", async () => {
        const res = await chai
          .request(app)
          .post("/api/recommend")
          .send(postDataTemplate);
        res.should.have.status(201);
      });
    });
  });

  describe("POSTで/api/user_answerにアクセスされたとき", () => {
    describe("リクエストが不正な場合", () => {
      it("ステータスコード500を返す", async () => {
        const res = await chai.request(app).post("/api/user_answer");
        res.should.have.status(500);
      });
    });

    describe("リクエストが正しい場合", () => {
      const postDataTemplate = {
        user_id: 1,
        user_answer: [
          {
            question_id: 1,
            answer: 0.9,
          },
          {
            question_id: 2,
            answer: 0.7,
          },
          {
            question_id: 3,
            answer: 0.3,
          },
          {
            question_id: 4,
            answer: 0.4,
          },
        ],
      };
      it("ステータスコード201を返す", async () => {
        const res = await chai
          .request(app)
          .post("/api/user_answer")
          .send(postDataTemplate);
        res.should.have.status(201);
      });
    });
  });
});
