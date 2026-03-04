import clientPromise from '@/lib/mongodb';
import { NextResponse } from 'next/server';

export async function GET() {
  const client = await clientPromise;
  const db = client.db('china_lanka_motors_db');

  const result = await db.collection('test').insertOne({
    message: 'MongoDB connected successfully',
    createdAt: new Date()
  });

  return NextResponse.json({
    success: true,
    id: result.insertedId
  });
}

