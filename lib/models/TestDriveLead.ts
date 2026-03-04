import { Schema, model, models, type Model as MongooseModel } from 'mongoose';

export type TestDriveStatus = 'new' | 'contacted';

export interface ITestDriveLead {
  name: string;
  phone: string;
  email: string;
  preferredModelSlug: string;
  preferredDate: string;
  preferredTime: string;
  location: string;
  message?: string;
  status: TestDriveStatus;
  createdAt: Date;
}

const TestDriveLeadSchema = new Schema<ITestDriveLead>({
  name: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String, required: true },
  preferredModelSlug: { type: String, required: true },
  preferredDate: { type: String, required: true },
  preferredTime: { type: String, required: true },
  location: { type: String, required: true },
  message: { type: String },
  status: { type: String, enum: ['new', 'contacted'], default: 'new' },
  createdAt: { type: Date, default: Date.now }
});

export const TestDriveLead: MongooseModel<ITestDriveLead> =
  (models.TestDriveLead as MongooseModel<ITestDriveLead>) ||
  model<ITestDriveLead>('TestDriveLead', TestDriveLeadSchema);

