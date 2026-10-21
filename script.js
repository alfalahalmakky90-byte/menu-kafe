// ==========================================
// 1. VARIABLE GLOBAL (MENYIMPAN DATA KERANJANG)
// ==========================================
let totalItems = 0;
let totalPrice = 0;

// ==========================================
// 2. FUNGSI TAMBAH PESANAN KE KERANJANG
// ==========================================
function addToCart(itemName, itemPrice) {
    // Tambahkan jumlah item dan total harga
    totalItems += 1;
    totalPrice += itemPrice;

    // Perbarui Tampilan di Floating Cart Bar
    document.getElementById('cartCount').innerText = totalItems;
    document.getElementById('cartTotal').innerText = 'Rp ' + totalPrice.toLocaleString('id-ID');

    // Berikan umpan balik ringkas menggunakan pesan konsol / log
    console.log(`[BERHASIL] ${itemName} ditambahkan ke keranjang.`);
}

// ==========================================
// 3. FUNGSI FILTER MENU BERDASARKAN KATEGORI
// ==========================================
function filterMenu(category) {
    const cards = document.querySelectorAll('.menu-card');
    const buttons = document.querySelectorAll('.cat-btn');

    // Ubah tampilan tombol kategori yang aktif
    buttons.forEach(btn => btn.classList.remove('active'));
    if (event && event.target) {
        event.target.classList.add('active');
    }

    // Tampilkan atau sembunyikan kartu menu sesuai kategori
    cards.forEach(card => {
        const cardCategory = card.getAttribute('data-category');
        if (category === 'all' || cardCategory === category) {
            card.style.display = 'flex';
        } else {
            card.style.display = 'none';
        }
    });
}

// ==========================================
// 4. FUNGSI BUKAMODAL CHECKOUT / PEMBAYARAN
// ==========================================
function checkout() {
    // Cek jika keranjang masih kosong
    if (totalItems === 0) {
        alert('Keranjang kamu masih kosong! Silakan pilih menu Nusantara favoritmu terlebih dahulu.');
        return;
    }

    // Set nominal harga ke modal QRIS dan PayLater
    const formattedPrice = 'Rp ' + totalPrice.toLocaleString('id-ID');
    document.getElementById('qrisTotalAmount').innerText = formattedPrice;
    document.getElementById('paylaterTotalAmount').innerText = formattedPrice;

    // Buat Kode QRIS Dinamis menggunakan API Public gratis
    const payload = `WARUNG-NUSANTARA-PAYMENT-TOTAL-${totalPrice}`;
    const qrApiUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(payload)}`;
    document.getElementById('qrisImage').src = qrApiUrl;

    // Tampilkan Modal Pembayaran
    document.getElementById('paymentModal').classList.add('active');
}

// ==========================================
// 5. FUNGSI PINDAH TAB (QRIS <-> PAYLATER)
// ==========================================
function switchPayment(method) {
    const tabs = document.querySelectorAll('.tab-btn');
    const qrisContent = document.getElementById('qrisContent');
    const paylaterContent = document.getElementById('paylaterContent');

    tabs.forEach(tab => tab.classList.remove('active'));

    if (method === 'qris') {
        tabs[0].classList.add('active');
        qrisContent.style.display = 'block';
        paylaterContent.style.display = 'none';
    } else if (method === 'paylater') {
        tabs[1].classList.add('active');
        qrisContent.style.display = 'none';
        paylaterContent.style.display = 'block';
    }
}

// ==========================================
// 6. FUNGSI TUTUP MODAL PEMBAYARAN
// ==========================================
function closePaymentModal() {
    document.getElementById('paymentModal').classList.remove('active');
}

// ==========================================
// 7. FUNGSI KONFIRMASI PEMBAYARAN & RESET
// ==========================================
function confirmPayment(type) {
    const formattedPrice = 'Rp ' + totalPrice.toLocaleString('id-ID');

    // Validasi Khusus Metode PayLater
    if (type === 'PayLater') {
        const phone = document.getElementById('phoneNumber').value.trim();
        
        if (!phone || phone.length < 10) {
            alert('Silakan masukkan nomor HP PayLater yang valid (minimal 10 digit)!');
            return;
        }

        alert(`[TRANSAKSI PAYLATER BERHASIL]\n\nTagihan sebesar ${formattedPrice} telah dikirim ke nomor HP (${phone}).\nSajikan pesanan ke meja pelanggan! 🍲`);
    } else {
        // Pembayaran QRIS
        alert(`[PEMBAYARAN QRIS BERHASIL]\n\nPembayaran sebesar ${formattedPrice} telah diverifikasi.\nPesanan sedang diproses di dapur ✨`);
    }

    // Reset Keranjang & Form Input
    totalItems = 0;
    totalPrice = 0;
    document.getElementById('cartCount').innerText = '0';
    document.getElementById('cartTotal').innerText = 'Rp 0';
    
    const phoneInput = document.getElementById('phoneNumber');
    if (phoneInput) {
        phoneInput.value = '';
    }

    // Tutup Modal
    closePaymentModal();
}
