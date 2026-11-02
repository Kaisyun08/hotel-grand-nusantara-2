
import EditRoom from "../../components/admin/EditRoom";
import React, { useEffect, useState } from "react";
import {
  LayoutDashboard,
  BedDouble,
  CalendarDays,
  Users,
  CreditCard,
  ChartNoAxesCombined,
  Settings,
  Bell,
  Search,
  Menu,
  X,
  ChevronDown,
  ArrowUpRight,
  ArrowDownRight,
  MoreHorizontal,
  CheckCircle2,
  Clock,
  LogIn,
  LogOut,
  Hotel,
  CalendarCheck,
  DoorOpen,
  Sparkles,
  Printer,
  Download,
  Plus,
  Pencil,
  Trash2,
  Save,
  Filter,
} from "lucide-react";

/* =====================================================
   NAVIGATION
===================================================== */

const navigation = [
  { name: "Dashboard", icon: LayoutDashboard },
  { name: "Kamar", icon: BedDouble },
  { name: "Reservasi", icon: CalendarDays },
  { name: "Tamu", icon: Users },
  { name: "Pembayaran", icon: CreditCard },
  { name: "Laporan", icon: ChartNoAxesCombined },
];

/* =====================================================
   DATA DASHBOARD
===================================================== */

const statistics = [
  {
    title: "Total Kamar",
    value: "250",
    description: "Seluruh kamar hotel",
    icon: BedDouble,
    color: "bg-blue-50 text-blue-600",
    change: "+4.5%",
    positive: true,
  },
  {
    title: "Kamar Tersedia",
    value: "38",
    description: "Siap untuk ditempati",
    icon: DoorOpen,
    color: "bg-emerald-50 text-emerald-600",
    change: "+2.8%",
    positive: true,
  },
  {
    title: "Kamar Terisi",
    value: "82",
    description: "Sedang ditempati tamu",
    icon: Hotel,
    color: "bg-amber-50 text-amber-600",
    change: "+8.2%",
    positive: true,
  },
  {
    title: "Total Reservasi",
    value: "96",
    description: "Reservasi bulan ini",
    icon: CalendarCheck,
    color: "bg-purple-50 text-purple-600",
    change: "-1.5%",
    positive: false,
  },
];

const reservations = [
  {
    id: "#GN-202601",
    guest: "Andi Pratama",
    room: "Deluxe Room",
    number: "201",
    checkin: "01 Nov 2026",
    checkout: "03 Nov 2026",
    status: "Check-in",
    paymentStatus: "Lunas",
    amount: 1500000,
    method: "Transfer",
    initials: "AP",
  },
  {
    id: "#GN-202602",
    guest: "Siti Rahma",
    room: "Superior Room",
    number: "105",
    checkin: "01 Nov 2026",
    checkout: "02 Nov 2026",
    status: "Reserved",
    paymentStatus: "Lunas",
    amount: 850000,
    method: "CASH",
    initials: "SR",
  },
  {
    id: "#GN-202603",
    guest: "Budi Santoso",
    room: "Executive Room",
    number: "305",
    checkin: "02 Nov 2026",
    checkout: "05 Nov 2026",
    status: "Pending",
    paymentStatus: "Belum Dibayar",
    amount: 2000000,
    method: "Transfer",
    initials: "BS",
  },
  {
    id: "#GN-202604",
    guest: "Dewi Anggraini",
    room: "Deluxe Room",
    number: "203",
    checkin: "02 Nov 2026",
    checkout: "04 Nov 2026",
    status: "Reserved",
    paymentStatus: "Belum Dibayar",
    amount: 1200000,
    method: "CASH",
    initials: "DA",
  },
  {
    id: "#GN-202605",
    guest: "Rizky Firmansyah",
    room: "Superior Room",
    number: "108",
    checkin: "03 Nov 2026",
    checkout: "04 Nov 2026",
    status: "Pending",
    paymentStatus: "Belum Dibayar",
    amount: 850000,
    method: "Transfer",
    initials: "RF",
  },
];

const activities = [
  {
    title: "Check-in berhasil",
    description: "Andi Pratama · Kamar 201",
    time: "10 menit yang lalu",
    icon: LogIn,
    color: "bg-emerald-50 text-emerald-600",
  },
  {
    title: "Reservasi baru",
    description: "Siti Rahma · Superior Room",
    time: "25 menit yang lalu",
    icon: CalendarCheck,
    color: "bg-blue-50 text-blue-600",
  },
  {
    title: "Pembayaran diterima",
    description: "Budi Santoso · Rp850.000",
    time: "1 jam yang lalu",
    icon: CreditCard,
    color: "bg-amber-50 text-amber-600",
  },
  {
    title: "Check-out selesai",
    description: "Dewi Anggraini · Kamar 203",
    time: "2 jam yang lalu",
    icon: LogOut,
    color: "bg-purple-50 text-purple-600",
  },
];

const chartData = [
  { day: "Sen", value: 45 },
  { day: "Sel", value: 65 },
  { day: "Rab", value: 52 },
  { day: "Kam", value: 78 },
  { day: "Jum", value: 60 },
  { day: "Sab", value: 92 },
  { day: "Min", value: 72 },
];

/* =====================================================
   HELPER
===================================================== */

const formatRupiah = (value) =>
  new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(value || 0);

function getStatusBadgeClass(status) {
  const s = String(status || "").toLowerCase();

  if (
    s.includes("check-in") ||
    s === "tersedia" ||
    s === "lunas" ||
    s === "check-out"
  ) {
    return "bg-emerald-100 text-emerald-800";
  }

  if (
    s.includes("reserved") ||
    s === "terisi" ||
    s === "confirmed"
  ) {
    return "bg-blue-100 text-blue-800";
  }

  if (
    s.includes("pending") ||
    s === "dibersihkan" ||
    s.includes("belum dibayar")
  ) {
    return "bg-amber-100 text-amber-800";
  }

  if (
    s.includes("batal") ||
    s.includes("cancel")
  ) {
    return "bg-red-100 text-red-800";
  }

  return "bg-slate-100 text-slate-800";
}

function getInitials(name) {
  return name
    .split(" ")
    .map((word) => word[0])
    .join("")
    .substring(0, 2)
    .toUpperCase();
}

function parseReservationDate(dateString) {
  const months = {
    Jan: 0,
    Feb: 1,
    Mar: 2,
    Apr: 3,
    May: 4,
    Jun: 5,
    Jul: 6,
    Aug: 7,
    Sep: 8,
    Oct: 9,
    Nov: 10,
    Dec: 11,
  };

  const parts = dateString.split(" ");
  if (parts.length !== 3) return null;

  return new Date(
    Number(parts[2]),
    months[parts[1]],
    Number(parts[0])
  );
}

/* =====================================================
   HALAMAN MANAJEMEN ADMIN
===================================================== */

function ManagementPage({ activeMenu, search }) {
  const [reservationData, setReservationData] = useState(() => {
    try {
      const saved = localStorage.getItem("gn_reservations");
      return saved ? JSON.parse(saved) : reservations;
    } catch {
      return reservations;
    }
  });

  const [roomData, setRoomData] = useState(() => {
    try {
      const saved = localStorage.getItem("gn_rooms");
      return saved
        ? JSON.parse(saved)
        : [
            { number: "101", type: "Superior Room", status: "Tersedia" },
            { number: "102", type: "Superior Room", status: "Terisi" },
            { number: "201", type: "Deluxe Room", status: "Terisi" },
            { number: "202", type: "Deluxe Room", status: "Dibersihkan" },
            { number: "301", type: "Executive Room", status: "Tersedia" },
          ];
    } catch {
      return [];
    }
  });

  const [hotelSettings, setHotelSettings] = useState(() => {
    try {
      const saved = localStorage.getItem("gn_settings");
      return saved
        ? JSON.parse(saved)
        : {
            hotelName: "Hotel Grand Nusantara",
            totalRooms: 250,
            adminName: "Administrator",
            email: "admin@grandnusantara.com",
          };
    } catch {
      return {
        hotelName: "Hotel Grand Nusantara",
        totalRooms: 250,
        adminName: "Administrator",
        email: "admin@grandnusantara.com",
      };
    }
  });

  const [roomForm, setRoomForm] = useState({
    number: "",
    type: "Superior Room",
    status: "Tersedia",
  });

  const [editingRoom, setEditingRoom] = useState(null);
  const [showRoomForm, setShowRoomForm] = useState(false);

  const [showEditRoom, setShowEditRoom] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState(null);

  const [reportPeriod, setReportPeriod] = useState("Semua Data");
  const [savedMessage, setSavedMessage] = useState("");

  const saveReservations = (data) => {
    setReservationData(data);
    localStorage.setItem("gn_reservations", JSON.stringify(data));
  };

  const saveRooms = (data) => {
    setRoomData(data);
    localStorage.setItem("gn_rooms", JSON.stringify(data));
  };

  // OTOMATIS MENGUBAH STATUS KAMAR SETELAH ESTIMASI SELESAI
  useEffect(() => {
    const checkRoomCompletion = () => {
      setRoomData((currentRooms) => {
        let changed = false;

        const updatedRooms = currentRooms.map((room) => {
          const finishAt = Number(room.estimatedCompletionAt);

        const isWorkingStatus = [
          "Maintenance",
          "Sedang Dibersihkan",
          "Perlu Dibersihkan",
          "Dibersihkan",
        ].includes(room.status);

          if (
            room.estimatedCompletionAt &&
            Number.isFinite(finishAt) &&
            finishAt <= Date.now() &&
            isWorkingStatus
          ) {
            changed = true;

            return {
              ...room,
              status: "Tersedia",
              estimatedCompletionAt: null,
              estimatedCompletion: null,
            };
          }

          return room;
        });

        if (changed) {
          localStorage.setItem("gn_rooms", JSON.stringify(updatedRooms));
          return updatedRooms;
        }

        return currentRooms;
      });
    };

    checkRoomCompletion();

    const interval = setInterval(checkRoomCompletion, 1000);

    return () => clearInterval(interval);
  }, []);
  
  const filtered = (items, fields) =>
    items.filter((item) =>
      fields.some((field) =>
        String(item[field] ?? "")
          .toLowerCase()
          .includes(search.toLowerCase())
      )
    );

  /* -----------------------------------------
     RESERVATION ACTIONS
  ----------------------------------------- */

  const updateReservation = (id, field, value) => {
    const updated = reservationData.map((item) =>
      item.id === id ? { ...item, [field]: value } : item
    );

    saveReservations(updated);
  };

  /* -----------------------------------------
     ROOM ACTIONS
  ----------------------------------------- */

  const submitRoom = (e) => {
    e.preventDefault();

    if (!roomForm.number.trim()) {
      alert("Nomor kamar harus diisi.");
      return;
    }

    if (
      !editingRoom &&
      roomData.some((room) => room.number === roomForm.number)
    ) {
      alert("Nomor kamar sudah digunakan.");
      return;
    }

    let updated;

    if (editingRoom) {
      updated = roomData.map((room) =>
        room.number === editingRoom
          ? { ...room, ...roomForm }
          : room
      );
    } else {
      updated = [...roomData, { ...roomForm, status: "Tersedia" }];
    }

    saveRooms(updated);
    setRoomForm({
      number: "",
      type: "Superior Room",
      status: "Tersedia",
    });
    setEditingRoom(null);
    setShowRoomForm(false);
  };

  // TOMBOL PENSIL MEMBUKA HALAMAN EDIT KONDISI KAMAR
  const editRoom = (room) => {
    setSelectedRoom(room);
    setShowEditRoom(true);
    setShowRoomForm(false);
  };

 
  // MENYIMPAN HASIL EDIT KONDISI KAMAR
  const handleSaveRoom = (updatedRoom) => {
    const updated = roomData.map((room) => {
      if (room.number !== selectedRoom.number) {
        return room;
      }

      return {
        ...room,
        ...updatedRoom,
        number: selectedRoom.number,
      };
    });

    saveRooms(updated);
    setShowEditRoom(false);
    setSelectedRoom(null);
  };


  // MEMBATALKAN EDIT DAN KEMBALI KE DAFTAR KAMAR
  const handleCancelEditRoom = () => {
    setShowEditRoom(false);
    setSelectedRoom(null);
  };

  const deleteRoom = (number) => {
    if (!window.confirm(`Hapus kamar nomor ${number}?`)) return;

    saveRooms(roomData.filter((room) => room.number !== number));
  };

  const changeRoomStatus = (number, status) => {
    saveRooms(
      roomData.map((room) =>
        room.number === number ? { ...room, status } : room
      )
    );
  };

  /* -----------------------------------------
     REPORT FILTER
  ----------------------------------------- */

  const latestDate = new Date(2026, 10, 3);

  const filteredReportReservations = reservationData.filter((item) => {
    if (reportPeriod === "Semua Data") return true;

    const date = parseReservationDate(item.checkin);
    if (!date) return false;

    const diffDays = Math.floor(
      (latestDate - date) / (1000 * 60 * 60 * 24)
    );

    if (reportPeriod === "Harian") return diffDays === 0;
    if (reportPeriod === "Mingguan") return diffDays >= 0 && diffDays < 7;
    if (reportPeriod === "Bulanan") {
      return (
        date.getMonth() === latestDate.getMonth() &&
        date.getFullYear() === latestDate.getFullYear()
      );
    }
    if (reportPeriod === "Tahunan") {
      return date.getFullYear() === latestDate.getFullYear();
    }

    return true;
  });

  const totalRevenue = filteredReportReservations
    .filter((item) => item.paymentStatus === "Lunas")
    .reduce((total, item) => total + item.amount, 0);

  const paidCount = filteredReportReservations.filter(
    (item) => item.paymentStatus === "Lunas"
  ).length;

  const unpaidCount = filteredReportReservations.filter(
    (item) => item.paymentStatus !== "Lunas"
  ).length;

  const confirmedCount = filteredReportReservations.filter(
    (item) => ["Reserved", "Check-in", "Check-out"].includes(item.status)
  ).length;

  const cancelledCount = filteredReportReservations.filter(
    (item) => item.status === "Dibatalkan"
  ).length;

  const pageTitle = {
    Kamar: "Manajemen Kamar",
    Reservasi: "Manajemen Reservasi",
    Tamu: "Data Tamu Hotel",
    Pembayaran: "Manajemen Pembayaran",
    Laporan: "Laporan Hotel",
    Pengaturan: "Pengaturan Sistem",
  };

  /* =====================================================
     RENDER
  ===================================================== */

  return (
    <div className="space-y-6">

      {/* PAGE HEADER */}
      <div className="flex flex-col gap-1">
        <span className="text-xs font-semibold uppercase tracking-wider text-blue-600">
          HOTEL MANAGEMENT
        </span>

        <h1 className="text-2xl font-bold text-slate-900">
          {pageTitle[activeMenu]}
        </h1>

        <p className="text-sm text-slate-500">
          Kelola informasi dan aktivitas Hotel Grand Nusantara.
        </p>
      </div>

      {/* =====================================================
          HALAMAN KAMAR
      ===================================================== */}

      {activeMenu === "Kamar" && (
        <>
          {showEditRoom && selectedRoom ? (
            <EditRoom
              room={selectedRoom}
              onSave={handleSaveRoom}
              onCancel={handleCancelEditRoom}
            />
          ) : (
            <div className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm space-y-5">

              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h3 className="text-base font-semibold text-slate-900">
                    Daftar Kamar
                  </h3>
                  <p className="text-xs text-slate-500">
                    Kelola informasi dan status kamar hotel.
                  </p>
                </div>

                <button
                  onClick={() => {
                    setEditingRoom(null);
                    setRoomForm({
                      number: "",
                      type: "Superior Room",
                      status: "Tersedia",
                    });
                    setShowRoomForm(!showRoomForm);
                  }}
                  className="inline-flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-xs font-semibold text-white hover:bg-blue-700"
                >
                  <Plus size={15} />
                  Tambah Kamar
                </button>
              </div>

              {showRoomForm && (
                <form
                  onSubmit={submitRoom}
                  className="grid grid-cols-1 gap-4 rounded-xl border border-blue-100 bg-blue-50/50 p-5 sm:grid-cols-3"
                >
                  <div>
                    <label className="mb-1 block text-xs font-semibold text-slate-700">
                      Nomor Kamar
                    </label>
                    <input
                      required
                      value={roomForm.number}
                      onChange={(e) =>
                        setRoomForm({ ...roomForm, number: e.target.value })
                      }
                      placeholder="Contoh: 401"
                      className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <label className="mb-1 block text-xs font-semibold text-slate-700">
                      Tipe Kamar
                    </label>
                    <select
                      value={roomForm.type}
                      onChange={(e) =>
                        setRoomForm({ ...roomForm, type: e.target.value })
                      }
                      className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm outline-none"
                    >
                      <option>Superior Room</option>
                      <option>Deluxe Room</option>
                      <option>Executive Room</option>
                      <option>Suite Room</option>
                    </select>
                  </div>

                  <div className="flex items-end gap-2">
                    <button
                      type="submit"
                      className="rounded-lg bg-blue-600 px-4 py-2 text-xs font-semibold text-white hover:bg-blue-700"
                    >
                      <Save size={14} className="mr-1 inline" />
                      Simpan Kamar
                    </button>

                    <button
                      type="button"
                      onClick={() => setShowRoomForm(false)}
                      className="rounded-lg border border-slate-200 bg-white px-4 py-2 text-xs font-semibold text-slate-600"
                    >
                      Batal
                    </button>
                  </div>
                </form>
              )}

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                {[
                  {
                    label: "Kamar Tersedia",
                    value: roomData.filter((r) => r.status === "Tersedia").length,
                    color: "text-emerald-600",
                  },
                  {
                    label: "Kamar Terisi",
                    value: roomData.filter((r) => r.status === "Terisi").length,
                    color: "text-blue-600",
                  },
                  {
                    label: "Dibersihkan",
                    value: roomData.filter((r) =>
                      ["Dibersihkan", "Perlu Dibersihkan", "Sedang Dibersihkan"].includes(r.status)
                    ).length,
                    color: "text-amber-600",
                  },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="rounded-xl border border-slate-200 p-4"
                  >
                    <p className="text-xs text-slate-500">{item.label}</p>
                    <h2 className={`mt-1 text-2xl font-bold ${item.color}`}>
                      {item.value}
                    </h2>
                  </div>
                ))}
              </div>

              {/* TABEL KAMAR: HANYA 4 KOLOM */}
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm text-slate-600">
                  <thead className="border-b border-slate-200 bg-slate-50 text-xs font-semibold uppercase text-slate-500">
                    <tr>
                      <th className="px-4 py-3">NO. KAMAR</th>
                      <th className="px-4 py-3">TIPE KAMAR</th>
                      <th className="px-4 py-3">STATUS</th>
                      <th className="px-4 py-3">AKSI</th>
                    </tr>
                  </thead>

                  <tbody className="divide-y divide-slate-100">
                    {filtered(roomData, ["number", "type", "status"]).map((room) => (
                      <tr key={room.number} className="hover:bg-slate-50">
                        <td className="px-4 py-3 font-semibold text-slate-900">
                          {room.number}
                        </td>

                        <td className="px-4 py-3">
                          {room.type}
                        </td>

                        <td className="px-4 py-3">
                      <div className="flex flex-col items-start gap-2">
                        <span
                          className={`rounded-full px-2.5 py-1 text-xs font-medium ${getStatusBadgeClass(room.status)}`}
                        >
                          {room.status}
                        </span>

                       {room.estimatedCompletionAt &&
                        [
                          "Maintenance",
                          "Sedang Dibersihkan",
                          "Perlu Dibersihkan",
                          "Dibersihkan",
                        ].includes(room.status) && (
                            <div className="flex items-center gap-1 text-xs text-slate-500">
                              <Clock size={12} />
                              <span>
                                Selesai:{" "}
                                {new Date(
                                  Number(room.estimatedCompletionAt)
                                ).toLocaleString("id-ID", {
                                  day: "2-digit",
                                  month: "short",
                                  year: "numeric",
                                  hour: "2-digit",
                                  minute: "2-digit",
                                })}
                              </span>
                            </div>
                          )}
                      </div>
                    </td>

                        <td className="px-4 py-3">
                          <div className="flex gap-2">
                            <button
                              onClick={() => editRoom(room)}
                              title="Edit kondisi kamar"
                              className="rounded-lg bg-blue-50 p-2 text-blue-600 hover:bg-blue-100"
                            >
                              <Pencil size={14} />
                            </button>

                            <button
                              onClick={() => deleteRoom(room.number)}
                              title="Hapus kamar"
                              className="rounded-lg bg-red-50 p-2 text-red-600 hover:bg-red-100"
                            >
                              <Trash2 size={14} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}

                    {filtered(roomData, ["number", "type", "status"]).length === 0 && (
                      <tr>
                        <td colSpan="4" className="px-4 py-8 text-center text-slate-400">
                          Data kamar tidak ditemukan.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>

              <p className="text-xs italic text-slate-400">
                Data kamar yang ditampilkan merupakan contoh dan belum terhubung ke database.
              </p>
            </div>
          )}
        </>
      )}

      {/* =====================================================
          HALAMAN RESERVASI
      ===================================================== */}

      {activeMenu === "Reservasi" && (
        <div className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm space-y-5">

          <div>
            <h3 className="text-base font-semibold text-slate-900">
              Daftar Reservasi
            </h3>
            <p className="text-xs text-slate-500">
              Periksa reservasi yang masuk dari halaman pemesanan tamu.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div className="rounded-xl bg-blue-50 p-4">
              <p className="text-xs text-blue-600">Total Reservasi</p>
              <h2 className="mt-1 text-2xl font-bold text-blue-700">
                {reservationData.length}
              </h2>
            </div>
            <div className="rounded-xl bg-amber-50 p-4">
              <p className="text-xs text-amber-600">Menunggu Konfirmasi</p>
              <h2 className="mt-1 text-2xl font-bold text-amber-700">
                {reservationData.filter((r) => r.status === "Pending").length}
              </h2>
            </div>
            <div className="rounded-xl bg-emerald-50 p-4">
              <p className="text-xs text-emerald-600">Sudah Dikonfirmasi</p>
              <h2 className="mt-1 text-2xl font-bold text-emerald-700">
                {reservationData.filter((r) =>
                  ["Reserved", "Check-in", "Check-out"].includes(r.status)
                ).length}
              </h2>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-slate-600">
              <thead className="border-b border-slate-200 bg-slate-50 text-xs font-semibold uppercase text-slate-500">
                <tr>
                  <th className="px-4 py-3">ID RESERVASI</th>
                  <th className="px-4 py-3">NAMA TAMU</th>
                  <th className="px-4 py-3">KAMAR</th>
                  <th className="px-4 py-3">CHECK-IN</th>
                  <th className="px-4 py-3">CHECK-OUT</th>
                  <th className="px-4 py-3">STATUS RESERVASI</th>
                  <th className="px-4 py-3">PEMBAYARAN</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-100">
                {filtered(reservationData, ["id", "guest", "room", "number", "status"]).map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50">
                    <td className="px-4 py-3 font-medium text-blue-600">
                      {item.id}
                    </td>
                    <td className="px-4 py-3 font-semibold text-slate-900">
                      {item.guest}
                    </td>
                    <td className="px-4 py-3">
                      {item.room}
                      <span className="block text-xs text-slate-400">
                        Kamar {item.number}
                      </span>
                    </td>
                    <td className="px-4 py-3">{item.checkin}</td>
                    <td className="px-4 py-3">{item.checkout}</td>
                    <td className="px-4 py-3">
                      <select
                        value={item.status}
                        onChange={(e) =>
                          updateReservation(item.id, "status", e.target.value)
                        }
                        className="rounded-lg border border-slate-200 bg-white px-2 py-1.5 text-xs outline-none focus:border-blue-500"
                      >
                        <option value="Pending">Pending</option>
                        <option value="Reserved">Confirmed</option>
                        <option value="Check-in">Check-in</option>
                        <option value="Check-out">Check-out</option>
                        <option value="Dibatalkan">Dibatalkan</option>
                      </select>
                    </td>
                    <td className="px-4 py-3">
                      <span className={`rounded-full px-2.5 py-1 text-xs font-medium ${getStatusBadgeClass(item.paymentStatus)}`}>
                        {item.paymentStatus}
                      </span>
                    </td>
                  </tr>
                ))}

                {filtered(reservationData, ["id", "guest", "room", "number", "status"]).length === 0 && (
                  <tr>
                    <td colSpan="7" className="px-4 py-8 text-center text-slate-400">
                      Tidak ada reservasi yang ditemukan.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <p className="text-xs italic text-slate-400">
            Admin hanya memeriksa dan mengubah status reservasi. Pemesanan baru dilakukan oleh tamu melalui halaman booking.
          </p>
        </div>
      )}

      {/* =====================================================
          HALAMAN TAMU
      ===================================================== */}

      {activeMenu === "Tamu" && (
        <div className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm space-y-5">

          <div>
            <h3 className="text-base font-semibold text-slate-900">
              Data Tamu Hotel
            </h3>
            <p className="text-xs text-slate-500">
              Informasi tamu berdasarkan data reservasi.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="rounded-xl bg-blue-50 p-4">
              <p className="text-xs text-blue-600">Total Data Tamu</p>
              <h2 className="mt-1 text-2xl font-bold text-blue-700">
                {new Set(reservationData.map((r) => r.guest)).size}
              </h2>
            </div>
            <div className="rounded-xl bg-emerald-50 p-4">
              <p className="text-xs text-emerald-600">Tamu Check-in</p>
              <h2 className="mt-1 text-2xl font-bold text-emerald-700">
                {reservationData.filter((r) => r.status === "Check-in").length}
              </h2>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-slate-600">
              <thead className="border-b border-slate-200 bg-slate-50 text-xs font-semibold uppercase text-slate-500">
                <tr>
                  <th className="px-4 py-3">NAMA TAMU</th>
                  <th className="px-4 py-3">ID RESERVASI</th>
                  <th className="px-4 py-3">TIPE KAMAR</th>
                  <th className="px-4 py-3">NO. KAMAR</th>
                  <th className="px-4 py-3">STATUS</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-100">
                {filtered(reservationData, ["guest", "id", "room", "number"]).map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2.5">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-50 text-xs font-bold text-blue-600">
                          {item.initials || getInitials(item.guest)}
                        </div>
                        <strong className="text-slate-900">{item.guest}</strong>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-blue-600">{item.id}</td>
                    <td className="px-4 py-3">{item.room}</td>
                    <td className="px-4 py-3">{item.number}</td>
                    <td className="px-4 py-3">
                      <span className={`rounded-full px-2.5 py-1 text-xs font-medium ${getStatusBadgeClass(item.status)}`}>
                        {item.status}
                      </span>
                    </td>
                  </tr>
                ))}

                {filtered(reservationData, ["guest", "id", "room", "number"]).length === 0 && (
                  <tr>
                    <td colSpan="5" className="px-4 py-8 text-center text-slate-400">
                      Data tamu tidak ditemukan.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* =====================================================
          HALAMAN PEMBAYARAN
      ===================================================== */}

      {activeMenu === "Pembayaran" && (
        <div className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm space-y-5">

          <div>
            <h3 className="text-base font-semibold text-slate-900">
              Riwayat Pembayaran
            </h3>
            <p className="text-xs text-slate-500">
              Pantau transaksi dan ubah status pembayaran tamu.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div className="rounded-xl bg-blue-50 p-4">
              <p className="text-xs text-blue-600">Total Transaksi</p>
              <h2 className="mt-1 text-2xl font-bold text-blue-700">
                {reservationData.length}
              </h2>
            </div>
            <div className="rounded-xl bg-emerald-50 p-4">
              <p className="text-xs text-emerald-600">Pembayaran Lunas</p>
              <h2 className="mt-1 text-2xl font-bold text-emerald-700">
                {paidCount}
              </h2>
            </div>
            <div className="rounded-xl bg-amber-50 p-4">
              <p className="text-xs text-amber-600">Belum Dibayar</p>
              <h2 className="mt-1 text-2xl font-bold text-amber-700">
                {unpaidCount}
              </h2>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-slate-600">
              <thead className="border-b border-slate-200 bg-slate-50 text-xs font-semibold uppercase text-slate-500">
                <tr>
                  <th className="px-4 py-3">ID PEMBAYARAN</th>
                  <th className="px-4 py-3">NAMA TAMU</th>
                  <th className="px-4 py-3">JUMLAH</th>
                  <th className="px-4 py-3">METODE</th>
                  <th className="px-4 py-3">STATUS PEMBAYARAN</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-100">
                {filtered(reservationData, ["id", "guest", "method", "paymentStatus"]).map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50">
                    <td className="px-4 py-3 font-medium text-slate-900">
                      PAY-{item.id.replace("#GN-", "")}
                    </td>
                    <td className="px-4 py-3 font-semibold text-slate-900">
                      {item.guest}
                    </td>
                    <td className="px-4 py-3 font-semibold text-blue-600">
                      {formatRupiah(item.amount)}
                    </td>
                    <td className="px-4 py-3">{item.method}</td>
                    <td className="px-4 py-3">
                      <select
                        value={item.paymentStatus}
                        onChange={(e) =>
                          updateReservation(item.id, "paymentStatus", e.target.value)
                        }
                        className="rounded-lg border border-slate-200 bg-white px-2 py-1.5 text-xs outline-none focus:border-blue-500"
                      >
                        <option value="Lunas">Lunas</option>
                        <option value="Belum Dibayar">Belum Dibayar</option>
                      </select>
                    </td>
                  </tr>
                ))}

                {filtered(reservationData, ["id", "guest", "method", "paymentStatus"]).length === 0 && (
                  <tr>
                    <td colSpan="5" className="px-4 py-8 text-center text-slate-400">
                      Data pembayaran tidak ditemukan.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <div className="rounded-xl bg-slate-50 p-4">
            <p className="text-xs text-slate-500">Total pembayaran yang sudah diterima</p>
            <h2 className="mt-1 text-2xl font-bold text-emerald-600">
              {formatRupiah(
                reservationData
                  .filter((r) => r.paymentStatus === "Lunas")
                  .reduce((total, r) => total + r.amount, 0)
              )}
            </h2>
          </div>
        </div>
      )}

      {/* =====================================================
          HALAMAN LAPORAN
      ===================================================== */}

      {activeMenu === "Laporan" && (
        <div className="space-y-5">

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h3 className="text-base font-semibold text-slate-900">
                Ringkasan Laporan Hotel
              </h3>
              <p className="text-xs text-slate-500">
                Rekap aktivitas reservasi dan pendapatan hotel.
              </p>
            </div>

            <div className="flex flex-wrap gap-2">
              <select
                value={reportPeriod}
                onChange={(e) => setReportPeriod(e.target.value)}
                className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs text-slate-700 outline-none"
              >
                <option>Semua Data</option>
                <option>Harian</option>
                <option>Mingguan</option>
                <option>Bulanan</option>
                <option>Tahunan</option>
              </select>

              <button
                onClick={() => window.print()}
                className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-xs font-semibold text-white hover:bg-blue-700"
              >
                <Printer size={14} />
                Cetak / PDF
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <p className="text-xs text-slate-500">Total Pendapatan</p>
              <h2 className="mt-2 text-xl font-bold text-emerald-600">
                {formatRupiah(totalRevenue)}
              </h2>
              <span className="text-xs text-slate-400">Pembayaran lunas</span>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <p className="text-xs text-slate-500">Total Reservasi</p>
              <h2 className="mt-2 text-2xl font-bold text-slate-900">
                {filteredReportReservations.length}
              </h2>
              <span className="text-xs text-slate-400">Dalam periode laporan</span>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <p className="text-xs text-slate-500">Reservasi Dikonfirmasi</p>
              <h2 className="mt-2 text-2xl font-bold text-blue-600">
                {confirmedCount}
              </h2>
              <span className="text-xs text-slate-400">Termasuk check-in dan check-out</span>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <p className="text-xs text-slate-500">Reservasi Dibatalkan</p>
              <h2 className="mt-2 text-2xl font-bold text-red-600">
                {cancelledCount}
              </h2>
              <span className="text-xs text-slate-400">Dalam periode laporan</span>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">

            {/* PAYMENT SUMMARY */}
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm space-y-5">
              <h3 className="font-semibold text-slate-900">
                Ringkasan Pembayaran
              </h3>

              <div className="space-y-4">
                <div>
                  <div className="mb-2 flex justify-between text-sm">
                    <span className="text-slate-600">Lunas</span>
                    <strong className="text-emerald-600">{paidCount}</strong>
                  </div>
                  <div className="h-2 overflow-hidden rounded-full bg-slate-100">
                    <div
                      className="h-full rounded-full bg-emerald-500"
                      style={{
                        width: `${
                          filteredReportReservations.length
                            ? (paidCount / filteredReportReservations.length) * 100
                            : 0
                        }%`,
                      }}
                    />
                  </div>
                </div>

                <div>
                  <div className="mb-2 flex justify-between text-sm">
                    <span className="text-slate-600">Belum Dibayar</span>
                    <strong className="text-amber-600">{unpaidCount}</strong>
                  </div>
                  <div className="h-2 overflow-hidden rounded-full bg-slate-100">
                    <div
                      className="h-full rounded-full bg-amber-500"
                      style={{
                        width: `${
                          filteredReportReservations.length
                            ? (unpaidCount / filteredReportReservations.length) * 100
                            : 0
                        }%`,
                      }}
                    />
                  </div>
                </div>
              </div>

              <div className="border-t border-slate-100 pt-4">
                <p className="text-xs text-slate-500">
                  Total uang diterima
                </p>
                <h2 className="mt-1 text-2xl font-bold text-emerald-600">
                  {formatRupiah(totalRevenue)}
                </h2>
              </div>
            </div>

            {/* ROOM SUMMARY */}
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm space-y-5">
              <h3 className="font-semibold text-slate-900">
                Ringkasan Status Kamar
              </h3>

              {[
                {
                  label: "Tersedia",
                  count: roomData.filter((r) => r.status === "Tersedia").length,
                  color: "bg-emerald-500",
                },
                {
                  label: "Terisi",
                  count: roomData.filter((r) => r.status === "Terisi").length,
                  color: "bg-blue-600",
                },
                {
                  label: "Dibersihkan",
                  count: roomData.filter((r) =>
                    ["Dibersihkan", "Perlu Dibersihkan", "Sedang Dibersihkan"].includes(r.status)
                  ).length,
                  color: "bg-amber-500",
                },
              ].map((item) => (
                <div
                  key={item.label}
                  className="flex items-center justify-between"
                >
                  <div className="flex items-center gap-2">
                    <span className={`h-3 w-3 rounded-full ${item.color}`} />
                    <span className="text-sm text-slate-600">{item.label}</span>
                  </div>
                  <strong className="text-sm text-slate-900">{item.count}</strong>
                </div>
              ))}

              <div className="border-t border-slate-100 pt-4">
                <p className="text-xs text-slate-500">
                  Jumlah kamar dalam data contoh
                </p>
                <h2 className="mt-1 text-2xl font-bold text-slate-900">
                  {roomData.length}
                </h2>
                <p className="mt-1 text-xs text-slate-400">
                  Total inventaris hotel pada pengaturan: {hotelSettings.totalRooms} kamar
                </p>
              </div>
            </div>
          </div>

          {/* DETAIL REPORT */}
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm space-y-4">
            <div>
              <h3 className="font-semibold text-slate-900">
                Detail Data Laporan
              </h3>
              <p className="text-xs text-slate-500">
                Daftar reservasi dan transaksi pada periode yang dipilih.
              </p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm text-slate-600">
                <thead className="border-b border-slate-200 bg-slate-50 text-xs font-semibold uppercase text-slate-500">
                  <tr>
                    <th className="px-4 py-3">ID RESERVASI</th>
                    <th className="px-4 py-3">NAMA TAMU</th>
                    <th className="px-4 py-3">CHECK-IN</th>
                    <th className="px-4 py-3">STATUS RESERVASI</th>
                    <th className="px-4 py-3">PEMBAYARAN</th>
                    <th className="px-4 py-3">JUMLAH</th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-slate-100">
                  {filteredReportReservations.map((item) => (
                    <tr key={item.id}>
                      <td className="px-4 py-3 text-blue-600">{item.id}</td>
                      <td className="px-4 py-3 font-semibold text-slate-900">
                        {item.guest}
                      </td>
                      <td className="px-4 py-3">{item.checkin}</td>
                      <td className="px-4 py-3">
                        <span className={`rounded-full px-2 py-1 text-xs ${getStatusBadgeClass(item.status)}`}>
                          {item.status}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <span className={`rounded-full px-2 py-1 text-xs ${getStatusBadgeClass(item.paymentStatus)}`}>
                          {item.paymentStatus}
                        </span>
                      </td>
                      <td className="px-4 py-3 font-semibold text-slate-900">
                        {formatRupiah(item.amount)}
                      </td>
                    </tr>
                  ))}

                  {filteredReportReservations.length === 0 && (
                    <tr>
                      <td colSpan="6" className="px-4 py-8 text-center text-slate-400">
                        Tidak ada data pada periode ini.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          <p className="text-xs italic text-slate-400">
            Laporan menggunakan data contoh. Fitur Cetak / PDF membuka dialog cetak browser.
          </p>
        </div>
      )}

      {/* =====================================================
          HALAMAN PENGATURAN
      ===================================================== */}

      {activeMenu === "Pengaturan" && (
        <div className="max-w-2xl rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm space-y-5">

          <div>
            <h3 className="text-base font-semibold text-slate-900">
              Pengaturan Hotel
            </h3>
            <p className="text-xs text-slate-500">
              Kelola informasi dasar Hotel Grand Nusantara.
            </p>
          </div>

          <div className="space-y-4">

            <div>
              <label className="mb-1 block text-xs font-semibold text-slate-700">
                Nama Hotel
              </label>
              <input
                type="text"
                value={hotelSettings.hotelName}
                onChange={(e) =>
                  setHotelSettings({
                    ...hotelSettings,
                    hotelName: e.target.value,
                  })
                }
                className="w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="mb-1 block text-xs font-semibold text-slate-700">
                Total Kamar Hotel
              </label>
              <input
                type="number"
                min="1"
                value={hotelSettings.totalRooms}
                onChange={(e) =>
                  setHotelSettings({
                    ...hotelSettings,
                    totalRooms: Number(e.target.value),
                  })
                }
                className="w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="mb-1 block text-xs font-semibold text-slate-700">
                Nama Administrator
              </label>
              <input
                type="text"
                value={hotelSettings.adminName}
                onChange={(e) =>
                  setHotelSettings({
                    ...hotelSettings,
                    adminName: e.target.value,
                  })
                }
                className="w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="mb-1 block text-xs font-semibold text-slate-700">
                Email Administrator
              </label>
              <input
                type="email"
                value={hotelSettings.email}
                onChange={(e) =>
                  setHotelSettings({
                    ...hotelSettings,
                    email: e.target.value,
                  })
                }
                className="w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-blue-500"
              />
            </div>

            <button
              onClick={() => {
                localStorage.setItem(
                  "gn_settings",
                  JSON.stringify(hotelSettings)
                );
                setSavedMessage("Pengaturan berhasil disimpan.");
                setTimeout(() => setSavedMessage(""), 3000);
              }}
              className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-5 py-2.5 text-xs font-semibold text-white transition hover:bg-blue-700"
            >
              <Save size={15} />
              Simpan Pengaturan
            </button>

            {savedMessage && (
              <p className="text-xs font-medium text-emerald-600">
                <CheckCircle2 size={14} className="mr-1 inline" />
                {savedMessage}
              </p>
            )}
          </div>
        </div>
      )}

    </div>
  );
}

/* =====================================================
   DASHBOARD UTAMA
===================================================== */

export default function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState("Dashboard");
  const [period, setPeriod] = useState("7 Hari Terakhir");
  const [search, setSearch] = useState("");

  const filteredReservations = reservations.filter((item) =>
    `${item.guest} ${item.id} ${item.room} ${item.number}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <div className="flex min-h-screen bg-slate-100 font-sans text-slate-800">

      {/* SIDEBAR */}
      <aside
        className={`fixed inset-y-0 left-0 z-40 flex w-64 flex-col border-r border-slate-200 bg-white transition-transform lg:static lg:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between border-b border-slate-100 px-6 py-5">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-white shadow-md shadow-blue-500/20">
              <Hotel size={22} />
            </div>
            <div>
              <h2 className="text-sm font-extrabold tracking-wide text-slate-900">
                GRAND NUSANTARA
              </h2>
              <span className="text-[10px] font-semibold text-slate-400">
                HOTEL MANAGEMENT
              </span>
            </div>
          </div>

          <button
            className="text-slate-400 hover:text-slate-600 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          >
            <X size={20} />
          </button>
        </div>

        <div className="px-6 pt-5 text-[11px] font-bold tracking-wider text-slate-400 uppercase">
          MENU UTAMA
        </div>

        <nav className="space-y-1 p-4">
          {navigation.map((item) => {
            const Icon = item.icon;
            const isSelected = activeMenu === item.name;

            return (
              <button
                key={item.name}
                className={`flex w-full items-center justify-between rounded-xl px-4 py-3 text-xs font-semibold transition ${
                  isSelected
                    ? "bg-blue-600 text-white shadow-md shadow-blue-500/20"
                    : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                }`}
                onClick={() => {
                  setActiveMenu(item.name);
                  setSidebarOpen(false);
                }}
              >
                <div className="flex items-center gap-3">
                  <Icon size={18} />
                  <span>{item.name}</span>
                </div>

                {item.name === "Reservasi" && (
                  <span
                    className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${
                      isSelected
                        ? "bg-white/20 text-white"
                        : "bg-blue-100 text-blue-600"
                    }`}
                  >
                    8
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        <div className="px-6 pt-3 text-[11px] font-bold tracking-wider text-slate-400 uppercase">
          PREFERENSI
        </div>

        <div className="p-4">
          <button
            className={`flex w-full items-center gap-3 rounded-xl px-4 py-3 text-xs font-semibold transition ${
              activeMenu === "Pengaturan"
                ? "bg-blue-600 text-white shadow-md shadow-blue-500/20"
                : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
            }`}
            onClick={() => {
              setActiveMenu("Pengaturan");
              setSidebarOpen(false);
            }}
          >
            <Settings size={18} />
            <span>Pengaturan</span>
          </button>
        </div>

        <div className="mt-auto space-y-4 p-4">
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-700 p-4 text-white shadow-md">
            <div className="mb-2 text-white/80">
              <Sparkles size={18} />
            </div>
            <h4 className="text-xs font-bold">Butuh Bantuan?</h4>
            <p className="mt-1 text-[11px] text-blue-100">
              Hubungi tim support kami jika mengalami kendala.
            </p>
            <button
              onClick={() => alert("Silakan hubungi administrator hotel.")}
              className="mt-3 w-full rounded-lg bg-white/20 py-2 text-[11px] font-semibold text-white backdrop-blur-md transition hover:bg-white/30"
            >
              Hubungi Support
            </button>
          </div>

          <div className="flex items-center justify-between rounded-xl border border-slate-200/80 bg-slate-50 p-2.5">
            <div className="flex items-center gap-2.5">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600 text-xs font-bold text-white">
                AD
              </div>
              <div className="flex flex-col text-left">
                <strong className="text-xs font-semibold text-slate-900">
                  Administrator
                </strong>
                <span className="text-[10px] text-slate-400">
                  Super Admin
                </span>
              </div>
            </div>
            <MoreHorizontal size={18} className="text-slate-400" />
          </div>
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-1 overflow-x-hidden">

        {/* HEADER */}
        <header className="sticky top-0 z-30 flex items-center justify-between border-b border-slate-200/80 bg-white/90 px-6 py-4 backdrop-blur-md">
          <div className="flex items-center gap-4">
            <button
              className="text-slate-600 hover:text-slate-900 lg:hidden"
              onClick={() => setSidebarOpen(true)}
            >
              <Menu size={22} />
            </button>

            <div>
              <div className="text-[11px] font-medium text-slate-400">
                Hotel Management /{" "}
                <span className="text-slate-600">{activeMenu}</span>
              </div>
              <h2 className="text-xl font-bold text-slate-900">
                {activeMenu}
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="relative hidden md:block">
              <Search
                size={16}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              />
              <input
                placeholder="Cari sesuatu..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-64 rounded-xl border border-slate-200 bg-slate-50 py-2 pl-9 pr-4 text-xs text-slate-800 placeholder-slate-400 focus:border-blue-600 focus:bg-white focus:outline-none"
              />
            </div>

            <button
              onClick={() => alert("Tidak ada notifikasi baru.")}
              className="relative rounded-xl border border-slate-200/80 bg-slate-50 p-2.5 text-slate-600 hover:bg-slate-100"
            >
              <Bell size={18} />
              <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-red-500" />
            </button>

            <div className="flex items-center gap-3 rounded-xl border border-slate-200/80 bg-slate-50 px-3 py-1.5">
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-blue-600 text-xs font-bold text-white">
                AD
              </div>
              <div className="hidden text-left md:block">
                <strong className="block text-xs font-semibold text-slate-900">
                  Admin Hotel
                </strong>
                <span className="block text-[10px] text-slate-400">
                  Administrator
                </span>
              </div>
              <ChevronDown size={14} className="text-slate-400" />
            </div>
          </div>
        </header>

        {/* DASHBOARD BODY */}
        <section className="space-y-8 p-6 md:p-8">

          {activeMenu === "Dashboard" ? (
            <>

              {/* WELCOME */}
              <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
                <div>
                  <span className="text-xs font-semibold uppercase tracking-wider text-blue-600">
                    OVERVIEW HOTEL
                  </span>
                  <h1 className="text-2xl font-bold text-slate-900">
                    Selamat Datang, Admin!
                  </h1>
                  <p className="text-sm text-slate-500">
                    Berikut ringkasan aktivitas Hotel Grand Nusantara hari ini.
                  </p>
                </div>

                <div className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2 text-xs font-medium text-slate-600 shadow-sm">
                  <CalendarDays size={16} className="text-blue-600" />
                  <span>01 November 2026</span>
                </div>
              </div>

              {/* STATS GRID */}
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
                {statistics.map((item) => {
                  const Icon = item.icon;

                  return (
                    <div
                      key={item.title}
                      className="space-y-3 rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm"
                    >
                      <div className="flex items-center justify-between">
                        <div className={`flex h-11 w-11 items-center justify-center rounded-xl ${item.color}`}>
                          <Icon size={20} />
                        </div>
                        <button className="text-slate-400 hover:text-slate-600">
                          <MoreHorizontal size={18} />
                        </button>
                      </div>

                      <div>
                        <p className="text-xs font-medium text-slate-500">
                          {item.title}
                        </p>
                        <h2 className="text-2xl font-bold text-slate-900">
                          {item.value}
                        </h2>
                      </div>

                      <div className="flex items-center gap-2 text-xs">
                        <span className={`inline-flex items-center font-bold ${item.positive ? "text-emerald-600" : "text-red-500"}`}>
                          {item.positive ? (
                            <ArrowUpRight size={14} />
                          ) : (
                            <ArrowDownRight size={14} />
                          )}
                          {item.change}
                        </span>
                        <span className="text-slate-400">{item.description}</span>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* CHART & ROOM STATUS */}
              <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">

                {/* CHART PANEL */}
                <div className="space-y-6 rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm lg:col-span-2">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-base font-semibold text-slate-900">
                        Statistik Reservasi
                      </h3>
                      <p className="text-xs text-slate-500">
                        Ringkasan reservasi hotel berdasarkan periode.
                      </p>
                    </div>

                    <select
                      value={period}
                      onChange={(e) => setPeriod(e.target.value)}
                      className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs text-slate-600 focus:outline-none"
                    >
                      <option>7 Hari Terakhir</option>
                      <option>30 Hari Terakhir</option>
                      <option>90 Hari Terakhir</option>
                    </select>
                  </div>

                  <div>
                    <h2 className="text-3xl font-bold text-slate-900">284</h2>
                    <span className="text-xs font-medium text-emerald-600">
                      +12.5% dibanding periode sebelumnya
                    </span>
                  </div>

                  {/* BAR CHART */}
                  <div className="flex h-48 items-end gap-4 pt-4">
                    <div className="flex h-full flex-col justify-between border-r border-slate-100 pr-2 text-[10px] text-slate-400">
                      <span>100</span>
                      <span>75</span>
                      <span>50</span>
                      <span>25</span>
                      <span>0</span>
                    </div>

                    <div className="flex h-full flex-1 items-end justify-between gap-2">
                      {chartData.map((item) => (
                        <div
                          key={item.day}
                          className="flex h-full flex-1 flex-col items-center justify-end gap-2"
                        >
                          <div
                            className={`w-full max-w-[36px] rounded-t-lg transition-all ${
                              item.day === "Sab"
                                ? "bg-blue-600"
                                : "bg-blue-100 hover:bg-blue-200"
                            }`}
                            style={{ height: `${item.value}%` }}
                            title={`${item.value} reservasi`}
                          />
                          <span className="text-xs font-medium text-slate-500">
                            {item.day}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* ROOM STATUS */}
                <div className="flex flex-col justify-between space-y-6 rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-base font-semibold text-slate-900">
                        Status Kamar
                      </h3>
                      <p className="text-xs text-slate-500">
                        Kondisi kamar hotel saat ini.
                      </p>
                    </div>
                    <MoreHorizontal size={18} className="text-slate-400" />
                  </div>

                  <div className="flex justify-center py-4">
                    <div className="relative flex h-36 w-36 items-center justify-center rounded-full border-8 border-blue-600 bg-slate-50 text-center">
                      <div>
                        <h2 className="text-2xl font-extrabold text-slate-900">
                          250
                        </h2>
                        <span className="text-[10px] font-semibold uppercase text-slate-400">
                          Total Kamar
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3 text-xs">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="h-2.5 w-2.5 rounded-full bg-emerald-500" />
                        <span className="text-slate-600">Tersedia</span>
                      </div>
                      <strong className="text-slate-900">38</strong>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="h-2.5 w-2.5 rounded-full bg-blue-600" />
                        <span className="text-slate-600">Terisi</span>
                      </div>
                      <strong className="text-slate-900">82</strong>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="h-2.5 w-2.5 rounded-full bg-amber-500" />
                        <span className="text-slate-600">Dibersihkan</span>
                      </div>
                      <strong className="text-slate-900">5</strong>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 rounded-xl bg-slate-50 p-3 text-[11px] text-slate-500">
                    <CheckCircle2 size={14} className="text-emerald-600" />
                    <span>Data status kamar diperbarui hari ini.</span>
                  </div>
                </div>
              </div>

              {/* RESERVATION TABLE */}
              <div className="space-y-4 rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-base font-semibold text-slate-900">
                      Reservasi Terbaru
                    </h3>
                    <p className="text-xs text-slate-500">
                      Daftar pemesanan kamar terbaru dari tamu hotel.
                    </p>
                  </div>

                  <button
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-600 hover:text-blue-700"
                    onClick={() => setActiveMenu("Reservasi")}
                  >
                    Lihat Semua <ArrowUpRight size={14} />
                  </button>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-sm text-slate-600">
                    <thead className="border-b border-slate-200 bg-slate-50 text-xs font-semibold uppercase text-slate-500">
                      <tr>
                        <th className="px-4 py-3">ID RESERVASI</th>
                        <th className="px-4 py-3">NAMA TAMU</th>
                        <th className="px-4 py-3">TIPE KAMAR</th>
                        <th className="px-4 py-3">NO. KAMAR</th>
                        <th className="px-4 py-3">CHECK-IN</th>
                        <th className="px-4 py-3">CHECK-OUT</th>
                        <th className="px-4 py-3">STATUS</th>
                      </tr>
                    </thead>

                    <tbody className="divide-y divide-slate-100">
                      {filteredReservations.map((item) => (
                        <tr key={item.id} className="hover:bg-slate-50/50">
                          <td className="px-4 py-3 font-medium text-blue-600">
                            {item.id}
                          </td>
                          <td className="px-4 py-3">
                            <div className="flex items-center gap-2.5">
                              <div className="flex h-7 w-7 items-center justify-center rounded-full bg-slate-100 text-xs font-bold text-slate-700">
                                {item.initials}
                              </div>
                              <strong className="text-slate-900">
                                {item.guest}
                              </strong>
                            </div>
                          </td>
                          <td className="px-4 py-3">{item.room}</td>
                          <td className="px-4 py-3">{item.number}</td>
                          <td className="px-4 py-3">{item.checkin}</td>
                          <td className="px-4 py-3">{item.checkout}</td>
                          <td className="px-4 py-3">
                            <span className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-medium ${getStatusBadgeClass(item.status)}`}>
                              {item.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* ACTIVITIES */}
              <div className="space-y-4 rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-base font-semibold text-slate-900">
                      Aktivitas Terbaru
                    </h3>
                    <p className="text-xs text-slate-500">
                      Aktivitas operasional Hotel Grand Nusantara.
                    </p>
                  </div>
                  <Clock size={18} className="text-slate-400" />
                </div>

                <div className="divide-y divide-slate-100">
                  {activities.map((item, index) => {
                    const Icon = item.icon;

                    return (
                      <div
                        key={index}
                        className="flex items-center justify-between py-3"
                      >
                        <div className="flex items-center gap-3">
                          <div className={`flex h-9 w-9 items-center justify-center rounded-xl ${item.color}`}>
                            <Icon size={18} />
                          </div>
                          <div>
                            <strong className="block text-xs font-semibold text-slate-900">
                              {item.title}
                            </strong>
                            <p className="text-[11px] text-slate-400">
                              {item.description}
                            </p>
                          </div>
                        </div>
                        <span className="text-[11px] text-slate-400">
                          {item.time}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* FOOTER */}
              <footer className="flex items-center justify-between border-t border-slate-200 pt-4 text-xs text-slate-400">
                <span>© 2026 Hotel Grand Nusantara.</span>
                <span>Hotel Management System</span>
              </footer>

            </>
          ) : (
            <ManagementPage
              activeMenu={activeMenu}
              search={search}
            />
          )}

        </section>
      </main>

      {/* OVERLAY MOBILE */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-30 bg-slate-950/40 backdrop-blur-sm lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

    </div>
  );
}
