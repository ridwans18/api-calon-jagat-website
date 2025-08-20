import { Router } from "express";
import {
  reportMonthController,
  reportWeekController,
  reportDailyController,
} from "../controller/report.controller.js";

const reportrouter = Router();

reportrouter.get("/month", reportMonthController);
reportrouter.get("/week", reportWeekController);
reportrouter.get("/daily", reportDailyController);

export default reportrouter;
