import mongoose, { Schema, Document } from 'mongoose';

export interface IEvent extends Document {
  _id: string;
  name: string;
  description: string;
  detailedDescription: string;
  location: string;
  date: Date;
  time: string;
}

const EventSchema: Schema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  detailedDescription: { type: String, required: true },
  location: { type: String, required: true },
  date: { type: Date, required: true },
  time: { type: String, required: true },
});


// First check if Event model exists, else create it from scratch
export default mongoose.models.Event || mongoose.model<IEvent>('Event', EventSchema);
