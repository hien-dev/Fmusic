import { useEffect, useState } from "react";
export function useOnline() {
  const [online, setOnline] = useState(true);
  useEffect(() => {
    const h = () => setOnline(navigator.onLine);
    window.addEventListener?.("online", h);
    window.addEventListener?.("offline", h);
    return () => {
      window.removeEventListener?.("online", h);
      window.removeEventListener?.("offline", h);
    };
  }, []);
  return online;
}
