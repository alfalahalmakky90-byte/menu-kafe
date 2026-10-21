/* ============================================================
   MuisMwon Digital Menu - Interactive Script
   ============================================================ */

// Array untuk menyimpan item yang dipesan
let pesanan = [];
let totalHarga = 0;

/**
 * 1. Menambahkan menu ke dalam keranjang belanja
 */
function tambahPesanan(namaMenu, harga) {
    // Cek apakah item sudah ada di keranjang
    let existingItem = pesanan.find(item => item.nama === namaMenu);

    if (existingItem) {
        existingItem.jumlah += 1;
    } else {
        pesanan.push({
            nama: namaMenu,
            harga: harga,
            jumlah: 1
        });
    }

    hitungTotal();
    updateCartUI();
}

/**
 * 2. Mengubah jumlah item (Tambah/Kurang) dari dalam Modal
 */
function ubahJumlah(index, delta) {
    pesanan[index].jumlah += delta;

    // Jika jumlah menjadi 0 atau kurang, hapus item dari daftar
    if (pesanan[index].jumlah <= 0) {
        pesanan.splice(index, 1);
    }

    hitungTotal();
    updateCartUI();
}

/**
 * 3. Menghitung ulang total harga keseluruhan
 */
function hitungTotal() {
    totalHarga = pesanan.reduce((total, item) => total + (item.harga * item.jumlah), 0);
}

/**
 * 4. Memperbarui Tampilan UI Keranjang & Modal Popup
 */
function updateCartUI() {
    let cartCount = document.getElementById("cart-count");
    let cartTotal = document.getElementById("cart-total");
    let modalTotal = document.getElementById("modal-total");
    let cartItems = document.getElementById("cart-items");

    // Hitung total item (pcs)
    let totalItemCount = pesanan.reduce((sum, item) => sum + item.jumlah, 0);

    // Update teks jumlah item & harga di Floating Cart & Modal
    cartCount.innerText = `${totalItemCount} Item`;
    cartTotal.innerText = totalHarga.toLocaleString("id-ID");
    modalTotal.innerText = totalHarga.toLocaleString("id-ID");

    // Update daftar item di dalam Modal
    cartItems.innerHTML = "";

    if (pesanan.length === 0) {
        cartItems.innerHTML = '<li class="empty-msg">Belum ada pesanan terpilih.</li>';
        return;
    }

    pesanan.forEach((item, index) => {
        let li = document.createElement("li");
        li.className = "cart-item-row";
        
        let subtotal = item.harga * item.jumlah;

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

/**
 * 5. Buka / Tutup Modal Popup Keranjang
 */
function toggleCartModal() {
    let modal = document.getElementById("cart-modal");
    modal.classList.toggle("active");
}

/**
 * 6. Filter Kategori Menu (Tab Navigasi)
 */
function filterMenu(kategori) {
    // Ubah status tombol aktif
    let buttons = document.querySelectorAll(".cat-btn");
    buttons.forEach(btn => btn.classList.remove("active"));
    
    // Set tombol yang diklik jadi aktif
    event.currentTarget.classList.add("active");

    // Tampilkan / sembunyikan grup menu sesuai kategori
    let groups = document.querySelectorAll(".menu-group");
    groups.forEach(group => {
        if (kategori === 'all' || group.getAttribute("data-category") === kategori) {
            group.style.display = "block";
        } else {
            group.style.display = "none";
        }
    });
}

/**
 * 7. Mengirimkan Format Pesanan ke WhatsApp Kasir/Kafe
 */
function kirimWhatsApp() {
    if (pesanan.length === 0) {
        alert("Keranjang pesanan kamu masih kosong!");
        return;
    }

    let pesanText = "Halo *MuisMwon Coffee*, saya mau pesan:\n\n";
    
    pesanan.forEach((item) => {
        let subtotal = item.harga * item.jumlah;
        pesanText += `• ${item.nama} x${item.jumlah} = Rp ${subtotal.toLocaleString("id-ID")}\n`;
    });

    pesanText += `\n*Total Pembayaran: Rp ${totalHarga.toLocaleString("id-ID")}*`;
    pesanText += `\n\nMohon dikonfirmasi ya kak, terima kasih! 🙏`;

    // Ganti dengan nomor WhatsApp Kafe MuisMwon (Format 62...)
    let nomorWA = "6281234567890"; 
    let url = `https://wa.me/${nomorWA}?text=${encodeURIComponent(pesanText)}`;

    window.open(url, "_blank");
}
