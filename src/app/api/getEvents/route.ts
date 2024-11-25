import { NextResponse } from 'next/server';
import { dbConnect } from '@/app/lib/dbConnect';
import Event from '@/app/models/Event';

export async function GET() {
  try {
    await dbConnect();
    const events = await Event.find({})
    return NextResponse.json(events);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch events' },
      { status: 500 }
    );
  }
}