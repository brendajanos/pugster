import { getClient } from "../db";
enum Sex {
  Female,
  Male,
}

interface ILocation {
  lan: number;
  lon: number;
}

interface IPug {
  name: string;
  age: number;
  sex: Sex;
  location: ILocation;
}

async function createPug(pug: IPug): Promise<void> {
  const db = getClient().db("pugster");
  const pugs = db.collection<IPug>("pugs");
  await pugs.insertOne(pug);
}

export { createPug };
