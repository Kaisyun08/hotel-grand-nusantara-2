import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  // Ambil data user dari localStorage saat komponen dimuat
  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (e) {
        setUser(null);
      }
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    alert("Berhasil keluar dari akun anda.");
    navigate("/login");
  };

  return (
    <nav className="sticky top-0 z-50 flex items-center justify-between bg-white/90 px-8 py-4 shadow-sm backdrop-blur-md">
      {/* BRAND LOGO */}
      <Link to="/" className="flex items-center gap-2">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 font-bold text-white shadow-md">
          H
        </div>
        <span className="text-xl font-extrabold tracking-wide text-gray-900">
          Grand Nusantara
        </span>
      </Link>

      {/* NAVIGATION LINKS */}
      <div className="hidden gap-8 text-sm font-semibold text-gray-600 md:flex">
        <a href="#" className="text-blue-600 transition hover:text-blue-700">
          Beranda
        </a>
        <a href="#kamar" className="transition hover:text-blue-600">
          Kamar
        </a>
                <a href="./RoomDetail" className="transition hover:text-blue-600">
          Detail Kamar
        </a>
        <a href="#fasilitas" className="transition hover:text-blue-600">
          Fasilitas
        </a>
        <a href="#kontak" className="transition hover:text-blue-600">
          Kontak
        </a>
      </div>

      {/* PROFILE / ACTIONS */}
      <div className="flex items-center gap-4">
        {user ? (
          <>
            <Link
              to="/my-bookings"
              className="hidden text-sm font-medium text-gray-600 hover:text-blue-600 md:inline"
            >
              Pesanan Saya
            </Link>
            <span className="hidden text-sm font-medium text-gray-600 md:inline">
              Halo, <strong className="capitalize text-gray-900">{user.name || "Tamu"}</strong>
            </span>
            <button
              onClick={handleLogout}
              className="rounded-lg border border-red-200 bg-red-50 px-4 py-2 text-xs font-semibold text-red-600 transition hover:bg-red-100"
            >
              Keluar
            </button>
          </>
        ) : (
          <div className="flex gap-2">
            <Link
              to="/login"
              className="rounded-lg px-4 py-2 text-xs font-semibold text-gray-700 hover:text-blue-600"
            >
              Masuk
            </Link>
            <Link
              to="/register"
              className="rounded-lg bg-blue-600 px-4 py-2 text-xs font-semibold text-white shadow-md hover:bg-blue-700"
            >
              Daftar
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}