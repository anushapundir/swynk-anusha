// Import necessary modules and styles
import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

// Set the document title
document.title = "Swynk - Professional Networking Redefined";

// Add meta description for SEO
const metaDescription = document.createElement("meta");
metaDescription.name = "description";
metaDescription.content = "Swynk - Professional networking redefined. Connect, meet, and grow your career.";
document.head.appendChild(metaDescription);

// Load Inter font from Google Fonts
const fontLink = document.createElement("link");
fontLink.rel = "stylesheet";
fontLink.href = "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap";
document.head.appendChild(fontLink);

// Create the root element and render the main App component
createRoot(document.getElementById("root")!).render(<App />);
