const listNom =["Richard","Carine", "Camille", "Benj","Louise", "Erwan"]

// init
function init(){

  if (!sessionStorage.getItem('nom')){
    document.querySelector('.bg-modal').style.display = "flex";
  }

  var list = document.getElementsByClassName('list-user')[0];
  
  for(var i=0; i < listNom.length ; i++){
    var newUser = document.createElement("p");
    newUser.classList.add("user");
    newUser.appendChild(document.createTextNode(listNom[i]));
    list.appendChild(newUser);
  }
  
}

// call init
init();


// MODAL

document.getElementsByClassName('button')[0].addEventListener("click", function() {
	document.querySelector('.bg-modal').style.display = "flex";
});

document.querySelector('.close').addEventListener("click", function() {
	document.querySelector('.bg-modal').style.display = "none";
});

// detect le click pour user
var classListUser = document.getElementsByClassName("user");

Array.from(classListUser).forEach(x => x.addEventListener('click', function() {
  // setlocal storage
  sessionStorage.setItem('nom', this.innerHTML)
  document.querySelector('.bg-modal').style.display = "none";
  document.getElementsByClassName('button')[0].innerHTML = sessionStorage.getItem('nom');
}));



document.getElementsByClassName('button')[0].innerHTML = sessionStorage.getItem('nom');