import { AppProvider } from "./src/context/AppContext";
import AppRoutes from "./src/routes/app.routes";

export default function App() {
  return(
  <AppProvider>
    <AppRoutes/>
  </AppProvider>
  )
}
