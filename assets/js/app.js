document.addEventListener("alpine:init", () => {
  Alpine.data("rentalApp", () => ({
    // ===== STATE =====
    activeCategory: "all",
    days: 1,
    cart: [],

    products: [
      { id: 1, name: "Tenda Dome", price: 30000, category: "tenda", img: "assets/img/product/tenda.png" },
      { id: 2, name: "Kompor Portable", price: 15000, category: "makan", img: "assets/img/product/tenda1.png" },
      { id: 3, name: "Sleeping Bag", price: 20000, category: "tidur", img: "assets/img/product/tenda2.png" },
      { id: 4, name: "Headlamp", price: 10000, category: "aksesoris", img: "assets/img/product/tenda3.png" },
      // { id: 5, name: 'Matras', price: 10000, category: 'tidur' },
      // { id: 6, name: 'Nesting Set', price: 12000, category: 'makan' },
    ],

    categories: [
      { key: "all", label: "Semua" },
      { key: "tenda", label: "Tenda" },
      { key: "makan", label: "Alat Makan" },
      { key: "tidur", label: "Alat Tidur" },
      { key: "aksesoris", label: "Aksesoris" },
      { key: "pribadi", label: "Pribadi" },
    ],

    // ===== METHODS =====
    filteredProducts() {
      if (this.activeCategory === "all") return this.products;
      return this.products.filter((p) => p.category === this.activeCategory);
    },

    addToCart(product) {
      this.cart.push(product);
    },

    removeFromCart(index) {
      this.cart.splice(index, 1);
    },

    sendToWA() {
      if (!this.cart.length) return alert("Keranjang masih kosong");

      let msg = `Halo, saya ingin sewa alat camping\n`;
      msg += `Durasi: ${this.days} hari\n\n`;

      this.cart.forEach((item, i) => {
        msg += `${i + 1}. ${item.name} (Rp ${item.price.toLocaleString()}/hari)\n`;
      });

      const url = `https://wa.me/62XXXXXXXXXX?text=${encodeURIComponent(msg)}`;
      window.open(url, "_blank");
    },
  }));
});
