const fs = require("fs");
const path = require("path");

const dataFile = path.join(__dirname, "../data/tasks.json");

const readTasks = () => {
  return JSON.parse(fs.readFileSync(dataFile, "utf-8"));
};

const writeTasks = (tasks) => {
  fs.writeFileSync(dataFile, JSON.stringify(tasks, null, 2));
};

// GET /api/tasks
// Bütün görevleri listeler.
// Lists all tasks.
exports.getTasks = (req, res) => {
  //   Bilerek hata oluşturur.
  //   Intentionally creates an error.
  //
  //   try {
  //     throw new Error("Test amaçlı sunucu hatası.");
  //   } catch (error) {
  //     next(error);
  //   }
  const tasks = readTasks();

  res.json(tasks);
};

// GET /api/tasks/:id
// ID numarasına göre görev detayını getirir.
// Gets task details by ID.
exports.getTaskById = (req, res, next) => {
  // URL içerisinden gelen ID değerini sayıya dönüştürür.
  // Converts the ID value from the URL to a number.
  const id = Number(req.params.id);

  // ID geçerli bir sayı değilse hata oluşturur.
  // Creates an error if the ID is not a valid number.
  if (isNaN(id) || !Number.isInteger(id) || id <= 0) {
    return res.status(400).json({
      error: "Geçersiz görev ID'si.",
    });
  }

  const tasks = readTasks();

  const task = tasks.find((task) => task.id === id);

  // Görev bulunamazsa 404 yanıtı gönderir.
  // Sends a 404 response if the task is not found.
  if (!task) {
    return res.status(404).json({
      error: "Görev bulunamadı.",
    });
  }

  res.json(task);
};

// POST /api/tasks
// Yeni görev oluşturur.
// Creates a new task.
exports.createTask = (req, res) => {
  const { title, description } = req.body;

  // Görev başlığının girilmesini zorunlu tutar.
  // Requires a task title.
  if (!title || typeof title !== "string" || !title.trim()) {
    return res.status(400).json({
      error: "Görev başlığı zorunludur.",
    });
  }

  const tasks = readTasks();

  // Yeni görev için otomatik ID oluşturur.
  // Generates an automatic ID for the new task.
  const newTask = {
    id: tasks.length ? Math.max(...tasks.map((task) => task.id)) + 1 : 1,

    title: title.trim(),
    description: description || "",
  };

  tasks.push(newTask);

  writeTasks(tasks);

  res.status(201).json(newTask);
};

// PUT /api/tasks/:id
// Mevcut görevi günceller.
// Updates an existing task.
exports.updateTask = (req, res) => {
  const tasks = readTasks();

  const task = tasks.find((task) => task.id === Number(req.params.id));

  if (!task) {
    return res.status(404).json({
      error: "Görev bulunamadı.",
    });
  }

  const { title, description } = req.body;

  if (!title || typeof title !== "string" || !title.trim()) {
    return res.status(400).json({
      error: "Görev başlığı zorunludur.",
    });
  }

  task.title = title.trim();

  if (description !== undefined) {
    task.description = description;
  }

  writeTasks(tasks);

  res.json(task);
};

// DELETE /api/tasks/:id
// Görevi siler.
// Deletes a task.
exports.deleteTask = (req, res) => {
  const tasks = readTasks();

  const index = tasks.findIndex((task) => task.id === Number(req.params.id));

  // Görev bulunamazsa 404 yanıtı gönderir.
  // Sends a 404 response if the task is not found.
  if (index === -1) {
    return res.status(404).json({
      error: "Görev bulunamadı.",
    });
  }

  // Silinen görevi listeden çıkarır.
  // Removes the selected task from the list.
  const deletedTask = tasks.splice(index, 1)[0];

  writeTasks(tasks);

  res.json({
    message: "Görev başarıyla silindi.",
    task: deletedTask,
  });
};
