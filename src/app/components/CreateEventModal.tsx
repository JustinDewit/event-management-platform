import { useState } from "react";
import { IEvent } from "../models/Event";

interface CreateEventModalProps {
  isOpen: boolean;
  onClose: () => void;
  onEventCreated: () => void;
}

export default function CreateEventModal({
  isOpen,
  onClose,
  onEventCreated,
}: CreateEventModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    location: "",
    date: "",
    time: "",
  });

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch("/api/postEvent", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to create event");
      }

      setFormData({
        name: "",
        description: "",
        location: "",
        date: "",
        time: "",
      });
      onEventCreated();
      onClose();
    } catch (error) {
      console.error("Error creating event:", error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Create New Event</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Event Name
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Description
              </label>
              <textarea
                required
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                rows={3}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Location
              </label>
              <input
                type="text"
                required
                value={formData.location}
                onChange={(e) =>
                  setFormData({ ...formData, location: e.target.value })
                }
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Date
              </label>
              <input
                type="date"
                required
                value={formData.date}
                onChange={(e) =>
                  setFormData({ ...formData, date: e.target.value })
                }
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Time
              </label>
              <input
                type="time"
                required
                value={formData.time}
                onChange={(e) =>
                  setFormData({ ...formData, time: e.target.value })
                }
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
              />
            </div>
          </div>

          <div className="mt-6 flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-500"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded"
            >
              Create Event
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
