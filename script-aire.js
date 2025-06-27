import { initializeApp } from "https://www.gstatic.com/firebasejs/11.9.1/firebase-app.js";
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/11.9.1/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyCDKp_KDWvKwX8wBoOXCnnj8gIRbGPZGJc",
  authDomain: "mathsdesbordesloire.firebaseapp.com",
  projectId: "mathsdesbordesloire",
  storageBucket: "mathsdesbordesloire.firebasestorage.app",
  messagingSenderId: "427572486543",
  appId: "1:427572486543:web:b0adbcde55d348a9efebfa",
  measurementId: "G-E86GKJJWT6"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// variables globales
const L = Math.floor(Math.random() * 11) + 10;
const l = Math.floor(Math.random() * 6) + 5;
const A = L * l;

const rect = document.getElementById('rectShape');
rect.setAttribute('width', L * 10);
rect.setAttribute('height', l * 10);

document.getElementById('labelL').textContent = `${L} cm`;
document.getElementById('labelL').setAttribute('x', 50 + (L*10)/2);
document.getElementById('labelL').setAttribute('y', 45);

const ly = 50 + (l*10)/2 + 5;
const labelL = document.getElementById('labell');
labelL.textContent = `${l} cm`;
labelL.setAttribute('x', 55);
labelL.setAttribute('y', ly);
labelL.setAttribute('transform', `rotate(-90 55 ${ly})`);

document.getElementById('Ltext').textContent = L;
document.getElementById('ltext').textContent = l;

document.getElementById('btnCheck').onclick = async () => {
  const answer = +document.getElementById('answer').value;
  const prenom = document.getElementById("prenom").value.trim();
  const res = document.getElementById('result');

  const correct = (answer === A);

  if (!prenom) {
    res.textContent = "⛔ Merci de renseigner ton prénom.";
    res.style.color = "orange";
    return;
  }

  if (!answer && answer !== 0) {
    res.textContent = "⛔ Merci d'entrer une réponse.";
    res.style.color = "orange";
    return;
  }

  res.textContent = correct ? "✅ Correct !" : `❌ Faux. L’aire est ${A} cm²`;
  res.style.color = correct ? "green" : "red";

  try {
    await addDoc(collection(db, "reponses"), {
      prenom: prenom,
      exercice: "aire-rectangle",
      reponse: answer,
      correct: correct,
      score: correct ? 1 : 0,
      timestamp: new Date()
    });
    console.log("✅ Réponse enregistrée");
  } catch (e) {
    console.error("❌ Erreur Firebase :", e);
  }
};
