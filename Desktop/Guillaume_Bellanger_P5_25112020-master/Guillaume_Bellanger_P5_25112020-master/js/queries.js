/* Requêtes GET et POST(API fetch)*/


//Fonction pour récupérer la liste des produits depuis le serveur grâce à une API fetch GET

function getProducts() { 
    //Récupération des données via une API fetch 
    fetch("http://localhost:3000/api/furniture")
        .then(response => response.json())
        .then(data => {
            //Affiche la liste des produits une fois que les données sont chargées
            showProducts(data);  // data ???
                console.log(data);
        })
        //Affiche l'erreur si requête ne fonctionne pas
        .catch(error => alert("Erreur : " + error));
}
function getIdFromUrl() {
        let params = new URLSearchParams(window.location.search); //renvoie le Href(url) de la page actuel
        return params.get("id"); 
         
}



//Fonction pour récupérer un produit précis depuis le serveur - via son id intégré aux paramètres de l'URL - grâce à une API fetch GET ciblée

async function getProduct(id){
    //recuperation des données via une API fetch
    let response = await fetch('http://localhost:3.../api/furniture/'+id);
    return response.json()
}


