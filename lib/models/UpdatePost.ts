import { Schema, model, models, type Model as MongooseModel } from 'mongoose';

export type UpdateCategory = 'News' | 'Event' | 'Update';

export interface IUpdatePost {
  title: string;
  slug: string;
  category: UpdateCategory;
  excerpt: string;
  content: string;
  coverImage?: string;
  publishedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const UpdatePostSchema = new Schema<IUpdatePost>(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    category: {
      type: String,
      enum: ['News', 'Event', 'Update'],
      default: 'News'
    },
    excerpt: { type: String, required: true },
    content: { type: String, required: true },
    coverImage: { type: String },
    publishedAt: { type: Date }
  },
  { timestamps: true }
);

export const UpdatePost: MongooseModel<IUpdatePost> =
  (models.UpdatePost as MongooseModel<IUpdatePost>) ||
  model<IUpdatePost>('UpdatePost', UpdatePostSchema);

