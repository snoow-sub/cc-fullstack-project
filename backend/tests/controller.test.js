const chai = require("chai");
const chaiHttp = require("chai-http");
const sinon = require("sinon");
const expect = chai.expect;
const app = require("../server");
chai.should();

chai.use(chaiHttp);

describe("Health Check", () => {
  it("リクエストが不正な場合、ステータスコード500を返す", async () => {
    const res = await chai.request(app).post("/api/user");
    res.should.have.status(500);
  });
  it("リクエストが正しい場合、データを登録し、ステータスコード201を返す", async () => {
    const res = await chai.request(app).post("/api/user").send({
      name: "山田 太郎",
      sex: 1, // 未入力（フロント側で制御する値）
      birthday: "2012-07-10",
      address: "京都府京都市左京区",
      hobby: "山登り", // 趣味（選択）
      location: "関東",
    });
    res.should.have.status(201);
    console.log(JSON.parse(res.text));
  });
  it("アクセスされたときステータスコード200を返す", async () => {
    const res = await chai.request(app).get("/api/user/1/lesson");
    res.should.have.status(200);
  });
  it("アクセスされたとき5件の講習データをリストで返す", async () => {
    const res = await chai.request(app).get("/api/user/1/lesson");
    //console.log(JSON.parse(res.text));
    expect(JSON.parse(res.text)).to.have.lengthOf(5);
    res.should.have.status(200);
  });
});
