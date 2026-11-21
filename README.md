# 📊 Website Analisis Likuiditas - Toko Sembako Berkah

Website modern dan colorful untuk menampilkan analisis likuiditas dengan perhitungan rasio lancar dan rasio cepat.

**Dibuat oleh: Nurlailah (NPM 2461201017)**  
**Mata Kuliah: Artificial Intelligence**

---

## 🎯 Cara Menggunakan

### 1. Menjalankan Website

**Cara 1: Langsung buka file**
- Double-click `index.html` di File Explorer
- Website akan terbuka di browser default

**Cara 2: Melalui VS Code**
- Tekan `F5` atau klik tombol Run
- Chrome akan membuka website secara otomatis

**Cara 3: Menggunakan Live Server (jika terinstall)**
- Klik kanan `index.html` → "Open with Live Server"
- Website akan auto-reload setiap ada perubahan

### 2. Upload Foto (Opsional)

Website sudah memiliki **foto default** yang siap tampil:
- ✅ Foto profil: `images/noen1.jpeg`
- ✅ Foto Current Ratio: `images/CR.jpeg`
- ✅ Foto Quick Ratio: `images/QR.jpeg`

Jika ingin mengganti foto:
1. Klik tombol **"Upload Foto"** pada setiap bagian
2. Pilih foto dari komputer Anda
3. Foto akan tersimpan dan langsung ditampilkan

⚠️ **Catatan Penting:**
- Foto yang diupload disimpan di **localStorage browser**
- Jika cache browser dihapus, foto akan kembali ke foto default
- Foto default di folder `images/` **tidak akan hilang**

---

## 📂 Struktur Folder

```
UTS_NURLAILAH/
├── images/
│   ├── noen1.jpeg    ← Foto profil default
│   ├── CR.jpeg       ← Current Ratio calculation
│   └── QR.jpeg       ← Quick Ratio calculation
├── index.html        ← Halaman utama
├── styles.css        ← Styling
├── script.js         ← Interactivity
└── README.md         ← Dokumentasi ini
```

⚠️ **JANGAN MENGGANTI NAMA FOLDER `images/`**  
Website menggunakan path `images/` untuk memuat foto default!

---

## ✨ Fitur Website

- 🎨 **Desain Modern & Colorful** dengan 7 gradient cards berbeda
- 📱 **Responsive Design** - tampil sempurna di mobile, tablet, dan desktop
- 📤 **Upload Foto** - upload foto profil dan perhitungan manual
- 🎭 **Animasi Smooth** - scroll animations, hover effects, number animations
- 🔍 **Zoom Foto** - klik foto perhitungan manual untuk memperbesar
- 🖨️ **Print Ready** - tombol print floating untuk mencetak analisis
- 🎊 **Confetti Effect** - animasi saat verdict muncul
- ⚡ **Fast Loading** - no external dependencies
- 💾 **Auto Save** - foto yang diupload tersimpan otomatis

---

## 🎨 Komponen Website

1. **Profile Section** - Foto profil, nama, NPM, dan mata kuliah
2. **Hero Section** - Judul dan deskripsi utama
3. **Skenario Kasus** - Data aset lancar, persediaan, kewajiban
4. **Tugas Mahasiswa** - List tugas yang harus dikerjakan
5. **Perhitungan AI** - Rumus dan hasil perhitungan otomatis
6. **Perhitungan Manual** - Foto perhitungan tulisan tangan
7. **Perbandingan Hasil** - Tabel perbandingan AI vs Manual
8. **Interpretasi** - Analisis kondisi keuangan
9. **Kesimpulan Akhir** - Verdict dan rekomendasi

---

## 🛠️ Troubleshooting

### Foto tidak muncul / hilang?

**Penyebab:**
- Cache browser dihapus (localStorage terhapus)
- Membuka di browser berbeda
- Mode Incognito/Private browsing
- Folder `images/` diganti namanya atau dipindah

**Solusi:**
1. ✅ **Foto default akan otomatis muncul kembali** (dari folder `images/`)
2. Jika masih tidak muncul, pastikan folder `images/` ada dan berisi 3 file:
   - `noen1.jpeg`
   - `CR.jpeg`
   - `QR.jpeg`
3. Refresh browser dengan `Ctrl + F5` (hard refresh)
4. Upload ulang foto jika diperlukan

### Upload foto tidak berfungsi?

**Solusi:**
1. Refresh halaman
2. Periksa console browser (F12) untuk error
3. Pastikan file yang diupload adalah gambar (jpg, png, gif, webp)
4. Coba browser lain (Chrome, Firefox, Edge)

### Website tidak terbuka?

**Solusi:**
- Pastikan Chrome atau browser modern terinstall
- Coba buka langsung dengan double-click `index.html`
- Cek apakah ada error di Console browser (F12)

---

## 📝 Hasil Perhitungan

### Data Input:
- Aset Lancar: **Rp 180 juta**
- Persediaan: **Rp 90 juta**
- Kewajiban Lancar: **Rp 120 juta**

### Hasil:
- **Rasio Lancar (CR)**: 1,5 ✅
- **Rasio Cepat (QR)**: 0,75 ⚠️

### Interpretasi:
- Likuiditas **cukup baik** (CR > 1)
- Masih **bergantung pada persediaan** (QR < 1)
- Rekomendasi: **Disetujui dengan Syarat**

---

## 💡 Tentang Sistem Penyimpanan Foto

### Foto Default (Permanen)
✅ Disimpan di folder `images/` pada komputer  
✅ Tidak akan hilang meskipun cache dihapus  
✅ Otomatis tampil saat pertama kali membuka website  

### Foto Upload (Sementara)
📤 Disimpan di localStorage browser  
⚠️ Bisa hilang jika:
  - Cache browser dihapus
  - Membuka di browser berbeda
  - Mode Incognito/Private
  - localStorage penuh

### Sistem Fallback
Jika foto upload hilang → **Otomatis kembali ke foto default** ✅

---

## 🎓 Info Mahasiswa

**Nama:** Nurlailah  
**NPM:** 2461201017  
**Mata Kuliah:** Artificial Intelligence  
**Tugas:** UTS - Analisis Likuiditas dengan AI

---

Made with ❤️ using Kiro AI Assistant
