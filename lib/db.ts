import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  // In local dev we prefer a clear error over silent failure.
  throw new Error('MONGODB_URI is not set in environment variables.');
}

interface GlobalWithMongoose {
  mongoose?: {
    conn: typeof mongoose | null;
    promise: Promise<typeof mongoose> | null;
  };
}

const globalWithMongoose = global as typeof global & GlobalWithMongoose;

const cached =
  globalWithMongoose.mongoose ?? (globalWithMongoose.mongoose = { conn: null, promise: null });

export async function connectDb() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI as string).then((mongooseInstance) => mongooseInstance);
  }

  cached.conn = await cached.promise;
  return cached.conn;
}

