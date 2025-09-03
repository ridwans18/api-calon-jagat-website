import { Router } from "express";
import {
  reportMonthController,
  reportWeekController,
  reportDailyController,
  generateExcell,
} from "../controller/report.controller.js";

const reportrouter = Router();

reportrouter.get("/month", reportMonthController);
reportrouter.get("/week", reportWeekController);
reportrouter.get("/daily", reportDailyController);
reportrouter.get("/excell", generateExcell);

export default reportrouter;
