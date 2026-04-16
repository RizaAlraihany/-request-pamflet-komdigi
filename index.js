const TARGET_WHATSAPP_NUMBER = "6283842620963";
// const TARGET_WHATSAPP_NUMBER = "6287753556470";

document.getElementById("requestForm").addEventListener("submit", function (e) {
  e.preventDefault();

  // Ambil data dari form
  const namaAcara = document.getElementById("namaAcara").value;
  const namaDepartemen = document.getElementById("namaDepartemen").value;
  const caption = document.getElementById("captionSingkat").value;
  const infoTema = document.getElementById("infoTema").value;
  const infoTanggal = document.getElementById("infoTanggal").value;
  const infoJamMulai = document.getElementById("infoJamMulai").value;
  const infoJamSelesai = document.getElementById("infoJamSelesai").value;
  const infoJam = infoJamSelesai
    ? `${infoJamMulai} - ${infoJamSelesai}`
    : `${infoJamMulai} - Selesai`;

  const infoTempat = document.getElementById("infoTempat").value;
  const infoCP = document.getElementById("infoCP").value;

  const lampiran = document.getElementById("lampiran").value;
  const referensi = document.getElementById("referensi").value || "-";

  const pjNama = document.getElementById("pjNama").value;
  const pjWA = document.getElementById("pjWA").value;

  // Format Pesan WhatsApp Sesuai Template
  const message = `Halo Tim Komdigi, kami dari ${namaDepartemen} ingin merequest desain pamflet/poster dengan detail berikut:

1. *Nama Acara/Kegiatan:* ${namaAcara}
2. *Caption Singkat:* ${caption}
3. *Info Wajib di Pamflet:*
     - Tema: ${infoTema}
     - Hari, Tanggal: ${infoTanggal}
     - Jam: ${infoJam}
     - Tempat/Link: ${infoTempat}
     - Contact Person: ${infoCP}
4. *Lampiran:* ${lampiran}
5. *Referensi Desain:* ${referensi}
6. *PJ Divisi:* ${pjNama} (${pjWA})

_Note: Revisi maksimal 1x. Lebih dari itu kena charge kopi untuk tim Komidigi ☕_`;

  // Encode text untuk URL
  const encodedMessage = encodeURIComponent(message);

  
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
