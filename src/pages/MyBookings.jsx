import { useState, useEffect } from "react";
import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";

export default function MyBookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchBookings() {
      try {
        const snapshot = await getDocs(collection(db, "bookings"));
        const data = snapshot.docs.map((doc) => doc.data());
        setBookings(data);
        setLoading(false);
      } catch (error) {
        console.error("שגיאה בטעינת ההזמנות:", error.message);
      }
    }

    fetchBookings();
  }, []);

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-8 text-gray-800 border-b pb-2">
        📋 רשימת ההזמנות שלך
      </h1>

      {loading ? (
        <p className="text-center text-gray-500">טוען נתונים...</p>
      ) : bookings.length === 0 ? (
        <p className="text-center text-gray-500">אין הזמנות עדיין.</p>
      ) : (
        <div className="space-y-4">
          {bookings.map((booking, index) => (
            <div
              key={index}
              className="bg-white shadow-md border border-gray-200 rounded-xl p-4 hover:shadow-lg transition duration-300"
            >
              <div className="text-lg font-semibold text-blue-700 mb-2">
                👤 {booking.name}
              </div>
              <div className="text-gray-700 text-sm space-y-1">
                <p>📅 <span className="font-medium">תאריך:</span> {booking.date}</p>
                <p>🕒 <span className="font-medium">שעה:</span> {booking.time}</p>
                <p>✂️ <span className="font-medium">שירות:</span> {booking.service}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}