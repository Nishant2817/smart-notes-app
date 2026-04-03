import { NextResponse } from 'next/server';
import mongoose from 'mongoose';

export async function GET() {
  try {
    if (mongoose.connection.readyState < 1) {
      await mongoose.connect(process.env.MONGODB_URI);
    }

    const state = mongoose.connection.readyState;
    const states = { 0: 'disconnected', 1: 'connected', 2: 'connecting', 3: 'disconnecting' };

    return NextResponse.json({
      status: states[state] || 'unknown',
      readyState: state,
      database: mongoose.connection.name || null,
      uri_set: !!process.env.MONGODB_URI,
    });
  } catch (error) {
    return NextResponse.json({
      status: 'error',
      error: error.message,
      uri_set: !!process.env.MONGODB_URI,
    }, { status: 500 });
  }
}
