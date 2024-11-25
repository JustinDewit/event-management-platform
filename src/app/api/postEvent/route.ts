import { NextResponse } from 'next/server';
import { dbConnect } from '@/app/lib/dbConnect';
import Event from '@/app/models/Event';

export async function POST(request: Request) {
  try {
    await dbConnect();
    const data = await request.json();
    const event = await Event.create(data);
    return NextResponse.json(event);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create event' },
      { status: 500 }
    );
  }
}