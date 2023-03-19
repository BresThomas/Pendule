const pendule = document.getElementById("pendule");
let alpha = Math.PI/2;
let omega = 0;
const k = 1;
pendule.style.transform = `rotate(${alpha}rad)`;
const delta_temps = 0.1;
let energie_pendule = 0.5 * omega * omega - k * Math.cos(alpha);
let maxEnergy = 0;
let minEnergy = 0;
document.getElementById("energie_pendule").innerHTML = "Démarrer le programme";
let run = false;

function update() {
  const new_omega = omega - delta_temps * k * Math.sin(alpha);
  const new_alpha = alpha + delta_temps * new_omega;
  omega = new_omega;
  alpha = new_alpha;
  pendule.style.transform = `rotate(${alpha}rad)`;
  energie_pendule = 0.5 * omega * omega - k * Math.cos(alpha);
  maxEnergy = Math.max(maxEnergy, energie_pendule);
  minEnergy = Math.min(minEnergy, energie_pendule);

  document.getElementById("energie_pendule").innerHTML = `Energie du pendule : ${energie_pendule}<br> Valeur maximale de l'énergie: ${maxEnergy}<br> Valeur minimale de l'énergie : ${minEnergy}`;

  if (run) {
    setTimeout(update, 40);
  }
}

function stop_and_go() {
  if (run) {
    run = false;
  } else {
    run = true;
    update();
  }
}

const toggleButton = document.createElement("button"); // Création du bouton on/off
toggleButton.innerText = "Afficher/Masquer"; // Texte affiché sur le bouton
toggleButton.style.position = "absolute"; // Positionnement absolu
toggleButton.style.top = "10px"; // Position en haut à gauche
toggleButton.style.left = "10px";

toggleButton.onclick = function() {
  const text = document.getElementById("energie_pendule");
  if (text.style.display === "none") {
    text.style.display = "block";
  } else {
    text.style.display = "none";
  }
};

document.body.appendChild(toggleButton); // Ajout du bouton à la page HTML

const startButton = document.createElement("button"); // Création du bouton pour lancer le programme
startButton.innerText = "On/Off";
startButton.style.position = "absolute";
startButton.style.top = "50px"; // Position en dessous du bouton on/off
startButton.style.left = "10px";

startButton.onclick = function() {
  stop_and_go();
};

document.body.appendChild(startButton); // Ajout du bouton à la page HTML
