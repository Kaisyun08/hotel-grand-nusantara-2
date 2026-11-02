
import React, { useState } from "react";
import {
  BedDouble,
  Clock,
  CheckCircle2,
  Wrench,
  Sparkles,
  ArrowLeft,
  Save,
} from "lucide-react";

export default function EditRoom({ room, onSave, onCancel }) {
  const [form, setForm] = useState({
    number: room?.number || "201",
    type: room?.type || "Deluxe Room",
    status: room?.status || "Perlu Dibersihkan",
    duration: String(room?.duration || "60"),
    note: room?.note || "",
    startedAt:
      room?.startedAt || new Date().toISOString().slice(0, 16),
    estimatedCompletionAt: room?.estimatedCompletionAt || null,
    estimatedCompletion: room?.estimatedCompletion || null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const getEstimatedCompletionDate = () => {
    const start = new Date(form.startedAt);
    const duration = Number(form.duration);

    if (Number.isNaN(start.getTime()) || !duration) return null;

    return new Date(start.getTime() + duration * 60000);
  };

  const estimatedCompletion = () => {
  const finish = getEstimatedCompletionDate();

  if (!finish) return "-";

  return finish.toLocaleString("id-ID", {
    day: "2-digit",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

  const handleSubmit = (e) => {
  e.preventDefault();

  const finish = getEstimatedCompletionDate();

  if (onSave) {
    onSave({
      ...form,
      duration: Number(form.duration),

      // Timestamp untuk pemeriksaan otomatis di Dashboard
      estimatedCompletionAt:
        form.status === "Tersedia" || !finish
          ? null
          : finish.getTime(),

      // Teks estimasi untuk ditampilkan
      estimatedCompletion:
        form.status === "Tersedia" || !finish
          ? null
          : finish.toLocaleString("id-ID", {
              day: "2-digit",
              month: "short",
              year: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            }),
    });
  }
};

  const statusOptions = [
    {
      value: "Perlu Dibersihkan",
      label: "Perlu Dibersihkan",
      icon: Sparkles,
    },
    {
      value: "Sedang Dibersihkan",
      label: "Sedang Dibersihkan",
      icon: Clock,
    },
    {
      value: "Maintenance",
      label: "Maintenance",
      icon: Wrench,
    },
    {
      value: "Tersedia",
      label: "Tersedia",
      icon: CheckCircle2,
    },
  ];

  const durationOptions = [
    { value: "30", label: "30 Menit" },
    { value: "60", label: "1 Jam" },
    { value: "90", label: "1 Jam 30 Menit" },
    { value: "120", label: "2 Jam" },
    { value: "180", label: "3 Jam" },
    { value: "240", label: "4 Jam" },
    { value: "480", label: "8 Jam" },
    { value: "720", label: "12 Jam" },
    { value: "1440", label: "24 Jam" },
  ];

  return (
    <div className="space-y-6">
      {/* HEADER */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-blue-600">
            ROOM MANAGEMENT
          </span>

          <h1 className="mt-1 text-2xl font-bold text-slate-900">
            Edit Kondisi Kamar
          </h1>

          <p className="mt-1 text-sm text-slate-500">
            Atur status kebersihan, maintenance, dan estimasi ketersediaan kamar.
          </p>
        </div>

        <button
          type="button"
          onClick={onCancel}
          className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-600 hover:bg-slate-50"
        >
          <ArrowLeft size={16} />
          Kembali
        </button>
      </div>

      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 gap-6 lg:grid-cols-3"
      >
        {/* FORM */}
        <div className="space-y-5 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm lg:col-span-2">
          <div>
            <h2 className="text-base font-semibold text-slate-900">
              Informasi Kamar
            </h2>
            <p className="text-xs text-slate-500">
              Informasi kamar yang akan diperbarui.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Nomor Kamar
              </label>
              <input
                name="number"
                value={form.number}
                onChange={handleChange}
                required
                className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Tipe Kamar
              </label>
              <input
                name="type"
                value={form.type}
                onChange={handleChange}
                required
                className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-blue-500"
              />
            </div>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Status Kamar
            </label>

            <select
              name="status"
              value={form.status}
              onChange={handleChange}
              className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-blue-500"
            >
              {statusOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          {form.status !== "Tersedia" && (
            <>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700">
                    Waktu Mulai
                  </label>
                  <input
                    type="datetime-local"
                    name="startedAt"
                    value={form.startedAt}
                    onChange={handleChange}
                    required
                    className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700">
                    Estimasi Waktu
                  </label>
                  <select
                    name="duration"
                    value={form.duration}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-blue-500"
                  >
                    {durationOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="rounded-xl bg-blue-50 p-4">
                <div className="flex items-center gap-2 text-blue-700">
                  <Clock size={17} />
                  <span className="text-sm font-semibold">
                    Estimasi Kamar Selesai
                  </span>
                </div>

                <p className="mt-2 text-sm font-bold text-blue-900">
                  {estimatedCompletion()}
                </p>
              </div>
            </>
          )}

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Catatan / Keterangan
            </label>
            <textarea
              name="note"
              value={form.note}
              onChange={handleChange}
              rows={4}
              placeholder="Contoh: Pembersihan kamar mandi, penggantian sprei, perbaikan AC..."
              className="w-full resize-none rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-blue-500"
            />
          </div>

          <div className="flex justify-end gap-3 border-t border-slate-100 pt-5">
            <button
              type="button"
              onClick={onCancel}
              className="rounded-xl border border-slate-200 px-5 py-2.5 text-sm font-semibold text-slate-600 hover:bg-slate-50"
            >
              Batal
            </button>

            <button
              type="submit"
              className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-700"
            >
              <Save size={16} />
              Simpan Perubahan
            </button>
          </div>
        </div>

        {/* PREVIEW STATUS */}
        <div className="h-fit rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="mb-5 flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
              <BedDouble size={22} />
            </div>

            <div>
              <h3 className="font-bold text-slate-900">
                Kamar {form.number}
              </h3>
              <p className="text-xs text-slate-500">{form.type}</p>
            </div>
          </div>

          <div className="rounded-xl bg-slate-50 p-4">
            <p className="text-xs font-medium text-slate-500">
              Status Saat Ini
            </p>

            <p className="mt-2 text-sm font-bold text-slate-900">
              {form.status}
            </p>
          </div>

          <div className="mt-4 space-y-3 text-xs text-slate-500">
            <p>
              <strong className="text-slate-700">Estimasi:</strong>{" "}
              {form.status === "Tersedia"
                ? "Kamar siap digunakan"
                : `${form.duration} menit`}
            </p>

            <p>
              <strong className="text-slate-700">Selesai:</strong>{" "}
              {form.status === "Tersedia"
                ? "Tidak ada jadwal"
                : estimatedCompletion()}
            </p>

            <p>
              <strong className="text-slate-700">Keterangan:</strong>{" "}
              {form.note || "Belum ada catatan"}
            </p>
          </div>
        </div>
      </form>
    </div>
  );
}
