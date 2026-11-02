import { Routes, Route } from "react-router-dom";

import Beranda from "./pages/Beranda";
import Register from './pages/Register';
import Login from './pages/Login';
import Dashboard from "./pages/admin/Dasboard";
import RoomDetail from './pages/RoomDetail'

function App(){
  return(
    <>
      <main className="min-h-screen w-full">
        <Routes>
          <Route path="/" element={<Beranda />}/>
          <Route path="/register" element={<Register />}/>
          <Route path="/login" element={<Login />}/>
          <Route path="/kamar/:id" element={<RoomDetail/>}/>

          {/* Dashboard Admin */}
          <Route path="/admin" element={<Dashboard />}/>
        </Routes>
      </main>
    </>
  )
}
export default App;