import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthServices } from '../services/AuthServices';

function Register() {

  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const today = new Date().toISOString().split('T')[0];

  // Membuat variabel form untuk register
  const [form, setForm] = useState({
    email: '',
    password: '',
    name: ''
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    })
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // 2. Panggil AuthServices.register
      const response = await AuthServices.register(form);

      alert(response.message || "Registrasi Berhasil! Silakan Login.");

      // 3. Setelah berhasil daftar, arahkan user ke halaman Login
      navigate("/login");
    } catch (error) {
      alert(error.message || "Registrasi Gagal!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen w-full bg-white">

      {/* SISI KIRI: Branding & Gambar Hotel */}
      <div className="relative hidden w-1/2 flex-col justify-between bg-cover bg-center p-12 text-white lg:flex bg-[url('https://images.unsplash.com/photo-1566073771259-6a8506099945')]">

        {/* Overlay Biru Transparan */}
        <div className="absolute inset-0 bg-blue-900/80 backdrop-blur-[2px]" />

        {/* Logo */}
        <div className="relative z-10 flex items-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/20 font-bold text-white backdrop-blur-md">
            H
          </div>
          <span className="text-xl font-bold tracking-wide">
            Grand Nusantara
          </span>
        </div>

        {/* Teks Ucapan Selamat Datang */}
        <div className="relative z-10 my-auto max-w-lg space-y-4">
          <h1 className="text-4xl font-extrabold leading-tight">
            Selamat Datang di Hotel Grand Nusantara!
          </h1>
          <p className="text-sm leading-relaxed text-blue-100">
            Mulai pengalaman menginap mewah dan nyaman bersama kami. Buat akun Anda sekarang untuk menikmati kemudahan reservasi kamar dan berbagai penawaran eksklusif.
          </p>
        </div>

        {/* Footer Kiri */}
        <div className="relative z-10 flex items-center justify-between text-xs text-blue-200">
          <p>© 2026 Hotel Grand Nusantara</p>
          <div className="flex gap-4">
            <a href="#" className="hover:underline">Privasi</a>
            <a href="#" className="hover:underline">Syarat & Ketentuan</a>
            <a href="#" className="hover:underline">Kontak</a>
          </div>
        </div>
      </div>

      {/* SISI KANAN: Form Register */}
      <div className="relative flex w-full flex-col justify-between p-8 lg:w-1/2 lg:p-16">

        {/* Link Pindah ke Login */}
        <div className="flex justify-end text-sm text-gray-600">
          Sudah punya akun?{" "}
          <Link to="/login" className="ml-1 font-semibold text-blue-600 hover:underline">
            Masuk
          </Link>
        </div>

        {/* Form Container */}
        <div className="mx-auto my-auto w-full max-w-md space-y-6">
          <div>
            <h2 className="text-3xl font-bold text-gray-900">
              Daftar Akun
            </h2>
            <p className="mt-1 text-sm text-gray-500">
              Lengkapi data di bawah ini untuk membuat akun baru
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Nama Lengkap
              </label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Masukkan nama lengkap Anda"
                className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm focus:border-blue-600 focus:outline-none focus:ring-1 focus:ring-blue-600"
                required
              />
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="Masukkan email Anda"
                className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm focus:border-blue-600 focus:outline-none focus:ring-1 focus:ring-blue-600"
                required
              />
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                placeholder="Minimal 8 karakter"
                className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm focus:border-blue-600 focus:outline-none focus:ring-1 focus:ring-blue-600"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="mt-2 w-full rounded-lg bg-blue-600 py-3 text-sm font-semibold text-white shadow-md transition-all hover:bg-blue-700 active:scale-[0.99] disabled:opacity-70"
            >
              {loading ? "Memproses..." : "Daftar Akun"}
            </button>
          </form>
        </div>

        {/* Footer Ringkas Kanan (Mobile) */}
        <div className="mt-8 text-center text-xs text-gray-400 lg:hidden">
          © 2026 Hotel Grand Nusantara
        </div>
      </div>

    </div>
  );
}
export default Register;