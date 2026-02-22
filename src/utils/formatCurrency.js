export const formatCurrency = (num) =>
  "₹" + Number(num || 0).toLocaleString("en-IN");