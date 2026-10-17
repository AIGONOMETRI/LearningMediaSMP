var keatas = document.querySelector('.kembali-keatas');
window.addEventListener("scroll", () => {
    if (window.pageYOffset > 100) {
        keatas.classList.add("active");
    } else {
        keatas.classList.remove("active");
    }
});
function updateJam() {
    var skr = new Date();
    var ha = skr.getDay(),
        bul = skr.getMonth(),
        tgl = skr.getDate(),
        thn = skr.getFullYear(),
        ho = skr.getHours(),
        mnt = skr.getMinutes(),
        dtk = skr.getSeconds(),
        pe = "AM";
    if (ho == 0) {
        ho = 12;
    }
    if (ho > 12) {
        ho = ho - 12;
        pe = "PM";
    }
    Number.prototype.pad = function (digits) {
        for (var n = this.toString(); n.length < digits; n = 0 + n);
        return n;
    }
    var bulan = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"];
    var hari = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];
    var ids = ["hari", "bulan", "tanggal", "tahun", "hour", "menit", "detik", "AMPM"];
    var values = [hari[ha], bulan[bul], tgl, thn, ho.pad(2), mnt.pad(2), dtk.pad(2), pe];
    for (var i = 0; i < ids.length; i++)
        document.getElementById(ids[i]).textContent = values[i];
}

function initJam() {
    updateJam();
    window.setInterval(updateJam, 1000);
}

window.addEventListener("scroll", function () {
    const nav = document.querySelector("nav");
    if (window.scrollY > 50) {
        nav.classList.add("scrolled");
    } else {
        nav.classList.remove("scrolled");
    }
});

var nvb = document.getElementById("nvb")
function showMenu(){
    nvb.style.right = "0";
}
function hideMenu(){
    nvb.style.right = "-200px";
}
const draggables = document.querySelectorAll('.draggable');
const dropzones = document.querySelectorAll('.dropzone');

draggables.forEach(item => {
    item.addEventListener('dragstart', (e) => {
        e.dataTransfer.setData('text', e.target.textContent.trim());
    });
});

dropzones.forEach(zone => {
    zone.addEventListener('dragover', (e) => e.preventDefault());

    zone.addEventListener('drop', (e) => {
        e.preventDefault();
        const data = e.dataTransfer.getData('text').trim();
        const correct = zone.dataset.answer.trim();

        if (data === correct) {
            zone.textContent = data;
            zone.classList.add('filled');
            zone.style.backgroundColor = "#d4edda"; // hijau muda
        } else {
            let feedback = `Jawaban '${data}' kurang tepat.`;

            // Bantuan spesifik berdasarkan kesalahan umum
            if (data === "25/7") {
                feedback += " Itu adalah hasil dari sisi miring dibagi sisi depan. Cocokkan kembali definisi sin(θ)!";
            } else if (data === "24/7") {
                feedback += " Itu adalah hasil dari sisi samping dibagi sisi depan. Cocokkan kembali definisi tan(θ)!";
            } else if (data === "25/24") {
                feedback += " Itu adalah hasil dari sisi miring dibagi sisi samping. Cocokkan kembali definisi cos(θ)!";
            } else if (data === "7/24") {
                if (correct === "7/25") {
                    feedback += " Ini adalah nilai tan(θ), bukan sin(θ). Perhatikan posisi sisi depan dan miring!";
                } else if (correct === "24/25") {
                    feedback += " Ini adalah nilai tan(θ), bukan cos(θ). Pastikan kamu memperhatikan posisi sisi samping dan miring!.";
                }
            } else if (data === "7/25") {
                if (correct === "7/24") {
                    feedback += " Ini adalah nilai sin(θ), bukan tan(θ). Perhatikan posisi sisi depan dan samping!";
                } else if (correct === "24/25") {
                    feedback += " Ini adalah nilai sin(θ), bukan cos(θ). Pastikan kamu memperhatikan posisi sisi samping dan miring!.";
                }
            } else if (data === "24/25") {
                if (correct === "7/24") {
                    feedback += " Ini adalah nilai cos(θ), bukan tan(θ). Perhatikan posisi sisi depan dan samping!";
                } else if (correct === "7/25") {
                    feedback += " Ini adalah nilai cos(θ), bukan sin(θ). Pastikan kamu memperhatikan posisi sisi depan dan miring!.";
                }
            }
            alert(feedback);
        }
    });
});

const draggablesSpecial = document.querySelectorAll('.draggable-special');
const dropzonesSpecial = document.querySelectorAll('.dropzone-special');

draggablesSpecial.forEach(item => {
    item.addEventListener('dragstart', (e) => {
        e.dataTransfer.setData('text', e.target.textContent.trim());
    });
});

dropzonesSpecial.forEach(zone => {
    zone.addEventListener('dragover', (e) => e.preventDefault());
    zone.addEventListener('drop', (e) => {
        const data = e.dataTransfer.getData('text').trim();
        const correct = zone.dataset.answer.trim();

        if (data === correct) {
            zone.textContent = data;
            zone.classList.add('filled');
            zone.style.backgroundColor = "#d4edda"; // hijau muda
        } else {
            // Pesan spesifik berdasarkan kesalahan umum
            let message = `Jawabanmu '${data}' kurang tepat untuk posisi ini.`;

            if (data === "undefined") {
                message += " Nilai 'undefined' biasanya muncul saat tan(θ) memiliki penyebut 0, seperti di 90°.";
            } else if (data === "1") {
                message += " Nilai ini benar untuk sin(90°), cos(0°) atau tan(45°)";
            } else if (data === "0") {
                message += " 0 biasanya muncul di sin(0°) atau cos(90°), perhatikan kembali jawabanmu ya!.";
            } else if (data === "√2/2") {
                message += " Nilai ini sering muncul di sudut 45°";
            } else if (data === "√3/2") {
                message += " Biasanya muncul di sudut 30° atau 60°";
            } else if (data === "√3/3") {
                message += " Ini merupakan nilai untuk tan(30°)";
            } else if (data === "1/2") {
                message += " Biasanya muncul di sudut 30° atau 60°";
            }else if (data === "√3") {
                message += " Nilai ini benar untuk tan(60°)";
            }
            alert(message);
        }
    });
});

function checkAnswers() {
    let score = 0;

    // Check drag-and-drop (jika masih digunakan di bagian lain halaman)
    document.querySelectorAll('.dropzone').forEach(zone => {
        if (zone.textContent === zone.dataset.answer) {
            score++;
            zone.style.backgroundColor = '#d4edda';
        } else {
            zone.style.backgroundColor = '#f8d7da';
        }
    });

    // Check fill-in-the-blank
    const inputs = document.querySelectorAll('.fill-blank');
    inputs.forEach((input, index) => {
        const userAnswer = input.value.trim();
        const correctAnswer = input.dataset.answer.trim();
        const review = document.getElementById(`review-${index + 1}`);

        if (userAnswer === correctAnswer) {
            input.style.backgroundColor = '#d4edda';
            review.textContent = 'Jawaban benar! 👍';
            review.style.color = '#155724';
            score++;
        } else {
            input.style.backgroundColor = '#f8d7da';
            review.style.color = '#721c24';

            // Feedback spesifik berdasarkan soal
            let feedback = `Jawaban '${userAnswer}' kurang tepat.`;

            if (index === 0) {
                feedback += " Gunakan Teorema Pythagoras: sisi depan = √(hipotenusa² - samping²).";
            } else if (index === 1) {
                feedback += " sin(α) = depan/miring. Apakah kamu menempatkan sisi yang benar?";
            } else if (index === 2) {
                feedback += " cos(α) = samping/miring. Apakah kamu menuliskan pembilang dan penyebut dengan benar?";
            } else if (index === 3) {
                feedback += " tan(α) = depan/samping. Ingat urutan pembilang dan penyebutnya!";
            }

            review.textContent = feedback;
        }
    });

    document.getElementById('result').textContent = `Skor Anda: ${score}/${inputs.length + document.querySelectorAll('.dropzone').length}`;
}

function checkDropdownAnswer() {
    const dropdown = document.getElementById('answer-dropdown');
    const result = document.getElementById('dropdown-result');
    const selectedAnswer = dropdown.value;

    if (selectedAnswer === "") {
        result.textContent = "⚠️ Silakan pilih jawaban terlebih dahulu.";
        result.style.color = "orange";
    } else if (selectedAnswer === "30") {
        result.textContent = "✅ Jawaban benar! Karena tan(45°) = tinggi / 30 → tinggi = 30 meter.";
        result.style.color = "green";
    } else {
        result.textContent = `❌ Jawaban ${selectedAnswer} meter kurang tepat.`;
        result.style.color = "red";

        // Tambahkan arahan berpikir
        result.innerHTML += " Ingat bahwa ini adalah segitiga siku-siku dengan sudut 45°. Gunakan perbandingan trigonometri <strong>tan(θ) = depan/samping</strong> untuk menyelesaikan soal ini!";
    }
}

function checkDropdownAnswer21() {
    const correctAnswers = ["21", "32", "13", "14", "15", "16"];
    const selects = document.querySelectorAll(".question .drop-down1");
    let score = 0;

    selects.forEach((select, index) => {
        if (select.value === correctAnswers[index]) {
            score++;
            select.style.border = "2px solid green";
        } else {
            select.style.border = "2px solid red";
        }
    });

    const resultdr21 = document.getElementById("dropdown-result21");
    if (score === correctAnswers.length) {
        resultdr21.innerHTML = "🎉 Jawabanmu benar semua! Hebat! 🎯";
        resultdr21.style.color = "green";
    } else {
        resultdr21.innerHTML = `Kamu benar ${score} dari ${correctAnswers.length} jawaban. Coba periksa lagi ya! 😊`;
        resultdr21.style.color = "orange";
    }
}
const clueTexts = {
    "11": "Perhatikan segitiga POC yang terbentuk di kuadran II dengan sudut α, kuadran II tidak berada pada sumbu x positif",
    "21": "Bagus! Coba perhatikan, sumbu mana yang naik ke atas?",
    "31": "Dalam lingkaran satuan, sumbu x itu mewakili sisi samping, kalau begitu sumbu y akan mewakili sisi lainnya.",
    "41": "Sumbu y negatif biasanya turun ke bawah, ya. Ini untuk kuadran III dan IV, bukan II.",
    "12": "Perhatikan segitiga POC yang terbentuk di kuadran II dengan sudut α, sisi sampingnya tidak berada pada sumbu x positif.",
    "22": "Sisi depan itu sisi yang berhadapan dengan sudut α, coba lihat sumbu y di kuadran II. Berhadapan dengan sumbu manakah sisi depannya?",
    "32": "Ingat, di kuadran II, ke arah kiri itu tandanya apa pada sumbu x?",
    "42": "Sisi depan itu sisi yang berhadapan dengan sudut α, coba lihat sumbu y di kuadran II. Berhadapan dengan sumbu manakah sisi depannya?",
    "13": "Sudut 120° itu termasuk 180° dikurangi berapa? Lihat bentuk umum (180° - A).",
    "23": "Apakah benar sudut lebih dari 180° di kuadran II? Coba cek lagi. Di kuadran II, sudutnya harus lebih dari 90° dan kurang dari 180°.",
    "33": "90° + 60° itu tidak sama dengan 120 °, coba cek lagi. Di kuadran II, sudutnya harus lebih dari 90° dan kurang dari 180°.",
    "43": "180° - 30° itu tidak sama dengan 120 °, coba cek lagi. Di kuadran II, sudutnya harus lebih dari 90° dan kurang dari 180°.",
    "14": "Ingat, sisi depan itu sumbu-y, sedangkan sisi miring itu hipotenusa.",
    "24": "Coba cek, sisi depan itu sumbu mana di kuadran II?",
    "34": "Sisi samping berhubungan dengan sumbu-x, tapi apakah sin itu menggunakan sisi samping?",
    "44": "Ini rasio tan, bukan sin. Fokus ke depan dan miring ya!.",
    "15": "Karena 120° = 180° - 60°, berarti sifat sinus di kuadran II tetap positif.",
    "25": "180° + 60° malah lebih dari 180°, itu kuadran III, bukan II.",
    "35": "90° + 60°, hasilnya 150°, bukan 120°.",
    "45": "180° - 30° menghasilkan 150°. Sudut berelasinya 30°, bukan 60°.",
    "16": "Kalau sudut di kuadran II, ingat sifat sinus di sana tetap positif, ya.",
    "26": "180° + A itu rumus kuadran III, bukan kuadran II.",
    "36": "90° + A biasanya digunakan di kuadran II, tapi untuk sinus, rumus umum tetap 180° - A.",
    "46": "Kalau minus, berarti sinus negatif. Di kuadran II sinus positif, lho."
};

const correctAnswers = ["21", "32", "13", "14", "15", "16"];

const clueIds = ["dropdown-clue11", "dropdown-clue12", "dropdown-clue13", "dropdown-clue14", "dropdown-clue15", "dropdown-clue16"];

document.querySelectorAll('.drop-down1').forEach((dropdown, index) => {
    dropdown.addEventListener('change', function () {
        const clueId = clueIds[index]; // Ambil id <p> clue yang sesuai
        const selectedValue = this.value;

        // Beri warna hijau atau merah dulu
        if (selectedValue === correctAnswers[index]) {
            this.style.border = "2px solid green";

            // Jika jawaban benar, kosongkan clue
            document.getElementById(clueId).innerText = "";
        } else {
            this.style.border = "2px solid red";

            // Jika jawaban salah, tampilkan clue
            if (clueTexts[selectedValue]) {
                document.getElementById(clueId).innerText = "🔍 " + clueTexts[selectedValue];
            } else {
                document.getElementById(clueId).innerText = "";
            }
        }
    });
});


const clueTexts2 = {
    "11": "Sumbu x positif ada di sebelah kanan titik pusat (0,0).",
    "31": "Sumbu x negatif ada di sebelah kiri titik pusat (0,0).",
    "21": "Sumbu y positif ada di atas titik pusat (0,0).",
    "41": "Sumbu y negatif ada di bawah titik pusat (0,0).",
    
    "12": "Sumbu x positif berarti bergerak ke kanan, coba lihat sumbu x dan y di kuadran 3 bagaimana posisinya?.",
    "22": "Sumbu y positif berarti bergerak ke atas, coba lihat sumbu x dan y di kuadran 3 bagaimana posisinya?.",
    "32": "Sumbu x negatif berarti bergerak ke kiri, coba lihat sumbu x dan y di kuadran 3 bagaimana posisinya?.",
    "42": "Sumbu y negatif berarti bergerak ke bawah, coba lihat sumbu x dan y di kuadran 3 bagaimana posisinya?.",
    
    "13": "Ini menjadi sudut di kuadran 2, seharusnya menggunakan (180° - sudut), tidak tepat untuk kuadran 3.",
    "23": "Sudut di kuadran 3 menggunakan (180° + sudut).",
    "33": "Jawabanmu kurang tepat, lihat gunakan 180° sebagai patokannya.",
    "43": "Jawabanmu kurang tepat, lihat gunakan 180° sebagai patokannya.",
    
    "14": "Sinus adalah sisi depan dibagi sisi miring (y/r).",
    "24": "Sisi depan untuk cos adalah x, bukan y.",
    "34": "Sisi samping untuk cos, bukan untuk sin.",
    "44": "Ini rumus tan, bukan sin.",
    
    "25": "Gunakan 180° sebagai patokannya.",
    "35": "Salah sudut, cek kembali pembentukannya.",
    "15": "Ini untuk kuadran 2, bukan kuadran 3.",
    "45": "Ini berlaku untuk kuadran 4, bukan 3.",
    
    "26": "Perhatikan tanda di kuadran 3 untuk sin.",
    "16": "Ini berlaku untuk kuadran 2.",
    "36": "Benar! Di kuadran 3, sin bertanda negatif.",
    "46": "Ini berlaku untuk kuadran 2."
};

const clueIds2 = ["dropdown-clue21", "dropdown-clue22", "dropdown-clue23", "dropdown-clue24", "dropdown-clue25", "dropdown-clue26"];

document.querySelectorAll('.drop-down2').forEach((dropdown, index) => {
    dropdown.addEventListener('change', function () {
        const clueId = clueIds2[index]; // Pastikan id <p> clue sesuai urutan
        const selectedValue = this.value;

        if (selectedValue === correctAnswers22[index]) {
            this.style.border = "2px solid green";
            document.getElementById(clueId).innerText = ""; // Kosongkan clue kalau benar
        } else {
            this.style.border = "2px solid red";

            if (clueTexts2[selectedValue]) {
                document.getElementById(clueId).innerText = "🔍 " + clueTexts2[selectedValue];
            } else {
                document.getElementById(clueId).innerText = "";
            }
        }
    });
});

const correctAnswers22 = ["41", "32", "23", "14", "25", "36"]; // <- dipisah ya, jangan barengan correctAnswers kuadran 2

function checkDropdownAnswer22() {
    const selects = document.querySelectorAll(".question .drop-down2");
    let score = 0;

    selects.forEach((select, index) => {
        if (select.value === correctAnswers22[index]) {
            score++;
            select.style.border = "2px solid green";
        } else {
            select.style.border = "2px solid red";
        }
    });

    const resultdr22 = document.getElementById("dropdown-result22");
    if (score === correctAnswers22.length) {
        resultdr22.innerHTML = "🎉 Jawabanmu benar semua! Hebat! 🎯";
        resultdr22.style.color = "green";
    } else {
        resultdr22.innerHTML = `Kamu benar ${score} dari ${correctAnswers22.length} jawaban. Coba periksa lagi ya! 😊`;
        resultdr22.style.color = "orange";
    }
}

const clueTexts3 = {
    "11": "Sumbu x positif ada di sebelah kanan titik pusat (0,0).",
    "31": "Sumbu x negatif ada di sebelah kiri titik pusat (0,0).",
    "21": "Sumbu y positif ada di atas titik pusat (0,0).",
    "41": "Sumbu y negatif ada di bawah titik pusat (0,0).",
    
    "12": "Sumbu x positif berarti bergerak ke kanan, coba lihat sumbu x dan y di kuadran 4 bagaimana posisinya?.",
    "22": "Sumbu y positif berarti bergerak ke atas, coba lihat sumbu x dan y di kuadran 4 bagaimana posisinya?.",
    "32": "Sumbu x negatif berarti bergerak ke kiri, coba lihat sumbu x dan y di kuadran 4 bagaimana posisinya?.",
    "42": "Sumbu y negatif berarti bergerak ke bawah, coba lihat sumbu x dan y di kuadran 4 bagaimana posisinya?.",
    
    "13": "Sudut di kuadran 4 menggunakan (360° - sudut).",
    "23": "Gunakan 360° sebagai patokkannya.",
    "33": "Jawabanmu kurang tepat, lihat gunakan 360° sebagai patokannya..",
    "43": "Jawabanmu kurang tepat, lihat gunakan 360° sebagai patokannya.",
    
    "14": "Sinus adalah sisi depan dibagi sisi miring (y/r).",
    "24": "Sisi depan untuk cos adalah x, bukan y.",
    "34": "Sisi samping untuk cos, bukan untuk sin.",
    "44": "Ini rumus tan, bukan sin.",
    
    "25": "Gunakan 360° sebagai patokkannya.",
    "35": "Benar! 360° - 45° berarti sudut di kuadran IV.",
    "15": "Ini berlaku untuk kuadran 2, bukan kuadran 4.",
    "45": "Ini untuk sudut 60°, bukan 45°.",
    
    "26": "Ini untuk kuadran 3, bukan kuadran 4.",
    "16": "Benar! Di kuadran 4, sin bertanda negatif.",
    "36": "Ini bukan untuk kuadran 4, tetapi untuk kuadran 3.",
    "46": "Ini salah, coba perhatikan tandanya, positif atau negatif?."
};

const clueIds3 = ["dropdown-clue31", "dropdown-clue32", "dropdown-clue33", "dropdown-clue34", "dropdown-clue35", "dropdown-clue36"];

const correctAnswers23 = ["41", "12", "13", "14", "35", "16"]; // <- kunci jawaban kuadran 4

document.querySelectorAll('.drop-down3').forEach((dropdown, index) => {
    dropdown.addEventListener('change', function () {
        const clueId = clueIds3[index];
        const selectedValue = this.value;

        if (selectedValue === correctAnswers23[index]) {
            this.style.border = "2px solid green";
            document.getElementById(clueId).innerText = "";
        } else {
            this.style.border = "2px solid red";

            if (clueTexts3[selectedValue]) {
                document.getElementById(clueId).innerText = "🔍 " + clueTexts3[selectedValue];
            } else {
                document.getElementById(clueId).innerText = "";
            }
        }
    });
});

function checkDropdownAnswer23() {
    const selects = document.querySelectorAll(".question .drop-down3");
    let score = 0;

    selects.forEach((select, index) => {
        if (select.value === correctAnswers23[index]) {
            score++;
            select.style.border = "2px solid green";
        } else {
            select.style.border = "2px solid red";
        }
    });

    const resultdr23 = document.getElementById("dropdown-result23");
    if (score === correctAnswers23.length) {
        resultdr23.innerHTML = "🎉 Jawabanmu benar semua! Hebat! 🎯";
        resultdr23.style.color = "green";
    } else {
        resultdr23.innerHTML = `Kamu benar ${score} dari ${correctAnswers23.length} jawaban. Coba periksa lagi ya! 😊`;
        resultdr23.style.color = "orange";
    }
}

function checkDropdownAnswer24() {
    const correctAnswers = ["41", "32", "13", "44", "25", "36", "37"];
    const selects = document.querySelectorAll(".question .drop-down4");
    let score = 0;

    selects.forEach((select, index) => {
        if (select.value === correctAnswers[index]) {
            score++;
            select.style.border = "2px solid green";
        } else {
            select.style.border = "2px solid red";
        }
    });

    const resultdr21 = document.getElementById("dropdown-result24");
    if (score === correctAnswers.length) {
        resultdr21.innerHTML = "🎉 Jawabanmu benar semua! Hebat! 🎯";
        resultdr21.style.color = "green";
    } else {
        resultdr21.innerHTML = `Kamu benar ${score} dari ${correctAnswers.length} jawaban. Coba periksa lagi ya! 😊`;
        resultdr21.style.color = "orange";
    }
}
const clueTexts4 = {
    "11": "Kuadran I untuk sudut positif 0°-90°, bukan negatif.",
    "21": "Kuadran II untuk sudut 90°-180°, bukan sudut negatif kecil.",
    "31": "Kuadran III untuk sudut 180°-270°, beda jauh dengan -30°.",
    "41": "Benar! Sudut -30° berada di Kuadran IV.",
    
    "12": "Kalau 360° + θ, berarti justru makin besar, bukan kembali ke negatif.",
    "22": "Ini salah. Sudut negatif harus tetap perhatikan tanda sin.",
    "32": "Ini salah konsep. Coba cek kembali bagaimana penyesuaian sudut negatif.",
    "42": "Hati-hati! Sudut negatif itu terkait dengan penyesuaian arah rotasi.",
    "13": "Benar! sin(-θ) = -sin(θ). Sinus berubah tanda pada sudut negatif.",
    "23": "Salah. Sinus sudut negatif tidak mempertahankan tanda.",
    
    "14": "Salah. Cosinus pada sudut negatif tidak berubah tanda.",
    "24": "Benar! cos(360° + θ) = cos(θ). Cos tidak berubah tanda.",
    "34": "Bukan, perhatikan sudut negatif, bukan selisih.",
    "44": "Benar! cos(360° - θ) = cos(θ).",
    "15": "Salah. Cos sudut negatif tidak mengubah tanda.",
    "25": "Benar! cos(-θ) = cos(θ). Cos adalah fungsi genap.",
    
    "16": "Benar! tan(360° + θ) = -tan(θ).",
    "26": "Salah. Tan pada sudut negatif berubah tanda.",
    "36": "Benar! tan(360° - θ) = -tan(θ).",
    "46": "Salah. Cek kembali arah rotasi sudut negatif.",
    "37": "Benar! tan(-θ) = -tan(θ).",
    "47": "Salah. Tanda tan berubah pada sudut negatif."
};

const clueIds4 = [
    "dropdown-clue41",
    "dropdown-clue42",
    "dropdown-clue43",
    "dropdown-clue44",
    "dropdown-clue45",
    "dropdown-clue46",
    "dropdown-clue47"
];

document.querySelectorAll('.drop-down4').forEach((dropdown, index) => {
    dropdown.addEventListener('change', function () {
        const clueId = clueIds4[index]; // id <p> untuk clue
        const selectedValue = this.value;

        if (selectedValue === correctAnswers24[index]) {
            this.style.border = "2px solid green";
            document.getElementById(clueId).innerText = ""; // kosongkan clue kalau benar
        } else {
            this.style.border = "2px solid red";

            if (clueTexts4[selectedValue]) {
                document.getElementById(clueId).innerText = "🔍 " + clueTexts4[selectedValue];
            } else {
                document.getElementById(clueId).innerText = "";
            }
        }
    });
});

const correctAnswers24 = ["41", "32", "13", "44", "25", "36", "37"]; // sesuai checkDropdownAnswer24

function checkDropdownAnswer25() { 
    const correctAnswers = ["11", "12", "13"];
    const selects = document.querySelectorAll(".question .drop-down5");
    let score = 0;

    selects.forEach((select, index) => {
        if (select.value === correctAnswers[index]) {
            score++;
            select.style.border = "2px solid green";
        } else {
            select.style.border = "2px solid red";
        }
    });

    const resultdr21 = document.getElementById("dropdown-result25");
    if (score === correctAnswers.length) {
        resultdr21.innerHTML = "🎉 Jawabanmu benar semua! Hebat! 🎯";
        resultdr21.style.color = "green";
    } else {
        resultdr21.innerHTML = `Kamu benar ${score} dari ${correctAnswers.length} jawaban. Coba periksa lagi ya! 😊`;
        resultdr21.style.color = "orange";
    }
}

const clueTexts5 = {
    "11": "Benar! Sinus untuk sudut lebih dari 360° tetap mengikuti pola sin(360° + A) = sin A.",
    "21": "Keliru. Sinus tidak mengikuti pola ini.",
    "31": "Keliru. Sinus untuk sudut lebih besar harus dipertimbangkan dalam kelipatan 360°.",
    "41": "Ini salah. Sinus tidak mengikuti perubahan tanda dalam bentuk ini.",
    
    "12": "Benar! Cosinus mengikuti pola cos(360° + A) = cos A.",
    "22": "Keliru. Cosinus tidak mengikuti pola ini.",
    "32": "Ini salah. Cosinus pada sudut lebih besar mengikuti pola cos(360° + A).",
    "42": "Keliru. Cosinus tidak mengikuti perubahan tanda ini.",
    
    "13": "Benar! Tangen untuk sudut lebih besar mengikuti pola tan(360° + A) = tan A.",
    "23": "Salah. Tangen pada sudut lebih besar mengikuti pola tan(360° + A).",
    "33": "Ini salah. Tangen untuk sudut lebih besar mengikuti rumus yang benar.",
    "43": "Salah. Tan tidak mengikuti pola ini."
};

const clueIds5 = [
    "dropdown-clue51",
    "dropdown-clue52",
    "dropdown-clue53"
];

document.querySelectorAll('.drop-down5').forEach((dropdown, index) => {
    dropdown.addEventListener('change', function () {
        const clueId = clueIds5[index]; // id <p> untuk clue
        const selectedValue = this.value;

        if (selectedValue === correctAnswers25[index]) {
            this.style.border = "2px solid green";
            document.getElementById(clueId).innerText = ""; // kosongkan clue kalau benar
        } else {
            this.style.border = "2px solid red";

            if (clueTexts5[selectedValue]) {
                document.getElementById(clueId).innerText = "🔍 " + clueTexts5[selectedValue];
            } else {
                document.getElementById(clueId).innerText = "";
            }
        }
    });
});
const correctAnswers25 = ["11", "12", "13"];
function checkAnswersE() {
    const correctAnswers = ["O(0, 0)", "(x,y)", "sisi samping", "sisi depan", "sisi miring"];
    const feedbacks = [
        {
            wrong: "A(1, 1)",
            reason: "❌ Titik A(1,1) bukan pusat lingkaran satuan. Lingkaran satuan selalu berpusat di O(0, 0)."
        },
        {
            wrong: "P(2, -1)",
            reason: "❌ P(2,-1) bukan pusat lingkaran satuan. Ingat, pusat lingkaran satuan adalah O(0, 0)."
        },
        {
            wrong: "(r,θ)",
            reason: "❌ (r,θ) adalah format koordinat kutub, bukan kartesius. Pada lingkaran satuan digunakan (x, y)."
        },
        {
            wrong: "(a,b)",
            reason: "❌ (a,b) tidak spesifik untuk trigonometri. Format (x, y) lebih tepat untuk menjelaskan posisi pada lingkaran satuan."
        },
        {
            wrong: "sisi depan",
            reason: "❌ x menunjukkan proyeksi ke sumbu X, yang merupakan sisi samping dari sudut pada segitiga dalam lingkaran satuan."
        },
        {
            wrong: "sisi miring",
            reason: "❌ x tidak merepresentasikan sisi miring, melainkan sisi samping terhadap sudut pada segitiga dalam lingkaran satuan."
        },
        {
            wrong: "sisi samping",
            reason: "❌ y menunjukkan sisi yang tegak lurus terhadap alas, yaitu sisi depan sudutnya."
        },
        {
            wrong: "hipotenusa",
            reason: "❌ y bukan sisi miring (hipotenusa), melainkan sisi depan pada sudut dalam segitiga pada lingkaran satuan."
        },
        {
            wrong: "sisi depan",
            reason: "❌ Jari-jari lingkaran (1 satuan) merupakan sisi miring dalam segitiga trigonometri pada lingkaran satuan."
        },
        {
            wrong: "sisi samping",
            reason: "❌ Sisi miring adalah jari-jari, bukan sisi samping. Dalam segitiga di lingkaran satuan, sisi miring selalu 1 satuan."
        }
    ];

    const selects = document.querySelectorAll(".wrapper-activity select");
    let score = 0;
    let alertMessages = [];

    selects.forEach((select, index) => {
        const value = select.value;
        const correct = correctAnswers[index];

        if (value === correct) {
            score++;
            select.style.border = "2px solid green";
        } else {
            select.style.border = "2px solid red";
            const fb = feedbacks.find(f => f.wrong === value);
            if (fb) alertMessages.push(fb.reason);
        }
    });

    const resultE = document.getElementById("resultE");
    if (score === correctAnswers.length) {
        resultE.innerHTML = "🎉 Jawabanmu benar semua! Hebat! 🎯";
        resultE.style.color = "green";
    } else {
        resultE.innerHTML = `Kamu benar ${score} dari ${correctAnswers.length} jawaban. Periksa lagi bagian yang salah.`;
        resultE.style.color = "orange";
        if (alertMessages.length > 0) {
            alert(alertMessages.join("\n\n"));
        }
    }
}

// Fitur Chatbot
const nlpToggler = document.querySelector(".chat-toggler");
nlpToggler.addEventListener("click", () => document.body.classList.toggle("show-chataigonometri"));

const rules = {
    "sin(180-a)": ["sin(a)", "sina"],
    "cos(180-a)": ["-cos(a)", "-cosa"],
    "tan(180-a)": ["-tan(a)", "-tana"],
    "sin(180+a)": ["-sin(a)", "-sina"],
    "cos(180+a)": ["-cos(a)", "-cosa"],
    "tan(180+a)": ["tan(a)", "tana"],
    "sin(360-a)": ["-sin(a)"],
    "cos(360-a)": ["cos(a)"],
    "tan(360-a)": ["-tan(a)"],
    "sin(0)": ["sin(180)", "sin(360)", "-sin(180)", "-sin(360)"],
    "cos(0)": ["cos(180)", "cos(360)", "-cos(180)"],
    "tan(0)": ["tan(180)", "tan(360)", "-tan(180)", "-tan(360)"],
    "sin(30)": ["sin(150)", "-sin(210)", "-sin(330)"],
    "cos(30)": ["-cos(150)", "-cos(210)", "cos(330)"],
    "tan(30)": ["-tan(150)", "tan(210)", "-tan(330)"],
    "sin(45)": ["sin(135)", "-sin(225)", "-sin(315)"],
    "cos(45)": ["-cos(135)", "-cos(225)", "cos(315)"],
    "tan(45)": ["-tan(135)", "tan(225)", "-tan(315)"],
    "sin(60)": ["sin(120)", "-sin(240)", "-sin(300)"] ,
    "cos(60)": ["cos(300)", "-cos(120)", "-cos(240)"],
    "tan(60)": ["-tan(120)", "tan(240)", "-tan(300)"],
    "sin(90)": ["-sin(270)"],
    "cos(90)": ["-cos(270)"],
    "tan(90)": ["tan(270)"],
    "30berelasidengan":["150","210","330"],
    "0berelasidengan":["180","360"],
    "45berelasidengan":["135","225","315"],
    "60berelasidengan":["120","240","300"],
    "90berelasidengan":["270"]
};

const chatbox = document.querySelector('.chatbox');
const chatInput = document.querySelector('.chat-input textarea');
const sendButton = document.querySelector('.chat-input span');

let chatHistory = [];
const correctFeedbacks = [
    "Mantap! Kamu benar! 😊", "Keren, jawabanmu tepat! 🎯", "Bagus banget, lanjutkan! 💪", 
    "Yes! Itu jawaban yang benar! 🎉", "Jawabanmu betul, tetap semangat! 🔥", "Hebat, kamu paham konsepnya! 👍", 
    "Nice! Jawabanmu pas banget! 👌", "Wuihh, benar sekali! 🚀", "Kamu jenius, itu benar! 🧠", 
    "Sip! Jawabanmu sudah oke! ✅", "Luar biasa! Tetap lanjutkan! 🌟", "Jawabanmu tepat, lanjut terus! 💯", 
    "Benar sekali! Kamu makin paham nih! 🏆", "Asik! Kamu menjawab dengan benar! 🎊", "Kamu keren! Jawabanmu tepat! 🔥"
];

function addMessage(content, sender) {
    const messageElement = document.createElement('li');
    messageElement.classList.add('chat', sender === 'Siswa' ? 'outgoing' : 'incoming');
    if (sender !== 'Siswa') {
        const icon = document.createElement('span');
        icon.innerHTML = `<img src="icon.png" alt="">`;
        messageElement.appendChild(icon);
    }

    const messageText = document.createElement('p');
    messageText.textContent = content;
    messageElement.appendChild(messageText);
    chatbox.appendChild(messageElement);
    chatbox.scrollTop = chatbox.scrollHeight;

    chatHistory.push({ sender: sender, message: content });
}

function preprocessInput(input) {
    return input.replace(/\s+/g, '').replace(/°/g, '').toLowerCase();
}

function processInput() {
    const userInput = chatInput.value.trim();
    if (!userInput) return;
    const processedInput = preprocessInput(userInput);

    if (!processedInput.includes('=')) {
        addMessage(userInput, 'Siswa');
        addMessage('Maaf, format jawabanmu salah! Gunakan format "sin(A) = sin(A)".', 'AIGONOMETRI');
        chatInput.value = '';
        return;
    }

    const [lhs, rhs] = processedInput.split('=').map(s => s.trim());
    if (!lhs || !rhs) {
        addMessage(userInput, 'Siswa');
        addMessage('Maaf, format jawabanmu salah! Pastikan tidak ada bagian yang kosong.', 'AIGONOMETRI');
        chatInput.value = '';
        return;
    }

    addMessage(userInput, 'Siswa');
    
    const thinkingMessage = document.createElement('li');
    thinkingMessage.classList.add('chat', 'incoming');
    thinkingMessage.innerHTML = `<span><img src="icon.png" alt=""></span><p>Sedang berpikir...</p>`;
    chatbox.appendChild(thinkingMessage);
    chatbox.scrollTop = chatbox.scrollHeight;
    
    setTimeout(() => {
        chatbox.removeChild(thinkingMessage);
        if (Array.isArray(rules[lhs]) && rules[lhs].includes(rhs) || rules[lhs] === rhs) {
            const randomFeedback = correctFeedbacks[Math.floor(Math.random() * correctFeedbacks.length)];
            addMessage(randomFeedback, 'AIGONOMETRI');
        } else {
            addMessage('Yah, Maaf Jawabanmu salah. Cek kembali lalu ketikkan lagi jawabanmu di sini ya!', 'AIGONOMETRI');
        }
    }, Math.floor(Math.random() * 1000) + 1000);
    
    chatInput.value = '';
}

function downloadChatAsTXT() {
    const chatContent = chatHistory.map(item => `${item.sender}: ${item.message}`).join('\n');
    const blob = new Blob([chatContent], { type: 'text/plain' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'chat_history.txt';
    link.click();
}

function downloadChatAsJSON() {
    const blob = new Blob([JSON.stringify(chatHistory, null, 2)], { type: 'application/json' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'chat_history.json';
    link.click();
}

sendButton.addEventListener('click', processInput);

chatInput.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        event.preventDefault();
        processInput();
    }
});
document.getElementById('download-txt').addEventListener('click', downloadChatAsTXT);
document.getElementById('download-json').addEventListener('click', downloadChatAsJSON);

function downloadAnswers() {
    const answers = document.querySelectorAll('.answer-box');
    let content = "Jawaban Kegiatan Trigonometri:\n\n";

    answers.forEach((answer, index) => {
        content += `Pertanyaan ${index + 1}: ${answer.value}\n`;
    });

    const blob = new Blob([content], { type: 'text/plain' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'jawaban kegiatan 1.txt';
    link.click();
}
function downloadAnswers2() {
    const answers = document.querySelectorAll('.answer-box');
    const dropdowns = document.querySelectorAll('select');
    let content = "Jawaban Kegiatan Trigonometri:\n\n";

    // Mengambil jawaban dari input teks
    answers.forEach((answer, index) => {
        content += `Pertanyaan ${index + 1}: ${answer.value}\n`;
    });

    // Mengambil jawaban dari dropdown
    dropdowns.forEach((dropdown, index) => {
        const selectedOption = dropdown.options[dropdown.selectedIndex].text;
        content += `Dropdown ${index + 1}: ${selectedOption}\n`;
    });

    const blob = new Blob([content], { type: 'text/plain' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'jawaban kegiatan 2.txt';
    link.click();
}

function periksaJawaban() {
    document.querySelectorAll('.pembahasan').forEach(el => {
        el.style.display = 'block';
    });
}