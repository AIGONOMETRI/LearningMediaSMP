// =============================================
// SCROLL TO TOP
// =============================================
var keatas = document.querySelector('.kembali-keatas');
if (keatas) {
    window.addEventListener("scroll", () => {
        if (window.pageYOffset > 100) keatas.classList.add("active");
        else keatas.classList.remove("active");
    });
}

// =============================================
// JAM & KALENDER
// =============================================
function updateJam() {
    var skr = new Date();
    var ha = skr.getDay(), bul = skr.getMonth(), tgl = skr.getDate(),
        thn = skr.getFullYear(), ho = skr.getHours(),
        mnt = skr.getMinutes(), dtk = skr.getSeconds(), pe = "AM";
    if (ho === 0) ho = 12;
    if (ho > 12) { ho = ho - 12; pe = "PM"; }
    Number.prototype.pad = function(d) { for (var n = this.toString(); n.length < d; n = 0 + n); return n; };
    var bulan = ["Januari","Februari","Maret","April","Mei","Juni","Juli","Agustus","September","Oktober","November","Desember"];
    var hari = ["Minggu","Senin","Selasa","Rabu","Kamis","Jumat","Sabtu"];
    var ids = ["hari","bulan","tanggal","tahun","hour","menit","detik","AMPM"];
    var values = [hari[ha], bulan[bul], tgl, thn, ho.pad(2), mnt.pad(2), dtk.pad(2), pe];
    for (var i = 0; i < ids.length; i++) {
        var el = document.getElementById(ids[i]);
        if (el) el.textContent = values[i];
    }
}
function initJam() { updateJam(); window.setInterval(updateJam, 1000); }

window.addEventListener("scroll", function() {
    var nav = document.querySelector("nav");
    if (nav) {
        if (window.scrollY > 50) nav.classList.add("scrolled");
        else nav.classList.remove("scrolled");
    }
});

var nvb = document.getElementById("nvb");
function showMenu() { if (nvb) nvb.style.right = "0"; }
function hideMenu() { if (nvb) nvb.style.right = "-200px"; }

// =============================================
// CHATBOT BUILDER — AKTIVITAS 3
// =============================================
var rules = [
    { keyword: "apa itu sebangun", response: "Dua bangun dikatakan sebangun jika sudut-sudut bersesuaian sama besar dan perbandingan sisi-sisi bersesuaian sama. Contoh: persegi panjang 6x4 dan 9x6 sebangun karena 6/9 = 4/6 = 2/3." },
    { keyword: "apa itu kongruen", response: "Dua bangun dikatakan kongruen jika bentuk dan ukurannya sama persis. Semua sisi bersesuaian sama panjang dan semua sudut bersesuaian sama besar. Faktor skala = 1." },
    { keyword: "perbedaan sebangun dan kongruen", response: "Kongruen: bentuk DAN ukuran sama (faktor skala = 1). Sebangun: bentuk sama, ukuran boleh berbeda (faktor skala bisa berapa saja). Kongruen adalah kasus khusus sebangun." },
    { keyword: "cara menentukan faktor skala", response: "Faktor skala = ukuran miniatur / ukuran asli. Contoh: panjang miniatur 30 cm, panjang asli 120 cm, maka faktor skala = 30/120 = 1/4." },
    { keyword: "contoh benda sebangun di sekolah", response: "Contoh benda sebangun di sekolah: foto dan cetakannya yang diperbesar/diperkecil dengan proporsi sama, papan tulis kecil dan besar dengan rasio sisi yang sama, atau miniatur papan informasi yang dibuat proporsional." },
    { keyword: "contoh benda kongruen di sekolah", response: "Contoh benda kongruen di sekolah: dua buku dengan ukuran yang benar-benar sama, dua ubin lantai yang identik, atau dua lembar kertas A4 yang sama ukurannya." },
    { keyword: "cara memeriksa jawaban chatbot", response: "Untuk memeriksa jawaban chatbot: (1) hitung sendiri menggunakan konsep matematika, (2) bandingkan hasilnya dengan jawaban chatbot, (3) jika berbeda, percayai perhitungan matematismu, bukan chatbot." }
];

function addRule() {
    var keyword = document.getElementById('keyword').value.trim();
    var response = document.getElementById('response').value.trim();
    if (keyword && response) {
        rules.push({ keyword: keyword.toLowerCase(), response: response });
        document.getElementById('keyword').value = '';
        document.getElementById('response').value = '';
        displayRules();
    } else {
        alert('Harap isi kedua kolom sebelum menambah aturan!');
    }
}

function displayRules() {
    var rulesDisplay = document.getElementById('rulesDisplay');
    if (!rulesDisplay) return;
    rulesDisplay.innerHTML = '';
    rules.forEach(function(rule, index) {
        rulesDisplay.innerHTML += '<li style="margin-bottom:8px;padding:8px;background:#f9f9f9;border-radius:6px;border-left:3px solid #2e94e3;">' +
            '<strong>' + (index + 1) + '.</strong> Jika mengandung: <em>"' + rule.keyword + '"</em><br>' +
            'Respons: "' + rule.response + '"' +
            ' <button onclick="deleteRule(' + index + ')" style="margin-left:8px;padding:2px 8px;background:#e74c3c;color:white;border:none;border-radius:4px;cursor:pointer;font-size:0.8em;">Hapus</button>' +
            '</li>';
    });
}

function deleteRule(index) {
    rules.splice(index, 1);
    displayRules();
}

function testChatbot() {
    var input = document.getElementById('test-input').value.trim().toLowerCase();
    var result = document.getElementById('test-result');
    if (!input) { result.innerHTML = '<span style="color:orange;">⚠️ Ketik pertanyaan terlebih dahulu.</span>'; return; }
    var found = false;
    for (var i = 0; i < rules.length; i++) {
        if (input.includes(rules[i].keyword)) {
            result.innerHTML = '<strong>🤖 Chatbot:</strong> ' + rules[i].response;
            found = true;
            break;
        }
    }
    if (!found) {
        result.innerHTML = '<strong>🤖 Chatbot:</strong> Maaf, saya tidak mengenali pertanyaan tersebut. Pertanyaanmu mungkin menggunakan kata yang berbeda dari aturan yang ada, atau topik ini belum ada dalam basis pengetahuanku. Coba periksa materi atau tambahkan aturan baru!';
    }
}

function exportChatbot() {
    if (rules.length < 7) {
        alert('Tambahkan minimal 7 aturan sebelum export! Saat ini kamu baru memiliki ' + rules.length + ' aturan.');
        return;
    }
    var chatbotHTML = '<!DOCTYPE html>\n<html lang="id">\n<head>\n<meta charset="UTF-8">\n<meta name="viewport" content="width=device-width, initial-scale=1.0">\n<title>Chatbot Kesebangunan — AIGONOMETRI</title>\n<link href="https://unpkg.com/boxicons@2.1.1/css/boxicons.min.css" rel="stylesheet">\n<style>\nbody{font-family:Arial,sans-serif;background:#e0f2ff;padding:20px;}\n.chatbot{position:fixed;bottom:15px;right:20px;width:360px;}\n.chataigonometri{background:#fff;border-radius:10px;box-shadow:0 4px 8px rgba(0,0,0,0.1);overflow:hidden;}\nheader{background:#2e94e3;color:white;padding:15px;text-align:center;}\n.chatbox{list-style:none;padding:15px;height:320px;overflow-y:scroll;background:#f9f9f9;}\n.chat{display:flex;margin-bottom:10px;}\n.incoming span{color:#2e94e3;margin-right:10px;}\n.outgoing{justify-content:flex-end;}\n.chat p{background:#e0f2ff;padding:10px;border-radius:10px;max-width:75%;}\n.outgoing p{background:#2e94e3;color:white;}\n.chat-input{display:flex;border-top:1px solid #ddd;}\n.chat-input textarea{flex:1;border:none;padding:10px;resize:none;}\n.chat-input span{background:#2e94e3;color:white;padding:15px;cursor:pointer;}\n.info{background:#fff3cd;padding:12px;border-radius:8px;margin-bottom:16px;font-size:0.9em;}\n</style>\n</head>\n<body>\n<div class="info">⚠️ <strong>Catatan:</strong> Ini adalah <strong>rule-based chatbot</strong>. Ia hanya menjawab pertanyaan yang sesuai dengan aturan yang sudah diprogram. Selalu verifikasi jawaban dengan konsep matematika!</div>\n<section class="chatbot">\n<div class="chataigonometri">\n<header><h2>Chatbot Kesebangunan</h2></header>\n<ul class="chatbox">\n<li class="chat incoming"><span><i class="bx bxs-user"></i></span><p>Halo! Tanyakan padaku tentang kesebangunan dan kekongruenan.</p></li>\n</ul>\n<div class="chat-input"><textarea placeholder="Ketik pertanyaan..." required></textarea><span><i class="bx bx-send"></i></span></div>\n</div>\n</section>\n<script>\nvar rules = ' + JSON.stringify(rules) + ';\nfunction setup(){\nvar ta=document.querySelector(".chat-input textarea");\nvar btn=document.querySelector(".chat-input span");\nvar box=document.querySelector(".chatbox");\nfunction send(){\nvar inp=ta.value.trim();\nif(!inp)return;\nbox.innerHTML+=\'<li class="chat outgoing"><p>\'+inp+\'</p></li>\';\nta.value="";\nvar resp="Maaf, saya tidak mengenali pertanyaan tersebut. Coba gunakan kata kunci yang lebih spesifik atau periksa materi kesebangunan.";\nvar low=inp.toLowerCase();\nfor(var i=0;i<rules.length;i++){if(low.includes(rules[i].keyword)){resp=rules[i].response;break;}}\nsetTimeout(function(){box.innerHTML+=\'<li class="chat incoming"><span><i class="bx bxs-user"></i></span><p>\'+resp+\'</p></li>\';box.scrollTop=box.scrollHeight;},500);\n}\nbtn.addEventListener("click",send);\nta.addEventListener("keypress",function(e){if(e.key==="Enter"){e.preventDefault();send();}});\n}\nwindow.onload=setup;\n<\/script>\n</body>\n</html>';

    var blob = new Blob([chatbotHTML], { type: "text/html" });
    var link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "chatbot_kesebangunan.html";
    link.click();
}

// Tampilkan aturan awal saat halaman dimuat
window.addEventListener('load', function() {
    displayRules();
});

// =============================================
// SOAL PBL — AKTIVITAS 3 BAGIAN B
// =============================================
function cekJawab1() {
    var val = document.getElementById('jawab1').value.trim();
    var fb = document.getElementById('fb1');
    if (!val) { fb.innerHTML = '<span style="color:orange;">⚠️ Isi jawaban terlebih dahulu.</span>'; return; }
    var lower = val.toLowerCase();
    if ((lower.includes('diketahui') || lower.includes('120') || lower.includes('80')) &&
        (lower.includes('ditanya') || lower.includes('faktor') || lower.includes('lebar') || lower.includes('sebangun'))) {
        fb.innerHTML = '<span style="color:green;">✅ Bagus! Kamu sudah mengidentifikasi informasi yang diketahui dan yang ditanya.</span>';
    } else {
        fb.innerHTML = '<span style="color:orange;">❌ Lengkapi jawabanmu. Sebutkan: diketahui (ukuran papan asli 120×80 cm, panjang miniatur 30 cm) dan ditanya (faktor skala, lebar miniatur yang seharusnya, apakah desain A dan B sebangun).</span>';
    }
}

function cekJawab2() {
    var sel = document.getElementById('jawab2');
    var fb = document.getElementById('fb2');
    if (!sel.value) { fb.innerHTML = '<span style="color:orange;">⚠️ Pilih jawaban.</span>'; return; }
    if (sel.value === '1/4') {
        sel.style.border = '2px solid green';
        fb.innerHTML = '<span style="color:green;">✅ Benar! Faktor skala = 30 ÷ 120 = 1/4.</span>';
    } else {
        sel.style.border = '2px solid red';
        fb.innerHTML = '<span style="color:red;">❌ Hitung: 30 ÷ 120 = ? Sederhanakan pecahannya.</span>';
    }
}

function cekJawab3() {
    var val = parseFloat(document.getElementById('jawab3').value);
    var fb = document.getElementById('fb3');
    if (isNaN(val)) { fb.innerHTML = '<span style="color:orange;">⚠️ Masukkan angka.</span>'; return; }
    if (val === 20) {
        fb.innerHTML = '<span style="color:green;">✅ Benar! Lebar = 80 × 1/4 = <strong>20 cm</strong>. Miniatur yang sebangun berukuran 30 × 20 cm.</span>';
    } else {
        fb.innerHTML = '<span style="color:red;">❌ Belum tepat. Gunakan faktor skala 1/4: lebar = 80 × 1/4 = ?</span>';
    }
}

function cekJawab4() {
    var sel = document.getElementById('jawab4');
    var fb = document.getElementById('fb4');
    if (!sel.value) { fb.innerHTML = '<span style="color:orange;">⚠️ Pilih jawaban.</span>'; return; }
    if (sel.value === 'tidak') {
        sel.style.border = '2px solid green';
        fb.innerHTML = '<span style="color:green;">✅ Benar! Desain A <strong>tidak sebangun</strong>. Perbandingan panjang: 30/120 = 1/4 = 0,25. Perbandingan lebar: 25/80 = 5/16 = 0,3125. Karena 0,25 ≠ 0,3125, desain A tidak sebangun dengan papan asli.</span>';
    } else {
        sel.style.border = '2px solid red';
        fb.innerHTML = '<span style="color:red;">❌ Periksa kembali. Hitung: 30÷120 = 1/4 = 0,25 dan 25÷80 = 5/16 ≈ 0,3125. Apakah hasilnya sama?</span>';
    }
}

function cekJawab5() {
    var sel = document.getElementById('jawab5');
    var fb = document.getElementById('fb5');
    if (!sel.value) { fb.innerHTML = '<span style="color:orange;">⚠️ Pilih jawaban.</span>'; return; }
    // Desain B: 45/120 = 3/8 = 0,375 dan 30/80 = 3/8 = 0,375 → sebangun
    if (sel.value === 'ya') {
        sel.style.border = '2px solid green';
        fb.innerHTML = '<span style="color:green;">✅ Benar! Desain B <strong>sebangun</strong> dengan papan asli. Perbandingan panjang: 45/120 = 3/8. Perbandingan lebar: 30/80 = 3/8. Keduanya sama! Namun perhatikan: panjang desain B adalah 45 cm, bukan 30 cm yang diminta. Jadi desain B sebangun tetapi tidak memenuhi syarat panjang 30 cm.</span>';
    } else {
        sel.style.border = '2px solid red';
        fb.innerHTML = '<span style="color:red;">❌ Periksa kembali. Hitung: 45÷120 = 3/8 dan 30÷80 = 3/8. Apakah hasilnya sama?</span>';
    }
}

function cekJawab6() {
    var sel = document.getElementById('jawab6');
    var fb = document.getElementById('fb6');
    if (!sel.value) { fb.innerHTML = '<span style="color:orange;">⚠️ Pilih jawaban.</span>'; return; }
    if (sel.value === 'tidak') {
        sel.style.border = '2px solid green';
        fb.innerHTML = '<span style="color:green;">✅ Benar! Sebangun <strong>tidak berarti kongruen</strong>. Miniatur 30×20 cm sebangun dengan papan asli 120×80 cm (faktor skala 1/4), tetapi tidak kongruen karena ukurannya berbeda. Kongruen hanya terjadi jika faktor skala = 1.</span>';
    } else {
        sel.style.border = '2px solid red';
        fb.innerHTML = '<span style="color:red;">❌ Tidak tepat. Sebangun artinya bentuk sama, ukuran boleh berbeda. Kongruen artinya bentuk DAN ukuran sama persis (faktor skala = 1).</span>';
    }
}

function cekJawab7() {
    var val = document.getElementById('jawab7').value.trim();
    var fb = document.getElementById('fb7');
    if (!val) { fb.innerHTML = '<span style="color:orange;">⚠️ Isi jawaban terlebih dahulu.</span>'; return; }
    var lower = val.toLowerCase();
    if (lower.includes('hitung') || lower.includes('perbandingan') || lower.includes('verifikasi') || lower.includes('periksa')) {
        fb.innerHTML = '<span style="color:green;">✅ Bagus! Cara yang tepat: hitung sendiri perbandingan sisi bersesuaian, bandingkan dengan jawaban chatbot, dan gunakan hasil perhitungan matematismu sebagai acuan.</span>';
    } else {
        fb.innerHTML = '<span style="color:orange;">❌ Lengkapi jawabanmu. Sebutkan langkah konkret: hitung perbandingan sisi bersesuaian secara manual, lalu bandingkan dengan rekomendasi chatbot.</span>';
    }
}

function cekJawab8() {
    var val = document.getElementById('jawab8').value.trim();
    var fb = document.getElementById('fb8');
    if (!val) { fb.innerHTML = '<span style="color:orange;">⚠️ Isi jawaban terlebih dahulu.</span>'; return; }
    var lower = val.toLowerCase();
    if (lower.includes('30') && lower.includes('20')) {
        fb.innerHTML = '<span style="color:green;">✅ Rekomendasi yang tepat! Miniatur yang sebangun dengan papan asli (120×80 cm) dan memiliki panjang 30 cm adalah <strong>30 × 20 cm</strong> (faktor skala 1/4). Desain A (30×25) tidak sebangun. Desain B (45×30) sebangun tetapi panjangnya bukan 30 cm.</span>';
    } else {
        fb.innerHTML = '<span style="color:orange;">❌ Lengkapi rekomendasimu. Miniatur yang memenuhi syarat panjang 30 cm DAN sebangun dengan papan asli adalah 30 × 20 cm. Jelaskan alasan matematisnya.</span>';
    }
}

function tampilkanRingkasan() {
    var ringkasan = document.getElementById('ringkasan');
    var isi = document.getElementById('isi-ringkasan');
    ringkasan.style.display = 'block';
    isi.innerHTML =
        '<table style="width:100%;border-collapse:collapse;font-size:0.9em;">' +
        '<tr style="background:#2e94e3;color:white;"><th style="padding:8px;">Item</th><th style="padding:8px;">Nilai</th></tr>' +
        '<tr><td style="padding:6px 8px;">Papan Asli</td><td style="padding:6px 8px;">120 cm × 80 cm</td></tr>' +
        '<tr style="background:#f0f8ff;"><td style="padding:6px 8px;">Faktor Skala</td><td style="padding:6px 8px;">1/4 (30 ÷ 120)</td></tr>' +
        '<tr><td style="padding:6px 8px;">Lebar Miniatur Seharusnya</td><td style="padding:6px 8px;">20 cm (80 × 1/4)</td></tr>' +
        '<tr style="background:#f0f8ff;"><td style="padding:6px 8px;">Desain A (30×25)</td><td style="padding:6px 8px;color:red;">❌ Tidak sebangun (30/120=1/4 ≠ 25/80=5/16)</td></tr>' +
        '<tr><td style="padding:6px 8px;">Desain B (45×30)</td><td style="padding:6px 8px;color:orange;">⚠️ Sebangun (45/120=30/80=3/8) tetapi panjang bukan 30 cm</td></tr>' +
        '<tr style="background:#f0f8ff;"><td style="padding:6px 8px;">Rekomendasi</td><td style="padding:6px 8px;color:green;font-weight:bold;">30 × 20 cm (sebangun, panjang sesuai)</td></tr>' +
        '<tr><td style="padding:6px 8px;">Kongruen dengan asli?</td><td style="padding:6px 8px;">Tidak (faktor skala = 1/4 ≠ 1)</td></tr>' +
        '</table>';
    ringkasan.scrollIntoView({ behavior: 'smooth' });
}

function downloadRingkasan() {
    var content = "RINGKASAN HASIL — PROYEK MINIATUR PAPAN INFORMASI\n";
    content += "================================================\n";
    content += "Papan Asli: 120 cm x 80 cm\n";
    content += "Faktor Skala: 1/4 (30 / 120)\n";
    content += "Lebar Miniatur Seharusnya: 20 cm (80 x 1/4)\n";
    content += "Desain A (30x25): TIDAK SEBANGUN (30/120=1/4 tidak sama dengan 25/80=5/16)\n";
    content += "Desain B (45x30): SEBANGUN (45/120=30/80=3/8) tetapi panjang bukan 30 cm\n";
    content += "Rekomendasi: 30 x 20 cm\n";
    content += "Kongruen dengan asli: Tidak (faktor skala = 1/4)\n\n";
    content += "Jawaban Soal 1: " + (document.getElementById('jawab1') ? document.getElementById('jawab1').value : '-') + "\n";
    content += "Jawaban Soal 7: " + (document.getElementById('jawab7') ? document.getElementById('jawab7').value : '-') + "\n";
    content += "Jawaban Soal 8: " + (document.getElementById('jawab8') ? document.getElementById('jawab8').value : '-') + "\n";
    var blob = new Blob([content], { type: 'text/plain' });
    var link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'ringkasan_pbl_kesebangunan.txt';
    link.click();
}
