const checkbox = document.getElementById("checkbox");
checkbox.addEventListener("change", validationCheck);
const a = document.getElementById("a");

function validationCheck(e) {
  let button = document.getElementsByClassName("button")[0];

  if (e.target.checked) {
    a.setAttribute("href", "../html/benchmark.html");
    button.style.opacity = "1";
  } else {
    a.setAttribute("href", "#"); 
    
    button.style.opacity = "0.5";
  }
}
