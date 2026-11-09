/* =========================================================
   contact.js : vérification du formulaire de contact
   ========================================================= */

const formulaireContact = document.querySelector("#formulaire-contact");
const zoneMessage = document.querySelector("#message-formulaire");

formulaireContact.addEventListener("submit", function (event) {
  // ce que le visiteur a écrit (trim() enlève les espaces au début et à la fin)
  const nom = document.querySelector("#nom").value.trim();
  const email = document.querySelector("#email").value.trim();
  const sujet = document.querySelector("#sujet").value.trim();
  const message = document.querySelector("#message").value.trim();

  // la liste des erreurs trouvées
  const erreurs = [];

  if (nom.length < 3) {
    erreurs.push("Le nom doit contenir au moins 3 caractères.");
  }
  if (!email.includes("@") || !email.includes(".")) {
    erreurs.push("L'adresse e-mail n'est pas valide.");
  }
  if (sujet === "") {
    erreurs.push("Le sujet est obligatoire.");
  }
  if (message.length < 10) {
    erreurs.push("Le message doit contenir au moins 10 caractères.");
  }

  if (erreurs.length > 0) {
    // il y a des erreurs : on bloque l'envoi et on les affiche
    event.preventDefault();
    zoneMessage.className = "alerte alerte-erreur";
    zoneMessage.innerHTML = erreurs.join("<br>");
  } else {
    // tout est bon : le formulaire part et la messagerie s'ouvre
    zoneMessage.className = "alerte alerte-succes";
    zoneMessage.textContent = "Merci ! Votre messagerie va s'ouvrir pour envoyer le message.";
  }
});
