import { getClient } from "../db";
import { IPug } from "../interfaces/pug";

async function getAllPugs(): Promise<IPug[]> {
  const db = getClient().db("pugster");
  const pugs = db.collection<IPug>("pugs");
  return await pugs.find().toArray();
}

async function createPug(pug: IPug): Promise<void> {
  const db = getClient().db("pugster");
  const pugs = db.collection<IPug>("pugs");
  await pugs.insertOne(pug);
}

export { createPug, getAllPugs };
