import { useEffect, useState } from "react";
import { db } from "@/lib/firebase";
import { collection, getDocs, orderBy, query } from "firebase/firestore";

// Define the type for the messages
interface ContactMessage {
  id: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  timestamp: { seconds: number; nanoseconds: number }; // Firestore timestamp format
}

export default function ContactMessages() {
  // Initialize state with the correct type
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const q = query(collection(db, "contactMessages"), orderBy("timestamp", "desc"));
        const querySnapshot = await getDocs(q);
        const messagesArray = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        })) as ContactMessage[]; // Cast the data as ContactMessage[]
        
        setMessages(messagesArray); // Now this works without type errors
      } catch (error) {
        console.error("Error fetching messages: ", error);
      }
    };

    fetchMessages();
  }, []);

  return (
    <div>
      <h1>Contact Messages</h1>
      <div>
        {messages.map((message) => (
          <div key={message.id} className="message">
            <h2>{message.name}</h2>
            <p>{message.email}</p>
            <p>{message.phone}</p>
            <p>{message.message}</p>
            <p><small>{new Date(message.timestamp.seconds * 1000).toLocaleString()}</small></p>
          </div>
        ))}
      </div>
    </div>
  );
}
