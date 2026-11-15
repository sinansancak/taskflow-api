const express = require("express");
const controller = require("../controllers/task_controller");

const router = express.Router();

router.post("/", controller.createTask);

router.get("/", controller.getTasks);

router.get("/:id", controller.getTaskById);

router.put("/:id", controller.updateTask);

router.delete("/:id", controller.deleteTask);

module.exports = router;
