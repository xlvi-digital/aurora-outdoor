document.addEventListener("alpine:init", () => {
  Alpine.data("rentalApp", () => ({
    activeCategory: "all",
    days: 1,
    cart: [],

    products: [
      { id: 1, name: "Tenda Dome", price: 30000, img: "assets/img/product/tenda.png", category: "tenda" },
      { id: 2, name: "Kompor Portable", price: 15000, img: "assets/img/product/tenda1.png", category: "makan" },
      { id: 3, name: "Sleeping Bag", price: 20000, img: "assets/img/product/tenda2.png", category: "tidur" },
      { id: 4, name: "Headlamp", price: 10000, img: "assets/img/product/tenda3.png", category: "aksesoris" },
    ],

    showBookingModal: false,

    booking: {
      name: "",
      phone: "",
      startDate: "",
      endDate: "",
      note: "",
    },

    // =====================
    // FILTER
    // =====================
    filteredProducts() {
      if (this.activeCategory === "all") return this.products;
      return this.products.filter((p) => p.category === this.activeCategory);
    },

    // =====================
    // TAMBAH KE CART
    // =====================
    addToCart(product) {
      const existing = this.cart.find((item) => item.id === product.id);

      if (existing) {
        existing.qty++;
      } else {
        this.cart.push({
          id: product.id,
          name: product.name,
          price: product.price,
          qty: 1,
        });
      }
      // Animasi product
      this.animatingId = product.id;
      setTimeout(() => {
        this.animatingId = null;
      }, 400);

      // Animasi cart pulse
      this.cartPulse = true;
      setTimeout(() => {
        this.cartPulse = false;
      }, 500);
    },

    // =====================
    // TAMBAH QTY
    // =====================
    increaseQty(item) {
      item.qty++;
    },

    // =====================
    // KURANG QTY
    // =====================
    decreaseQty(item) {
      if (item.qty > 1) {
        item.qty--;
      }
    },

    // =====================
    // HAPUS ITEM
    // =====================
    removeItem(id) {
      this.cart = this.cart.filter((item) => item.id !== id);
    },

    // =====================
    // HITUNG JUMLAH HARI OTOMATIS
    // =====================
    calculateDays() {
      if (this.booking.startDate && this.booking.endDate) {
        const start = new Date(this.booking.startDate);
        const end = new Date(this.booking.endDate);

        const diffTime = end - start;
        const diffDays = diffTime / (1000 * 60 * 60 * 24);

        // minimal 1 hari
        this.days = diffDays > 0 ? diffDays : 1;
      } else {
        this.days = 1;
      }
    },
    get totalDays() {
      return this.days;
    },

    // =====================
    // TOTAL HARGA
    // =====================
    get totalPrice() {
      return this.cart.reduce((total, item) => {
        return total + item.price * item.qty * this.days;
      }, 0);
    },

    validateAndSend() {
      // 1️⃣ Cart kosong
      if (this.cart.length === 0) {
        alert("Silakan pilih alat terlebih dahulu.");
        return;
      }

      // 2️⃣ Validasi nama
      if (!this.booking.name.trim()) {
        alert("Nama lengkap wajib diisi.");
        return;
      }

      // 3️⃣ Validasi nomor
      if (!this.booking.phone.trim()) {
        alert("Nomor WhatsApp wajib diisi.");
        return;
      }

      // 4️⃣ Validasi tanggal
      if (!this.booking.startDate || !this.booking.endDate) {
        alert("Tanggal sewa wajib diisi.");
        return;
      }

      // 5️⃣ Validasi durasi
      if (this.days <= 0) {
        alert("Durasi sewa tidak valid.");
        return;
      }

      this.sendToWhatsApp();
    },

    sendToWhatsApp() {
      const adminNumber = "6281313362467"; // GANTI NOMOR ADMIN

      let message = `Halo Aurora Outdoor 👋\n\n`;
      message += `Saya ingin melakukan booking dengan detail berikut:\n\n`;

      message += `👤 Nama: ${this.booking.name}\n`;
      message += `📱 No WA: ${this.booking.phone}\n`;
      message += `📅 Tanggal: ${this.booking.startDate} s/d ${this.booking.endDate}\n`;
      message += `⏳ Durasi: ${this.days} Hari\n\n`;

      message += `📦 Detail Alat:\n`;

      this.cart.forEach((item) => {
        message += `- ${item.name} (${item.qty}x)\n`;
      });

      message += `\n💰 Total: Rp ${this.totalPrice.toLocaleString()}\n`;

      if (this.booking.note) {
        message += `\n📝 Catatan: ${this.booking.note}\n`;
      }

      const encodedMessage = encodeURIComponent(message);
      const url = `https://wa.me/${adminNumber}?text=${encodedMessage}`;

      window.open(url, "_blank");
    },
  }));
});
