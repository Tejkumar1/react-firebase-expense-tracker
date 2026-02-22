export const drawCategoryChart = (canvas, expenses) => {
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  const grouped = {};
  expenses.forEach(
    (e) => (grouped[e.category] = (grouped[e.category] || 0) + Number(e.amount))
  );

  const keys = Object.keys(grouped);
  const vals = Object.values(grouped);
  const w = canvas.width,
    h = canvas.height;
  const max = Math.max(...vals, 1);
  const barWidth = w / (keys.length * 2);

  ctx.fillStyle = "#4caf50";
  ctx.font = `${12 * devicePixelRatio}px Arial`;

  keys.forEach((cat, i) => {
    const barH = (vals[i] / max) * (h * 0.8);
    const x = (i + 0.5) * 2 * barWidth;
    const y = h - barH;
    ctx.fillRect(x, y, barWidth, barH);
    ctx.fillText(cat, x, h - 4);
  });
};