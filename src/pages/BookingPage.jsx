import { useState } from "react";
import { db } from "../firebase";
import { collection, addDoc, getDocs, query, where } from "firebase/firestore";
import "./BookingPage.css"; // ربط ملف التنسيق

export default function BookingPage() {
  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [service, setService] = useState("");
  const [confirmed, setConfirmed] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  async function handleBooking() {
    if (!name || !date || !time || !service) {
      setErrorMessage("אנא מלא את כל השדות ✋");
      return;
    }

    const q = query(
      collection(db, "bookings"),
      where("date", "==", date),
      where("time", "==", time)
    );

    const snapshot = await getDocs(q);
    if (!snapshot.empty) {
      setErrorMessage("השעה הזאת כבר תפוסה! אנא בחר זמן אחר.");
      return;
    }

    await addDoc(collection(db, "bookings"), {
      name,
      date,
      time,
      service,
      createdAt: new Date(),
    });

    setConfirmed(true);
    setErrorMessage("");
  }

  return (
    <div className="page-container">
      <h1>💈 הזמנת תור לספר</h1>

      {confirmed ? (
        <div className="success-message">
          ✅ התור נקבע בהצלחה!<br />
          תאריך: {date} | שעה: {time} | שירות: {service}
        </div>
      ) : (
        <>
          <input
            type="text"
            placeholder="שם מלא"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
          <input
            type="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
          />
          <select
            value={service}
            onChange={(e) => setService(e.target.value)}
          >
            <option value="">בחר שירות</option>
            <option value="תספורת ✂️">תספורת ✂️</option>
            <option value="קיצוץ זקן 🧔">קיצוץ זקן 🧔</option>
            <option value="צבע שיער 🎨">צבע שיער 🎨</option>
          </select>
          <button onClick={handleBooking}>הזמן עכשיו</button>
          {errorMessage && <div className="error-message">{errorMessage}</div>}
        </>
      )}
    </div>
  );
}