import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

// Must match the key your login page saves to localStorage.
const isLoggedIn = () => {
  try {
    return !!JSON.parse(localStorage.getItem('user'));
  } catch {
    return false;
  }
};

// Static data lives outside the component so it isn't recreated on every render.
// Replace the image URLs with your own photos if you prefer.
const hotelRooms = {
  superiorRoom: {
    tabLabel: 'Superior Room',
    name: 'Grand Superior Room',
    price: 1200000,
    rating: 4.7,
    reviewsCount: 310,
    description:
      'Pilihan sempurna untuk kenyamanan maksimal dalam perjalanan bisnis maupun liburan, dengan interior hangat dan tempat tidur premium.',
    features: {
      guests: '2 Dewasa',
      size: '36 m²',
      bed: 'King or Twin Bed',
      view: 'City View',
    },
    amenities: [
      'Free High-Speed Wi-Fi',
      'Smart TV 43 Inch',
      'Air Conditioning',
      'Coffee & Tea Maker',
      'Premium Toiletries',
      'Safe Deposit Box',
    ],
    maxGuests: 2,
    images: [
      'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=1200&q=80',
      'https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=1200&q=80',
    ],
  },
  deluxeRoom: {
    tabLabel: 'Deluxe Room',
    name: 'Premier Deluxe Room',
    price: 1800000,
    rating: 4.8,
    reviewsCount: 245,
    description:
      'Menawarkan ruang yang lebih luas dengan sentuhan kemewahan ekstra dan pemandangan kolam renang langsung dari kamar.',
    features: {
      guests: '2 Dewasa, 1 Anak',
      size: '45 m²',
      bed: 'King Bed',
      view: 'Pool View',
    },
    amenities: [
      'Free High-Speed Wi-Fi',
      'Smart TV 50 Inch',
      'Air Conditioning',
      'Minibar',
      'Marble Bathroom',
      '24-Hour Room Service',
      'Bathrobe & Slippers',
    ],
    maxGuests: 3,
    images: [
      'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=1200&q=80',
      'https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=1200&q=80',
    ],
  },
  executive: {
    tabLabel: 'Executive Club',
    name: 'Executive Club Room',
    price: 2700000,
    rating: 4.9,
    reviewsCount: 188,
    description:
      'Dirancang khusus bagi para eksekutif dan pelancong kelas atas, lengkap dengan akses lounge eksklusif.',
    features: {
      guests: '2 Dewasa, 1 Anak',
      size: '55 m²',
      bed: '1 Super King Bed',
      view: 'Skyline View',
    },
    amenities: [
      'Exclusive Lounge Access',
      'Free High-Speed Wi-Fi',
      'Smart TV 55 Inch',
      'Nespresso Machine',
      'Premium Amenities',
      'Complimentary Laundry (2 pcs/day)',
    ],
    maxGuests: 3,
    images: [
      'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=1200&q=80',
      'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=1200&q=80',
    ],
  },
  suiteRoom: {
    tabLabel: 'Suite Room',
    name: 'Luxury Ocean Suite',
    price: 4500000,
    rating: 4.9,
    reviewsCount: 96,
    description:
      'Nikmati kemewahan ruang apartemen privat dengan ruang tamu terpisah dan pemandangan laut yang luas.',
    features: {
      guests: '3 Dewasa / 2D + 2A',
      size: '85 m²',
      bed: '1 Super King Bed',
      view: 'Panoramic Ocean View',
    },
    amenities: [
      'Private Balcony',
      'Separate Living Room',
      'Walk-in Closet',
      'Jacuzzi Bathtub',
      'Nespresso Machine',
      '24-Hour Dedicated Butler Service',
    ],
    maxGuests: 4,
    images: [
      'https://images.unsplash.com/photo-1631049552057-403cdb8f0658?w=1200&q=80',
      'https://images.unsplash.com/photo-1587985064135-0366536eab42?w=1200&q=80',
    ],
  },
  presidentialRoom: {
    tabLabel: 'Presidential Suite',
    name: 'The Royal Presidential Suite',
    price: 15000000,
    rating: 5.0,
    reviewsCount: 32,
    description:
      'Puncak dari segala kemewahan dan privasi terbaik, dengan ruang makan, ruang kerja, dan layanan pribadi.',
    features: {
      guests: '4 Dewasa',
      size: '220 m²',
      bed: '2 Grand King Beds',
      view: '360° Full City View',
    },
    amenities: [
      'Private Dining & Kitchen',
      'Private Office Room',
      'Chauffeur Service (On Request)',
      'Personal Butler 24/7',
      'Hermès Toiletries',
      'Private Gym Setup',
    ],
    maxGuests: 4,
    images: [
      'https://images.unsplash.com/photo-1631049035182-249067d7618e?w=1200&q=80',
      'https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=1200&q=80',
    ],
  },
};

const formatIDR = (n) =>
  new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0,
  }).format(n);

const today = () => new Date().toISOString().split('T')[0];

const nightsBetween = (from, to) => {
  if (!from || !to) return 0;
  const diff = (new Date(to) - new Date(from)) / (1000 * 60 * 60 * 24);
  return diff > 0 ? Math.round(diff) : 0;
};

export default function RoomDetail() {
  const [selectedType, setSelectedType] = useState('superiorRoom');
  const [activeImage, setActiveImage] = useState(0);
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [guests, setGuests] = useState('2');

  const navigate = useNavigate();
  const location = useLocation();

  // Refill the form with the saved booking after the user returns from login.
  useEffect(() => {
    const saved = location.state?.booking;
    if (saved) {
      setSelectedType(saved.type);
      setCheckIn(saved.checkIn);
      setCheckOut(saved.checkOut);
      setGuests(saved.guests);
    }
  }, [location.state]);

  const currentRoom = hotelRooms[selectedType];
  const nights = nightsBetween(checkIn, checkOut);
  const total = nights * currentRoom.price;

  const handleTypeChange = (type) => {
    setSelectedType(type);
    setActiveImage(0);
    // Keep guest count valid for the newly selected room.
    if (Number(guests) > hotelRooms[type].maxGuests) {
      setGuests(String(hotelRooms[type].maxGuests));
    }
  };

  const handleCheckIn = (value) => {
    setCheckIn(value);
    // Reset check-out if it is no longer after check-in.
    if (checkOut && value && checkOut <= value) setCheckOut('');
  };

  const handleBookingSubmit = (e) => {
    e.preventDefault();
    if (nights < 1) {
      alert('Tanggal check-out harus setelah tanggal check-in.');
      return;
    }

    // Not logged in: go to login and carry the booking data along.
    if (!isLoggedIn()) {
      navigate('/login', {
        state: {
          from: '/room-detail',
          booking: { type: selectedType, checkIn, checkOut, guests },
        },
      });
      return;
    }

    alert(
      `Reservasi Berhasil!\nTipe: ${currentRoom.name}\nCheck-in: ${checkIn}\nCheck-out: ${checkOut}\nMalam: ${nights}\nTamu: ${guests}\nTotal: ${formatIDR(total)}`
    );
  };

  return (
    <div className="bg-gray-50 min-h-screen text-gray-800 antialiased font-sans">
      {/* Room type tabs */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-30 shadow-sm">
        <div
          className="max-w-7xl mx-auto px-4 flex space-x-8 overflow-x-auto"
          role="tablist"
          aria-label="Tipe kamar"
        >
          {Object.entries(hotelRooms).map(([key, room]) => (
            <button
              key={key}
              role="tab"
              aria-selected={selectedType === key}
              onClick={() => handleTypeChange(key)}
              className={`py-4 px-1 text-sm font-medium border-b-2 whitespace-nowrap transition-all duration-200 ${
                selectedType === key
                  ? 'border-amber-600 text-amber-700 font-semibold'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              {room.tabLabel}
            </button>
          ))}
        </div>
      </div>

      {/* Main content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left and middle columns: room information */}
          <div className="lg:col-span-2 space-y-6">
            {/* Title */}
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-3">
              <div>
                <span className="inline-flex items-center px-3 py-0.5 rounded-full text-xs font-semibold bg-amber-50 text-amber-800 border border-amber-200 mb-2 tracking-wide uppercase">
                  5-Star Luxury Experience
                </span>
                <h1 className="text-3xl font-serif font-bold text-gray-900 tracking-tight">
                  {currentRoom.name}
                </h1>
              </div>
              <div className="flex sm:flex-col items-center sm:items-end gap-2 sm:gap-0">
                <span className="text-amber-500 text-xl font-bold">
                  ★ {currentRoom.rating.toFixed(1)}
                </span>
                <span className="text-gray-400 text-xs">
                  ({currentRoom.reviewsCount} Ulasan Tamu)
                </span>
              </div>
            </div>

            {/* Gallery */}
            <div className="space-y-3">
              <div className="relative h-[260px] sm:h-[440px] w-full rounded-2xl overflow-hidden shadow-md bg-gray-200">
                <img
                  className="w-full h-full object-cover transition-all duration-500 ease-in-out"
                  src={currentRoom.images[activeImage]}
                  alt={`${currentRoom.name}, foto ${activeImage + 1}`}
                />
              </div>

              <div className="flex gap-3 overflow-x-auto pb-1">
                {currentRoom.images.map((imgUrl, index) => (
                  <button
                    key={imgUrl}
                    onClick={() => setActiveImage(index)}
                    aria-label={`Lihat foto ${index + 1} dari ${currentRoom.name}`}
                    aria-pressed={activeImage === index}
                    className={`relative flex-shrink-0 w-24 h-16 rounded-xl overflow-hidden border-2 transition-all ${
                      activeImage === index
                        ? 'border-amber-600 scale-95 shadow-sm'
                        : 'border-transparent opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img
                      src={imgUrl}
                      alt={`Thumbnail ${currentRoom.name} ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Quick specs */}
            <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
              <dl className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
                {[
                  ['Kapasitas', currentRoom.features.guests],
                  ['Luas Ruangan', currentRoom.features.size],
                  ['Tipe Ranjang', currentRoom.features.bed],
                  ['Pemandangan', currentRoom.features.view],
                ].map(([label, value]) => (
                  <div key={label} className="md:border-r md:border-gray-100 md:last:border-0">
                    <dt className="text-gray-400 text-xs uppercase tracking-wider mb-1">
                      {label}
                    </dt>
                    <dd className="font-medium text-gray-800 text-sm sm:text-base">
                      {value}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>

            {/* Description and amenities */}
            <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
              <h2 className="text-xl font-serif font-bold mb-2">Tentang Kamar</h2>
              <p className="text-gray-600 mb-5 leading-relaxed">
                {currentRoom.description}
              </p>
              <h3 className="text-sm font-semibold text-gray-900 mb-3">Fasilitas</h3>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-gray-700">
                {currentRoom.amenities.map((item) => (
                  <li key={item} className="flex items-center gap-2">
                    <span className="text-amber-600" aria-hidden="true">✓</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Right column: booking form */}
          <aside className="lg:col-span-1">
            <form
              onSubmit={handleBookingSubmit}
              className="bg-white rounded-2xl p-6 border border-gray-100 shadow-md lg:sticky lg:top-20 space-y-4"
            >
              <div>
                <span className="text-2xl font-bold text-gray-900">
                  {formatIDR(currentRoom.price)}
                </span>
                <span className="text-gray-400 text-sm"> / malam</span>
              </div>

              <div>
                <label htmlFor="checkin" className="block text-xs text-gray-500 mb-1">
                  Check-in
                </label>
                <input
                  id="checkin"
                  type="date"
                  required
                  min={today()}
                  value={checkIn}
                  onChange={(e) => handleCheckIn(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>

              <div>
                <label htmlFor="checkout" className="block text-xs text-gray-500 mb-1">
                  Check-out
                </label>
                <input
                  id="checkout"
                  type="date"
                  required
                  min={checkIn || today()}
                  value={checkOut}
                  onChange={(e) => setCheckOut(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>

              <div>
                <label htmlFor="guests" className="block text-xs text-gray-500 mb-1">
                  Jumlah tamu
                </label>
                <select
                  id="guests"
                  value={guests}
                  onChange={(e) => setGuests(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-amber-500"
                >
                  {Array.from({ length: currentRoom.maxGuests }, (_, i) => i + 1).map((n) => (
                    <option key={n} value={n}>
                      {n} Tamu
                    </option>
                  ))}
                </select>
              </div>

              {nights > 0 && (
                <div className="border-t border-gray-100 pt-4 text-sm space-y-1">
                  <div className="flex justify-between text-gray-600">
                    <span>
                      {formatIDR(currentRoom.price)} × {nights} malam
                    </span>
                    <span>{formatIDR(total)}</span>
                  </div>
                  <div className="flex justify-between font-semibold text-gray-900">
                    <span>Total</span>
                    <span>{formatIDR(total)}</span>
                  </div>
                </div>
              )}

              <button
                type="submit"
                className="w-full bg-amber-600 hover:bg-amber-700 text-white font-semibold py-3 rounded-lg transition-colors"
              >
                Pesan Sekarang
              </button>
            </form>
          </aside>
        </div>
      </div>
    </div>
  );
}