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
    selectedProduct: null,
    isModalOpen: false,

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
        description: "Tenda Eiger kapasitas 2-3 orang dengan material waterproof berkualitas tinggi dan frame fiber yang kokoh.",
      },
      {
        id: 2,
        name: "Tenda QUECHUA",
        price: 30000,
        category: "tenda",
        img: "assets/img/product/tenda/2.png",
        description: "Tenda Quechua yang praktis dan mudah dipasang. Cocok untuk berkemah santai dengan sirkulasi udara yang baik.",
      },
      {
        id: 3,
        name: "Tenda MONODOME",
        price: 20000,
        category: "tenda",
        img: "assets/img/product/tenda/3.png",
        description: "Tenda single layer yang ringan dan efisien. Solusi ekonomis untuk kebutuhan camping singkat Anda.",
      },
      {
        id: 4,
        name: "Tenda JAVA 2",
        price: 30000,
        category: "tenda",
        img: "assets/img/product/tenda/4.png",
        description: "Tenda Java 2 dengan double layer untuk perlindungan ekstra dari hujan dan embun malam.",
      },
      {
        id: 5,
        name: "Tenda Family ARPENAZ 4.0",
        price: 150000,
        category: "tenda",
        img: "assets/img/product/tenda/5.png",
        description: "Tenda keluarga kapasitas 4 orang dengan ruang tengah yang luas untuk berkumpul.",
      },
      {
        id: 6,
        name: "Tenda Family ARPENAZ 4.1",
        price: 175000,
        category: "tenda",
        img: "assets/img/product/tenda/6.png",
        description: "Tenda keluarga dengan satu kamar tidur luas dan ruang tamu yang tinggi untuk kenyamanan maksimal.",
      },
      {
        id: 7,
        name: "Tenda Family ARPENAZ 4.2",
        price: 200000,
        category: "tenda",
        img: "assets/img/product/tenda/7.png",
        description: "Tenda keluarga premium dengan 2 kamar tidur terpisah, memberikan privasi ekstra saat camping bersama.",
      },
      {
        id: 8,
        name: "Tenda NSM 4",
        price: 40000,
        category: "tenda",
        img: "assets/img/product/tenda/8.png",
        description: "Tenda kapasitas 4 orang dengan desain klasik dan fitur waterproof yang handal di cuaca gunung.",
      },
      {
        id: 9,
        name: "Tenda JAYADIPA 4",
        price: 50000,
        category: "tenda",
        img: "assets/img/product/tenda/9.png",
        description: "Tenda Jayadipa kapasitas 4 orang dengan material ripstop yang kuat dan tahan lama.",
      },
      {
        id: 10,
        name: "Tenda NSM 4 Tendaki",
        price: 40000,
        category: "tenda",
        img: "assets/img/product/tenda/10.png",
        description: "Tenda Tendaki NSM 4, pilihan favorit pendaki Indonesia karena ketangguhannya menghadapi cuaca tropis.",
      },
      {
        id: 11,
        name: "Tenda BORNEO 4 Black",
        price: 50000,
        category: "tenda",
        img: "assets/img/product/tenda/11.png",
        description: "Tenda Borneo 4 edisi Hitam yang estetik dengan double layer dan teras depan yang luas.",
      },
      {
        id: 12,
        name: "Tenda BORNEO 4 Yellow",
        price: 50000,
        category: "tenda",
        img: "assets/img/product/tenda/12.png",
        description: "Tenda Borneo 4 Kuning cerah, memudahkan identifikasi tenda Anda di area camping yang padat.",
      },
      {
        id: 13,
        name: "Tenda BORNEO 4 Red",
        price: 50000,
        category: "tenda",
        img: "assets/img/product/tenda/13.png",
        description: "Tenda Borneo 4 Merah dengan build quality yang solid untuk keamanan saat beristirahat.",
      },
      {
        id: 14,
        name: "Tenda MANDALA 5 Pro",
        price: 70000,
        category: "tenda",
        img: "assets/img/product/tenda/14.png",
        description: "Tenda Mandala 5 Pro berkapasitas besar dengan ventilasi superior untuk kenyamanan grup.",
      },
      {
        id: 15,
        name: "Tenda BIGDOME 6 Go",
        price: 75000,
        category: "tenda",
        img: "assets/img/product/tenda/15.png",
        description: "Tenda Bigdome kapasitas 6 orang, sangat cocok untuk gathering atau kegiatan outdoor skala besar.",
      },
      {
        id: 16,
        name: "Tenda HANLU Tendaki",
        price: 100000,
        category: "tenda",
        img: "assets/img/product/tenda/16.png",
        description: "Tenda Hanlu Tendaki dengan desain geodesic yang stabil and perlindungan maksimal dari badai.",
      },
      // Carrier
      { id: 17, name: "Carrier Kobra 60L Red", price: 25000, category: "carrier", img: "assets/img/product/carrier/1.png", description: "Carrier 60L tangguh dengan sirkulasi udara punggung yang baik untuk pendakian panjang." },
      { id: 18, name: "Carrier Kobra 60L Green", price: 25000, category: "carrier", img: "assets/img/product/carrier/2.png", description: "Tas gunung 60L warna hijau dengan slot laptop dan raincover terintegrasi." },
      { id: 19, name: "Carier Kobra 60L Black", price: 25000, category: "carrier", img: "assets/img/product/carrier/3.png", description: "Carrier 60L hitam elegan, material duratex yang sangat tahan gesekan." },
      { id: 20, name: "Carier Bunglon 45L green", price: 25000, category: "carrier", img: "assets/img/product/carrier/4.png", description: "Tas 45L ringkas, cocok untuk pendakian 2 hari 1 malam (tektok) ke puncak." },
      { id: 21, name: "Carier Bunglon 45L Red", price: 25000, category: "carrier", img: "assets/img/product/carrier/5.png", description: "Tas 45L berdesain ergonomis dengan busa bahu yang tebal dan nyaman." },
      { id: 22, name: "Carrier 45-60 L", price: 20000, category: "carrier", img: "assets/img/product/carrier/6.png", description: "Tas multifungsi dengan kapasitas yang dapat disesuaikan antara 45 hingga 60 liter." },
      { id: 23, name: "Carrier Cobra 45-60L", price: 15000, category: "carrier", img: "assets/img/product/carrier/7.png", description: "Tas Cobra ekonomis dengan daya tahan beban yang baik untuk kelasnya." },
      { id: 24, name: "Daypack / Backpack", price: 10000, category: "carrier", img: "assets/img/product/carrier/8.png", description: "Tas harian ringan untuk membawa perlengkapan pribadi saat menjelajah area camp." },
      { id: 25, name: "Hydropack Reptil Plumbea", price: 15000, category: "carrier", img: "assets/img/product/carrier/9.png", description: "Tas minum khusus untuk trail running atau bersepeda dengan slot water bladder." },
      { id: 26, name: "Hydropack Airlite A.1", price: 20000, category: "carrier", img: "assets/img/product/carrier/10.png", description: "Hydropack Airlite yang super ringan, mendukung mobilitas tinggi Anda di alam." },
      { id: 27, name: "Hydropack Airlite A.2 Blue", price: 20000, category: "carrier", img: "assets/img/product/carrier/11.png", description: "Hydropack Airlite versi A.2 dengan kantong tambahan untuk menyimpan gadget." },
      { id: 28, name: "Hydropack Raptor 10L", price: 20000, category: "carrier", img: "assets/img/product/carrier/12.png", description: "Tas hidrasi 10 liter berdesain sporty, menjaga hidrasi Anda tetap terjaga." },
      { id: 29, name: "Hydropack Mague 10L Blue", price: 20000, category: "carrier", img: "assets/img/product/carrier/13.png", description: "Tas hidrasi Mague kapasitas 10L untuk kenyamanan berlari atau bersepeda." },
      { id: 30, name: "Hydropack Mague 10L Reg", price: 20000, category: "carrier", img: "assets/img/product/carrier/14.png", description: "Varian standar Mague 10L dengan material mesh yang sejuk di punggung." },
      { id: 31, name: "Hydropack Mague 10L White", price: 20000, category: "carrier", img: "assets/img/product/carrier/15.png", description: "Hydropack Putih estetik untuk pendukung fashion outdoor Anda." },
      { id: 32, name: "Hydropack Mague 10L Pink", price: 20000, category: "carrier", img: "assets/img/product/carrier/16.png", description: "Hydropack Pink yang cerah dan stylish untuk aktivitas olahraga luar ruangan." },
      { id: 33, name: "Hydropack Reptil Plumbea", price: 15000, category: "carrier", img: "assets/img/product/carrier/17.png", description: "Tas hidrasi ergonomis degan strap dada yang stabil saat dibawa aktif bergerak." },
      { id: 34, name: "Hydropack Airlite A.2 Bluesky", price: 20000, category: "carrier", img: "assets/img/product/carrier/18.png", description: "Hydropack Airlite warna biru langit yang menawan dan fungsional." },
      { id: 35, name: "Hydropack AirLite A.2 Brown", price: 20000, category: "carrier", img: "assets/img/product/carrier/19.png", description: "Hydropack warna coklat earth-tone yang menyatu dengan suasana alam." },
      // Masak
      { id: 36, name: "Kompor Kotak K 202", price: 10000, category: "masak", img: "assets/img/product/masak/1.png", description: "Kompor portable ringkas model kotak, sangat praktis dibawa mendaki." },
      { id: 37, name: "Kompor WF K 203", price: 15000, category: "masak", img: "assets/img/product/masak/2.png", description: "Kompor windproof (tahan angin) dengan pelindung api khusus untuk cuaca berangin." },
      { id: 38, name: "Kompor Portable", price: 20000, category: "masak", img: "assets/img/product/masak/3.png", description: "Kompor masak portable standar untuk camping, mudah dioperasikan siap pakai." },
      { id: 39, name: "Cooking Set 200", price: 10000, category: "masak", img: "assets/img/product/masak/4.png", description: "Set alat masak aluminium (nesting) untuk kapasitas 1-2 orang." },
      { id: 40, name: "Cooking Set DS 308", price: 15000, category: "masak", img: "assets/img/product/masak/5.png", description: "Alat masak camping lengkap (nesting) untuk kebutuhan masak grup kecil." },
      { id: 41, name: "Nesting TNI", price: 10000, category: "masak", img: "assets/img/product/masak/6.png", description: "Alat masak model militer yang sangat kuat dan tahan panas tinggi." },
      { id: 42, name: "Gas Portable", price: 8000, category: "masak", img: "assets/img/product/masak/7.png", description: "Bahan bakar gas tabung portable (hi-cook) untuk kompor camping Anda." },
      // Penerangan
      { id: 43, name: "HeadLamp MS 334", price: 5000, category: "penerangan", img: "assets/img/product/penerangan/1.png", description: "Senter kepala LED dengan tingkat keterangan tinggi, membantu mobilitas malam hari." },
      { id: 44, name: "Lampu Lentera", price: 5000, category: "penerangan", img: "assets/img/product/penerangan/2.png", description: "Lampu hias tenda (lentera) yang memberikan cahaya lembut dan hangat di dalam camp." },
      { id: 45, name: "Lampu Tembak 50 W", price: 25000, category: "penerangan", img: "assets/img/product/penerangan/3.png", description: "Lampu sorot 50 Watt yang sangat terang untuk penerangan area camp yang luas." },
      { id: 46, name: "Lampu Tembak 100 W", price: 30000, category: "penerangan", img: "assets/img/product/penerangan/4.png", description: "Penerangan maksimal 100 Watt untuk aktivitas malam hari di luar ruangan." },
      // Aksesories
      { id: 47, name: "Flyshhet 3x3 (Tanpa Tali & Pasak)", price: 10000, category: "aksesories", img: "assets/img/product/aksesories/1.png", description: "Kain flysheet 3x3 meter untuk peneduh atau pelindung tenda tambahan." },
      { id: 48, name: "Flyshhet 3x4 (Tanpa Tali & Pasak)", price: 15000, category: "aksesories", img: "assets/img/product/aksesories/2.png", description: "Flysheet ukuran medium 3x4 meter dengan material waterproof berkualitas." },
      { id: 49, name: "Flyshhet 4x6 (Tanpa Tali & Pasak)", price: 25000, category: "aksesories", img: "assets/img/product/aksesories/3.png", description: "Flysheet jumbo 4x6 meter, ideal untuk area dapur umum atau peneduh mobil." },
      { id: 50, name: "Flyshhet 3x3", price: 20000, category: "aksesories", img: "assets/img/product/aksesories/4.png", description: "Set flysheet 3x3 lengkap dengan tali temali dan pasak, siap digunakan." },
      { id: 51, name: "Flayshhet 3x4", price: 25000, category: "aksesories", img: "assets/img/product/aksesories/5.png", description: "Set flysheet 3x4 lengkap untuk peneduh area camping Anda dengan mudah." },
      { id: 52, name: "Flayshhet 4x6", price: 35000, category: "aksesories", img: "assets/img/product/aksesories/6.png", description: "Set jumbo flysheet 4x6 lengkap, memberikan perlindungan area luas dari hujan." },
      { id: 53, name: "Tiang Flysheet", price: 15000, category: "aksesories", img: "assets/img/product/aksesories/7.png", description: "Tiang penyangga flysheet yang kuat dan dapat diatur ketinggiannya." },
      { id: 54, name: "Matras Spons", price: 5000, category: "aksesories", img: "assets/img/product/aksesories/8.png", description: "Matras busa standar untuk alas tidur atau duduk agar tidak dingin dari tanah." },
      { id: 55, name: "Paket Cihuy C", price: 45000, category: "aksesories", img: "assets/img/product/aksesories/9.png", description: "Paket hemat aksesories mendaki untuk pemula, simpel dan fungsional." },
      { id: 56, name: "Paket Cihuy B", price: 65000, category: "aksesories", img: "assets/img/product/aksesories/10.png", description: "Paket menengah perlengkapan camping dengan item-item pilihan terbaik." },
      { id: 57, name: "Paket Cihuy A", price: 75000, category: "aksesories", img: "assets/img/product/aksesories/11.png", description: "Paket lengkap (Luxury) untuk pengalaman camping paling nyaman." },
      { id: 58, name: "Kursi Lipat Biasa", price: 15000, category: "aksesories", img: "assets/img/product/aksesories/12.png", description: "Kursi camping lipat ringan yang mudah dibawa ke mana saja." },
      { id: 59, name: "Kursi Lipat Trail Top", price: 20000, category: "aksesories", img: "assets/img/product/aksesories/13.png", description: "Kursi camping premium dengan struktur kaki yang stabil di permukaan tidak rata." },
      { id: 60, name: "Kursi Lipat L", price: 15000, category: "aksesories", img: "assets/img/product/aksesories/14.png", description: "Kursi lipat ukuran L yang nyaman untuk bersantai di area camp." },
      { id: 61, name: "Kursi Lipat XL", price: 20000, category: "aksesories", img: "assets/img/product/aksesories/15.png", description: "Kursi lipat extra besar (XL) untuk kenyamanan maksimal saat berkumpul." },
      // Pribadi
      { id: 62, name: "SB Darcon", price: 5000, category: "pribadi", img: "assets/img/product/pribadi/1.png", description: "Sleeping bag isi darcon yang hangat, melindungi tidur Anda dari udara malam." },
      { id: 63, name: "SB polar Bulu", price: 10000, category: "pribadi", img: "assets/img/product/pribadi/2.png", description: "Sleeping bag dengan lapisan polar bulu di dalam yang sangat lembut dan hangat." },
      { id: 64, name: "SB Bulu Angsa", price: 15000, category: "pribadi", img: "assets/img/product/pribadi/3.png", description: "Sleeping bag premium bulu angsa, paling hangat untuk mendaki gunung tinggi." },
      { id: 65, name: "Tracking Pole", price: 10000, category: "pribadi", img: "assets/img/product/pribadi/4.png", description: "Tongkat alat bantu jalan mendaki untuk menjaga keseimbangan dan mengurangi beban lutut." },
      { id: 66, name: "Sarung Tangan Polar", price: 10000, category: "pribadi", img: "assets/img/product/pribadi/5.png", description: "Sarung tangan bahan polar untuk menjaga jari tetap hangat di cuaca dingin." },
      { id: 67, name: "Handy Talky (HT)", price: 25000, category: "pribadi", img: "assets/img/product/pribadi/6.png", description: "Alat komunikasi HT untuk koordinasi antar anggota tim di area tanpa sinyal." },
      { id: 68, name: "Sepatu Gunung", price: 25000, category: "pribadi", img: "assets/img/product/pribadi/7.png", description: "Sepatu mendaki bergerigi (grip) kuat, melindungi kaki dari slip dan cedera." },
      { id: 69, name: "The Nort Face Brown", price: 45000, category: "pribadi", img: "assets/img/product/pribadi/8.png", description: "Jaket gunung TNF coklat dengan material breathable dan tahan angin." },
      { id: 70, name: "The Nort Face Black", price: 45000, category: "pribadi", img: "assets/img/product/pribadi/9.png", description: "Jaket gunung TNF hitam dengan fitur windproof dan water repellent." },
      { id: 71, name: "The Nort Face white", price: 45000, category: "pribadi", img: "assets/img/product/pribadi/10.png", description: "Jaket gunung warna putih estetik, melindungi dari terpaan angin kencang." },
      { id: 72, name: "The Nort Face green", price: 45000, category: "pribadi", img: "assets/img/product/pribadi/11.png", description: "Jaket outdoor warna hijau botol, sangat fungsional dan bergaya." },
      { id: 73, name: "Sepatu Hoka Pink", price: 45000, category: "pribadi", img: "assets/img/product/pribadi/12.png", description: "Sepatu Hoka trail running dengan bantalan empuk untuk lari lintas alam." },
      { id: 74, name: "Sepatu Hoka Brown", price: 45000, category: "pribadi", img: "assets/img/product/pribadi/13.png", description: "Sepatu Hoka coklat tangguh, mendukung performa tinggi saat mendaki cepat." },
      { id: 75, name: "Sepatu Hoka green", price: 45000, category: "pribadi", img: "assets/img/product/pribadi/14.png", description: "Sepatu outdoor Hoka hijau dengan sol traksi tinggi di tanah basah." },
      { id: 76, name: "Sepatu Hoka Pink", price: 45000, category: "pribadi", img: "assets/img/product/pribadi/15.png", description: "Sepatu trail running Hoka Pink, perpaduan gaya dan performa di lintasan." },
      { id: 77, name: "Sepatu Columia Black", price: 45000, category: "pribadi", img: "assets/img/product/pribadi/16.png", description: "Sepatu Columbia original hitam, tahan air dan sangat nyaman dipakai lama." },
      { id: 78, name: "Sepatu Columia Dark Black", price: 45000, category: "pribadi", img: "assets/img/product/pribadi/17.png", description: "Sepatu gunung Columbia dengan fitur sirkulasi udara baik untuk kaki tetap kering." },
      { id: 79, name: "Sepatu Columia White", price: 45000, category: "pribadi", img: "assets/img/product/pribadi/18.png", description: "Sepatu Columbia putih elegan dengan material premium yang mudah dibersihkan." },
      { id: 80, name: "Sepatu Arcteryx Blue", price: 45000, category: "pribadi", img: "assets/img/product/pribadi/19.png", description: "Sepatu Arcteryx biru profesional, ringan dan sangat stabil di medan teknis." },
      { id: 81, name: "Sepatu Arcteryx Balck", price: 45000, category: "pribadi", img: "assets/img/product/pribadi/20.png", description: "Varian hitam sepatu Arcteryx, pilihan utama pendaki untuk kenyamanan maksimal." },
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

    getDisplayedPages() {
      const total = this.getTotalPages();
      const current = this.currentPage;
      const range = 2; // Show 2 pages before and after current
      
      let start = Math.max(1, current - range);
      let end = Math.min(total, current + range);
      
      // Adjust if near the start or end
      if (current <= range) {
        end = Math.min(total, start + (range * 2));
      } else if (current > total - range) {
        start = Math.max(1, end - (range * 2));
      }
      
      const pages = [];
      for (let i = start; i <= end; i++) {
        pages.push(i);
      }
      return pages;
    },

    // ======================
    // CART ACTION
    // ======================

    addToCart(product) {
      const existing = this.cart.find((i) => i.id === product.id);
      if (existing) {
        existing.qty++;
        this.saveCart();
        this.showToast("Jumlah diperbarui di keranjang", "success");
      } else {
        this.cart.push({ ...product, qty: 1 });
        this.saveCart();
        this.showToast("Produk ditambahkan ke keranjang", "success");
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
        this.removeItem(item.id);
      }
    },

    openModal(product) {
      this.selectedProduct = product;
      this.isModalOpen = true;
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
      // Rp12.000 per 5 km
      const multiplier = Math.ceil(distance / 5);
      return multiplier * 12000;
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
        Swal.fire({
          title: "Data Belum Lengkap",
          text: "Silakan lengkapi data booking dan pastikan keranjang tidak kosong.",
          icon: "error"
        });
        return;
      }
      
      if (this.booking.deliveryMethod === "antar") {
        if (!this.booking.deliveryAddress || !this.booking.deliveryDistance) {
            Swal.fire({
              title: "Alamat Pengantaran",
              text: "Lengkapi alamat dan estimasi jarak pengantaran.",
              icon: "error"
            });
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

      // Reset Keranjang
      this.cart = [];
      this.saveCart();

      this.isDrawerOpen = false;
    },
  }));
});
