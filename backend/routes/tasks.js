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
    res.status(400).json({ message: 'Error creating task' });
  }
});

// Get all tasks
router.get('/', authMiddleware, async (req, res) => {
  try {
    const tasks = await Task.find({ user: req.user.id });
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Update task status to completed
router.put('/:id/complete', authMiddleware, async (req, res) => {
  try {
    let task = await Task.findById(req.params.id);
    if (!task) return res.status(404).send('Task not found');

    // Check if the task belongs to the user
    if (task.user.toString() !== req.user.id) {
      return res.status(401).send('Not authorized');
    }

    task.status = 'completed';
    await task.save();

    res.json(task);
  } catch (err) {
    res.status(500).send('Server error');
  }
});


router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    let task = await Task.findById(req.params.id);
    if (!task) {
      console.error(`Task with id ${req.params.id} not found`);
      return res.status(404).send('Task not found');
    }

    // Check if the task belongs to the user
    if (task.user.toString() !== req.user.id) {
      console.error('Not authorized to delete this task');
      return res.status(401).send('Not authorized');
    }

    await task.deleteOne();
    console.log(`Task with id ${req.params.id} removed successfully`);
    res.json({ message: 'Task removed' });
  } catch (err) {
    console.error(`Error removing task with id ${req.params.id}:`, err);
    res.status(500).send('Server error');
  }
});

module.exports = router;
