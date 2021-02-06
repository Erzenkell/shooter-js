canvas = document.getElementById('shooter');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
ctx = canvas.getContext('2d');

var sprite_vaisseau = document.getElementById("vaisseau");
var sprite_laser = document.getElementById("laser");
var sprite_alien = document.getElementById("alien")

// Etoiles

var Tableau_etoiles = [];
var taille_max = 5
var velocite_max = 5
var couleur_range = [0,60,240];

function Creer_Etoiles(){
    let nb_etoiles = Math.floor(canvas.width * canvas.height / 10000);
    console.log(nb_etoiles);
    for(let i=0;i<nb_etoiles;i++){
        Creer_Etoile();
    }
}

function Creer_Etoile(){
    let etoile = {}
    etoile.taille = Math.floor(Math.random()*taille_max)
    etoile.velocite = Math.random()*velocite_max
    etoile.posX = Math.floor(Math.random() * canvas.width - ( etoile.taille / 2));
    etoile.posY = Math.floor(Math.random() * canvas.height);
    etoile.radius = Math.random() * 1.2;
    etoile.couleur = couleur_range[Math.floor(Math.random(0,couleur_range.length - 1))];
    etoile.saturation = Math.floor(Math.random(50,100));
    UneEtoile = etoile   ;
    Tableau_etoiles.push(UneEtoile);
}

function Dessiner_etoile(){
    update_etoile()
    // ctx.fillStyle = 'rgba(0,0,0,0.4)';
    // ctx.fillRect(0,0,canvas.width,canvas.height)
    for(let i=0; i<Tableau_etoiles.length; i++){
        ctx.beginPath();
        ctx.arc(Tableau_etoiles[i].posX, Tableau_etoiles[i].posY, Tableau_etoiles[i].radius, 0, 360);
        ctx.fillStyle = "hsl(" + Tableau_etoiles[i].couleur + ", " + Tableau_etoiles[i].saturation + "%, 88%)";
        ctx.fill();
    }
}

function update_etoile(){
    for(let i=0; i<Tableau_etoiles.length; i++){
        if(Tableau_etoiles[i].posX + 47 < 0) {
            Tableau_etoiles[i].posX = canvas.width + Tableau_etoiles[i].taille
        }
        else {
            Tableau_etoiles[i].posX -= Tableau_etoiles[i].velocite;
        }
    }
}

// Vaisseau

var start_vaisseau = canvas.height / 2;
var vaisseau_atksp = 0.3; //nb d'attaques par seconde
var vaisseau_posX = 50;
var vaisseau_posY = start_vaisseau;

function Dessiner_vaisseau()
{
    update_vaisseau();
    test_colision_vaisseau();
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

function test_colision_vaisseau(){
    let x = vaisseau_posX;
    let y = vaisseau_posY;
    let width = sprite_vaisseau.width;
    let height = sprite_vaisseau.height;
    let hitbox_vaisseau = {x,y,width,height};

    for(let i=0; i<Tableau_alien.length; i++){

        x = Tableau_alien[i].posX;
        y = Tableau_alien[i].posY;
        width = sprite_alien.width;
        height = sprite_alien.height;
        let hitbox_alien = {x,y,width,height};

        if(hitbox_vaisseau.x < hitbox_alien.x + hitbox_alien.width && hitbox_vaisseau.x + hitbox_vaisseau.width > hitbox_alien.x && hitbox_vaisseau.y < hitbox_alien.y + hitbox_alien.height && hitbox_vaisseau.y + hitbox_vaisseau.height > hitbox_alien.y){
            console.log("colision")
        }
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
        laser.posX = vaisseau_posX + sprite_vaisseau.width;
        laser.posY = vaisseau_posY + sprite_vaisseau.width/2;
        Tableau_laser.push(laser);
        setTimeout(delay_laser, vaisseau_atksp*1000); 
    }
    
}

function Dessiner_laser(){
    creer_laser();
    update_laser();
    test_colision_laser();
    for(let i=0; i<Tableau_laser.length; i++){
        ctx.drawImage(sprite_laser, Tableau_laser[i].posX, Tableau_laser[i].posY);
    }
}

function update_laser(){
    for(let i=0; i<Tableau_laser.length; i++){
        if (Tableau_laser[i].posX + 20 > canvas.width) Tableau_laser.splice(i,1)
        else Tableau_laser[i].posX += 20;
    }
}

function test_colision_laser(){
    for(let i=0; i<Tableau_laser.length; i++){ 

        let x = Tableau_laser[i].posX;
        let y = Tableau_laser[i].posY;
        let width = sprite_laser.width;
        let height = sprite_laser.height;
        let hitbox_laser = {x,y,width,height};

        for(let j=0; j<Tableau_alien.length; j++){

            x = Tableau_alien[j].posX;
            y = Tableau_alien[j].posY;
            width = sprite_alien.width;
            height = sprite_alien.height;
            let hitbox_alien = {x,y,width,height};

            if(hitbox_laser.x < hitbox_alien.x + hitbox_alien.width && hitbox_laser.x + hitbox_laser.width > hitbox_alien.x && hitbox_laser.y < hitbox_alien.y + hitbox_alien.height && hitbox_laser.y + hitbox_laser.height > hitbox_alien.y){
                Tableau_alien.splice(j,1);
                Tableau_laser.splice(i,1)
                nb_alien -=1;
            }            
        }
    }
}

// Ennemis

var Tableau_alien = [];
var nb_alien = 0;
var nb_alien_max = 100;

function Creer_alien(){
    if (nb_alien < nb_alien_max){
        nb_alien += 1;
        alien = {};
        alien.posX = canvas.width + Math.random() * 5000;
        alien.posY = Math.floor(Math.random() * canvas.height);

        test = alien_overflow(alien.posX,alien.posY)
        if (test != true){
            Tableau_alien.push(alien);
        }
    }
}

function alien_overflow(x,y)
{
    for(let i=0; i<Tableau_alien.length; i++){

        let xa = Tableau_alien[i].posX;
        let ya = Tableau_alien[i].posY;
        let width = sprite_alien.width;
        let height = sprite_alien.height;
        let hitbox_alien = {xa,ya,width,height};

        if(x < hitbox_alien.xa + hitbox_alien.width && x + sprite_alien.width > hitbox_alien.xa && y < hitbox_alien.ya + hitbox_alien.height && y + sprite_alien.height > hitbox_alien.ya){
            return true;
        }
    }
}

function Dessiner_alien(){
    Creer_alien();
    update_alien();
    for(let i=0; i<Tableau_alien.length; i++){
        ctx.drawImage(sprite_alien, Tableau_alien[i].posX, Tableau_alien[i].posY);
    }
}

function update_alien(){
    for(let i=0; i<Tableau_alien.length; i++){
        if (Tableau_alien[i].posX + 50 < 0){
            nb_alien -= 1;
            Tableau_alien.splice(i,1);
        }    
        else Tableau_alien[i].posX -= 5;
    }
}

// Gestion clavier

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

// c'est parti

function Dessiner_tout(){
    ctx.clearRect(0,0,canvas.width, canvas.height);
    Dessiner_etoile();
    Dessiner_alien();
    Dessiner_vaisseau();
    Dessiner_laser();
    requestAnimationFrame(Dessiner_tout);
}

Creer_Etoiles();
Dessiner_tout();

document.onkeydown = touche_presse;
document.onkeyup = touche_relache;