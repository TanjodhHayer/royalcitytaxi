"use client";
import { useEffect, useState } from "react";
import { db } from "@/lib/firebase";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";

// Type for Contact Message data
interface ContactMessage {
  id: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  timestamp: any;
}

export default function ViewContactMessages() {
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const messagesRef = collection(db, "contactMessages");
        const snapshot = await getDocs(messagesRef);

        if (snapshot.empty) {
          setMessages([]);
        } else {
          const messagesList = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          })) as ContactMessage[];
          setMessages(messagesList);
        }
      } catch (error) {
        console.error("Error fetching messages:", error);
        setError("Failed to fetch messages. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchMessages();
  }, []);

  const deleteMessage = async (id: string) => {
    try {
      await deleteDoc(doc(db, "contactMessages", id));
      setMessages((prev) => prev.filter((message) => message.id !== id));
    } catch (error) {
      console.error("Error deleting message:", error);
      setError("Failed to delete message. Please try again.");
    }
  };

  return (
    <div className="w-full h-screen bg-gray-900 p-5 pt-32">
      <h1 className="text-2xl font-semibold text-white mb-6">Contact Messages</h1>

      {loading ? (
        <p className="text-center text-gray-500">Loading messages...</p>
      ) : error ? (
        <p className="text-center text-red-500">{error}</p>
      ) : messages.length === 0 ? (
        <p className="text-center text-gray-500">No messages found.</p>
      ) : (
        <div className="overflow-auto rounded-lg shadow bg-gray-800 md:block hidden">
          <table className="w-full text-white">
            <thead className="border-b-2 border-gray-700">
              <tr>
                <th className="p-4 text-sm font-semibold tracking-wide text-left">Name</th>
                <th className="p-4 text-sm font-semibold tracking-wide text-left">Email</th>
                <th className="p-4 text-sm font-semibold tracking-wide text-left">Phone</th>
                <th className="p-4 text-sm font-semibold tracking-wide text-left">Message</th>
                <th className="p-4 text-sm font-semibold tracking-wide text-left">Date&Time</th>
                <th className="p-4 text-sm font-semibold tracking-wide text-left">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-600">
              {messages.map((message, index) => (
                <tr key={message.id} className={index % 2 === 0 ? "bg-gray-700" : "bg-gray-600"}>
                  <td className="p-4 text-sm text-gray-300 font-bold">{message.name}</td>
                  <td className="p-4 text-sm text-gray-300">{message.email}</td>
                  <td className="p-4 text-sm text-gray-300">{message.phone}</td>
                  <td className="p-4 text-sm text-gray-300">{message.message}</td>
                  <td className="p-4 text-sm text-gray-300">
                    {message.timestamp?.toDate().toLocaleString()}
                  </td>
                  <td className="p-4 text-sm text-gray-300">
                    <button
                      onClick={() => deleteMessage(message.id)}
                      className="px-3 py-1 text-sm bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Mobile View */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:hidden">
        {messages.map((message, index) => (
          <div key={message.id} className="bg-gray-800 text-white space-y-3 p-4 rounded-lg shadow">
            <div className="flex items-center justify-between text-sm">
              <div className="font-bold text-gray-300">#{index + 1}</div>
              <div className="text-gray-400">{message.timestamp?.toDate().toLocaleString()}</div>
            </div>
            <div className="text-sm text-gray-300 font-bold">{message.name}</div>
            <div className="text-sm text-gray-300">Email: {message.email}</div>
            <div className="text-sm text-gray-300">Phone: {message.phone}</div>
            <div className="text-sm text-gray-300">{message.message}</div>
            <button
              onClick={() => deleteMessage(message.id)}
              className="w-full text-sm bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
