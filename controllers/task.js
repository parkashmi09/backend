import ErrorHandler from "../middleware/error.js";
import { Task } from "../models/task.js";
export const newTask = async (req, res, next) => {
  try {
    const { title, description } = req.body;

    await Task.create({
      title,
      description,
      user: req.user,
    });
    return res.status(201).json({
      success: true,
      message: "Task are Created Successfully",
    });
  } catch (error) {
    next(error);
  }
};

export const getAllTasks = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const tasks = await Task.find({ user: userId });

    return res.status(200).json({
      success: true,
      tasks,
    });
  } catch (error) {
    next(error);
  }
};

export const updateTask = async (req, res, next) => {
  try {
    const { id } = req.params;

    const task = await Task.findById(id);

    if (!task) return next(new ErrorHandler("Task not found", 404));

    task.isCompleted = !task.isCompleted;
    await task.save();

    return res.status(200).json({
      success: true,
      message: "Task updated",
    });
  } catch (error) {
    next(error);
  }
};

export const deleteTask = async (req, res, next) => {
  try {
    const { id } = req.params;

    const task = await Task.findById(id);

    if (!task) return next(new ErrorHandler("Task not found", 404));
    await task.deleteOne();

    return res.status(200).json({
      success: true,
      message: "Task Deleted",
    });
  } catch (error) {
    next(error);
  }
};
