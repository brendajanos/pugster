import { Request, Response } from "express";
import * as pugService from "../services/pugs.service";
import * as validationService from "../services/validation.service";

const pugSchema = {
  type: "object",
  properties: {
    name: {
      type: "string",
    },
    age: {
      type: "number",
      minimum: 0,
      maximum: 30,
    },
    sex: {
      type: "string",
      enum: ["female", "male"],
    },
    location: {
      type: "object",
      properties: {
        lon: {
          type: "number",
        },
        lat: {
          type: "number",
        },
      },
      additionalProperties: false,
    },
  },
  additionalProperties: false,
};

async function getAllPugs(req: Request, res: Response): Promise<void> {
  const pugs = await pugService.getAllPugs();
  res.json(pugs);
}

async function createPug(req: Request, res: Response): Promise<void> {
  const isvalid = validationService.validate(pugSchema, req.body);
  if (!isvalid) {
    res.status(400).json({ ok: false });
    return;
  }
  await pugService.createPug(req.body);
  res.status(201).json({ ok: true });
}

export { getAllPugs, createPug };
