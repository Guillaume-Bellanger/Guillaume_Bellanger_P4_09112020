/*Ensemble des fonctions et événements relatifs à la page produit.html, qui affiche un produit spécifique qu'il a été récupéré depuis le serveur */

//Capture des éléments du DOM
const pdtCase = document.getElementById("product-case");
const pdtImg = document.getElementById("pdt-img");
const pdtStock = document.getElementById("pdt-stock");
const pdtTitle = document.getElementById("pdt-title");
const pdtDescription = document.getElementById("pdt-description");
const pdtPrice = document.getElementById("pdt-price");
const pdtButtons = document.getElementById("pdt-buttons");
const varnishChoice = document.getElementById("pdt-varnish");
const varnishBtn = document.getElementById("dropdownMenuButton");
const pdtButton = document.getElementById("pdt-button");


// Lance la récupération et l'affichage du produit sélectionné quand la page se charge
document.addEventListener("DOMContentLoaded", () => {
    //Fonction pour récupérer le produit sélectionné depuis le serveur, via son id intégré aux paramètres de l'URL, grâce à une API fetch GET - dans fichier queries.js -
    const id = getIdFromUrl(); 
    if (id) {
        getProduct(id).then(response => {
            response=response;
            showItem(response);

            pdtSelected = { //objet pdtselected
                _id : response._id, // les attributs et leurs valeurs
                name:response.name,
                price:response.price,
                description:response.description,
                imageUrl:response.imageUrl,
                quantity:1

            };
        }).catch(error =>alert("Erreur :" + error)); //affiche l'erreur si requete ne fonctionne pas
    }else{
        console.error("pas d'id dans l'url"); // boostrap : afficher un truc en html en cas d'erreur a faire        
    }
        
});



//Fonction pour afficher le produit sélectionné dans la page produit.html

function showItem(item) { 
    //Actualise l'image du produit
    pdtImg.alt = item.name;
    pdtImg.src = item.imageUrl;

    //Actualise le titre du produit 
    pdtTitle.textContent = item.name;

    //Actualise la description du produit 
    pdtDescription.textContent = item.description;

    //Actualise le prix unitaire du produit
    let totalPrice = new Intl.NumberFormat("fr-FR", {style: "currency", currency: "EUR"}).format(item.price/100);
    pdtPrice.style.fontWeight = "bold";
    pdtPrice.textContent = "Prix unitaire : " + totalPrice;

     //Actualise la liste des options de vernis
    let varnishList = item.varnish;

    //Remise à zéro du vernis précédent en le supprimant du localStorage 
    localStorage.removeItem("chosenVarnish");

    //Boucle pour créer une ligne du menu déroulant pour chaque vernis, différente selon les produits
    for (let i=0 ; i<varnishList.length ; i++) {
        let varnish = document.createElement("span");
        varnish.className = "dropdown-item";
        varnish.textContent = varnishList[i];

        //Quand le user clique sur l'option, elle reste affichée quand le menu se ferme
        varnish.addEventListener("click", function() {
            varnishBtn.textContent = varnishList[i];

            //Stockage du choix de vernis dans le localStorage
            localStorage.setItem("chosenVarnish", varnishList[i]);
        });
        varnishChoice.appendChild(varnish);
    }
    //Actualise le bouton d'ajout au panier
    pdtButton.setAttribute("data-id", item._id);
    pdtButton.addEventListener("click", addPdtGlobal); 
}

        

//Fonction déclenchée au clic du bouton pour ajouter le produit 

function addPdtGlobal(e) {
    //conservation du produit is a jour dans le localStorage

    let storedPdt = JSON.stringify(pdtSelected); // transforme le doc "pdtSelected" en JSON
    localStorage.setItem(pdtSelected._id, storedPdt);
}
  