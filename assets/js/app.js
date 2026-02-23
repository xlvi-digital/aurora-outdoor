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
    productsPerPage: 8,
    searchQuery: "",

    booking: {
      name: "",
      phone: "",
      startDate: "",
      endDate: "",
    },

    categories: [
      { key: "all", label: "Semua" },
      { key: "tenda", label: "Tenda" },
      { key: "masak", label: "Masak" },
    ],

    products: [
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
    ],

    // ======================
    // INIT
    // ======================
    init() {
      const saved = localStorage.getItem("aurora_cart");
      if (saved) {
        this.cart = JSON.parse(saved);
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
      } else {
        this.cart.push({ ...product, qty: 1 });
      }

      this.saveCart();
      this.showToast("Produk ditambahkan ke keranjang", "success");
    },

    increaseQty(item) {
      item.qty++;
      this.saveCart();
    },

    decreaseQty(item) {
      if (item.qty > 1) {
        item.qty--;
      } else {
        this.removeItem(item.id);
      }
      this.saveCart();
    },

    removeItem(id) {
      this.cart = this.cart.filter((i) => i.id !== id);
      this.saveCart();
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

    get totalPrice() {
      if (this.rentalDays === 0) return 0;

      return this.cart.reduce((total, item) => {
        return total + item.price * item.qty * this.rentalDays;
      }, 0);
    },

    checkoutWhatsApp() {
      if (!this.booking.name || !this.booking.phone || !this.booking.startDate || !this.booking.endDate || this.rentalDays <= 0 || this.cart.length === 0) {
        alert("Lengkapi data booking dengan benar.");
        return;
      }

      let message = `Halo Aurora Outdoor,%0A%0A`;
      message += `Nama: ${this.booking.name}%0A`;
      message += `No HP: ${this.booking.phone}%0A`;
      message += `Tanggal: ${this.booking.startDate} - ${this.booking.endDate}%0A`;
      message += `Durasi: ${this.rentalDays} hari%0A%0A`;
      message += `Detail Pesanan:%0A`;

      this.cart.forEach((item) => {
        message += `- ${item.name} x${item.qty} (Rp ${item.price.toLocaleString()}/hari)%0A`;
      });

      message += `%0ATotal: Rp ${this.totalPrice.toLocaleString()}`;

      window.open(`https://wa.me/6281313362467?text=${message}`, "_blank");

      this.isDrawerOpen = false;
    },
  }));
});
