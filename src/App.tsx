import { Login } from "./pages/Login";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import { MedicationList } from "./pages/MedicationList";

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/list-medications" element={<MedicationList />} />
      </Routes>
    </BrowserRouter>

  )
}

export default App
