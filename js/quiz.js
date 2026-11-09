/* =========================================================
   quiz.js : correction du quiz
   ========================================================= */

/* Les bonnes réponses, dans l'ordre des questions.
   - type "radio"    : une seule réponse possible
   - type "checkbox" : plusieurs réponses, séparées par des virgules
                       (dans le même ordre que dans le HTML)
   - type "texte"    : le visiteur écrit sa réponse
   "texte" = ce qu'on affiche dans la correction */
const bonnesReponses = [
  { nom: "q1",  type: "radio",    reponse: "a",                 texte: "HyperText Markup Language" },
  { nom: "q2",  type: "radio",    reponse: "b",                 texte: "<a>" },
  { nom: "q3",  type: "radio",    reponse: "c",                 texte: "color" },
  { nom: "q4",  type: "checkbox", reponse: "header,nav,footer", texte: "<header>, <nav> et <footer>" },
  { nom: "q5",  type: "radio",    reponse: "b",                 texte: "# (dièse)" },
  { nom: "q6",  type: "radio",    reponse: "c",                 texte: "const" },
  { nom: "q7",  type: "radio",    reponse: "a",                 texte: "alert()" },
  { nom: "q8",  type: "checkbox", reponse: "email,date,color",  texte: "email, date et color (phone n'existe pas, c'est tel)" },
  { nom: "q9",  type: "texte",    reponse: "img",               texte: "<img>" },
  { nom: "q10", type: "radio",    reponse: "a",                 texte: "document.getElementById()" }
];

const formulaire = document.querySelector("#quiz");
const zoneResultat = document.querySelector("#resultat");
const questions = document.querySelectorAll(".question");   // les 10 <fieldset>


/* ----- Quand le visiteur clique sur "Valider" ----- */
formulaire.addEventListener("submit", function (event) {
  event.preventDefault();   // on empêche la page de se recharger

  let note = 0;
  const liste = document.querySelector("#liste-reponses");
  liste.innerHTML = "";     // on efface l'ancienne correction

  for (let i = 0; i < bonnesReponses.length; i++) {
    const question = bonnesReponses[i];
    const reponseVisiteur = lireReponse(question);

    // on enlève les anciennes couleurs
    questions[i].classList.remove("juste", "faux");

    // une ligne dans la liste des bonnes réponses
    const ligne = document.createElement("li");

    if (reponseVisiteur === question.reponse) {
      note = note + 1;
      questions[i].classList.add("juste");
      ligne.textContent = "✅ Question " + (i + 1) + " : " + question.texte;
    } else {
      questions[i].classList.add("faux");
      ligne.textContent = "❌ Question " + (i + 1) + " : " + question.texte;
    }

    liste.appendChild(ligne);
  }

  // on affiche la note
  document.querySelector("#note").textContent = note + " / 10";
  document.querySelector("#appreciation").textContent = appreciation(note);

  zoneResultat.hidden = false;
  zoneResultat.scrollIntoView({ behavior: "smooth" });
});


/* ----- Lit la réponse du visiteur pour une question ----- */
function lireReponse(question) {
  if (question.type === "radio") {
    const choix = document.querySelector('input[name="' + question.nom + '"]:checked');
    if (choix === null) {
      return "";   // aucune case cochée
    }
    return choix.value;
  }

  if (question.type === "checkbox") {
    const casesCochees = document.querySelectorAll('input[name="' + question.nom + '"]:checked');
    const valeurs = [];
    for (const caseCochee of casesCochees) {
      valeurs.push(caseCochee.value);
    }
    return valeurs.join(",");   // exemple : "header,nav,footer"
  }

  if (question.type === "texte") {
    let saisie = document.querySelector('input[name="' + question.nom + '"]').value;
    saisie = saisie.trim().toLowerCase();             // " IMG " devient "img"
    saisie = saisie.replace("<", "").replace(">", ""); // "<img>" devient "img"
    return saisie;
  }
}


/* ----- Petit message selon la note ----- */
function appreciation(note) {
  if (note === 10) {
    return "Parfait ! 🏆";
  } else if (note >= 7) {
    return "Très bien ! 👏";
  } else if (note >= 5) {
    return "Pas mal, encore un petit effort. 🙂";
  } else {
    return "Il faut réviser un peu. 📚";
  }
}


/* ----- Quand le visiteur clique sur "Recommencer" ----- */
formulaire.addEventListener("reset", function () {
  zoneResultat.hidden = true;
  for (const question of questions) {
    question.classList.remove("juste", "faux");
  }
  window.scrollTo({ top: 0, behavior: "smooth" });
});
