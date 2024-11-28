const chai = require("chai");
const chaiHttp = require("chai-http");
const sinon = require("sinon");
const expect = chai.expect;
const app = require("../server");
chai.should();

chai.use(chaiHttp);
describe("APIテスト", () => {
  describe("POSTで/api/userにアクセスされたとき", () => {
    // input：name, sex, birthday, address
    // output：DBで発行されたユーザID
    describe("リクエストが不正な場合", () => {
      it("ステータスコード500を返す", async () => {
        const res = await chai.request(app).post("/api/user");
        res.should.have.status(500);
      });
    });
    describe("リクエストが正しい場合", () => {
      const postDataTemplate = {
        name: "福留 光帆",
        sex: 2,
        birthday: "2003-10-22",
        address: "兵庫県尼崎市",
      };
      it("ステータスコード201を返す", async () => {
        const res = await chai.request(app).post("/api/user").send(postDataTemplate);
        res.should.have.status(201);
      });
      it("userテーブルにデータを登録し、DBで発行されたユーザIDを返す", async () => {
        // const expectedOutput = { id: DBで発行されたuserid };
        const res = await chai.request(app).post("/api/user").send(postDataTemplate);
        res.should.have.status(201);
        const jsonParseRes = JSON.parse(res.text);
        jsonParseRes.should.have.property("id");
        jsonParseRes["id"].should.be.a("number");
      });
    });
  });

  describe("GETで/api/user/:user_id/lessonにアクセスされたとき", () => {
    // input：/api/user/:user_id/lesson?:location={string}&:startDate={string}&endDate={string}の形でアクセス
    // output：講習データ5件が入ったリスト
    it("5件の講習データをリストで返し、ステータスコード200を返す。locationあり", async () => {
      // const res = await chai.request(app).get("/api/user/1/lesson");
      const startDate = new Date("2024-11-30");
      const endDate = new Date("2024-12-01");
      const queryString = new URLSearchParams({
        location: "東京都",
        startDate: startDate.toISOString().split("T")[0], //"2024-12-01",
        endDate: endDate.toISOString().split("T")[0], //"2024-12-31",
      }).toString();
      const res = await chai.request(app).get(`/api/user/1/lesson?${queryString}`);

      // const expectedOutput = [
      //   {
      //     id: 1,
      //     store_id: 1,
      //     date: "2024-11-30T15:00:00.000Z",
      //     start_time: "10:00:00",
      //     end_time: "12:00:00",
      //     location: "関東",
      //     description: "初心者向けヨガレッスン",
      //     imagePath: "/images/lesson1.jpg",
      //     moviePath: "/movies/lesson1.mp4",
      //     review: 5,
      //     indicator: 85,
      //     momentum: 100,
      //   },
      //   {
      //     id: 3,
      //     store_id: 1,
      //     date: "2024-12-02T15:00:00.000Z",
      //     start_time: "18:00:00",
      //     end_time: "20:00:00",
      //     location: "関東",
      //     description: "上級者向けヨガレッスン",
      //     imagePath: "/images/lesson3.jpg",
      //     moviePath: "/movies/lesson3.mp4",
      //     review: 4,
      //     indicator: 92.1,
      //     momentum: null,
      //   },
      //   {
      //     id: 9,
      //     store_id: 1,
      //     date: "2024-12-08T15:00:00.000Z",
      //     start_time: "18:00:00",
      //     end_time: "20:00:00",
      //     location: "関東",
      //     description: "ナイトヨガ",
      //     imagePath: "/images/lesson9.jpg",
      //     moviePath: "/movies/lesson9.mp4",
      //     review: 4,
      //     indicator: 88,
      //     momentum: null,
      //   },
      //   {
      //     id: 12,
      //     store_id: 1,
      //     date: "2024-12-11T15:00:00.000Z",
      //     start_time: "15:00:00",
      //     end_time: "16:30:00",
      //     location: "関東",
      //     description: "上級ヨガクラス",
      //     imagePath: "/images/lesson12.jpg",
      //     moviePath: "/movies/lesson12.mp4",
      //     review: 5,
      //     indicator: 90,
      //     momentum: 100,
      //   },
      //   {
      //     id: 14,
      //     store_id: 1,
      //     date: "2024-12-13T15:00:00.000Z",
      //     start_time: "16:00:00",
      //     end_time: "17:30:00",
      //     location: "関東",
      //     description: "中級ヨガレッスン",
      //     imagePath: "/images/lesson14.jpg",
      //     moviePath: "/movies/lesson14.mp4",
      //     review: 5,
      //     indicator: 85,
      //     momentum: 110,
      //   },
      // ];
      expect(JSON.parse(res.text)).to.have.lengthOf(5);
      // JSON.parse(res.text).should.deep.equal(expectedOutput);
      res.should.have.status(200);
    });
    it("5件の講習データをリストで返し、ステータスコード200を返す。locationなし", async () => {
      // const res = await chai.request(app).get("/api/user/1/lesson");
      const startDate = new Date("2024-12-01");
      const endDate = new Date("2024-12-31");
      const queryString = new URLSearchParams({
        location: "特になし",
        startDate: startDate.toISOString().split("T")[0], //"2024-12-01",
        endDate: endDate.toISOString().split("T")[0], //"2024-12-31",
      }).toString();
      const res = await chai.request(app).get(`/api/user/1/lesson?${queryString}`);
      // input：
      // output：

      // const expectedOutput = [
      //   {
      //     id: 1,
      //     store_id: 1,
      //     date: "2024-11-30T15:00:00.000Z",
      //     start_time: "10:00:00",
      //     end_time: "12:00:00",
      //     location: "関東",
      //     description: "初心者向けヨガレッスン",
      //     imagePath: "/images/lesson1.jpg",
      //     moviePath: "/movies/lesson1.mp4",
      //     review: 5,
      //     indicator: 85,
      //     momentum: 100,
      //   },
      //   {
      //     id: 2,
      //     store_id: 2,
      //     date: "2024-12-01T15:00:00.000Z",
      //     start_time: "14:00:00",
      //     end_time: "15:30:00",
      //     location: "関西",
      //     description: "中級者向けピラティス",
      //     imagePath: "/images/lesson2.jpg",
      //     moviePath: "/movies/lesson2.mp4",
      //     review: null,
      //     indicator: 78.5,
      //     momentum: 75,
      //   },
      //   {
      //     id: 3,
      //     store_id: 1,
      //     date: "2024-12-02T15:00:00.000Z",
      //     start_time: "18:00:00",
      //     end_time: "20:00:00",
      //     location: "関東",
      //     description: "上級者向けヨガレッスン",
      //     imagePath: "/images/lesson3.jpg",
      //     moviePath: "/movies/lesson3.mp4",
      //     review: 4,
      //     indicator: 92.1,
      //     momentum: null,
      //   },
      //   {
      //     id: 4,
      //     store_id: 2,
      //     date: "2024-12-03T15:00:00.000Z",
      //     start_time: "09:00:00",
      //     end_time: "10:30:00",
      //     location: "関西",
      //     description: "モーニングストレッチ",
      //     imagePath: "/images/lesson4.jpg",
      //     moviePath: "/movies/lesson4.mp4",
      //     review: 3,
      //     indicator: 70.2,
      //     momentum: 60,
      //   },
      //   {
      //     id: 5,
      //     store_id: 3,
      //     date: "2024-12-04T15:00:00.000Z",
      //     start_time: "11:00:00",
      //     end_time: "12:30:00",
      //     location: "関西",
      //     description: "初心者向けリラクゼーションヨガ",
      //     imagePath: "/images/lesson5.jpg",
      //     moviePath: "/movies/lesson5.mp4",
      //     review: 5,
      //     indicator: 88.7,
      //     momentum: 120,
      //   },
      // ];
      expect(JSON.parse(res.text)).to.have.lengthOf(5);
      // JSON.parse(res.text).should.deep.equal(expectedOutput);
      res.should.have.status(200);
    });
  });

  describe("GETで/api/lesson/popularにアクセスされたとき", () => {
    // input：/api/lesson/popular?:location={string}&:startDate={string}&endDate={string}の形でのアクセス
    // output：講習データ3件が入ったリスト
    it("3件の講習データをリストで返し、ステータスコード200を返す。locationあり", async () => {
      // const res = await chai.request(app).get("/api/user/1/lesson");
      const startDate = new Date("2024-11-30");
      const endDate = new Date("2024-12-06");
      const queryString = new URLSearchParams({
        location: "東京都",
        startDate: startDate.toISOString().split("T")[0], //"2024-12-01",
        endDate: endDate.toISOString().split("T")[0], //"2024-12-31",
      }).toString();
      const res = await chai.request(app).get(`/api/lesson/popular?${queryString}`);
      const expectedOutput = [
        {
          id: 8,
          store_id: 3,
          title: "夜ヨガセッション",
          date: "2024-11-30T15:00:00.000Z",
          start_time: "19:00:00",
          end_time: "20:30:00",
          location: "東京都",
          description: "リラックスした夜のヨガで一日の疲れを癒します。",
          imagePath: [
            "https://discoveru-s3.s3.us-east-1.amazonaws.com/008_1.png",
            "https://discoveru-s3.s3.us-east-1.amazonaws.com/008_2.png",
          ],
          movie_id: ["Z5uaxJBUGeM"],
          review: 4.9,
          indicator: 92.5,
        },
        {
          id: 7,
          store_id: 2,
          title: "リフレッシュヨガ",
          date: "2024-11-30T15:00:00.000Z",
          start_time: "16:00:00",
          end_time: "18:00:00",
          location: "東京都",
          description: "心身をリフレッシュさせるヨガセッションです。",
          imagePath: [
            "https://discoveru-s3.s3.us-east-1.amazonaws.com/007_1.png",
            "https://discoveru-s3.s3.us-east-1.amazonaws.com/007_2.png",
          ],
          movie_id: ["yPX0p3qtGg4"],
          review: 4.8,
          indicator: 88.5,
        },
        {
          id: 9,
          store_id: 1,
          title: "英会話教室",
          date: "2024-11-30T15:00:00.000Z",
          start_time: "15:00:00",
          end_time: "16:30:00",
          location: "東京都",
          description: "初心者向け英会話教室で日常会話を学びます。",
          imagePath: [
            "https://discoveru-s3.s3.us-east-1.amazonaws.com/009_1.png",
            "https://discoveru-s3.s3.us-east-1.amazonaws.com/009_2.png",
          ],
          movie_id: ["GSTjkeEXdsA"],
          review: 4.7,
          indicator: 80.0,
        },
      ];
      expect(JSON.parse(res.text)).to.have.lengthOf(3);
      JSON.parse(res.text).should.deep.equal(expectedOutput);
      res.should.have.status(200);
    });
    it("3件の講習データをリストで返し、ステータスコード200を返す。locationなし", async () => {
      // const res = await chai.request(app).get("/api/user/1/lesson");
      const startDate = new Date("2024-11-30");
      const endDate = new Date("2024-12-06");
      const queryString = new URLSearchParams({
        location: "特になし",
        startDate: startDate.toISOString().split("T")[0], //"2024-12-01",
        endDate: endDate.toISOString().split("T")[0], //"2024-12-31",
      }).toString();
      const res = await chai.request(app).get(`/api/lesson/popular?${queryString}`);
      const expectedOutput = [
        {
          id: 8,
          store_id: 3,
          title: "夜ヨガセッション",
          date: "2024-11-30T15:00:00.000Z",
          start_time: "19:00:00",
          end_time: "20:30:00",
          location: "東京都",
          description: "リラックスした夜のヨガで一日の疲れを癒します。",
          imagePath: [
            "https://discoveru-s3.s3.us-east-1.amazonaws.com/008_1.png",
            "https://discoveru-s3.s3.us-east-1.amazonaws.com/008_2.png",
          ],
          movie_id: ["Z5uaxJBUGeM"],
          review: 4.9,
          indicator: 92.5,
        },
        {
          id: 7,
          store_id: 2,
          title: "リフレッシュヨガ",
          date: "2024-11-30T15:00:00.000Z",
          start_time: "16:00:00",
          end_time: "18:00:00",
          location: "東京都",
          description: "心身をリフレッシュさせるヨガセッションです。",
          imagePath: [
            "https://discoveru-s3.s3.us-east-1.amazonaws.com/007_1.png",
            "https://discoveru-s3.s3.us-east-1.amazonaws.com/007_2.png",
          ],
          movie_id: ["yPX0p3qtGg4"],
          review: 4.8,
          indicator: 88.5,
        },
        {
          id: 14,
          store_id: 3,
          title: "初心者向けボルダリング",
          date: "2024-12-05T15:00:00.000Z",
          start_time: "10:00:00",
          end_time: "12:30:00",
          location: "千葉県",
          description: "初心者向けのボルダリングクラスで体を動かし、楽しみます。",
          imagePath: ["/images/bouldering1.jpg"],
          movie_id: ["kND5qMSarZg"],
          review: 4.8,
          indicator: 90.0,
        },
      ];
      expect(JSON.parse(res.text)).to.have.lengthOf(3);
      JSON.parse(res.text).should.deep.equal(expectedOutput);
      res.should.have.status(200);
    });
  });

  describe("GETで/api/questionにアクセスされたとき", () => {
    // input：なし
    // output：質問事項一覧が入ったリスト
    it("質問一覧を返し、ステータスコード200を返す", async () => {
      const expectedOutput = [
        { id: 1, content: "inoutdoor" },
        { id: 2, content: "scale" },
        { id: 3, content: "distance" },
        { id: 4, content: "silent" },
        { id: 5, content: "momentum" },
      ];
      const res = await chai.request(app).get("/api/question");
      JSON.parse(res.text).should.deep.equal(expectedOutput);
      res.should.have.status(200);
    });
  });

  describe("POSTで/api/recommendにアクセスされたとき", () => {
    // input：user_id, lesson_id, like
    // output：DBで発行されたID
    describe("リクエストが不正な場合", () => {
      it("ステータスコード500を返す", async () => {
        const res = await chai.request(app).post("/api/recommend");
        res.should.have.status(500);
      });
    });

    describe("リクエストが正しい場合", () => {
      const postDataTemplate = {
        user_id: 1,
        lesson_id: 4,
        like: 1.0,
      };
      it("ステータスコード201を返す", async () => {
        const res = await chai.request(app).post("/api/recommend").send(postDataTemplate);
        res.should.have.status(201);
      });
    });
  });

  describe("POSTで/api/user_answerにアクセスされたとき", () => {
    // input：question_id, answer
    // output：DBで発行されたIDのリスト
    describe("リクエストが不正な場合", () => {
      it("ステータスコード500を返す", async () => {
        const res = await chai.request(app).post("/api/user_answer");
        res.should.have.status(500);
      });
    });

    describe("リクエストが正しい場合", () => {
      const postDataTemplate = {
        user_id: 10,
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
          {
            question_id: 5,
            answer: 0.1,
          },
        ],
      };
      it("ステータスコード201を返す", async () => {
        const res = await chai.request(app).post("/api/user_answer").send(postDataTemplate);
        res.should.have.status(201);
      });
    });
  });

  describe("POSTで/api/reservationにアクセスされたとき", () => {
    // input：user_id, lesson_id
    // output：DBで発行されたID
    describe("リクエストが不正な場合", () => {
      it("ステータスコード500を返す", async () => {
        const res = await chai.request(app).post("/api/reservation");
        res.should.have.status(500);
      });
    });
    describe("リクエストが正しい場合", () => {
      const postDataTemplate = {
        user_id: "2",
        lesson_id: "7",
      };
      it("ステータスコード201を返す", async () => {
        const res = await chai.request(app).post("/api/reservation").send(postDataTemplate);
        res.should.have.status(201);
      });
      it("reservationテーブルにデータを登録し、DBで発行された予約IDを返す", async () => {
        // const expectedOutput = { id: DBで発行されたuserid };
        const res = await chai.request(app).post("/api/reservation").send(postDataTemplate);
        res.should.have.status(201);
        const jsonParseRes = JSON.parse(res.text);
        jsonParseRes.should.have.property("id");
        jsonParseRes["id"].should.be.a("number");
      });
    });
  });

  describe("POSTで/api/lessonにアクセスされたとき", () => {
    // input：↓のpostDataTemplateの形
    // output：DBで発行されたID
    describe("リクエストが不正な場合", () => {
      it("ステータスコード500を返す", async () => {
        const res = await chai.request(app).post("/api/lesson");
        res.should.have.status(500);
      });
    });
    describe("リクエストが正しい場合", () => {
      const postDataTemplate = {
        store: {
          address: "東京都千代田区丸の内1-1",
          info: "家族経営の小さな本屋。温かい雰囲気が特徴。",
          certification: true,
          name: "丸の内書店",
        },
        lesson: {
          title: "ポーカー体験クラス",
          date: "2024-12-10",
          start_time: "10:00:00",
          end_time: "12:00:00",
          location: "千葉県",
          description: "ポーカーをやってみたい方はぜひ。",
          imagePath: ["/images/lesson21.jpg"],
          movie_id: ["2Ubyv9FbphM"],
          review: null,
          indicator: 85.0,
        },
        lesson_answer: [
          {
            question_id: 1,
            answer: 0.3,
          },
          {
            question_id: 2,
            answer: 0.5,
          },
          {
            question_id: 3,
            answer: 0.7,
          },
          {
            question_id: 4,
            answer: 0.4,
          },
          {
            question_id: 5,
            answer: 0.1,
          },
        ],
      };
      it("ステータスコード201を返す", async () => {
        const res = await chai.request(app).post("/api/lesson").send(postDataTemplate);
        res.should.have.status(201);
      });
      it("lessonテーブルにデータを登録し、DBで発行されたレッスンIDを返す", async () => {
        // const expectedOutput = { id: DBで発行されたuserid };
        const res = await chai.request(app).post("/api/lesson").send(postDataTemplate);
        res.should.have.status(201);
        const jsonParseRes = JSON.parse(res.text);
        jsonParseRes.should.have.property("id");
        jsonParseRes["id"].should.be.a("number");
      });
    });
  });
});

describe("GETで/api/lesson/:lesson_id/reservationsにアクセスされたとき", () => {
  // input：/api/lesson/:lesson_id/reservationsの形でのアクセス
  // output：↓のexpectedOutputの形のアウトプット
  it("予約人数を返し、ステータスコード200を返す", async () => {
    const expectedOutput = {
      lessonInfo: {
        id: 2,
        store_id: 2,
        date: "2024-12-01T15:00:00.000Z",
        start_time: "14:00:00",
        end_time: "15:30:00",
        location: "関西",
        description: "中級者向けピラティス",
        imagePath: "/images/lesson2.jpg",
        movie_id: "/movies/lesson2.mp4",
        review: null,
        indicator: 78.5,
      },
      participantList: [
        { reservationId: 2, userId: 2, userName: "佐藤 花子" },
        { reservationId: 4, userId: 1, userName: "山田 太郎" },
      ],
    };
    const res = await chai.request(app).get("/api/lesson/2/reservations");

    // JSON.parse(res.text).should.deep.equal(expectedOutput);
    res.should.have.status(200);
    // const jsonParseRes = JSON.parse(res.text);
    // jsonParseRes.should.have.property("id");
    // jsonParseRes["id"].should.be.a("number");
  });
});
