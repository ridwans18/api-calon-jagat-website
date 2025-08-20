import {
  getReportMonth,
  getReportWeek,
  getReportDaily,
  getReportPorduct,
  getTotalPaidTransaction,
} from "../models/report.models.js";

export const reportMonthController = async (req, res) => {
  try {
    const [result] = await getReportMonth();
    const [report_product] = await getReportPorduct();
    const [total_paid] = await getTotalPaidTransaction();

    res.json({
      success: true,
      message: "Laporan bulanan berhasil diambil",
      data: result,
      report_product: report_product,
      total_paid_transaction: total_paid.jumlah_transaksi_paid,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const reportWeekController = async (req, res) => {
  try {
    const [result] = await getReportWeek();
    res.json({
      success: true,
      message: "Laporan mingguan berhasil diambil",
      data: result[0],
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const reportDailyController = async (req, res) => {
  try {
    const [result] = await getReportDaily();
    res.json({
      success: true,
      message: "Laporan pemasukan hari ini",
      data: result[0],
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const reportProduct = async (req, res) => {
  try {
    const [result] = await getReportPorduct();
    res.json({
      success: true,
      message: "Laporan pemasukan hari ini",
      data: result[0],
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
