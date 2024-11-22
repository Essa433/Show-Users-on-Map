import React, { useEffect, useState } from "react"
import "./App.css"
import "leaflet/dist/leaflet.css"
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet"
import { Icon } from "leaflet"

export default function App() {
  const [users, setUsers] = useState([]) // Store the users data

  // Fetch user data from the API
  useEffect(() => {
    fetch("https://fakestoreapi.com/users")
      .then((res) => res.json())
      .then((data) => setUsers(data)) // Store all users in state
      .catch((error) => console.error("Error fetching user data:", error))
  }, []) // This effect runs once when the component mounts

  // Define a custom icon for the markers
  const customIcon = new Icon({
    iconUrl: "https://cdn-icons-png.flaticon.com/128/9131/9131546.png", // Example icon URL
    iconSize: [38, 38],
  })

  return (
    <div className="App">
      <h1>Users on Map</h1>
      <MapContainer
        center={[48.8566, 2.3522]}
        zoom={13}
        style={{ height: "100vh", width: "100%" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {/* Render markers based on the users' location (latitude and longitude) */}
        {users.map((user, index) => (
          <Marker
            key={index}
            position={[
              user.address.geolocation.lat,
              user.address.geolocation.long,
            ]} // Using geolocation data
            icon={customIcon}
          >
            <Popup>
              <strong>{user.username}</strong>
              <br />
              <strong>Name:</strong>
              {/* If name is an object, combine firstname and lastname */}
              {user.name && typeof user.name === "object"
                ? `${user.name.firstname} ${user.name.lastname}`
                : user.name}{" "}
              {/* Handle case where name is a string */}
              <br />
              <strong>Email:</strong> {user.email}
              <br />
              <strong>Phone:</strong> {user.phone}
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  )
}
