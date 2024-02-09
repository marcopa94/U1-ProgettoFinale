let domanda = document.getElementsByClassName("domanda")[0];
let divRisposte = document.getElementsByClassName("btn-container")[0];
let indiceD = 0; //variabile che serve per scalare man mano il mio array di oggetti
let punteggioCorrette = 0;
let punteggioSbagliate = 0;
const marco = document.getElementsByClassName("result")[0];
const alfio = document.getElementsByClassName("benchmark")[0];
const countdownNumberEl = document.getElementById("number-coundown");
const circle = document.getElementsByClassName("circle")[0];
const prova = document.getElementById("grafico");
const positivo = document.getElementById("risultatoPositivo");
const negativo = document.getElementById("risultatoNegativo");
let nPaginaStart = document.getElementsByClassName("attuale")[0];
let nPaginaEnd = document.getElementsByClassName("off")[0];

/////////////////////////////////////////////////////////////////////////////////////////
////////////////////js difficult////////////////////////////////////////////////////////
const startDiff = document.getElementById("btn");
const difficolta = document.getElementsByClassName("difficolta")[0];
let numeroDomande;
let difficoltaDomande;
startDiff.addEventListener("click", function () {
  // Chiamata asincrona alla funzione fetchQuestions e gestione dei dati restituiti
  (async () => {
    const questions = await fetchQuestions(numeroDomande, difficoltaDomande);
    nPaginaEnd.textContent = "/ " + questions.length;

    function createQuestion() {
      let random = Math.floor(Math.random() * questions[indiceD].incorrect_answers.length); //crea un numero casuale da usare come indice che andremo ad usare nella riga sotto
      let arrayRisposte = questions[indiceD].incorrect_answers.toSpliced(random, 0, questions[indiceD].correct_answer); //creo un array di tutte le risposte con quella corretta messa casualmente prendendo il numero ramdom come indice dove inserirla
      divRisposte.innerHTML = ""; // Pulisce il contenitore prima di aggiungere nuovi bottoni

      for (let i = 0; i < arrayRisposte.length; i++) {
        domanda.innerText = questions[indiceD].question;
        let btn = document.createElement("button");
        divRisposte.appendChild(btn);
        btn.innerText = arrayRisposte[i];

        btn.onclick = function () {
          // Passa alla prossima domanda se ce ne sono ancora
          if (indiceD < questions.length - 1) {
            if (this.textContent === questions[indiceD].correct_answer) {
              btn.style.background = "green";
              punteggioCorrette++;
            } else {
              btn.style.background = "red";
              punteggioSbagliate++;
            }
            indiceD++;
            restartTimer();
            setTimeout(() => {
              createQuestion();
              numeroPagina();
            }, 1000);
          } else {
            if (this.textContent === questions[indiceD].correct_answer) {
              punteggioCorrette++;
            } else {
              punteggioSbagliate++;
            }
            // Se non ci sono più domande, fai qualcosa qui, ad esempio visualizza un messaggio di fine gioco
            sbloccaResultPage();
          }
        };
      }
    }

    //funzione timer//////////////////////////////////////////////////////////////////////////////
    let timerRef;
    let countdown = 30;
    let step = 100 / countdown; //passo da fare il colore
    let n1 = 0;

    function startTimer() {
      timerRef = setInterval(function () {
        circle.style.background = `conic-gradient(#00ffff ${n1}%,  #886192 ${0}%) border-box`;
        countdownNumberEl.textContent = countdown;

        if (countdown === 0) {
          if (indiceD < 10) {
            punteggioSbagliate++;
            createQuestion();
            console.log(punteggioSbagliate);
            indiceD++;
            numeroPagina();
            restartTimer();
          } else {
            clearInterval(timerRef);
            sbloccaResultPage();
          }
        }

        n1 = n1 + step < 100 ? n1 + step : 0;
        countdown--;
      }, 1000);
    }

    function restartTimer() {
      countdown = 25;
      n1 = 0;
      clearInterval(timerRef);
      startTimer();
    }

    ///////////////////////////////////////////////////////////////////////////////////////////////
    function sbloccaResultPage() {
      marco.style.display = "block";
      alfio.style.display = "none";

      //questo è per gestire il grafico del result

      const data = {
        datasets: [
          {
            borderWidth: 0,
            label: "le tue risposte",
            data: [punteggioSbagliate, punteggioCorrette],
            backgroundColor: ["#C2128D", "#00FFFF"],
            hoverOffset: 10,
            weight: 2,
            cutout: "70%",
            hoverOffset: 0,
          },
        ],
      };

      new Chart(prova, {
        type: "doughnut",
        data: data,
      });

      // console.log("Fine del gioco");
      //funzionalità per cambiare le scritte della pagina result
      const pCorrect = document.getElementsByClassName("pCorrect")[0];
      const pIncorrect = document.getElementsByClassName("pIncorrect")[0];
      pCorrect.textContent = "Risposte corrette : " + punteggioCorrette + " / " + questions.length;
      pIncorrect.textContent = "Risposte sbagliate : " + punteggioSbagliate + " / " + questions.length;

      punteggioSbagliate = Math.floor((punteggioSbagliate / questions.length) * 100);
      punteggioCorrette = Math.floor((punteggioCorrette / questions.length) * 100);

      negativo.textContent = punteggioSbagliate + "%";
      positivo.textContent = punteggioCorrette + "%";

      // cambiamento testo in base al risultato ottenuto
      const messaggio = document.getElementById("esito");
      const scuse = document.getElementById("scuse");
      const articolo = document.getElementById("article");

      if (punteggioCorrette >= 60) {
        messaggio.textContent = "You passed the exam";
        scuse.textContent = "Congratulation";
        articolo.textContent =
          " We'll send you the certificate in few minutes. Check yout email (including promotions / spam folder)";
      } else {
        messaggio.textContent = "You failed the exam";
        scuse.textContent = "I'm sorry but";
        articolo.textContent = "I'm sorry, but you need a bit more study.";
      }
    }
    //////////////////////////////////////
    //funzione cambia numero pagina
    function numeroPagina() {
      if (nPaginaStart.textContent === questions.length) {
        nPaginaStart.style.color = "#ba008b";
        nPaginaStart.textContent++;
      } else {
        nPaginaStart.textContent++;
      }
    }

    createQuestion();
    startTimer();
    difficolta.style.display = "none";
    alfio.style.display = "block";
    console.log(questions);
  })();
});
///////////////////////////////////////////////////////////////
//funzioni radio
////////////////////livello difficolta////////////////////////
let radioEasy = document.querySelector("#difEasy");
let radioMedium = document.querySelector("#difMedium");
let radioHard = document.querySelector("#difHard");

let labelEasy = document.getElementsByClassName("easy")[0];
let labelMedium = document.getElementsByClassName("medium")[0];
let labelHard = document.getElementsByClassName("difficult")[0];
//////////////////numero domande/////////////////
let radioN10 = document.querySelector("#radioD");
let radioN20 = document.querySelector("#radioV");
let radioN30 = document.querySelector("#radioT");

let dieci = document.getElementsByClassName("ten")[0];
let venti = document.getElementsByClassName("twenty")[0];
let trenta = document.getElementsByClassName("thirty")[0];

let arrayRadioDifficult = [radioEasy, radioMedium, radioHard];
let arrayLabelDifficult = [labelEasy, labelMedium, labelHard];
let arrayRadioN = [radioN10, radioN20, radioN30];
let arrayLabelN = [dieci, venti, trenta];

function pulisciColore(valore) {
  valore.forEach((e) => {
    e.classList.remove("viola");
  });
}

arrayLabelDifficult.forEach((e) => {
  e.onclick = function () {
    pulisciColore(arrayLabelDifficult);
    difficoltaDomande = e.textContent;
    e.classList.add("viola");
  };
});

arrayLabelN.forEach((e) => {
  e.onclick = function () {
    pulisciColore(arrayLabelN);
    numeroDomande = e.textContent;
    e.classList.add("viola");
  };
});
///////////////////////

const fetchQuestions = async (n, d) => {
  try {
    const response = await fetch(`https://opentdb.com/api.php?amount=${n}&category=18&difficulty=${d}`);
    if (response.ok) {
      const data = await response.json();
      return data.results; // Ritorna solo la parte 'results' dell'oggetto JSON
    } else {
      throw new Error("Errore nella richiesta HTTP");
    }
  } catch (error) {
    console.error("Si è verificato un errore:", error);
    // Puoi gestire l'errore in modo appropriato, ad esempio restituendo un array vuoto o lanciando l'errore
    return []; // Oppure, puoi lanciare l'errore con 'throw error;' per gestirlo altrove
  }
};
