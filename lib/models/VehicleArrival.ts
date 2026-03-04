import { Schema, model, models, type Model as MongooseModel } from 'mongoose';

export interface IVehicleArrival {
  title: string;
  image?: string;
  status: 'Available' | 'Reserved' | 'Sold';
  createdAt: Date;
}

const VehicleArrivalSchema = new Schema<IVehicleArrival>({
  title: { type: String, required: true },
  image: { type: String },
  status: {
    type: String,
    enum: ['Available', 'Reserved', 'Sold'],
    default: 'Available'
  },
  createdAt: { type: Date, default: Date.now }
});

export const VehicleArrival: MongooseModel<IVehicleArrival> =
  (models.VehicleArrival as MongooseModel<IVehicleArrival>) ||
  model<IVehicleArrival>('VehicleArrival', VehicleArrivalSchema);

