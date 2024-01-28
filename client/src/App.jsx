import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/Login.jsx";
import Register from "./components/Register.jsx";
import Dashboard from "./components/Dashboard.jsx";
HEAD
import CreateEvent from "./components/CreateEvent.jsx";
import CreateLocation from "./components/CreateLocation.jsx";

import Search from "./components/Search.jsx";



function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />

        <Route path="/newEvent" element={<CreateEvent />} />
        <Route path="/newlocation" element={<CreateLocation />} />
        
=======
        <Route path="/search" element={<Search />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
