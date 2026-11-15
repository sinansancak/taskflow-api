const express = require("express");
const logger = require("./middleware/logger");
const taskRoutes = require("./routes/task_routes");

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(logger);
app.use("/api/tasks", taskRoutes);

// Ana sayfa endpoint'i.
// Homepage endpoint.
app.get("/", (req, res) => {
  res.json({
    message: "TASKFLOW API çalışıyor.",
  });
});

// Merkezi hata yönetimi.
// Centralized error handling.
app.use((err, req, res, next) => {
  console.error(err.stack);

  res.status(500).json({
    error: "Sunucu hatası oluştu.",
  });
});

// Tanımlanmamış endpoint'ler için 404 yanıtı.
// Sends a 404 response for undefined endpoints.
app.use((req, res) => {
  res.status(404).json({
    error: "Endpoint bulunamadı.",
  });
});

app.listen(PORT, () => {
  console.log(`TASKFLOW API http://localhost:${PORT} adresinde çalışıyor.`);
});
