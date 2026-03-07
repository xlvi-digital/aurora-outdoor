document.addEventListener("alpine:init", () => {
  Alpine.data("rentalApp", () => ({
    // ======================
    // STATE
    // ======================

    toasts: [],

    showToast(message, type = "success") {
      const id = Date.now();

      this.toasts.push({
        id,
        message,
        type,
        show: true,
      });

      setTimeout(() => {
        this.removeToast(id);
      }, 3000);
    },

    removeToast(id) {
      this.toasts = this.toasts.filter((t) => t.id !== id);
    },
    cart: [],
    isDrawerOpen: false,
    navOpen: false,
    activeCategory: "all",
    currentPage: 1,
    productsPerPage: 16,
    searchQuery: "",

    booking: {
      name: "",
      phone: "",
      startDate: "",
      endDate: "",
      deliveryMethod: "ambil", // "ambil" or "antar"
      deliveryDistance: "",
      deliveryLat: "",
      deliveryLng: "",
      deliveryAddress: "",
    },

    categories: [
      { key: "all", label: "Semua" },
      { key: "tenda", label: "Tenda" },
      { key: "carrier", label: "Carrier" },
      { key: "masak", label: "Masak" },
      { key: "penerangan", label: "Penerangan" },
      { key: "aksesories", label: "Aksesories" },
      { key: "pribadi", label: "Pribadi" },
    ],

    products: [
      // ...existing tenda products...
      {
        id: 1,
        name: "Tenda EIGER",
        price: 40000,
        category: "tenda",
        img: "assets/img/product/tenda/1.png",
      },
      {
        id: 2,
        name: "Tenda QUECHUA",
        price: 30000,
        category: "tenda",
        img: "assets/img/product/tenda/2.png",
      },
      {
        id: 3,
        name: "Tenda MONODOME",
        price: 20000,
        category: "tenda",
        img: "assets/img/product/tenda/3.png",
      },
      {
        id: 4,
        name: "Tenda JAVA 2",
        price: 30000,
        category: "tenda",
        img: "assets/img/product/tenda/4.png",
      },
      {
        id: 5,
        name: "Tenda Family ARPENAZ 4.0",
        price: 150000,
        category: "tenda",
        img: "assets/img/product/tenda/5.png",
      },
      {
        id: 6,
        name: "Tenda Family ARPENAZ 4.1",
        price: 175000,
        category: "tenda",
        img: "assets/img/product/tenda/6.png",
      },
      {
        id: 7,
        name: "Tenda Family ARPENAZ 4.2",
        price: 200000,
        category: "tenda",
        img: "assets/img/product/tenda/7.png",
      },
      {
        id: 8,
        name: "Tenda NSM 4",
        price: 40000,
        category: "tenda",
        img: "assets/img/product/tenda/8.png",
      },
      {
        id: 9,
        name: "Tenda JAYADIPA 4",
        price: 50000,
        category: "tenda",
        img: "assets/img/product/tenda/9.png",
      },
      {
        id: 10,
        name: "Tenda NSM 4 Tendaki",
        price: 40000,
        category: "tenda",
        img: "assets/img/product/tenda/10.png",
      },
      {
        id: 11,
        name: "Tenda BORNEO 4 Black",
        price: 50000,
        category: "tenda",
        img: "assets/img/product/tenda/11.png",
      },
      {
        id: 12,
        name: "Tenda BORNEO 4 Yellow",
        price: 50000,
        category: "tenda",
        img: "assets/img/product/tenda/12.png",
      },
      {
        id: 13,
        name: "Tenda BORNEO 4 Red",
        price: 50000,
        category: "tenda",
        img: "assets/img/product/tenda/13.png",
      },
      {
        id: 14,
        name: "Tenda MANDALA 5 Pro",
        price: 70000,
        category: "tenda",
        img: "assets/img/product/tenda/14.png",
      },
      {
        id: 15,
        name: "Tenda BIGDOME 6 Go",
        price: 75000,
        category: "tenda",
        img: "assets/img/product/tenda/15.png",
      },
      {
        id: 16,
        name: "Tenda HANLU Tendaki",
        price: 100000,
        category: "tenda",
        img: "assets/img/product/tenda/16.png",
      },
      // Carrier
      { id: 17, name: "Carrier Kobra 60L Red", price: 25000, category: "carrier", img: "assets/img/product/carrier/1.png" },
      { id: 18, name: "Carrier Kobra 60L Green", price: 25000, category: "carrier", img: "assets/img/product/carrier/2.png" },
      { id: 19, name: "Carier Kobra 60L Black", price: 25000, category: "carrier", img: "assets/img/product/carrier/3.png" },
      { id: 20, name: "Carier Bunglon 45L green", price: 25000, category: "carrier", img: "assets/img/product/carrier/4.png" },
      { id: 21, name: "Carier Bunglon 45L Red", price: 25000, category: "carrier", img: "assets/img/product/carrier/5.png" },
      { id: 22, name: "Carrier 45-60 L", price: 20000, category: "carrier", img: "assets/img/product/carrier/6.png" },
      { id: 23, name: "Carrier Cobra 45-60L", price: 15000, category: "carrier", img: "assets/img/product/carrier/7.png" },
      { id: 24, name: "Daypack / Backpack", price: 10000, category: "carrier", img: "assets/img/product/carrier/8.png" },
      { id: 25, name: "Hydropack Reptil Plumbea", price: 15000, category: "carrier", img: "assets/img/product/carrier/9.png" },
      { id: 26, name: "Hydropack Airlite A.1", price: 20000, category: "carrier", img: "assets/img/product/carrier/10.png" },
      { id: 27, name: "Hydropack Airlite A.2 Blue", price: 20000, category: "carrier", img: "assets/img/product/carrier/11.png" },
      { id: 28, name: "Hydropack Raptor 10L", price: 20000, category: "carrier", img: "assets/img/product/carrier/12.png" },
      { id: 29, name: "Hydropack Mague 10L Blue", price: 20000, category: "carrier", img: "assets/img/product/carrier/13.png" },
      { id: 30, name: "Hydropack Mague 10L Reg", price: 20000, category: "carrier", img: "assets/img/product/carrier/14.png" },
      { id: 31, name: "Hydropack Mague 10L White", price: 20000, category: "carrier", img: "assets/img/product/carrier/15.png" },
      { id: 32, name: "Hydropack Mague 10L Pink", price: 20000, category: "carrier", img: "assets/img/product/carrier/16.png" },
      { id: 33, name: "Hydropack Reptil Plumbea", price: 15000, category: "carrier", img: "assets/img/product/carrier/17.png" },
      { id: 34, name: "Hydropack Airlite A.2 Bluesky", price: 20000, category: "carrier", img: "assets/img/product/carrier/18.png" },
      { id: 35, name: "Hydropack AirLite A.2 Brown", price: 20000, category: "carrier", img: "assets/img/product/carrier/19.png" },
      // Masak
      { id: 36, name: "Kompor Kotak K 202", price: 10000, category: "masak", img: "assets/img/product/masak/1.png" },
      { id: 37, name: "Kompor WF K 203", price: 15000, category: "masak", img: "assets/img/product/masak/2.png" },
      { id: 38, name: "Kompor Portable", price: 20000, category: "masak", img: "assets/img/product/masak/3.png" },
      { id: 39, name: "Cooking Set 200", price: 10000, category: "masak", img: "assets/img/product/masak/4.png" },
      { id: 40, name: "Cooking Set DS 308", price: 15000, category: "masak", img: "assets/img/product/masak/5.png" },
      { id: 41, name: "Nesting TNI", price: 10000, category: "masak", img: "assets/img/product/masak/6.png" },
      { id: 42, name: "Gas Portable", price: 8000, category: "masak", img: "assets/img/product/masak/7.png" },
      // Penerangan
      { id: 43, name: "HeadLamp MS 334", price: 5000, category: "penerangan", img: "assets/img/product/penerangan/1.png" },
      { id: 44, name: "Lampu Lentera", price: 5000, category: "penerangan", img: "assets/img/product/penerangan/2.png" },
      { id: 45, name: "Lampu Tembak 50 W", price: 25000, category: "penerangan", img: "assets/img/product/penerangan/3.png" },
      { id: 46, name: "Lampu Tembak 100 W", price: 30000, category: "penerangan", img: "assets/img/product/penerangan/4.png" },
      // Aksesories
      { id: 47, name: "Flyshhet 3x3 (Tanpa Tali & Pasak)", price: 10000, category: "aksesories", img: "assets/img/product/aksesories/1.png" },
      { id: 48, name: "Flyshhet 3x4 (Tanpa Tali & Pasak)", price: 15000, category: "aksesories", img: "assets/img/product/aksesories/2.png" },
      { id: 49, name: "Flyshhet 4x6 (Tanpa Tali & Pasak)", price: 25000, category: "aksesories", img: "assets/img/product/aksesories/3.png" },
      { id: 50, name: "Flyshhet 3x3", price: 20000, category: "aksesories", img: "assets/img/product/aksesories/4.png" },
      { id: 51, name: "Flayshhet 3x4", price: 25000, category: "aksesories", img: "assets/img/product/aksesories/5.png" },
      { id: 52, name: "Flayshhet 4x6", price: 35000, category: "aksesories", img: "assets/img/product/aksesories/6.png" },
      { id: 53, name: "Tiang Flysheet", price: 15000, category: "aksesories", img: "assets/img/product/aksesories/7.png" },
      { id: 54, name: "Matras Spons", price: 5000, category: "aksesories", img: "assets/img/product/aksesories/8.png" },
      { id: 55, name: "Paket Cihuy C", price: 45000, category: "aksesories", img: "assets/img/product/aksesories/9.png" },
      { id: 56, name: "Paket Cihuy B", price: 65000, category: "aksesories", img: "assets/img/product/aksesories/10.png" },
      { id: 57, name: "Paket Cihuy A", price: 75000, category: "aksesories", img: "assets/img/product/aksesories/11.png" },
      { id: 58, name: "Kursi Lipat Biasa", price: 15000, category: "aksesories", img: "assets/img/product/aksesories/12.png" },
      { id: 59, name: "Kursi Lipat Trail Top", price: 20000, category: "aksesories", img: "assets/img/product/aksesories/13.png" },
      { id: 60, name: "Kursi Lipat L", price: 15000, category: "aksesories", img: "assets/img/product/aksesories/14.png" },
      { id: 61, name: "Kursi Lipat XL", price: 20000, category: "aksesories", img: "assets/img/product/aksesories/15.png" },
      // Pribadi
      { id: 62, name: "SB Darcon", price: 5000, category: "pribadi", img: "assets/img/product/pribadi/1.png" },
      { id: 63, name: "SB polar Bulu", price: 10000, category: "pribadi", img: "assets/img/product/pribadi/2.png" },
      { id: 64, name: "SB Bulu Angsa", price: 15000, category: "pribadi", img: "assets/img/product/pribadi/3.png" },
      { id: 65, name: "Tracking Pole", price: 10000, category: "pribadi", img: "assets/img/product/pribadi/4.png" },
      { id: 66, name: "Sarung Tangan Polar", price: 10000, category: "pribadi", img: "assets/img/product/pribadi/5.png" },
      { id: 67, name: "Handy Talky (HT)", price: 25000, category: "pribadi", img: "assets/img/product/pribadi/6.png" },
      { id: 68, name: "Sepatu Gunung", price: 25000, category: "pribadi", img: "assets/img/product/pribadi/7.png" },
      { id: 69, name: "The Nort Face Brown", price: 45000, category: "pribadi", img: "assets/img/product/pribadi/8.png" },
      { id: 70, name: "The Nort Face Black", price: 45000, category: "pribadi", img: "assets/img/product/pribadi/9.png" },
      { id: 71, name: "The Nort Face white", price: 45000, category: "pribadi", img: "assets/img/product/pribadi/10.png" },
      { id: 72, name: "The Nort Face green", price: 45000, category: "pribadi", img: "assets/img/product/pribadi/11.png" },
      { id: 73, name: "Sepatu Hoka Pink", price: 45000, category: "pribadi", img: "assets/img/product/pribadi/12.png" },
      { id: 74, name: "Sepatu Hoka Brown", price: 45000, category: "pribadi", img: "assets/img/product/pribadi/13.png" },
      { id: 75, name: "Sepatu Hoka green", price: 45000, category: "pribadi", img: "assets/img/product/pribadi/14.png" },
      { id: 76, name: "Sepatu Hoka Pink", price: 45000, category: "pribadi", img: "assets/img/product/pribadi/15.png" },
      { id: 77, name: "Sepatu Columia Black", price: 45000, category: "pribadi", img: "assets/img/product/pribadi/16.png" },
      { id: 78, name: "Sepatu Columia Dark Black", price: 45000, category: "pribadi", img: "assets/img/product/pribadi/17.png" },
      { id: 79, name: "Sepatu Columia White", price: 45000, category: "pribadi", img: "assets/img/product/pribadi/18.png" },
      { id: 80, name: "Sepatu Arcteryx Blue", price: 45000, category: "pribadi", img: "assets/img/product/pribadi/19.png" },
      { id: 81, name: "Sepatu Arcteryx Balck", price: 45000, category: "pribadi", img: "assets/img/product/pribadi/20.png" },
    ],
    // INIT
    // ======================
    init() {
      const saved = localStorage.getItem("aurora_cart");
      if (saved) {
        this.cart = JSON.parse(saved);
      }

      const storedUser = localStorage.getItem("auroraUserData");
      if (storedUser) {
        try {
          const user = JSON.parse(storedUser);
          this.booking.name = user.name || "";
          this.booking.phone = user.phone || "";
          this.booking.deliveryAddress = user.address || "";
          this.booking.deliveryLat = user.lat || "";
          this.booking.deliveryLng = user.lng || "";
          // Note: distance needs to be recalculated or we can keep it empty to force using full checkout for map if they change address.
          // But for now, we just sync the basic inputs.
        } catch(e) {}
      }

      this.$watch("isDrawerOpen", (value) => {
        if (value) {
          document.body.classList.add("no-scroll");
        } else {
          document.body.classList.remove("no-scroll");
        }
      });

      this.$watch("activeCategory", () => {
        this.currentPage = 1;
      });
    },

    saveUserData() {
      // Allow syncing back from drawer inputs as well
      const dataToSave = {
        name: this.booking.name,
        phone: this.booking.phone,
        address: this.booking.deliveryAddress,
        lat: this.booking.deliveryLat,
        lng: this.booking.deliveryLng
      };
      localStorage.setItem("auroraUserData", JSON.stringify(dataToSave));
    },

    saveCart() {
      localStorage.setItem("aurora_cart", JSON.stringify(this.cart));
    },

    // ======================
    // FILTER & SEARCH
    // ======================
    filteredProducts() {
      let filtered = this.products;

      // Filter by category
      if (this.activeCategory !== "all") {
        filtered = filtered.filter((p) => p.category === this.activeCategory);
      }

      // Filter by search query
      if (this.searchQuery.trim()) {
        const query = this.searchQuery.toLowerCase();
        filtered = filtered.filter((p) => p.name.toLowerCase().includes(query) || p.category.toLowerCase().includes(query));
      }

      return filtered;
    },

    getPaginatedProducts() {
      const filtered = this.filteredProducts();
      const start = (this.currentPage - 1) * this.productsPerPage;
      const end = start + this.productsPerPage;
      return filtered.slice(start, end);
    },

    getTotalPages() {
      const filtered = this.filteredProducts();
      return Math.ceil(filtered.length / this.productsPerPage);
    },

    nextPage() {
      if (this.currentPage < this.getTotalPages()) {
        this.currentPage++;
      }
    },

    previousPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
      }
    },

    // ======================
    // CART ACTION
    // ======================

    addToCart(product) {
      const existing = this.cart.find((i) => i.id === product.id);
      if (existing) {
        existing.qty++;
        this.saveCart();
        // Show alert/toast for duplicate
        if (window.Alpine && Alpine.store && Alpine.store("rentalApp")) {
          Alpine.store("rentalApp").showToast("Produk sudah ada, jumlah diperbarui", "success");
        } else if (typeof this.showToast === "function") {
          this.showToast("Produk sudah ada, jumlah diperbarui", "success");
        } else {
          alert("Produk sudah ada di keranjang, jumlah diperbarui!");
        }
      } else {
        this.cart.push({ ...product, qty: 1 });
        this.saveCart();
        // Show alert/toast for new product
        if (window.Alpine && Alpine.store && Alpine.store("rentalApp")) {
          Alpine.store("rentalApp").showToast("Produk ditambahkan ke keranjang", "success");
        } else if (typeof this.showToast === "function") {
          this.showToast("Produk ditambahkan ke keranjang", "success");
        } else {
          alert("Produk ditambahkan ke keranjang!");
        }
      }
    },
    increaseQty(item) {
      item.qty++;
      this.saveCart();
    },

    decreaseQty(item) {
      if (item.qty > 1) {
        item.qty--;
        this.saveCart();
      } else {
        Swal.fire({
          title: "Hapus produk?",
          text: "Apakah Anda yakin ingin menghapus produk ini dari keranjang?",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#d33",
          cancelButtonColor: "#3085d6",
          confirmButtonText: "Hapus",
          cancelButtonText: "Batal"
        }).then((result) => {
          if (result.isConfirmed) {
            this.cart = this.cart.filter((i) => i.id !== item.id);
            this.saveCart();
          }
        });
      }
    },

    removeItem(id) {
      Swal.fire({
        title: "Hapus produk?",
        text: "Apakah Anda yakin ingin menghapus produk ini dari keranjang?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#3085d6",
        confirmButtonText: "Hapus",
        cancelButtonText: "Batal"
      }).then((result) => {
        if (result.isConfirmed) {
          this.cart = this.cart.filter((i) => i.id !== id);
          this.saveCart();
        }
      });
    },

    // Hapus produk dari daftar utama dan update localStorage
    removeProduct(id) {
      this.products = this.products.filter((p) => p.id !== id);
      localStorage.setItem("aurora_products", JSON.stringify(this.products));
      if (typeof this.showToast === "function") {
        this.showToast("Produk berhasil dihapus", "success");
      }
    },

    // ======================
    // BOOKING LOGIC
    // ======================

    get rentalDays() {
      if (!this.booking.startDate || !this.booking.endDate) return 0;

      const start = new Date(this.booking.startDate);
      const end = new Date(this.booking.endDate);

      const diff = end - start;
      const days = diff / (1000 * 60 * 60 * 24);

      return days > 0 ? days : 0;
    },

    get deliveryFee() {
      if (this.booking.deliveryMethod !== "antar") return 0;
      const distance = parseFloat(this.booking.deliveryDistance) || 0;
      if (distance <= 0) return 0;
      // Rp20.000 per 5 km
      const multiplier = Math.ceil(distance / 5);
      return multiplier * 20000;
    },

    get totalPrice() {
      if (this.rentalDays === 0) return 0;

      const subtotal = this.cart.reduce((total, item) => {
        return total + item.price * item.qty * this.rentalDays;
      }, 0);
      
      return subtotal + this.deliveryFee;
    },

    checkoutWhatsApp() {
      if (!this.booking.name || !this.booking.phone || !this.booking.startDate || !this.booking.endDate || this.rentalDays <= 0 || this.cart.length === 0) {
        alert("Lengkapi data booking dengan benar.");
        return;
      }
      
      if (this.booking.deliveryMethod === "antar") {
        if (!this.booking.deliveryAddress || !this.booking.deliveryDistance) {
            alert("Lengkapi alamat dan jarak pengantaran.");
            return;
        }
      }

      let msg = `⛺ *Halo Admin Aurora Outdoor!* ⛺%0A%0ASaya ingin menyewa alat camping. Berikut detailnya:%0A%0A`;
      
      msg += `*📦 DETAIL BARANG:*%0A`;
      const items = this.cart.map((i) => `▪️ ${i.name} (x${i.qty}) - Rp ${i.price.toLocaleString()}/hari`).join("%0A");
      msg += `${items}%0A%0A`;

      msg += `*📅 WAKTU SEWA:*%0A`;
      msg += `▪️ Tanggal: ${this.booking.startDate} s/d ${this.booking.endDate}%0A`;
      msg += `▪️ Durasi: ${this.rentalDays} hari%0A%0A`;
      
      msg += `*👤 DATA PEMESAN:*%0A`;
      msg += `▪️ Nama: ${this.booking.name}%0A`;
      msg += `▪️ No WA: ${this.booking.phone}%0A%0A`;

      msg += `*🚚 PENGAMBILAN BARANG:*%0A`;
      msg += `▪️ Pilihan: ${this.booking.deliveryMethod === 'antar' ? '🛵 Diantar ke Alamat' : '🏪 Ambil di Lapak'}%0A`;

      if (this.booking.deliveryMethod === 'antar') {
          msg += `▪️ Estimasi Jarak: ${this.booking.deliveryDistance} km%0A`;
          msg += `▪️ Alamat Tujuan: ${this.booking.deliveryAddress}%0A`;
          if (this.booking.deliveryLat && this.booking.deliveryLng) {
            msg += `▪️ Titik Lokasi (Map): https://www.google.com/maps?q=${this.booking.deliveryLat},${this.booking.deliveryLng}%0A`;
          }
          msg += `▪️ Biaya Antar: Rp ${this.deliveryFee.toLocaleString()}%0A`;
      }

      msg += `%0A-------------------------------%0A`;
      msg += `*💵 TOTAL KESELURUHAN: Rp ${this.totalPrice.toLocaleString()}*%0A`;
      msg += `-------------------------------%0A%0A`;
          
      msg += `Mohon infokan ketersediaan alatnya ya min. Terima kasih! 🙏`;

      window.open(`https://wa.me/6281947229060?text=${msg}`, "_blank");

      this.isDrawerOpen = false;
    },
  }));
});
