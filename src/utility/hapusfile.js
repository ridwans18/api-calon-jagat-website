import { promises as fs } from "fs";

async function hapusFile(imgname) {
  try {
    await fs.unlink(`public/images/${imgname}`);
    console.log("File berhasil dihapus");
  } catch (err) {
    console.error("Gagal menghapus file:", err);
  }
}

export default hapusFile;
