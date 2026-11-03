# smjp

Website resmi **SMJP Law — Sari Maria Jayani & Partners**, firma hukum di Jakarta.

Static site tanpa build step: HTML, CSS, dan JavaScript murni.

## Struktur

```
├── index.html          # Seluruh konten halaman
├── css/style.css       # Tema hitam–putih–emas & responsif
├── js/main.js          # Navbar, animasi scroll, counter, form kontak
├── assets/
│   ├── logo-smjp-light.svg   # Logo untuk background gelap
│   └── logo-smjp-dark.svg    # Logo untuk background terang
└── screenshots/        # Preview full-page desktop & mobile
```

## Menjalankan Lokal

Buka `index.html` langsung di browser, atau jalankan server statis:

```bash
npx serve .
```

## Deploy

Upload seluruh isi folder ke root hosting (sejajarkan `index.html` dengan folder `css/`, `js/`, dan `assets/`).
