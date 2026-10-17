function myFunction1(verb,object) {
    alert('Klik disitu untuk ' + verb + object)
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

const buku = document.getElementById("buku-tamu")
const bkcaption = document.getElementById("buku-tamu-capt")
const strt = document.getElementById("strt")
const strtcaption = document.getElementById("start-capt")
const wlcm = document.getElementById("welcome-word")
function bukuTamu(){
    buku.style.display = "none";
    bkcaption.style.display = "none";
    strt.style.display = "inline-block";
    strtcaption.style.display = "inline-block";
    wlcm.style.display = "none";
}