/* ============================================================
   DATA MENU MUISMWON (Menu Nusantara Autentik)
   ============================================================ */
const daftarMenu = [
    // ---------------- MAKANAN UTAMA ----------------
    {
        id: 1,
        nama: "Soto Josjis",
        kategori: "makanan",
        deskripsi: "Soto khas MuisMwon dengan kuah gurih segar, irisan daging empuk & krikil renyah.",
        harga: 18000,
        gambar: "https://images.unsplash.com/photo-1572656631137-7935297eff55?w=400"
    },
    {
        id: 2,
        nama: "Rawon Seto",
        kategori: "makanan",
        deskripsi: "Rawon kuah hitam pekat kaya rempah kluwek dengan daging sapi super lembut.",
        harga: 22000,
        gambar: "https://images.unsplash.com/photo-1541544741938-0af808871cc0?w=400"
    },
    {
        id: 3,
        nama: "Bakso Lowo",
        kategori: "makanan",
        deskripsi: "Bakso urat jumbo gurih disajikan dengan tahu, tetelan nikmat & kuah kaldu sapi pekat.",
        harga: 16000,
        gambar: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=400"
    },
    {
        id: 4,
        nama: "Mie Ayam Jowo",
        kategori: "makanan",
        deskripsi: "Mie kenyal manis gurih bumbu Jawa autentik dengan topping ayam cincang melimpah.",
        harga: 15000,
        gambar: "https://images.unsplash.com/photo-1612927601601-6638404737ce?w=400"
    },
    {
        id: 5,
        nama: "Nasi Goreng Khas Malang",
        kategori: "makanan",
        deskripsi: "Nasi goreng merah merona khas Malang dengan suwiran ayam, kekian, dan aroma smokey.",
        harga: 20000,
        gambar: "https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=400"
    },
    {
        id: 6,
        nama: "Sate Mbek Madura",
        kategori: "makanan",
        deskripsi: "Sate empuk dengan bumbu kacang kental gurih khas Madura, lengkap dengan irisan bawang merah & cabai rawit.",
        harga: 28000,
        gambar: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=400"
    },

    // ---------------- MINUMAN NUSANTARA ----------------
    {
        id: 7,
        nama: "Es Dawet Ayu",
        kategori: "minuman",
        deskripsi: "Minuman tradisional segar berisi cendol hijau, santan gurih, dan manisnya gula aren asli.",
        harga: 10000,
        gambar: "https://images.unsplash.com/photo-1556881286-fc6915169721?w=400"
    },
    {
        id: 8,
        nama: "Es Timun Suri",
        kategori: "minuman",
        deskripsi: "Es buah timun suri segar dengan sirup manis dan es serut yang melegakan tenggorokan.",
        harga: 9000,
        gambar: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?w=400"
    },
    {
        id: 9,
        nama: "Wedang Jahe Susu",
        kategori: "minuman",
        deskripsi: "Minuman hangat perasan jahe emprit asli berpadu susu kental manis yang menyehatkan.",
        harga: 12000,
        gambar: "https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=400"
    },
    {
        id: 10,
        nama: "Es Teh Poci Wangi",
        kategori: "minuman",
        deskripsi: "Teh melati seduh khas poci tanah liat dengan aroma wangi melati yang khas.",
        harga: 6000,
        gambar: "https://images.unsplash.com/photo-1576092768241-dec231879fc3?w=400"
    }
];

/* ============================================================
   LOGIKA SISTEM KERANJANG & APLIKASI
   ============================================================ */

let pesanan = [];
let totalHarga = 0;

document.addEventListener("DOMContentLoaded", () => {
    tampilkanMenu('all');
});

function tampilkanMenu(kategori) {
    const menuContainer = document.getElementById("menu-container");
    menuContainer.innerHTML = "";

    const menuFiltered = (kategori === 'all') 
        ? daftarMenu 
        : daftarMenu.filter(item => item.kategori === kategori);

    if (menuFiltered.length === 0) {
        menuContainer.innerHTML = `<p class="empty-msg">Tidak ada menu untuk kategori ini.</p>`;
        return;
    }

    menuFiltered.forEach(item => {
        const card = document.createElement("div");
        card.className = "menu-card";
        card.innerHTML = `
            <div class="img-wrapper">
                <img src="${item.gambar}" alt="${item.nama}">
            </div>
            <div class="menu-info">
                <h3>${item.nama}</h3>
                <p class="desc">${item.deskripsi}</p>
                <div class="card-footer">
                    <span class="price">Rp ${item.harga.toLocaleString("id-ID")}</span>
                    <button class="btn-add" onclick="tambahPesanan('${item.nama}', ${item.harga})">+ Tambah</button>
                </div>
            </div>
        `;
        menuContainer.appendChild(card);
    });
}

function filterMenu(kategori) {
    document.querySelectorAll(".cat-btn").forEach(btn => btn.classList.remove("active"));
    event.currentTarget.classList.add("active");
    tampilkanMenu(kategori);
}

function tambahPesanan(namaMenu, harga) {
    let itemAda = pesanan.find(item => item.nama === namaMenu);

    if (itemAda) {
        itemAda.jumlah += 1;
    } else {
        pesanan.push({ nama: namaMenu, harga: harga, jumlah: 1 });
    }

    hitungTotal();
    updateCartUI();
}

function ubahJumlah(index, delta) {
    pesanan[index].jumlah += delta;
    if (pesanan[index].jumlah <= 0) {
        pesanan.splice(index, 1);
    }
    hitungTotal();
    updateCartUI();
}

function hitungTotal() {
    totalHarga = pesanan.reduce((sum, item) => sum + (item.harga * item.jumlah), 0);
}

function updateCartUI() {
    const cartCount = document.getElementById("cart-count");
    const cartTotal = document.getElementById("cart-total");
    const modalTotal = document.getElementById("modal-total");
    const cartItems = document.getElementById("cart-items");

    const totalPcs = pesanan.reduce((sum, item) => sum + item.jumlah, 0);

    cartCount.innerText = `${totalPcs} Item`;
    cartTotal.innerText = totalHarga.toLocaleString("id-ID");
    modalTotal.innerText = totalHarga.toLocaleString("id-ID");

    cartItems.innerHTML = "";

    if (pesanan.length === 0) {
        cartItems.innerHTML = '<li class="empty-msg">Belum ada pesanan terpilih.</li>';
        return;
    }

    pesanan.forEach((item, index) => {
        const li = document.createElement("li");
        li.className = "cart-item-row";
        const subtotal = item.harga * item.jumlah;

        li.innerHTML = `
            <div class="item-detail">
                <span class="item-name" style="font-weight: 600; display: block;">${item.nama}</span>
                <span class="item-subtotal" style="font-size: 12px; color: var(--accent);">
                    Rp ${subtotal.toLocaleString("id-ID")}
                </span>
            </div>
            <div class="qty-controls" style="display: flex; align-items: center; gap: 8px;">
                <button onclick="ubahJumlah(${index}, -1)" style="background: #2a2a2a; color: white; border: none; width: 26px; height: 26px; border-radius: 6px; cursor: pointer; font-weight: bold;">-</button>
                <span style="font-size: 13px; font-weight: bold; min-width: 16px; text-align: center;">${item.jumlah}</span>
                <button onclick="ubahJumlah(${index}, 1)" style="background: var(--accent); color: #121212; border: none; width: 26px; height: 26px; border-radius: 6px; cursor: pointer; font-weight: bold;">+</button>
            </div>
        `;
        cartItems.appendChild(li);
    });
}

function toggleCartModal() {
    document.getElementById("cart-modal").classList.toggle("active");
}

function kirimWhatsApp() {
    if (pesanan.length === 0) {
        alert("Keranjang pesanan kamu masih kosong!");
        return;
    }

    let pesanText = "Halo *MuisMwon*, saya mau pesan:\n\n";
    pesanan.forEach(item => {
        let subtotal = item.harga * item.jumlah;
        pesanText += `• ${item.nama} x${item.jumlah} = Rp ${subtotal.toLocaleString("id-ID")}\n`;
    });

    pesanText += `\n*Total Pembayaran: Rp ${totalHarga.toLocaleString("id-ID")}*`;
    pesanText += `\n\nMohon dikonfirmasi ya kak, terima kasih! 🙏`;

    let nomorWA = "6281234567890"; // Ganti dengan nomor WhatsApp kamu
    window.open(`https://wa.me/${nomorWA}?text=${encodeURIComponent(pesanText)}`, "_blank");
}
