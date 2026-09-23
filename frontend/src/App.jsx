import { useEffect, useState } from "react";

export default function App() {
  const [api, setApi] = useState("");

  useEffect(() => {
    fetch("http://localhost:3000/api/v1/health")
      .then((response) => response.json())
      .then((data) => setApi(data.status))
      .catch(() => setApi("injoignable"));
  }, []);

  return <h1>AppliFrais API {api}</h1>;
}