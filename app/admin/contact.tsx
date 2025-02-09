import { useEffect, useState } from "react";
import { checkIfAdmin } from "@/lib/firebase"; // Path to your Firebase helper function
import { useRouter } from "next/router";
import { db } from "@/lib/firebase"; // Firebase initialization
import { collection, getDocs } from "firebase/firestore";

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
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const router = useRouter();

  useEffect(() => {
    const checkAdminStatus = async () => {
      try {
        const adminStatus = await checkIfAdmin();
        if (adminStatus) {
          setIsAdmin(true);
        } else {
          router.push("/login"); // Redirect to login if not an admin
        }
      } catch (error) {
        console.error("Error checking admin status:", error);
        router.push("/login"); // Redirect on error
      } finally {
        setLoading(false);
      }
    };

    checkAdminStatus();
  }, [router]);

  // Fetch contact messages from Firestore
  useEffect(() => {
    const fetchMessages = async () => {
      const messagesRef = collection(db, "contactMessages"); // Reference to 'contactMessages' collection
      const snapshot = await getDocs(messagesRef);
      const messagesList = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setMessages(messagesList as ContactMessage[]);
    };

    if (isAdmin) {
      fetchMessages();
    }
  }, [isAdmin]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!isAdmin) {
    return <div>You do not have permission to view contact messages.</div>;
  }

  return (
    <div>
      <h1 className="text-4xl font-bold text-red-500 text-center mb-6">Contact Messages</h1>
      {messages.length === 0 ? (
        <div>No messages found.</div>
      ) : (
        <table className="min-w-full table-auto border-collapse">
          <thead>
            <tr>
              <th className="border px-4 py-2">Name</th>
              <th className="border px-4 py-2">Email</th>
              <th className="border px-4 py-2">Phone</th>
              <th className="border px-4 py-2">Message</th>
              <th className="border px-4 py-2">Date</th>
            </tr>
          </thead>
          <tbody>
            {messages.map((message) => (
              <tr key={message.id}>
                <td className="border px-4 py-2">{message.name}</td>
                <td className="border px-4 py-2">{message.email}</td>
                <td className="border px-4 py-2">{message.phone}</td>
                <td className="border px-4 py-2">{message.message}</td>
                <td className="border px-4 py-2">{message.timestamp?.toDate().toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
