import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { ClerkProvider } from '@clerk/clerk-react';

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ClerkProvider publishableKey={"pk_test_YWN0aXZlLWJ1bGxkb2ctNzcuY2xlcmsuYWNjb3VudHMuZGV2JA"} afterSignOutUrl="/">
      <App />
    </ClerkProvider>
  </StrictMode>,
);
