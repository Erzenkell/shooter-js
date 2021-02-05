canvas = document.getElementById('shooter');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
ctx = canvas.getContext('2d');

var sprite_etoile = document.getElementById("etoile");
var sprite_vaisseau = document.getElementById("vaisseau");
var sprite_laser = document.getElementById("laser");

// Etoiles

var Tableau_etoiles = [];
var taille_max = 5
var velocite_max = 5

function Creer_Etoiles(){
    let nb_etoiles = Math.floor(canvas.width * canvas.height / 10000);
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
    // ctx.fillStyle = 'rgba(0,0,0,0.4)';
    // ctx.fillRect(0,0,canvas.width,canvas.height)
    for(let i=0; i<Tableau_etoiles.length; i++){
        ctx.drawImage(sprite_etoile, Tableau_etoiles[i].pos_canvas.posX, Tableau_etoiles[i].pos_canvas.posY)
    }
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

// Vaisseau

var start_vaisseau = canvas.height / 2;
var vaisseau_atksp = 0.5; //nb d'attaques par seconde
let vaisseau_posX = 50;
let vaisseau_posY = start_vaisseau;

function Dessiner_vaisseau()
{
    update_vaisseau();
    ctx.drawImage(sprite_vaisseau, vaisseau_posX, vaisseau_posY);
}

function update_vaisseau()
{
    if (check_haut == true){
        if (check_gauche == true){
            if (vaisseau_posX - 5 >= 0) vaisseau_posX -= 5;
            if (vaisseau_posY - 5 >= 0) vaisseau_posY -= 5;
        }
        else if (check_droite == true){
            if (vaisseau_posX + 5 <= canvas.width - 50) vaisseau_posX += 5;
            if (vaisseau_posY - 5 >= 0) vaisseau_posY -= 5;
        }
        else if (vaisseau_posY - 5 >= 0) vaisseau_posY -= 5;
    }
    else if (check_bas == true){
        if (check_gauche == true){
            if (vaisseau_posX - 5 >= 0) vaisseau_posX -= 5;
            if (vaisseau_posY +5 <= canvas.height - 50) vaisseau_posY += 5;
        }
        else if (check_droite == true){
            if (vaisseau_posX + 5 <= canvas.width - 50) vaisseau_posX += 5;
            if (vaisseau_posY +5 <= canvas.height - 50) vaisseau_posY += 5;
        }
        else if (vaisseau_posY +5 <= canvas.height - 50) vaisseau_posY += 5; 
    } 
    else if (check_gauche == true){
        if (check_haut == true){
            if (vaisseau_posY - 5 >= 0) vaisseau_posY -= 5;
            if (vaisseau_posX - 5 >= 0) vaisseau_posX -= 5;
        }
        else if (check_bas == true){
            if (vaisseau_posY +5 <= canvas.height - 50) vaisseau_posY += 5
            if (vaisseau_posX - 5 >= 0) vaisseau_posX -= 5;
        }
        else if (vaisseau_posX - 5 >= 0) vaisseau_posX -= 5;
    } 
    else if (check_droite == true){
        if (check_haut == true){
            if (vaisseau_posY - 5 >= 0) vaisseau_posY -= 5;
            if (vaisseau_posX + 5 <= canvas.width - 50) vaisseau_posX += 5;
        }
        else if (check_bas == true){
            if (vaisseau_posY +5 <= canvas.height - 50) vaisseau_posY += 5
            if (vaisseau_posX + 5 <= canvas.width - 50) vaisseau_posX += 5;
        }
        else if (vaisseau_posX + 5 <= canvas.width - 50) vaisseau_posX += 5;       
    }
}

// Laser

var Tableau_laser = [];
var laser_tire = false;

function delay_laser(){
    laser_tire = false;
    //console.log(laser_tire)
}

function creer_laser(){
    if(check_space == true && laser_tire == false){
        laser_tire = true;
        laser = {}
        laser.posX = vaisseau_posX + 50;
        laser.posY = vaisseau_posY + 20;
        Tableau_laser.push(laser);
        setTimeout(delay_laser, vaisseau_atksp*1000); 
    }
    
}

function Dessiner_laser(){
    creer_laser();
    update_laser();
    for(let i=0; i<Tableau_laser.length; i++){
        ctx.drawImage(sprite_laser, Tableau_laser[i].posX, Tableau_laser[i].posY);
    }
}

function update_laser(){
    for(let i=0; i<Tableau_laser.length; i++){
        Tableau_laser[i].posX += 10;
    }
}

// Ennemis



// Gestion clavier

var haut = 0;
var bas = 0;
var gauche = 0;
var droite = 0;

var check_bas, check_droite, check_gauche, check_haut, check_R, check_space;

function touche_presse(e)
{
    if(e.keyCode == '32') check_space = true;
    else check_space = false;

    if(e.keyCode == '82') check_R = true;
    else check_R = false;

    if(e.keyCode == '38') check_haut = true //haut
    // else if(e.keyCode == '32' && check_haut == true) check_space = true // haut + tir
    else if(e.keyCode == '37' && check_haut == true) check_gauche = true; //diagonale haut-gauche
    // else if(e.keyCode == '32' && check_haut == true && check_gauche == true) check_space = true; //diagonale haut-gauche + tir
    else if(e.keyCode == '39' && check_haut == true) check_droite = true; //diagonale haut-droite
    // else if(e.keyCode == '32' && check_haut == true && check_droite == true) check_space = true; //diagonale haut-droite + tir
    else check_haut = false;

    if(e.keyCode == '40') check_bas = true; //bas
    else if(e.keyCode == '37' && check_bas == true) check_gauche = true; //diagonale bas-gauche
    else if(e.keyCode == '39' && check_bas == true) check_droite = true; //diagonale bas-droite
    else check_bas = false;

    if(e.keyCode == '37') check_gauche = true; //gauche
    else if(e.keyCode == '40' && check_gauche == true) check_bas = true; //diagonale bas-gauche
    else if(e.keyCode == '38' && check_gauche == true) check_haut = true;  //diagonale haut-gauche
    else check_gauche = false;

    if(e.keyCode == '39') check_droite = true; //droite
    else if(e.keyCode == '40' && check_droite == true) check_bas = true; //diagonale bas-droite
    else if(e.keyCode == '38' && check_droite == true) check_haut = true; //diagonale haut-droite
    else check_droite = false;
}

function touche_relache(e)
{
    if(e.keyCode == '38') {
        check_haut = false;
    }
    if(e.keyCode == '40') {
        check_bas = false;
    }
    if(e.keyCode == '37') {
        check_gauche = false;
    }
    if(e.keyCode == '39') {
        check_droite = false;
    }
    else if(e.keyCode == '32') {
        check_space = false;
    }
    if(e.keyCode == '82') {
        check_R = false;
    }
}

// 

function Dessiner_tout(){
    ctx.clearRect(0,0,canvas.width, canvas.height);
    Dessiner_etoile();
    Dessiner_vaisseau();
    Dessiner_laser();
    requestAnimationFrame(Dessiner_tout);
}

Creer_Etoiles();
Dessiner_tout();

document.onkeydown = touche_presse;
document.onkeyup = touche_relache;