const listNom =["Richard","Carine", "Camille", "Benj","Louise", "Erwan", "Meryll", "Thomas", "Céline", "Anne", "Daniel", "Ilona", "Quentin", "Jean-Luc", "Cévia", "Raphaël" ]

var apiUrl = 'https://script.google.com/macros/s/AKfycbwLqc77SviUgvxWu6uWc8X3V_pZlYDzjSCw5CshkZjW8EfoBrPV3zg-EkuVgCfkYCLpIA/exec';

var dataTable = "";

// init

function init(){
  // API  Call
  fetch(apiUrl).then(response => {
    return response.json();
  }).then(data => {
    // Work with JSON data here
    console.log(data);
    dataTable = data;
    
    // ne pas avoir ses propres cadeaux
    listNom.splice(listNom.indexOf(sessionStorage.getItem('nom')), 1);

    for(var i = 0; i < listNom.length ; i++){
      
      // Div principale
      var newDiv = document.createElement("div");
      newDiv.classList.add("div-user");
      
      // titre de la div pour user
      var newDivNom = document.createElement("p");
      newDivNom.classList.add("div-nom", "div-" + listNom[i]);
      newDivNom.appendChild(document.createTextNode(listNom[i].toUpperCase()));
      var newDivNomIcon = document.createElement("i");
      newDivNomIcon.classList.add("fa","fa-gifts");

      var newDivPersonne = document.createElement("div");
      newDivPersonne.classList.add("user-"+listNom[i], "title-name");

      newDivPersonne.appendChild(newDivNomIcon);
      newDivPersonne.appendChild(newDivNom);
      

      // liste cadeaux
      var newDivCadeaux = document.createElement("div");
      newDivCadeaux.classList.add("div-cadeaux"); 
      newDivCadeaux.classList.add("cadeau-" + listNom[i]);
      
      var listCadeau = data.filter(x => x.Nom == listNom[i]);

      if (listCadeau.length == 0){
        var newCadeau = document.createElement("div"); 
        newCadeau.classList.add("div-"+ listNom[i], "pas-idee");
        
        var newCadeauContent = document.createElement("p"); 
        newCadeauContent.appendChild(document.createTextNode("Pas d'idée de cadeau pour le moment.."));
        
        newCadeau.appendChild(newCadeauContent);

        // Div Cadeau
        newDivCadeaux.appendChild(newCadeau);
      }

      for(var j = 0; j < listCadeau.length; j++){
        
        
        var newCadeau = document.createElement("div"); 
        newCadeau.classList.add("div-"+ listCadeau[j].ID, "div-cadeau");
        
        var newCadeauContent = document.createElement("p"); 
        newCadeauContent.appendChild(document.createTextNode(listCadeau[j].Cadeau));
        var newIcon = document.createElement("i");
        
        console.log(listCadeau[j].Reserve.length)
      if(listCadeau[j].Reserve.length > 0){
        newIcon.classList.add("icon", "i-"+ listCadeau[j].ID,"fa","fa-check");
      }else{
        newIcon.classList.add("icon", "i-"+ listCadeau[j].ID,"fa","fa-gift");
      }
        

        newCadeau.appendChild(newCadeauContent);
        newCadeau.appendChild(newIcon);

        // Div Cadeau
        newDivCadeaux.appendChild(newCadeau);
      }

      // final div
      newDiv.appendChild(newDivPersonne);
      newDiv.appendChild(newDivCadeaux);

      var MainDiv = document.getElementById('main');
      document.body.insertBefore(newDiv, MainDiv);
    }
    
  }).catch(err => {
    // Do something for an error here
  });


}

// call init
init();

// event listener
document.addEventListener('click', function(e){
  // reserver cadeau
  if(e.target && e.target.classList.contains('icon') && e.target.classList.contains('fa-gift') ){

      //get id of cadeau
      var id = e.target.classList[1].substring(2);

      // enleve le gifgt
      e.target.classList.remove("fa-gift");
      e.target.classList.add("fa-check", "reserve")

      console.log(id);
     
      //reserver cadeau
      reserverCadeau(id);
      return;
  }

  // de reserver cadeau
  
  if(e.target && e.target.classList.contains('icon') && e.target.classList.contains('fa-check')){

    //get id of cadeau
    var id = e.target.classList[1].substring(2);

    // vérifie si l'utilisateur peut des reserver le cadeau
    console.log(dataTable.find(x => x.ID == id).Reserve)
    if(sessionStorage.getItem('nom') == dataTable.find(x => x.ID == id).Reserve){
      // enleve le gifgt
      e.target.classList.remove("fa-check", "reserve");
      e.target.classList.add("fa-gift")

      console.log(id);

      // déreserve le cadeau
      deReserverCadeau(id)
    }
    else{
      alert("Vous ne pouvez pas enlever la reservation d'une autre personne.")
    }
    
    return;
}
});


// Fonction 
function reserverCadeau(id){

  var url = apiUrl+"?action=reserver&id=" + id +"&nom=" + sessionStorage.getItem('nom');

    console.log(url);
    fetch(url).then(response => {
      return response.json();
    }).then(data => { 

      if (data.id == id){

        console.log(data);
        var index = dataTable.findIndex(x => x.ID == id)
        dataTable[index].Reserve = sessionStorage.getItem('nom');
        
      }
      
    }).catch(err => {
      // Do something for an error here
      console.log(err);
    });

};

function deReserverCadeau(id){

  var url = apiUrl+"?action=dereserver&id=" + id;

    console.log(url);
    fetch(url).then(response => {
      return response.json();
    }).then(data => { 

      if (data.ID == id){

        console.log(data);
        var index = dataTable.findIndex(x => x.ID == id)
        dataTable[index].Reserve = "";

      }

      console.log(data);
      
    }).catch(err => {
      // Do something for an error here
      console.log(err);
    });

};