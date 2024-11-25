import { NextResponse } from 'next/server';
import { dbConnect } from '@/app/lib/dbConnect';
import Event from '@/app/models/Event';
import { eventSchema } from '@/app/validators/eventValidator';
import { z } from 'zod';

export async function POST(request: Request) {
  try {
    await dbConnect();
    const data = await request.json();

    // Validate input data using Zod
    const parsedData = eventSchema.parse(data);

    const event = await Event.create(parsedData);
    return NextResponse.json(event);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { errors: error.errors },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { error: 'Failed to create event' },
      { status: 500 }
    );
  }
}