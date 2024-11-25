"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { IEvent } from "@/app/models/Event";

export default function EventDetails() {
  const params = useParams();
  const [event, setEvent] = useState<IEvent | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/events/${params.id}`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch event");
        }

        const data = await response.json();
        setEvent(data);
      } catch (err) {
        setError("Failed to load event details");
      } finally {
        setLoading(false);
      }
    };

    fetchEvent();
  }, [params.id]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  if (!event) return <div>Event not found</div>;

  return (
    <div className="min-h-screen p-8">
      <main className="container mx-auto max-w-2xl">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold mb-4">{event.name}</h1>
          <p className="text-gray-600 mb-6">{event.description}</p>
          <p className="text-gray-600 mb-6">{event.detailedDescription}</p>

          <div className="space-y-4">
            <div className="flex items-center">
              <span className="font-semibold w-24">Location:</span>
              <span>{event.location}</span>
            </div>

            <div className="flex items-center">
              <span className="font-semibold w-24">Date:</span>
              <span>{new Date(event.date).toLocaleDateString()}</span>
            </div>

            <div className="flex items-center">
              <span className="font-semibold w-24">Time:</span>
              <span>{event.time}</span>
            </div>
          </div>

          <button
            onClick={() => window.history.back()}
            className="mt-8 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded"
          >
            Back to Events
          </button>
        </div>
      </main>
    </div>
  );
}
