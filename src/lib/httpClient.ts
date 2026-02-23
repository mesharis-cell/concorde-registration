import axios from "axios";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3001";

const httpClient = axios.create({
  baseURL: API_BASE_URL,
  headers: { "Content-Type": "application/json" },
  timeout: 10000
});

httpClient.interceptors.request.use(
  (config) => {
    if (typeof window !== "undefined") {
      const email = localStorage.getItem("user_email");

      if (email && email.trim() !== "") {
        // Ensure we have a data object
        if (!config.data) {
          config.data = {};
        }

        // Add email and eventId to request body for authentication
        config.data = {
          ...config.data,
          email: email.trim(),
          eventId: process.env.NEXT_PUBLIC_EVENT_ID
        };
      } else {
        // No email found - this request will likely fail
        console.warn("⚠️ HTTP Client - No email found in localStorage, API request may fail");
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

httpClient.interceptors.response.use(
  (response) => response,
  (error) => {
    // console.error("API Error:", error.response?.data || error.message);

    if (error.response?.status === 401) {
      if (typeof window !== "undefined") {
        // Clear all authentication data
        localStorage.clear();

        // Always redirect to access-itinerary on 401 (invalid email/auth)
        const currentPath = window.location.pathname;
        const publicPaths = ["/", "/registration", "/access-itinerary"];

        if (!publicPaths.some((path) => currentPath.startsWith(path))) {
          window.location.href = "/access-itinerary";
        }
      }
    }
    return Promise.reject(error);
  }
);

export default httpClient;
