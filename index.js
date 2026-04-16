const TARGET_WHATSAPP_NUMBER = "6283842620963";

// Otomatis Hitung H-3 Tanggal Posting
const tglPostingInput = document.getElementById("tanggalPosting");
const deadlineInput = document.getElementById("deadlineJadi");

tglPostingInput.addEventListener("change", function (e) {
  if (e.target.value) {
    const date = new Date(e.target.value);
    date.setDate(date.getDate() - 3); // Kurangi 3 hari

    // Format ulang ke YYYY-MM-DD
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    deadlineInput.value = `${year}-${month}-${day}`;
  } else {
    deadlineInput.value = "";
  }
});

// Tangani Submit Form
document.getElementById("requestForm").addEventListener("submit", function (e) {
  e.preventDefault();

  // Ambil data dari form
  const namaAcara = document.getElementById("namaAcara").value;
  const tglPosting = document.getElementById("tanggalPosting").value;
  const caption = document.getElementById("captionSingkat").value;

  const infoTanggal = document.getElementById("infoTanggal").value;
  const infoJamMulai = document.getElementById("infoJamMulai").value;
  const infoJamSelesai = document.getElementById("infoJamSelesai").value;
  // Format jam jika ada jam selesai dan jika tidak ada
  const infoJam = infoJamSelesai
    ? `${infoJamMulai} - ${infoJamSelesai}`
    : `${infoJamMulai} - Selesai`;

  const infoTempat = document.getElementById("infoTempat").value;
  const infoCP = document.getElementById("infoCP").value;

  const lampiran = document.getElementById("lampiran").value;
  const referensi = document.getElementById("referensi").value || "-";
  const deadline = document.getElementById("deadlineJadi").value;

  const pjNama = document.getElementById("pjNama").value;
  const pjWA = document.getElementById("pjWA").value;

  // Format Pesan WhatsApp Sesuai Template
  const message = `Halo Tim Komdigi, kami dari Divisi Komdigi ingin merequest desain pamflet/poster dengan detail berikut:

1. *Nama Acara/Kegiatan:* ${namaAcara}
2. *Tanggal Posting:* ${tglPosting}
3. *Caption Singkat:* ${caption}
4. *Info Wajib di Pamflet:*
   - Hari, Tanggal: ${infoTanggal}
   - Jam: ${infoJam}
   - Tempat/Link: ${infoTempat}
   - Contact Person: ${infoCP}
5. *Lampiran:* ${lampiran}
6. *Referensi Desain:* ${referensi}
7. *Deadline Jadi:* ${deadline} (H-3)
8. *PJ Divisi:* ${pjNama} (${pjWA})

_Note: Revisi maksimal 1x. Lebih dari itu kena charge kopi untuk tim komdigi ☕_`;

  // Encode text untuk URL
  const encodedMessage = encodeURIComponent(message);

  // Buat Link WA (Bisa menggunakan API send agar fleksibel)
  // Jika TARGET_WHATSAPP_NUMBER diset valid (angka), maka akan langsung ke nomor tersebut
  // Jika masih "628xxxxxxxxxx", dia akan masuk ke wa.me send screen agar user bisa milih kontak
  let waLink = "";
  if (
    TARGET_WHATSAPP_NUMBER === "628xxxxxxxxxx" ||
    TARGET_WHATSAPP_NUMBER.trim() === ""
  ) {
    waLink = `https://api.whatsapp.com/send?text=${encodedMessage}`;
  } else {
    waLink = `https://api.whatsapp.com/send?phone=${TARGET_WHATSAPP_NUMBER}&text=${encodedMessage}`;
  }

  // Buka di tab baru
  window.open(waLink, "_blank");
});
