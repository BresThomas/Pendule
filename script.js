const pendulum = document.getElementById("pendulum");
let angle = Math.PI/2;
let omega = 0;
const k = 1;
pendulum.style.transform = `rotate(${angle}rad)`;
const delta_time = 0.1;
let pendulum_energy = 0.5 * omega * omega - k * Math.cos(angle);
let maxEnergy = 0;
let minEnergy = 0;
document.getElementById("pendulum_energy").innerHTML = "Start the program";
let run = false;

function update() {
  const new_omega = omega - delta_time * k * Math.sin(angle);
  const new_angle = angle + delta_time * new_omega;
  omega = new_omega;
  angle = new_angle;
  pendulum.style.transform = `rotate(${angle}rad)`;
  pendulum_energy = 0.5 * omega * omega - k * Math.cos(angle);
  maxEnergy = Math.max(maxEnergy, pendulum_energy);
  minEnergy = Math.min(minEnergy, pendulum_energy);

  document.getElementById("pendulum_energy").innerHTML = `Pendulum energy: ${pendulum_energy}`;

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

const toggleButton = document.createElement("button"); // Create toggle button
toggleButton.innerText = "Show/Hide"; // Text displayed on the button
toggleButton.style.position = "absolute"; // Absolute positioning
toggleButton.style.top = "10px"; // Position on top left
toggleButton.style.left = "10px";

toggleButton.onclick = function() {
  const text = document.getElementById("pendulum_energy");
  if (text.style.display === "none") {
    text.style.display = "block";
  } else {
    text.style.display = "none";
  }
};

document.body.appendChild(toggleButton); // Add button to HTML page

const startButton = document.createElement("button"); // Create start button
startButton.innerText = "On/Off";
startButton.style.position = "absolute";
startButton.style.top = "50px"; // Position below toggle button
startButton.style.left = "10px";

startButton.onclick = function() {
  stop_and_go();
};

document.body.appendChild(startButton); // Add button to HTML page
