import { useEffect, useState } from "react";
import Prayer from "./component/prayer";

function App() {
  const [prayerTimes, setPrayerTimes] = useState({});
  const [dateTime, setDateTime] = useState("");
  const [city, setCity] = useState("Cairo");

  // creating all cities in name and value as array
  const Cities = [
    { name: "Cairo", value: "Cairo" },
    { name: "Giza", value: "Giza" },
    { name: "Alexandria", value: "Alexandria" },
    { name: "Dakahlia", value: "Dakahlia" },
    { name: "Red Sea", value: "Red Sea" },
    { name: "Beheira", value: "Beheira" },
    { name: "Fayoum", value: "Fayoum" },
    { name: "Gharbia", value: "Gharbia" },
    { name: "Ismailia", value: "Ismailia" },
    { name: "Menofia", value: "Menofia" },
    { name: "Minya", value: "Minya" },
    { name: "Qaliubiya", value: "Qaliubiya" },
    { name: "New Valley", value: "New Valley" },
    { name: "Suez", value: "Suez" },
    { name: "Aswan", value: "Aswan" },
    { name: "Assiut", value: "Assiut" },
    { name: "Beni Suef", value: "Beni Suef" },
    { name: "Port Said", value: "Port Said" },
    { name: "Damietta", value: "Damietta" },
    { name: "Sharkia", value: "Sharkia" },
    { name: "South Sinai", value: "South Sinai" },
    { name: "Kafr El Sheikh", value: "Kafr El Sheikh" },
    { name: "Matruh", value: "Matruh" },
    { name: "Luxor", value: "Luxor" },
    { name: "Qena", value: "Qena" },
    { name: "North Sinai", value: "North Sinai" },
    { name: "Sohag", value: "Sohag" },
  ];

  useEffect(() => {
    const fetchPrayerTimes = async () => {
      try {
        const response = await fetch(
          "https://api.aladhan.com/v1/timingsByCity?city=Eg&country=Egypt&city=" + city
        );
        const date_Prayer = await response.json();
        setPrayerTimes(date_Prayer.data.timings);
        setDateTime(date_Prayer.data.date.gregorian.date);

        console.log(date_Prayer.data.date.gregorian.date);
      } catch (error) {
        console.error("Error fetching prayer times:", error);
      }
    };
    fetchPrayerTimes();
  }, [city]);

  const formatTimes = (time) => {
    if (!time) {
      return "00:00";
    }
    let [hours, minutes] = time.split(":").map(Number);
    const period = hours >= 12 ? "PM" : "AM";
    hours = hours % 12 || 12; // Convert to 12-hour format
    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")} ${period}`;
  };

  return (
    <section>
      <div className="container">
        <div className="top-sec">
          <div className="city">
            <h3>City : </h3>
            <select name="" id="" onChange={(e) => setCity(e.target.value)}>
              {Cities.map((city_obj) => (
                <option key={city_obj.value} value={city_obj.value}>
                  {city_obj.name}
                </option>
              ))}
            </select>
          </div>
          <div className="date">
            <h3>Date : </h3>
            <h4>{dateTime}</h4>
          </div>
        </div>
        <Prayer name="Fajr" time={formatTimes(prayerTimes.Fajr)} />
        <Prayer name="Dhuhr" time={formatTimes(prayerTimes.Dhuhr)} />
        <Prayer name="Asr" time={formatTimes(prayerTimes.Asr)} />
        <Prayer name="Maghrib" time={formatTimes(prayerTimes.Maghrib)} />
        <Prayer name="Isha" time={formatTimes(prayerTimes.Isha)} />
      </div>
    </section>
  );
}

export default App;
