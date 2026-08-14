# Nikola.dsgn — Pricelist Custom Design

Website pricelist + syarat & ketentuan untuk jasa desain freelance, lengkap dengan
dashboard admin untuk edit konten tanpa sentuh kode. Dibangun pakai Next.js,
di-host gratis di Vercel, dan datanya disimpan sebagai `data/content.json` di
repo GitHub kamu sendiri — jadi GitHub itu sekaligus jadi "database"-nya.

## Cara kerja admin panel (penting, baca dulu)

Situs ini **statis + bisa diedit**, bukan pakai database seperti MySQL/Supabase.
Alurnya:

1. Kamu buka `/admin`, login pakai password.
2. Kamu edit harga/paket/syarat di form.
3. Klik **Simpan Perubahan** → server bikin commit baru ke `data/content.json`
   di repo GitHub kamu lewat GitHub API.
4. Vercel otomatis mendeteksi commit baru → build ulang → situs live ter-update
   (biasanya 1-2 menit).

Artinya: setiap kali simpan dari admin, akan ada 1 commit baru otomatis di
repo GitHub kamu. Ini normal, bukan bug.

---

## 1. Jalankan di lokal dulu (opsional tapi disarankan)

```bash
npm install
npm run dev
```

Buka `http://localhost:3000` untuk lihat situsnya, dan
`http://localhost:3000/admin` untuk dashboard admin.

Untuk mode lokal, buat file `.env.local` (copy dari `.env.example`) dan isi
minimal:

```
ADMIN_PASSWORD=passwordbebas
```

Kalau `GITHUB_TOKEN` belum diisi, simpan dari admin panel akan langsung nulis
ke file lokal `data/content.json` (jadi kamu bisa coba-coba dulu sebelum
deploy).

---

## 2. Push ke GitHub

1. Buat repo baru di [github.com/new](https://github.com/new), misal
   `nikola-pricelist`. Jangan centang "Add README" (biar tidak konflik).
2. Di folder project ini, jalankan:

```bash
git init
git add .
git commit -m "init: nikola pricelist site"
git branch -M main
git remote add origin https://github.com/USERNAME/nikola-pricelist.git
git push -u origin main
```

Ganti `USERNAME` dan nama repo sesuai punya kamu.

---

## 3. Deploy ke Vercel lewat GitHub

1. Buka [vercel.com](https://vercel.com) → **Sign up / Login** (bisa langsung
   pakai akun GitHub, paling gampang).
2. Di dashboard Vercel, klik **Add New → Project**.
3. Pilih **Import Git Repository**, cari repo `nikola-pricelist` yang barusan
   kamu push, klik **Import**.
4. Di layar konfigurasi:
   - **Framework Preset**: otomatis kedetect "Next.js", biarkan saja.
   - **Root Directory**: biarkan default (`.`).
   - Buka bagian **Environment Variables**, tambahkan 4 variabel ini:

     | Name | Value |
     |---|---|
     | `ADMIN_PASSWORD` | password admin pilihanmu, misal `Nikola2026!` |
     | `GITHUB_TOKEN` | token GitHub kamu (cara bikin di langkah 4 di bawah) |
     | `GITHUB_REPO` | `USERNAME/nikola-pricelist` |
     | `GITHUB_BRANCH` | `main` |

5. Klik **Deploy**. Tunggu ± 1-2 menit sampai selesai build.
6. Setelah selesai, Vercel kasih link seperti
   `https://nikola-pricelist.vercel.app` — itu situs kamu, sudah live.

### (Opsional) Pakai domain sendiri
Di project Vercel → tab **Settings → Domains** → masukkan domain kamu (misal
`nikoladsgn.com`) → ikuti instruksi untuk arahkan DNS domain ke Vercel.

---

## 4. Cara bikin GitHub Token (buat `GITHUB_TOKEN`)

Token ini yang dipakai admin panel untuk commit otomatis ke repo kamu.

1. Buka [github.com/settings/tokens?type=beta](https://github.com/settings/tokens?type=beta)
   (Fine-grained personal access token).
2. Klik **Generate new token**.
3. Isi:
   - **Token name**: `nikola-pricelist-admin`
   - **Expiration**: bebas, misal 1 tahun
   - **Repository access**: pilih **Only select repositories** → pilih repo
     `nikola-pricelist`
   - **Permissions** → **Repository permissions** → cari **Contents** → ubah
     jadi **Read and write**
4. Klik **Generate token**, lalu **copy** tokennya (diawali `github_pat_...`
   atau `ghp_...`) — ini cuma muncul sekali, langsung tempel ke
   `GITHUB_TOKEN` di Vercel (langkah 3).

---

## 5. Update environment variable setelah deploy pertama

Kalau kamu isi env var belakangan (setelah deploy pertama), buka:
**Project di Vercel → Settings → Environment Variables** → tambahkan/ubah →
lalu buka tab **Deployments**, klik titik tiga (`...`) di deployment
terakhir → **Redeploy**, supaya env var baru terbaca.

---

## 6. Pakai admin panel

1. Buka `https://situs-kamu.vercel.app/admin`
2. Login pakai `ADMIN_PASSWORD` yang tadi kamu set.
3. Edit info situs, kategori & paket harga (bisa tambah/hapus kategori dan
   paket bebas — misal nambah kategori "Stiker" atau "Sertifikat"), serta
   syarat & ketentuan.
4. Klik **Simpan Perubahan**. Tunggu notifikasi hijau, lalu tunggu ±1-2 menit
   untuk situs live ter-update (Vercel sedang redeploy otomatis).

---

## Struktur folder

```
app/
  page.tsx           → halaman utama (pricelist publik)
  admin/page.tsx      → dashboard admin (login + editor)
  api/auth/route.ts   → login/logout admin
  api/content/route.ts→ ambil data konten untuk editor
  api/save/route.ts   → simpan konten (commit ke GitHub)
  layout.tsx, globals.css
components/           → Hero, CategoryNav, PriceCategory, TermsSection, Footer
data/content.json     → SEMUA isi situs (harga, paket, syarat) — ini "database"-nya
lib/content.ts        → baca content.json di server
lib/auth.ts           → helper cek password admin
```

## Ubah tampilan / warna

Palet warna & font ada di `tailwind.config.ts` (warna `navy`, `gold`, `teal`,
`paper`, `clay`) dan `app/layout.tsx` (font `Fraunces`, `Plus Jakarta Sans`,
`JetBrains Mono`). Struktur ticket/perforated edge ada di `app/globals.css`
kelas `.perf-edge`.
