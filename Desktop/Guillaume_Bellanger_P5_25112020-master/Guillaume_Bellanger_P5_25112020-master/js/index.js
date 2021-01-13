/*Ensemble des fonctions et événements relatifs à la page index.html, qui récupère depuis le serveur et affiche la liste des produits à la vente */

//Déclaration des variables 
let products = [];


// Lance la récupération et l'affichage des produits quand la page se charge
document.addEventListener("DOMContentLoaded", () => {
    //Fonction pour récupérer la liste des produits depuis le serveur grâce à une API fetch GET - dans fichier queries.js -
    getProducts();
    
});

//Fonction pour afficher les produits dans la section id="products"
function showProducts(products) { //nomfonction(paramettres)
    //Capture l'élément du DOM "products" qui va afficher toutes les informations
    const productSection = document.getElementById("products");
    productSection.innerHTML = "";

    //Boucle qui opère pour chaque produit contenu dans le tableau "products"
    products.forEach(product => {

        // Génère la "case" pour chaque produit
        const card  = document.createElement("div");
        card.className = "card"; 

        // Génère une div pour les éléments, photo et détails
        const cardElements = document.createElement("div");
        cardElements.className = "card-element";
        card.appendChild(cardElements);

        // Génère l'image au produit
        const img = document.createElement("img");
        img.alt = product.name;
        img.src = product.imageUrl;
        img.className = "card-img-top";
        cardElements.appendChild(img);

        // Génère une div pour les détails
        const details = document.createElement("div");
        details.className = "card-body";
        cardElements.appendChild(details);

        // Génère le titre du produit
        const name = document.createElement("h3");
        name.className = "card-title";
        name.textContent = product.name;
        details.appendChild(name);

        // Génère la description du produit
        const description = document.createElement("p");
        description.className = "card-text";
        description.textContent = product.description;
        details.appendChild(description); 

         // Génère le prix du produit
        const price = document.createElement("p");
        price.className = "card-price";
        //permet de formater un nombre et de le transformer en euro en le divisant / 100 
        const cost = new Intl.NumberFormat("fr-FR", {style: "currency", currency: "EUR"}).format(product.price / 100); 
        price.textContent = cost;
        details.appendChild(price); 

        //Génère une div pour le bouton
        const cardBtns = document.createElement("div");
        cardBtns.className = "card-btns";
        card.appendChild(cardBtns);

        // Génère le bouton pour afficher détails du produit
        const btnDetails = document.createElement("a");
        btnDetails.className = "btn btn-light card__btnDetails btn__details";
        btnDetails.setAttribute("role", "button"); //permet de rajouter un attibut button 
        btnDetails.innerHTML = '<i class="fas fa-info-circle"></i> En savoir plus';

        //Envoie l'info du id du produit sélectionné à la page produit.html via les paramètres de l'url
        btnDetails.setAttribute("href", "produit.html?id=" + product._id + "");
        cardBtns.appendChild(btnDetails); 
        productSection.appendChild(card);
    });
}



