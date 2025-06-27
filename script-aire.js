<script type="module">
  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/11.9.1/firebase-app.js";
  import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.9.1/firebase-analytics.js";
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const firebaseConfig = {
    apiKey: "AIzaSyCDKp_KDWvKwX8wBoOXCnnj8gIRbGPZGJc",
    authDomain: "mathsdesbordesloire.firebaseapp.com",
    projectId: "mathsdesbordesloire",
    storageBucket: "mathsdesbordesloire.firebasestorage.app",
    messagingSenderId: "427572486543",
    appId: "1:427572486543:web:b0adbcde55d348a9efebfa",
    measurementId: "G-E86GKJJWT6"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);

</script>


(function(){
  const L = Math.floor(Math.random() * 11) + 10;
  const l = Math.floor(Math.random() * 6) + 5;
  const A = L * l;
  const scale = 10;

  const rect = document.getElementById('rectShape');
  rect.setAttribute('width', L * scale);
  rect.setAttribute('height', l * scale);

  const labelL = document.getElementById('labelL');
  labelL.textContent = `${L} cm`;
  labelL.setAttribute('x', 50 + (L*scale)/2);
  labelL.setAttribute('y', 45);

  const labell = document.getElementById('labell');
  labell.textContent = `${l} cm`;
  const ly = 50 + (l*scale)/2 + 5;
  labell.setAttribute('x', 55);
  labell.setAttribute('y', ly);
  labell.setAttribute('transform', `rotate(-90 55 ${ly})`);

  document.getElementById('Ltext').textContent = L;
  document.getElementById('ltext').textContent = l;

  document.getElementById('btnCheck').onclick = () => {
    const answer = +document.getElementById('answer').value;
    const res = document.getElementById('result');
    if (!answer && answer !== 0) {
      res.textContent = '⛔ Entre un nombre';
      res.style.color = 'orange';
    } else if (answer === A) {
      res.textContent = '✅ Correct !';
      res.style.color = 'green';
    } else {
      res.textContent = `❌ Faux. L’aire est ${A} cm²`;
      res.style.color = 'red';
    }
    
    // 👉 Enregistrement dans Firebase
    const prenom = document.getElementById("prenom").value;
    enregistrerReponse(prenom, "aire-rectangle", answer, answer === A);
  };
})();

function enregistrerReponse(prenom, exercice, reponse, correct) {
await addDoc(collection(db, "reponses"), {
  prenom: prenom,
  exercice: exercice,
  reponse: reponse,
  correct: correct,
  score: correct ? 1 : 0,
  timestamp: new Date()
});
  .then(() => console.log("✅ Réponse enregistrée dans Firestore"))
  .catch((error) => console.error("❌ Erreur Firebase :", error));
}
