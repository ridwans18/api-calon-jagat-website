import {
  getReportMonth,
  getReportWeek,
  getReportDaily,
  getReportPorduct,
  getTotalPaidTransaction,
  getReportProductexcel,
  getReportOrder,
} from "../models/report.models.js";
import ExcelJS from "exceljs";
export const reportMonthController = async (req, res) => {
  try {
    const [result] = await getReportMonth();
    const [report_product] = await getReportPorduct();
    const [total_paid] = await getTotalPaidTransaction();
    const [total_orders] = await getReportOrder();

    res.json({
      success: true,
      message: "Laporan bulanan berhasil diambil",
      data: result,
      report_product: report_product,
      total_paid_transaction: total_paid.jumlah_transaksi_paid,
      total_orders: total_orders,
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

export const generateExcell = async (req, res) => {
  const { start, end } = req.body;
  try {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Data Report");

    worksheet.columns = [
      { header: "No", key: "no", width: 5 },
      { header: "Product", key: "product", width: 30 },
      { header: "Total Terjual", key: "total_terjual", width: 5 },
      { header: "Harga Satuan", key: "harga_satuan", width: 15 },
      { header: "Total", key: "total", width: 30 },
    ];

    const [data] = await getReportProductexcel(start, end);

    const total_price = data.reduce((acc, item) => {
      return acc + item.harga * item.total_terjual;
    }, 0);

    data.forEach((item, index) => {
      worksheet.addRow({
        no: index + 1,
        product: item.nama_produk,
        total_terjual: item.total_terjual,
        harga_satuan: item.harga,
        total: item.harga * item.total_terjual,
      });
    });

    worksheet.mergeCells(`A${data.length + 2}:D${data.length + 2}`);
    worksheet.getCell(
      `A${data.length + 2}:D${data.length + 2}`
    ).value = `Total:`;
    worksheet.getCell(`E${data.length + 2}`).value = `${total_price}`;
    worksheet.getCell(`A${data.length + 2}`).alignment = {
      horizontal: "center",
    };
    worksheet.getCell(`E${data.length + 2}`).alignment = {
      horizontal: "right",
    };

    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    );
    res.setHeader("Content-Disposition", "attachment; filename=report.xlsx");
    await workbook.xlsx.write(res);

    res.end();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
