import { useContext } from "react";
import { AuthProvider } from "../app/providers/AuthProvider";

export function useAuth() {
  const context = useContext(AuthProvider);

  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }

  return context;
}
