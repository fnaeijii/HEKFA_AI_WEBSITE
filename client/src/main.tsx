import React from 'react';
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css"; // <<-- این خط حیاتی است و باید وجود داشته باشد

const container = document.getElementById("root");
const root = createRoot(container!);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);