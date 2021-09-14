import app from "../src/app";
import supertest from "supertest";
import { MongoClient, ObjectId } from "mongodb";
import { IPug } from "../src/interfaces/pug";
jest.mock("../src/db"); // this happens automatically with automocking
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { getClient } = require("../src/db");

jest.setTimeout(5000);

describe("Pug routes", () => {
  let client: MongoClient;
  beforeAll(async () => {
    client = await MongoClient.connect(process.env.MONGO_URL as string);
    getClient.mockImplementation(() => client);
  });

  afterAll(async () => {
    await client.close();
  });

  test("GET /pugs", (done) => {
    supertest(app)
      .get("/pugs")
      .expect(200)
      .expect("Content-Type", /json/)
      .then((res) => {
        expect(res.body).toStrictEqual([]);
        done();
      });
  });

  test("GET /pugs", (done) => {
    const pug : IPug = {
      name: "Pedro",
      age: 3,
      sex: "male",
      location: {
        lon: 47.504402,
        lat: 20.034805,
      },
    };

    const returnPug: IPug&{_id:string} = {
      _id: "613f2545cd5c49955e2a31c7",
      ...pug

    }

    const dbPug : IPug&{_id:ObjectId} = {
      _id: ObjectId.createFromHexString("613f2545cd5c49955e2a31c7"),
      ...pug
    }
    const db = client.db("pugster");
    const pugs = db.collection<IPug>("pugs");
    pugs.insertOne(dbPug).then(() => {
      supertest(app)
        .get("/pugs")
        .expect(200)
        .expect("Content-Type", /json/)
        .then((res) => {
          expect(res.body).toStrictEqual([returnPug]);
          done();
        });
    });
  });

  test("POST /pugs", (done) => {
    const pug = {
      name: "Julcsi",
      age: 3,
      sex: "female",
      location: {
        lon: 47.504402,
        lat: 20.034805,
      },
    };
    supertest(app)
      .post("/pugs")
      .send(pug)
      .expect(201)
      .expect("Content-Type", /json/)
      .then((res) => {
        expect(res.body).toStrictEqual({ ok: true });
        done();
      });
  });
});
