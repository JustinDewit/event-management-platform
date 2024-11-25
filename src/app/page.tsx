export default async function Home() {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/getEvents`,
    {
      cache: "no-store",
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch events");
  }

  const events = await response.json();

  return (
    <div className="min-h-screen p-8">
      <main className="container mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold">Event Management Platform</h1>
          <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded">
            Create New Event
          </button>
        </div>

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
