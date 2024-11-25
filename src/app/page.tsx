import { dbConnect } from "./lib/dbConnect";
import Event from "./models/Event";

export default async function Home() {
  await dbConnect();
  const events = await Event.find({});

  return (
    <div className="min-h-screen p-8">
      <main className="container mx-auto">
        <h1 className="text-2xl font-bold mb-8">Event Management Platform</h1>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {events.map((event) => (
            <div
              key={event._id}
              className="p-6 rounded-lg border border-gray-200 shadow-sm"
            >
              <h2 className="text-xl font-semibold mb-2">{event.name}</h2>
              <p className="text-gray-600 mb-2">{event.description}</p>
              <div className="text-sm text-gray-500">
                <p> {event.location}</p>
                <p> {new Date(event.date).toLocaleDateString()}</p>
                <p> {event.time}</p>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
