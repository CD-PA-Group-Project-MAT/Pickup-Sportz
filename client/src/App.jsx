import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/Login.jsx";
import Register from "./components/Register.jsx";
import Dashboard from "./components/Dashboard.jsx";
import CreateEvent from "./components/CreateEvent.jsx";
import CreateLocation from "./components/CreateLocation.jsx";
import ViewEvent from "./components/ViewEvent.jsx";
import Search from "./components/Search.jsx";
import Layout from "./components/Layout.jsx";
import RequireAuth from "./components/RequireAuth.jsx";
import Missing from "./components/Missing.jsx";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />

        <Route element={<RequireAuth/>}> {/* These are the protected routes */}
          <Route path="/" element={<Dashboard />} />
          <Route path="newEvent" element={<CreateEvent />} />
          <Route path="newlocation" element={<CreateLocation />} />
          <Route path="search" element={<Search />} />
          <Route path="events/:id" element={<ViewEvent />} />
        </Route>

        {/* TODO: for some reason Context is cleared here */}
        <Route path="*" element={<Missing/>}/>
      </Route>
    </Routes>
  );
}

export default App;
