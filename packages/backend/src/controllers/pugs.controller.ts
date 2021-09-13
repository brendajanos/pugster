import { Request, Response } from "express";
import * as pugService from "../services/pugs.service";
import * as validationService from "../services/validation.service";

const pugSchema = {
  type : "object",
  properties: {
    name: {
      type: "string"
    },
    age: {
      type: "number"
    },
    sex: {
      type: "string",
      enum: ["female", "male"]
    },
    location: {
      type :"object",
      properties:{
        lon:{
          type:"number"
        },
        lat:{
          type:"number"
        }
      },
      additionalProperties: false
    }
  },
  additionalProperties: false

}

function getAllPugs(req: Request, res: Response): void {
  res.json([]);
}

async function createPug(req: Request, res: Response): Promise<void> {
  const isvalid = validationService.validate(pugSchema,req.body)
  if(!isvalid){
    res.json({ok:false}).status(400);
  }
  await pugService.createPug(req.body);
  res.json({ ok: true }).status(201);
}

export { getAllPugs, createPug };
