canvas = document.getElementById('shooter');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
ctx = canvas.getContext('2d');

//Mushihimesama OST - 08 The Direction to the Heart of the Forest Stage5
var ost = new Audio('ostdefou.mp3')
ost.volume = 0.04;

var sprite_vaisseau = document.getElementById("vaisseau_jeu1");
var sprite_laser = document.getElementById("laser_jeu1");
var sprite_alien = document.getElementById("alien")
var sprite_explosion = document.getElementById("explosion")
var sprite_bonus = document.getElementById("bonus")
var sprite_coeur = document.getElementById("coeur")

var menu = document.getElementById("Menu")
var aff_score = document.getElementById("Score")
var body = document.querySelector("body")

var vaisseau1 = document.querySelector('#vaisseau1');
var vaisseau2 = document.querySelector('#vaisseau2');

var laser1 = document.querySelector('#laser1');
var laser2 = document.querySelector('#laser2');
var laser3 = document.querySelector('#laser3');
var laser4 = document.querySelector('#laser4');

var fond1 = document.querySelector('#fond_espace_1');
var fond2 = document.querySelector('#fond_espace_2');

// Gestion étoiles, on crée un tableau remplie d'étoiles qui vont de droite a gauche de l'écran, lorsque qu'elles arrivent tout a gauche de la zone de dessin elle reviennent a droite

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
    etoile.couleur = couleur_range[Math.floor(Math.random(0,couleur_range.length))];
    etoile.saturation = Math.floor(Math.random(50,100));
    UneEtoile = etoile;
    Tableau_etoiles.push(UneEtoile);
}

function Dessiner_etoile(){
    update_etoile()
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

// Gestion Vaisseau

var vaisseau_atksp = 0.3;
var vaisseau_posX = 50;
var vaisseau_posY = canvas.height / 2;
var nb_vie = 3;
var nb_tirs = 1;
var vitesse_vaisseau = 10;
var colision_vaisseau = false;

function Dessiner_vaisseau()
{
    update_vaisseau();
    test_colision_vaisseau();
    if(colision_vaisseau == true) ctx.globalAlpha = 0.4
    ctx.drawImage(sprite_vaisseau, vaisseau_posX, vaisseau_posY);
    ctx.globalAlpha = 1.0
}

function update_vaisseau() // Lorsque l'on récupere les touches directionnelles on update les coordonnées du vaisseau en conséquence
{
    if (check_haut == true){ //haut
        if (check_gauche == true){ //haut gauche
            if (vaisseau_posX - vitesse_vaisseau >= 0) vaisseau_posX -= vitesse_vaisseau;
            if (vaisseau_posY - vitesse_vaisseau >= 0) vaisseau_posY -= vitesse_vaisseau;
        }
        else if (check_droite == true){ //haut droite
            if (vaisseau_posX + vitesse_vaisseau <= canvas.width - sprite_vaisseau.width) vaisseau_posX += vitesse_vaisseau;
            if (vaisseau_posY - vitesse_vaisseau >= 0) vaisseau_posY -= vitesse_vaisseau;
        }
        else if (vaisseau_posY - vitesse_vaisseau >= 0) vaisseau_posY -= vitesse_vaisseau;
    }
    else if (check_bas == true){ //bas
        if (check_gauche == true){ //bas gauche
            if (vaisseau_posX - vitesse_vaisseau >= 0) vaisseau_posX -= vitesse_vaisseau;
            if (vaisseau_posY +vitesse_vaisseau <= canvas.height - sprite_vaisseau.height) vaisseau_posY += vitesse_vaisseau;
        }
        else if (check_droite == true){ //bas droite
            if (vaisseau_posX + vitesse_vaisseau <= canvas.width - sprite_vaisseau.width) vaisseau_posX += vitesse_vaisseau;
            if (vaisseau_posY +vitesse_vaisseau <= canvas.height - sprite_vaisseau.height) vaisseau_posY += vitesse_vaisseau;
        }
        else if (vaisseau_posY +vitesse_vaisseau <= canvas.height - sprite_vaisseau.height) vaisseau_posY += vitesse_vaisseau; 
    } 
    else if (check_gauche == true){ //gauche
        if (check_haut == true){ //haut gauche
            if (vaisseau_posY - vitesse_vaisseau >= 0) vaisseau_posY -= vitesse_vaisseau;
            if (vaisseau_posX - vitesse_vaisseau >= 0) vaisseau_posX -= vitesse_vaisseau;
        }
        else if (check_bas == true){ // bas gauche
            if (vaisseau_posY +vitesse_vaisseau <= canvas.height - sprite_vaisseau.height) vaisseau_posY += vitesse_vaisseau
            if (vaisseau_posX - vitesse_vaisseau >= 0) vaisseau_posX -= vitesse_vaisseau;
        }
        else if (vaisseau_posX - vitesse_vaisseau >= 0) vaisseau_posX -= vitesse_vaisseau;
    } 
    else if (check_droite == true){ //droite
        if (check_haut == true){ // droite haut
            if (vaisseau_posY - vitesse_vaisseau >= 0) vaisseau_posY -= vitesse_vaisseau;
            if (vaisseau_posX + vitesse_vaisseau <= canvas.width - sprite_vaisseau.width) vaisseau_posX += vitesse_vaisseau;
        }
        else if (check_bas == true){ // droite bas
            if (vaisseau_posY +vitesse_vaisseau <= canvas.height - sprite_vaisseau.height) vaisseau_posY += vitesse_vaisseau;
            if (vaisseau_posX + vitesse_vaisseau <= canvas.width - sprite_vaisseau.width) vaisseau_posX += vitesse_vaisseau;
        }
        else if (vaisseau_posX + vitesse_vaisseau <= canvas.width - sprite_vaisseau.width) vaisseau_posX += vitesse_vaisseau;       
    }
}

function test_colision_vaisseau() // Pour tester les colisions on dessine un carré de la taille du sprite du vaisseau on fait pareil pour chaque alien du tableau, puis on test si les différents carrés se croisent. Cela marche de la meme maniere pour les lasers / bonus
{
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

        if(hitbox_vaisseau.x < hitbox_alien.x + hitbox_alien.width && hitbox_vaisseau.x + hitbox_vaisseau.width > hitbox_alien.x && hitbox_vaisseau.y < hitbox_alien.y + hitbox_alien.height && hitbox_vaisseau.y + hitbox_vaisseau.height > hitbox_alien.y && colision_vaisseau == false){
            test_mort(i);
        }
    }
}

function test_mort(i){
    if(nb_vie > 1){
        Tableau_alien.splice(i,1);
        colision_vaisseau = true;
        setTimeout(function(){colision_vaisseau = false}, 500)
        nb_vie -=1;
        nb_tirs -= 1;
        if(nb_tirs < 1) nb_tirs = 1
    }
    else{
        let explosion = {};
        explosion.x = vaisseau_posX;
        explosion.y = vaisseau_posY;
        explosion.ExplosionAlpha = 1;
        explosion.sx = 0;
        Tableau_explosions.push(explosion);
        vaisseau_posX=-1000
        vaisseau_posY=-1000
        setTimeout(Reset_jeu,2000);
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
        if (nb_tirs == 1){
            laser = {}
            laser.posX = vaisseau_posX + sprite_vaisseau.width;
            laser.posY = vaisseau_posY + sprite_vaisseau.height/2 - sprite_laser.height/2;
            Tableau_laser.push(laser);
        }
        else if(nb_tirs == 2){
            laser1 = {}
            laser2 = {}
            laser1.posX = vaisseau_posX + sprite_vaisseau.width;
            laser1.posY = vaisseau_posY + sprite_vaisseau.height/3 - sprite_laser.height/2;
            laser2.posX = vaisseau_posX + sprite_vaisseau.width;
            laser2.posY = vaisseau_posY + 2*sprite_vaisseau.height/3 - sprite_laser.height/2;
            Tableau_laser.push(laser1);
            Tableau_laser.push(laser2);
        }
        else{
            laser1 = {}
            laser2 = {}
            laser3 = {}
            laser1.posX = vaisseau_posX + sprite_vaisseau.width;
            laser1.posY = vaisseau_posY + sprite_vaisseau.height/4 - sprite_laser.height/2;
            laser2.posX = vaisseau_posX + sprite_vaisseau.width;
            laser2.posY = vaisseau_posY + 2*sprite_vaisseau.height/4 - sprite_laser.height/2;
            laser3.posX = vaisseau_posX + sprite_vaisseau.width;
            laser3.posY = vaisseau_posY + 3*sprite_vaisseau.height/4 - sprite_laser.height/2;
            Tableau_laser.push(laser1);
            Tableau_laser.push(laser2);      
            Tableau_laser.push(laser3);          
        }
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
                let explosion = {};
                explosion.x = Tableau_alien[j].posX;
                explosion.y = Tableau_alien[j].posY;
                explosion.ExplosionAlpha = 1;
                explosion.sx = 0;
                Tableau_explosions.push(explosion);
                Tableau_alien.splice(j,1);
                Tableau_laser.splice(i,1)
                nb_alien -=1;
                Score+=1
            }            
        }
    }
}

// Ennemis

var Tableau_alien = [];
var nb_alien = 0;
var nb_alien_max = canvas.height/20;
var vitesse_alien = 7;

function Creer_alien(){
    if (nb_alien < nb_alien_max){
        alien = {};
        alien.posX = canvas.width + Math.random() * 5000;
        alien.posY = Math.abs(Math.floor(Math.random() * canvas.height - sprite_alien.height));

        test = alien_overflow(alien.posX,alien.posY)
        if (test != true){
            nb_alien += 1;
            Tableau_alien.push(alien);
        }
    }
}

function alien_overflow(x,y) //Fonction permettant de tester si les alien se chevauchent lorsque l'on les crées
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
        else Tableau_alien[i].posX -= vitesse_alien;
    }
}

// Bonus

var Bonus = {}

function Dessiner_bonus(){
    update_bonus();
    colision_bonus();
    ctx.drawImage(sprite_bonus, Bonus.x, Bonus.y);
}

function update_bonus(){
    Bonus.x -= 2
    if(Bonus.sens == 'haut'){
        if(Bonus.y < 0){
            Bonus.sens = 'bas';
            Bonus.y += 5;
        }
        else Bonus.y -=5;
    }
    else{
        if(Bonus.y > canvas.height - sprite_bonus.height){
            Bonus.sens = 'haut';
            Bonus.y -= 5;
        }
        else Bonus.y += 5;
    }
}

function Creer_bonus(){
    Bonus.x = canvas.width
    Bonus.y = Math.random() * canvas.height
    Bonus.sens = 'haut'
    var timeout = setTimeout(Creer_bonus, 30000)
    if(jeu_lance == false) clearTimeout(timeout)
}

function colision_bonus(){
    let x = vaisseau_posX;
    let y = vaisseau_posY;
    let width = sprite_vaisseau.width;
    let height = sprite_vaisseau.height;
    let hitbox_vaisseau = {x,y,width,height};

    x = Bonus.x;
    y = Bonus.y;
    width = sprite_bonus.width;
    height = sprite_bonus.height;
    let hitbox_sprite = {x,y,width,height};

    if(hitbox_vaisseau.x < hitbox_sprite.x + hitbox_sprite.width && hitbox_vaisseau.x + hitbox_vaisseau.width > hitbox_sprite.x && hitbox_vaisseau.y < hitbox_sprite.y + hitbox_sprite.height && hitbox_vaisseau.y + hitbox_vaisseau.height > hitbox_sprite.y){
        Bonus = {};
        if (nb_tirs < 3) nb_tirs += 1;
    }
}

// Explosions

var Tableau_explosions = [];
var ExplosionMAXWidth = sprite_explosion.width;

function Dessiner_explosion(){
    for(let i=0; i<Tableau_explosions.length; i++){
        ctx.drawImage(sprite_explosion,Tableau_explosions[i].sx,0, 96,sprite_explosion.height, Tableau_explosions[i].x, Tableau_explosions[i].y, 96, sprite_explosion.height);
        Tableau_explosions[i].sx += 96
        Tableau_explosions[i].ExplosionAlpha = Tableau_explosions[i].ExplosionAlpha / 1.08
        if(Tableau_explosions[i].ExplosionAlpha <= 0.001) Tableau_explosions.splice(i,1) 
    }
}

// Gestion clavier

var check_bas, check_droite, check_gauche, check_haut, check_R, check_space;

function touche_presse(e)
{
    // if(e.keyCode == '32') check_space = true;
    // else check_space = false;

    // if(e.keyCode == '82') Reset_jeu();

    // if(e.keyCode == '38') check_haut = true //haut
    // else if(e.keyCode == '37' && check_haut == true) check_gauche = true; //diagonale haut-gauche
    // else if(e.keyCode == '39' && check_haut == true) check_droite = true; //diagonale haut-droite
    // else check_haut = false;

    // if(e.keyCode == '40') check_bas = true; //bas
    // else if(e.keyCode == '37' && check_bas == true) check_gauche = true; //diagonale bas-gauche
    // else if(e.keyCode == '39' && check_bas == true) check_droite = true; //diagonale bas-droite
    // else check_bas = false;

    // if(e.keyCode == '37') check_gauche = true; //gauche
    // else if(e.keyCode == '40' && check_gauche == true) check_bas = true; //diagonale bas-gauche
    // else if(e.keyCode == '38' && check_gauche == true) check_haut = true;  //diagonale haut-gauche
    // else check_gauche = false;

    // if(e.keyCode == '39') check_droite = true; //droite
    // else if(e.keyCode == '40' && check_droite == true) check_bas = true; //diagonale bas-droite
    // else if(e.keyCode == '38' && check_droite == true) check_haut = true; //diagonale haut-droite
    // else check_droite = false;

    switch(e.keyCode) {
        case 38:
            check_haut = true;
            break;
        case 40:
            check_bas = true;
            break;
        case 37 :
            check_gauche = true;
            break;
        case 39:
            check_droite = true;
            break;
        case 32:
            check_space = true;
            break;
        case 82:
            Reset_jeu();
            break;
        case 13:
            if (jeu_lance == false) Game();
            break;
    }
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
}

// Affichage vie

function dessiner_coeur(){
    if (nb_vie == 3){
        ctx.drawImage(sprite_coeur,10,10);
        ctx.drawImage(sprite_coeur,60,10);
        ctx.drawImage(sprite_coeur,110,10);
    }
    else if (nb_vie == 2){
        ctx.drawImage(sprite_coeur,10,10);
        ctx.drawImage(sprite_coeur,60,10);
    }
    else ctx.drawImage(sprite_coeur,10,10);
}

// Button

vaisseau1.addEventListener('click', function(){changer_vaisseau(1)});
vaisseau2.addEventListener('click', function(){changer_vaisseau(2)});

laser1.addEventListener('click', function(){changer_laser(1)});
laser2.addEventListener('click', function(){changer_laser(2)});
laser3.addEventListener('click', function(){changer_laser(3)});
laser4.addEventListener('click', function(){changer_laser(4)});

fond1.addEventListener('click', function(){changer_ecran(1)});
fond2.addEventListener('click', function(){changer_ecran(2)});

function changer_vaisseau(arg){
    if (arg == 1) sprite_vaisseau = document.getElementById("vaisseau_jeu1");
    else sprite_vaisseau = document.getElementById("vaisseau_jeu2");
}

function changer_laser(arg){
    if (arg == 1) sprite_laser = document.getElementById("laser_jeu1");
    else if (arg==2) sprite_laser = document.getElementById("laser_jeu2");
    else if (arg==3) sprite_laser = document.getElementById("laser_jeu3");
    else sprite_laser = document.getElementById("laser_jeu4");
}

function changer_ecran(arg){
    if (arg == 1) body.style.backgroundImage = 'url("img/fond espace.jpg")'
    else body.style.backgroundImage = 'url("img/fond espace 2.jpg")'
}

// Fonctions de Jeu

var jeu_lance = false
var Score = 0;
var Palier_score = 100;

function update_score(){
    aff_score.textContent = "Score : "+Score;
    if (Score >= Palier_score){
        vitesse_alien += 1;
        Palier_score = Palier_score + 100
    }
}

function Reset_jeu(){
    Tableau_laser = [];
    Tableau_explosions = [];
    Tableau_alien = [];

    Palier_score = 100;
    Bonus = {};
    nb_tirs = 1;
    nb_alien = 0;
    vitesse_alien = 7;
    Score = 0;
    vaisseau_posX = 50;
    vaisseau_posY = canvas.height / 2;
    nb_vie = 3;
}

// Boucle de dessin si le jeu n'est pas lancé on dessine que les étoiles, des que l'on lance le jeu on dessine chaque élément du jeu classé par ordre d'importance visuelle

function Dessiner_tout(){
    ctx.clearRect(0,0,canvas.width, canvas.height);
    Dessiner_etoile();
    if (jeu_lance == true)
    {
        Dessiner_explosion();
        Dessiner_bonus();
        Dessiner_alien();
        Dessiner_vaisseau();
        Dessiner_laser();
        dessiner_coeur();
        update_score();
    }
    requestAnimationFrame(Dessiner_tout);
}

function Game(){
    ost.play();
    jeu_lance = true;
    canvas.style.position="relative"
    aff_score.style.display="block"
    menu.style.display="none";
    Creer_bonus();
}

Creer_Etoiles();
Dessiner_tout();

document.onkeydown = touche_presse;
document.onkeyup = touche_relache;