import mongoose from 'mongoose';

const ProjectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  images: [{ type: String }],
  category: { type: String, required: true },
  date: { type: Date, required: true },
}, { timestamps: true });

export default mongoose.models.Project || mongoose.model('Project', ProjectSchema);