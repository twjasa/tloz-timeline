import ReactDOM from "react-dom/client";
import "./constants/ids";
import App from "./App.tsx";
import "./index.scss";

window.DEBUG_MODE = import.meta.env.VITE_DEBUG_MODE === "true";

ReactDOM.createRoot(document.getElementById("root")!).render(<App />);
