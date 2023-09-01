import express from "express";
import morgan from "morgan";
import cors from "cors";
import Tour from "./db/models/Tour";
import Travel from "./db/models/Travel";

export const createServer = () => {
  const app = express();
  app
    .disable("x-powered-by")
    .use(morgan("dev"))
    .use(express.urlencoded({ extended: true }))
    .use(express.json())
    .use(cors());

  app.get("/healthz", (req, res) => {
    return res.json({ ok: true, environment: process.env.NODE_ENV });
  });

  app.get("/message/:name", (req, res) => {
    return res.json({ message: `hello ${req.params.name}` });
  });

  app.post("/api/travels", async (req, res) => {
    const travel = await Travel.create(req.body);
    return res.status(201).json(travel);
  });

  app.post("/api/travels/:id/tours", async (req, res) => {
    const data = { travel_id: req.params.id, ...req.body };
    const tour = await Tour.create(data);
    return res.status(201).json(tour);
  });

  app.get("/api/travels", async (req, res) => {
    const travels = await Tour.findAll({ include: [Tour] });
    return res.status(200).json(travels);
  });

  return app;
};
