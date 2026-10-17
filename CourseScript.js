function validasiFormkomen(){
    var nama = document.getElementById('nama1').value;
    var email = document.getElementById('email1').value;
    var komentar = document.getElementById('komentar1').value;

    if (nama === '') {
        alert('Nama harus diisi');
        return false;
    }

    if (email === '') {
        alert('Email harus diisi');
        return false;
    } else {
        var emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        if (!emailPattern.test(email)) {
            alert('Format email kamu salah, isi lagi yang benar ya!');
            return false;
        }
    }

    if (komentar === '') {
        alert('Komentar harus diisi');
        return false;
    }
};
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
const scriptURL = 'https://script.google.com/macros/s/AKfycbzgPjHRC-3aXdLjZzhd8whxbNKXy9sbyoCS-Tx3oZpWIrrZZoNhyYrlMLwUwy4fBM3C/exec'
const form = document.forms['submit-to-google-sheet']

form.addEventListener('submit', e => {
    e.preventDefault()
    fetch(scriptURL, { method: 'POST', body: new FormData(form)})
    .then(response => console.log('Success!', response))
    .catch(error => console.error('Error!', error.message))
})


window.addEventListener("scroll", function () {
    const nav = document.querySelector("nav");
    if (window.scrollY > 50) {
        nav.classList.add("scrolled");
    } else {
        nav.classList.remove("scrolled");
    }
});