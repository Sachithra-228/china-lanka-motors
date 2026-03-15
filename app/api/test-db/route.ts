import { getMongoClientPromise } from '@/lib/mongodb';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const client = await getMongoClientPromise();
    const db = client.db('china_lanka_motors_db');

    const result = await db.collection('test').insertOne({
      message: 'MongoDB connected successfully',
      createdAt: new Date()
    });

    return NextResponse.json({
      success: true,
      id: result.insertedId
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Database connection failed.'
      },
      { status: 500 }
    );
  }
}

