let divStars = document.getElementsByClassName("container-stars")[0];
const star = document.getElementById("star");
// funzione per creare le stelle in modo dinamico
function creaStar() {
  for (let i = 0; i < 9; i++) {
    let clonedStar = star.cloneNode(true);
    divStars.appendChild(clonedStar);
  }
}
creaStar();
let starValore = 0;
//funzione che cambia colore alle mie stelle se cliccate
divStars = Array.from(divStars.children);
let divEmo = document.getElementById("svgContainer");
const img = document.createElement("img");

divStars.forEach((el, index) => {
  //click
  el.onclick = function () {
    starValore = index + 1;
    console.log(starValore);
    divStars.forEach((child) => {
      child.classList.remove("acceso");

      //aggiunta della faccina
      if (starValore <= 4) {
        // console.log("pessimo");
        img.src = "../assets/faces/sad-svgrepo-com.svg";

        divEmo.appendChild(img);
      } else if (starValore > 4 && starValore < 8) {
        // console.log("buono");
        img.src = "../assets/faces/straight-svgrepo-com.svg";
        divEmo.appendChild(img);
      } else if (starValore >= 8) {
        // console.log("ottimo");
        img.src = "../assets/faces/smile-svgrepo-com.svg";
        divEmo.appendChild(img);
      }
    });

    for (let i = 0; i <= index; i++) {
      divStars[i].classList.add("acceso");
    }
  };

  //nohover
  el.addEventListener("mouseout", function () {
    divStars.forEach((child) => {
      child.classList.remove("isHover");
    });
  });
  //ishover
  el.addEventListener("mouseover", function () {
    divStars.forEach((child) => {
      child.classList.remove("isHover");
    });

    for (let i = 0; i <= index; i++) {
      if (!divStars[i].classList.contains("acceso")) {
        divStars[i].classList.add("isHover");
      }
    }
  });
});
const terzo = document.getElementsByClassName("first-p")[0];
const stelle = document.getElementsByClassName("central")[0];
const secondo = document.getElementById("primo");
const invia = document.getElementById("btn");
const commento = document.getElementsByClassName("leave")[0];
const inputComment = document.getElementById("commentoUtente");
const parteSottostante = document.getElementById("finalArea");

invia.addEventListener("click", function () {
  secondo.innerHTML = "Thank you for your review!";
  secondo.style.marginTop = "40px";
  terzo.innerHTML = "Ci hai assegnato " + " " + starValore + " " + "stelle su 10";
  terzo.style.marginTop = "35px";
  terzo.style.color = "#00ffff";

  stelle.innerHTML = " ";
  commento.innerHTML = "La tua recensione è:" + " " + inputComment.value;
  parteSottostante.innerHTML = "Grazie e alla prossima sempre con epicode ❤️";
  parteSottostante.style.fontFamily = "Inter, sans-serif";
  parteSottostante.style.color = "white";
  parteSottostante.style.marginTop = "200px";
});


