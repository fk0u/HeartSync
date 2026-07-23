// Typst Document: HeartSync Technical & Medical Documentation
// Enterprise Edition with OpenSSF Security, HL7 FHIR v4 Standards, and Clinical Case Studies

#set page(
  paper: "a4",
  margin: (top: 2.5cm, bottom: 2.5cm, left: 2.2cm, right: 2.2cm),
  header: context {
    let page-num = counter(page).get().first()
    if page-num > 1 [
      #grid(
        columns: (1fr, auto),
        align(left)[#text(size: 8.5pt, fill: rgb("#64748b"), weight: "bold")[HeartSync — Dokumentasi Teknis & Standar Medis]],
        align(right)[#text(size: 8.5pt, fill: rgb("#0d9488"), weight: "bold")[OpenSSF Critical Infrastructure & FHIR v4]]
      )
      #v(-2pt)
      #line(length: 100%, stroke: 0.5pt + rgb("#e2e8f0"))
    ]
  },
  footer: context {
    let page-num = counter(page).get().first()
    if page-num > 1 [
      #line(length: 100%, stroke: 0.5pt + rgb("#e2e8f0"))
      #v(4pt)
      #grid(
        columns: (1fr, auto),
        align(left)[#text(size: 8pt, fill: rgb("#94a3b8"))[Dokumentasi Resmi Enterprise v2.0.0 — HeartSync Open Source]],
        align(right)[#text(size: 8.5pt, fill: rgb("#475569"), weight: "bold")[Halaman #page-num]]
      )
    ]
  }
)

#set text(
  font: ("Segoe UI", "Arial", "Calibri"),
  size: 10pt,
  fill: rgb("#0f172a"),
  lang: "id"
)

#set par(justify: true, leading: 0.65em)
#set heading(numbering: "1.1")

// Color Tokens
#let primary-color = rgb("#0284c7")
#let secondary-color = rgb("#0d9488")
#let dark-slate = rgb("#0f172a")

// Callout Box Function
#let callout(title: "INFORMASI", body, type: "info") = {
  let border-color = primary-color
  let bg-color = rgb("#f0f9ff")
  let text-color = rgb("#0369a1")

  if type == "warning" {
    border-color = rgb("#f59e0b")
    bg-color = rgb("#fef3c7")
    text-color = rgb("#92400e")
  } else if type == "danger" {
    border-color = rgb("#ef4444")
    bg-color = rgb("#fee2e2")
    text-color = rgb("#991b1b")
  } else if type == "success" {
    border-color = rgb("#10b981")
    bg-color = rgb("#d1fae5")
    text-color = rgb("#065f46")
  }

  rect(
    width: 100%,
    fill: bg-color,
    radius: 6pt,
    inset: 10pt,
    stroke: (left: 4pt + border-color, rest: 0.5pt + border-color.lighten(60%))
  )[
    #text(weight: "bold", size: 9pt, fill: text-color)[#title]
    #v(2pt)
    #text(size: 9pt, fill: dark-slate)[#body]
  ]
}

// ---------------------------------------------------------
// COVER PAGE / HALAMAN SAMPUL
// ---------------------------------------------------------
#align(center + horizon)[
  #v(-2cm)
  #rect(
    width: 70pt,
    height: 70pt,
    radius: 18pt,
    fill: gradient.linear(secondary-color, primary-color, angle: 45deg)
  )[
    #align(center + horizon)[
      #text(size: 32pt, fill: white)[🩺]
    ]
  ]

  #v(1.5cm)

  #text(size: 28pt, weight: "extrabold", fill: dark-slate)[HeartSync] \
  #v(0.3cm)
  #text(size: 14pt, weight: "medium", fill: secondary-color)[Aplikasi Pencatatan & Monitoring Tekanan Darah (OpenSSF & HL7 FHIR v4 Standard)]

  #v(1cm)
  #rect(
    fill: rgb("#f1f5f9"),
    radius: 20pt,
    inset: (x: 16pt, y: 8pt)
  )[
    #text(size: 9.5pt, weight: "bold", fill: rgb("#334155"))[SPESIFIKASI ARSITEKTUR KESEHATAN ENTERPRISE & MANAJEMEN KLINIS]
  ]

  #v(3cm)

  #grid(
    columns: (1fr, 1fr),
    align: (left, right),
    [
      #text(size: 9pt, fill: rgb("#64748b"))[Dipublikasikan Oleh:] \
      #text(size: 10pt, weight: "bold")[HeartSync Engineering & Clinical Team] \
      #text(size: 8.5pt, fill: rgb("#64748b"))[Open-Source Tech For Good Infrastructure]
    ],
    [
      #text(size: 9pt, fill: rgb("#64748b"))[Versi Spesifikasi:] \
      #text(size: 10pt, weight: "bold")[v2.0.0 (Enterprise Gold)] \
      #text(size: 8.5pt, fill: rgb("#64748b"))[Standar: HL7 FHIR v4 / LOINC]
    ]
  )

  #v(2cm)
  #line(length: 100%, stroke: 1.5pt + gradient.linear(secondary-color, primary-color))
]

#pagebreak()

// ---------------------------------------------------------
// DAFTAR ISI
// ---------------------------------------------------------
#outline(
  title: [Daftar Isi Spesifikasi Teknis],
  indent: 1.5em,
  depth: 3
)

#v(1cm)
#line(length: 100%, stroke: 0.5pt + rgb("#cbd5e1"))
#v(0.5cm)

// ---------------------------------------------------------
// BAB 1: USER PERSONAS, PAIN POINTS & STRATEGI DEMOGRAFI
// ---------------------------------------------------------
= Analisis User Personas, Pain Points & Strategi Demografi

HeartSync dikembangkan berdasarkan metodologi riset pengguna klinis yang mendalam terhadap 2 segmen target utama:

== Persona 1: Pak Budi (58 Tahun) — Penderita Hipertensi Kronis
- *Latar Belakang*: Terdiagnosis hipertensi sejak 5 tahun lalu, mengonsumsi obat Amlodipine 5mg secara rutin.
- *Pain Points Utama*:
  1. *Friction Pencatatan*: Pengisian formulir digital biasa yang memerlukan koneksi internet atau login akun sering membuat frustrasi.
  2. *Keterbatasan Penglihatan*: Tulisan kecil pada layar smartphone biasa membuat mata lelah.
  3. *Distraksi Lupa Obat*: Sering kali ragu apakah sudah meminum obat dosis pagi atau belum.
- *Solusi HeartSync*:
  - *Asisten Suara (Web Speech API)* untuk membaca tensi secara otomatis.
  - *Jadwal Minum Obat* dengan *Adherence Streak Counter*.

== Persona 2: Siska (32 Tahun) — Family Caregiver
- *Latar Belakang*: Anak yang bekerja di luar kota dan bertanggung jawab atas kesehatan jantung orang tua.
- *Pain Points Utama*:
  1. Takut tidak mengetahui jika orang tua mengalami *Krisis Hipertensi* saat di rumah.
  2. Kesulitan mengumpulkan rekapitulasi data tensi untuk diserahkan ke dokter spesialis.
- *Solusi HeartSync*:
  - *Tombol Darurat SOS WhatsApp 1-Klik* yang langsung membagikan data tensi dan lokasi ke WhatsApp keluarga.
  - *Ekspor PDF Dokter 1-Klik* untuk konsultasi medis.

// ---------------------------------------------------------
// BAB 2: STANDAR INTEROPERABILITAS MEDIS HL7 FHIR v4
// ---------------------------------------------------------
= Standar Interoperabilitas Medis HL7 FHIR v4

HeartSync menjamin kompatibilitas ekosistem kesehatan global dengan mengadopsi standar *HL7 FHIR v4 (Fast Healthcare Interoperability Resources)*:

#v(0.5em)

#table(
  columns: (1.5fr, 1.2fr, 1.5fr, 2fr),
  fill: (x, y) => if y == 0 { secondary-color } else if calc.even(y) { rgb("#f8fafc") } else { white },
  stroke: 0.5pt + rgb("#cbd5e1"),
  inset: 7pt,
  align: (col, row) => if row == 0 { center + horizon } else { left + horizon },
  
  [#text(weight: "bold", fill: white)[Komponen Medis]],
  [#text(weight: "bold", fill: white)[LOINC Code]],
  [#text(weight: "bold", fill: white)[Standard Unit]],
  [#text(weight: "bold", fill: white)[Deskripsi FHIR Resource]],

  [Blood Pressure Panel], [85354-9], [mm[Hg]], [HL7 FHIR Observation Resource Container],
  [Systolic Blood Pressure], [8480-6], [mm[Hg]], [Tekanan Darah Sistolik (Atas)],
  [Diastolic Blood Pressure], [8462-4], [mm[Hg]], [Tekanan Darah Diastolik (Bawah)],
  [Heart Rate / Pulse], [8867-4], [/min], [Frekuensi Denyut Nadi / Menit]
)

#v(0.5em)

#callout(
  title: "INTEGRASI SATUSEHAT KEMENKES",
  [Format data JSON FHIR yang dihasilkan HeartSync 100% kompatibel untuk diimpor atau dihubungkan dengan platform SATUSEHAT Kementerian Kesehatan Republik Indonesia.],
  type: "success"
)

// ---------------------------------------------------------
// BAB 3: KEPATUHAN KEAMANAN OPENSSF CRITICAL INFRASTRUCTURE
// ---------------------------------------------------------
= Keamanan OpenSSF Critical Infrastructure & Cryptographic Hash Chain

HeartSync mengimplementasikan proteksi kriptografi bertingkat:

1. *Enkripsi AES-256-GCM at Rest*:
   Seluruh berkas pencatatan yang diekspor disandi dengan kunci simetris AES-256-GCM berbasis kriteria PBKDF2 (100.000 iterasi + garam acak 16-byte).

2. *Tamper-Evident SHA-256 Audit Hash Chain*:
   Setiap entri data medis dihubungkan dengan mata rantai hash kriptografi:
   $ "Hash"_n = "SHA256"("Hash"_{n-1} + "Data" + "Timestamp") $
   Setiap manipulasi ilegal pada IndexedDB akan menggagalkan verifikasi rantai hash dan memberikan peringatan keamanan pada aplikasi.

#callout(
  title: "SKOR KRITIS OPENSSF ≥ 0.4",
  [HeartSync dirancang memenuhi kriteria OpenSSF Criticality Score mencakup kebijakan lisensi terbuka MIT, pengujian otomatis CI/CD GitHub Actions, serta jaminan proteksi data lokal tanpa bocoran ke server pihak ketiga.],
  type: "info"
)

#v(2cm)

#align(center)[
  #text(size: 9pt, fill: rgb("#94a3b8"))[— Akhir dari Dokumentasi Resmi Enterprise HeartSync —]
]
