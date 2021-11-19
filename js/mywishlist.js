const listNom =["Richard","Carine", "Camille", "Benj","Louise", "Erwan"]

var apiUrl = 'https://script.google.com/macros/s/AKfycbxd9eTdaAXlxL7_-hfGH-GdRSBFgaQ52u2RWLWhZKI7hu8yH3gM1rnGgRKNSorHPIt3sw/exec';

// init
function init(){

  // get nom of user
  var nom = sessionStorage.getItem('nom');

  // API  Call
  fetch(apiUrl).then(response => {
    return response.json();
  }).then(data => {
    // Work with JSON data here
    console.log(data);

    var listCadeau = data.filter(x => x.Nom == nom);
    
    // liste cadeaux
    for(var i = 0; i < listCadeau.length; i++){
      
      var newDivCadeau = document.createElement("div");
      newDivCadeau.classList.add("div-cadeau"); 
      var newPCadeau = document.createElement("p");
      newPCadeau.appendChild(document.createTextNode(listCadeau[i].Cadeau));
      var newIcon = document.createElement("i");
      newIcon.classList.add("fas", "fa-trash-alt", "i-"+ listCadeau[i].ID, "icon")

      newDivCadeau.appendChild(newPCadeau);
      newDivCadeau.appendChild(newIcon);
      
      //document.body.insertBefore(cadeaux, newDivCadeau);
      document.getElementsByClassName('cadeaux')[0].appendChild(newDivCadeau);
      
    }

      // div saisie 
      var newInputSaisie = document.createElement("Input");
      newInputSaisie.classList.add("Input");
      newInputSaisie.placeholder = "Ton idée cadeau";

      var newButtonSaisie = document.createElement("Button");
      newButtonSaisie.classList.add("button", "fa", "fa-plus");

      document.getElementsByClassName('saisie')[0].appendChild(newInputSaisie);
      document.getElementsByClassName('saisie')[0].appendChild(newButtonSaisie);


  }).catch(err => {
    // Do something for an error here
    console.log(err);
  });


}


// Fonction 
function addCadeau(nom, cadeau){

  var url = apiUrl+"?action=add&nom=" + nom + "&cadeau=" + cadeau;

    console.log(url);
    fetch(url).then(response => {
      return response.json();
    }).then(data => {
      // Work with JSON data here    

      if (data.Nom == nom && data.Cadeau == cadeau){
        
        console.log("i-" + data.ID)

        var icon = document.getElementsByClassName("i-last");

        icon[0].classList.add("i-" + data.ID, "icon")
        icon[0].classList.remove("i-last");
 
      }

      console.log(data);
      
    }).catch(err => {
      // Do something for an error here
      console.log(err);
    });

};


function deleteCadeau(id){

  var url = apiUrl+"?action=delete&id=" + id;

  console.log(url);

  fetch(url).then(response => {
    return response.json();
  }).then(data => {
    // Work with JSON data here

    console.log(data);
    
  }).catch(err => {
    // Do something for an error here
    console.log(err)
  });
};



// call init
init();


// add cadeau
document.addEventListener('click', function(e){
  // add cadeau
  if(e.target && e.target.classList.contains('button')){

      //get value of nom and cadeau
      var nom = sessionStorage.getItem('nom');
      var cadeau = document.getElementsByClassName('Input')[0].value;

      // si le cadeau est vide
      if (cadeau.length == 0){
        alert('le cadeau ajouté est vide');
        return;
      }

      // vide l'input
      document.getElementsByClassName('Input')[0].value = "";

      // crée nouveau cadeau
      var newDivCadeau = document.createElement("div");
      newDivCadeau.classList.add("div-cadeau"); 
      var newPCadeau = document.createElement("p");
      newPCadeau.appendChild(document.createTextNode(cadeau));
      var newIcon = document.createElement("i");
      newIcon.classList.add("fas", "fa-trash-alt", "i-last", "icon")

      newDivCadeau.appendChild(newPCadeau);
      newDivCadeau.appendChild(newIcon);

      document.getElementsByClassName('cadeaux')[0].appendChild(newDivCadeau);

      console.log('salut');
      addCadeau(nom, cadeau);
  }

  // delete cadeau
  
  if(e.target && e.target.classList.contains('icon')){

    //get value of nom and cadeau
    var id = e.target.classList[2].substring(2);
    console.log("id : ", id);
    // delete the line
    document.getElementsByClassName(e.target.classList[2])[0].parentNode.remove();

    deleteCadeau(id);
}
});



document.getElementsByClassName('nom')[0].innerHTML = sessionStorage.getItem('nom').toUpperCase();