canvas = document.getElementById('shooter');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
ctx = canvas.getContext('2d');

// Etoiles

var sprite_etoile = new Image();
sprite_etoile.src = 'star.png';

var Tableau_etoiles = [];
var taille_max = 5
var velocite_max = 5

function Creer_Etoiles(){
    let nb_etoiles = Math.floor(canvas.width * canvas.height / 5000);
    console.log(nb_etoiles);
    for(let i=0;i<nb_etoiles;i++){
        Creer_Etoile();
    }
}

function Creer_Etoile(){
    let etoile = {}
    let pos_canvas = {}
    etoile.taille = Math.floor(Math.random()*taille_max)
    etoile.velocite = Math.random()*velocite_max
    pos_canvas.posX = Math.floor(Math.random() * this.canvas.width - ( etoile.taille / 2));
    pos_canvas.posY = Math.floor(Math.random() * this.canvas.height);
    UneEtoile = {etoile,pos_canvas}    
    Tableau_etoiles.push(UneEtoile)
}

function Dessiner_etoile(){
    update_etoile()
    ctx.clearRect(0,0,canvas.width, canvas.height);
    // ctx.fillStyle = 'rgba(0,0,0,0.4)';
    // ctx.fillRect(0,0,canvas.width,canvas.height)
    for(let i=0; i<Tableau_etoiles.length; i++){
        ctx.drawImage(sprite_etoile, Tableau_etoiles[i].pos_canvas.posX, Tableau_etoiles[i].pos_canvas.posY)
    }
    requestAnimationFrame(Dessiner_etoile);
}

function update_etoile(){
    for(let i=0; i<Tableau_etoiles.length; i++){
        if(Tableau_etoiles[i].pos_canvas.posX < 0) {
            Tableau_etoiles[i].pos_canvas.posX = canvas.width + Tableau_etoiles[i].etoile.taille
        }
        else {
            Tableau_etoiles[i].pos_canvas.posX -= Tableau_etoiles[i].etoile.velocite;
        }
    }
}

sprite_etoile.onload =() =>{
Creer_Etoiles();
Dessiner_etoile();
}

// // Vaisseau

// var sprite_vaisseau = new Image();
// sprite_vaisseau = 'vaisseau.png'

// var start_vaisseau = canvas.height / 2;

// class Vaisseau{
//     constructor(){
//     this.posX = 50
//     this.posY = start_vaisseau
//     }

//     function dessiner_vaisseau();
//     {
//         ctx.drawImage(sprite_vaisseau, this.posX, this.posY)
//     }

// }
