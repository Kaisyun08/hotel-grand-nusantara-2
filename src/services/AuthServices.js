// DATA DUMMY AWAL USER (Simulasi Database)
const DUMMY_USERS = [
  {
    id: 1,
    name: "Sultan Nugroho",
    email: "user@gmail.com",
    password: "password123",
    role: "user",
  },
  {
    id: 2,
    name: "Admin Hotel",
    email: "admin@gmail.com",
    password: "admin123",
    role: "admin",
  },
];

export const AuthServices = {
  // 1. FUNGSI LOGIN (DUMMY)
  login: async (credentials) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Ambil data user yang pernah teregistrasi di localStorage atau gunakan DUMMY_USERS
        const localUsers = JSON.parse(localStorage.getItem("registered_users")) || DUMMY_USERS;
        
        const foundUser = localUsers.find(
          (u) => u.email === credentials.email && u.password === credentials.password
        );

        if (foundUser) {
          // Buat data token/session dummy
          const userData = {
            id: foundUser.id,
            name: foundUser.name,
            email: foundUser.email,
            role: foundUser.role,
            token: "dummy-jwt-token-123456",
          };

          // Simpan status login user aktif ke localStorage
          localStorage.setItem("user", JSON.stringify(userData));

          resolve({ success: true, message: "Login Berhasil!", data: userData });
        } else {
          reject({ success: false, message: "Email atau password salah!" });
        }
      }, 500); // Delay 500ms berpura-pura seperti HTTP request
    });
  },

  // 2. FUNGSI REGISTER (DUMMY)
  register: async (userData) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const localUsers = JSON.parse(localStorage.getItem("registered_users")) || DUMMY_USERS;

        // Cek apakah email sudah terdaftar
        const isEmailExist = localUsers.some((u) => u.email === userData.email);

        if (isEmailExist) {
          reject({ success: false, message: "Email sudah terdaftar!" });
          return;
        }

        // Tambah user baru ke list dummy
        const newUser = {
          id: Date.now(),
          name: userData.name,
          email: userData.email,
          password: userData.password,
          role: "user",
        };

        localUsers.push(newUser);
        localStorage.setItem("registered_users", JSON.stringify(localUsers));

        resolve({ success: true, message: "Registrasi Berhasil! Silakan Login." });
      }, 500);
    });
  },

  // 3. FUNGSI LOGOUT
  logout: () => {
    localStorage.removeItem("user");
  },

  // 4. CEK USER AKTIF
  getCurrentUser: () => {
    return JSON.parse(localStorage.getItem("user")) || null;
  },
};