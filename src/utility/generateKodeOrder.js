const generateKodeOrder = () => {
  const kode =
    "ORD-" +
    new Date().toISOString().slice(0, 10).replace(/-/g, "") +
    "-" +
    Math.random().toString(36).substring(2, 6).toUpperCase();
  return kode;
};

export default generateKodeOrder;
