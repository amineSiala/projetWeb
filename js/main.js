/* =========================================================
   main.js : code commun à toutes les pages
   ========================================================= */

/* Menu mobile : le bouton ☰ affiche ou cache le menu */
const boutonMenu = document.querySelector(".menu-toggle");
const menu = document.querySelector(".main-nav");

boutonMenu.addEventListener("click", function () {
  menu.classList.toggle("open");
});
