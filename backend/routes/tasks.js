const express = require('express');
const Task = require('../models/Task');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

// Create task
router.post('/', authMiddleware, async (req, res) => {
  const { title, description, status, project, category } = req.body;
  try {
    const task = new Task({
      user: req.user.id,
      title,
      description,
      status,
      project,
      category,
    });
    await task.save();
    res.status(201).json(task);
  } catch (err) {
    res.status(400).send('Error creating task');
  }
});

// Get all tasks
router.get('/', authMiddleware, async (req, res) => {
  try {
    const tasks = await Task.find({ user: req.user.id });
    res.json(tasks);
  } catch (err) {
    res.status(500).send('Server error');
  }
});

// Update task
router.put('/:id', authMiddleware, async (req, res) => {
  const { title, description, status, project, category } = req.body;
  try {
    let task = await Task.findById(req.params.id);
    if (!task) return res.status(404).send('Task not found');

    // Check if the task belongs to the user
    if (task.user.toString() !== req.user.id) {
      return res.status(401).send('Not authorized');
    }

    task = await Task.findByIdAndUpdate(
      req.params.id,
      { title, description, status, project, category },
      { new: true }
    );

    res.json(task);
  } catch (err) {
    res.status(500).send('Server error');
  }
});

// Delete task
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    let task = await Task.findById(req.params.id);
    if (!task) return res.status(404).send('Task not found');

    // Check if the task belongs to the user
    if (task.user.toString() !== req.user.id) {
      return res.status(401).send('Not authorized');
    }

    await task.remove();
    res.json({ message: 'Task removed' });
  } catch (err) {
    res.status(500).send('Server error');
  }
});

module.exports = router;
