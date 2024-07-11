const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String, required: true },
  description: { type: String },
  status: { type: String, default: 'pending' }, // 'pending', 'completed'
  project: { type: String },
  category: { type: String },
});

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;
