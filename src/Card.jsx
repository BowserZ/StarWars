import React from "react";

// Helper function to format keys (e.g., "birth_year" -> "Birth Year")
const formatKey = (key) => {
  return key
    .replace(/_/g, " ") // Replace underscores with spaces
    .replace(/(^|\s)\S/g, (char) => char.toUpperCase()); // Capitalize each word
};

const Card = ({ item, onFavorite, isFavorite, imageUrl }) => {
  const { name, ...properties } = item.properties;

  // Filter out unnecessary properties (e.g., "created", "edited", "url", "films")
  const filteredProperties = Object.entries(properties).filter(
    ([key]) => !["created", "edited", "url", "films"].includes(key)
  );

  return (
    <div className="card">
      <div className="card-content">
        {/* Image container with favorite button */}
        <div style={{ position: "relative" }}>
          {/* Image (uses default if imageUrl is not provided) */}
          <img
            src={imageUrl || "https://example.com/default-image.jpg"}
            alt={name}
            className="card-img-top"
          />
          {/* Favorite button (star icon) */}
          <button
            style={{
              position: "absolute",
              top: "10px",
              left: "10px",
              background: "rgba(255, 255, 255, 0.7)",
              border: "none",
              borderRadius: "50%",
              padding: "5px",
              cursor: "pointer",
              fontSize: "20px",
              color: isFavorite ? "gold" : "rgba(0, 0, 0, 0.5)",
              transition: "all 0.3s ease",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "30px",
              height: "30px",
            }}
            onClick={() => onFavorite(item)}
          >
            <i className="fa-solid fa-star"></i>
          </button>
        </div>

        {/* List of properties (50% of the card) */}
        <ul className="list-group">
          {/* Display the name as a separate field */}
          <li className="list-group-item">
            <strong>Name:</strong> {name}
          </li>
          {/* Display filtered properties */}
          {filteredProperties.map(([key, value]) => (
            <li key={key} className="list-group-item">
              <strong>{formatKey(key)}:</strong>{" "}
              {typeof value === "string" && value.startsWith("http") ? (
                <a href={value} target="_blank" rel="noopener noreferrer">
                  View details
                </a>
              ) : (
                value
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Card;