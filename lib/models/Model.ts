import { Schema, model, models, type Model as MongooseModel } from 'mongoose';

export interface IModel {
  name: string;
  slug: string;
  priceLabel: string;
  rangeKm?: number;
  chargeTime?: string;
  highlights: string[];
  specs: Record<string, string>;
  images: string[];
  isPublished: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const ModelSchema = new Schema<IModel>(
  {
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    priceLabel: { type: String, required: true },
    rangeKm: { type: Number },
    chargeTime: { type: String },
    highlights: { type: [String], default: [] },
    specs: { type: Schema.Types.Mixed, default: {} },
    images: { type: [String], default: [] },
    isPublished: { type: Boolean, default: true }
  },
  { timestamps: true }
);

export const VehicleModel: MongooseModel<IModel> =
  (models.VehicleModel as MongooseModel<IModel>) || model<IModel>('VehicleModel', ModelSchema);

