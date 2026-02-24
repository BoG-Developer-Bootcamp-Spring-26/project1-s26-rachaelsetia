// Pulls items from index.html
const pokeSprite = document.getElementById("poke-sprite");
const pokeName = document.getElementById("poke-name");
const prevButton = document.getElementById("prev-button");
const nextButton = document.getElementById("next-button");
const type1 = document.getElementById("type-1");
const type2 = document.getElementById("type-2");
const infoButton = document.getElementById("info-button");
const movesButton = document.getElementById("moves-button");
const infoBox = document.getElementById("info-box");
const infoBoxHeader = document.getElementById("info-box-header");
const bioInfo = document.getElementById("bio-info");
const height = document.getElementById("height");
const weight = document.getElementById("weight");
const hp = document.getElementById("hp");
const attack = document.getElementById("attack");
const defense = document.getElementById("defense");
const specialAttack = document.getElementById("special-attack");
const specialDefense = document.getElementById("special-defense");
const speed = document.getElementById("speed");
const moves = document.getElementById("moves");
const move1 = document.getElementById("move1");

let fSprite = null;
let fName = null;
let fType1;
let fType2;
let fHeight;
let fWeight;
let fHp;
let fAttack;
let fDefense;
let fSpecialAttack;
let fSpecialDefense;
let fSpeed;
let fMoves;
let curID = 1;

const typeColorMap = new Map([
    ["normal", "#A8A77A"],
    ["fire", "#EE8130"],
    ["water", "#6390F0"],
    ["electric", "#F7D02C"],
    ["grass", "#7AC74C"],
    ["ice", "#96D9D6"],
    ["fighting", "#C22E28"],
    ["poison", "#A33EA1"],
    ["ground", "#E2BF65"],
    ["flying", "#A98FF3"],
    ["psychic", "#F95587"],
    ["bug", "#A6B91A"],
    ["rock", "#B6A136"],
    ["ghost", "#735797"],
    ["dragon", "#6F35FC"],
    ["dark", "#705746"],
    ["steel", "#B7B7CE"],
    ["fairy", "#D685AD"],
    [null, null]
]);

// Displays Bulbasaur on load
loadPokemon(curID);

prevButton.addEventListener("click", (e) => {
    if (curID > 0) {
        curID--;
    }

    loadPokemon(curID);
});

nextButton.addEventListener("click", (e) => {
    curID++;
    loadPokemon(curID);
});

infoButton.addEventListener("click", (e) => {
    displayInfo();
});

movesButton.addEventListener("click", (e) => {
    displayMoves();
});

// Loads the Pokemon data
async function loadPokemon(id) {
    const response = await fetch("https://pokeapi.co/api/v2/pokemon/" + id);
    const data = await response.json();

    // fetch sprite and name
    fSprite = data.sprites.front_default;
    fName = data.species.name;

    // fetch types
    fType1 = data.types[0].type.name;
    fType2 = null;

    if (data.types[1]) {
    fType2 = data.types[1].type.name;
    }

    // fetch bio-info
    fHeight = data.height;
    fWeight = data.weight;
    fHp = data.stats[0].base_stat;
    fAttack = data.stats[1].base_stat;
    fDefense = data.stats[2].base_stat;
    fSpecialAttack = data.stats[3].base_stat;
    fSpecialDefense = data.stats[4].base_stat;
    fSpeed = data.stats[5].base_stat;

    // fetch moves (array)
    fMoves = data.moves;

    displayLeftCol();
    displayInfo();
}

function displayLeftCol() {
    // add sprite and name
    pokeSprite.src = fSprite;
    pokeName.textContent = fName;

    // add types
    type1.textContent = fType1;
    type2.textContent = fType2;
    type1.style.backgroundColor = typeColorMap.get(fType1);
    type2.style.backgroundColor = typeColorMap.get(fType2);
}

function displayInfo() {
    loadInfo();

    // update header
    infoBoxHeader.textContent = "Info";

    // update button colors
    infoButton.style.backgroundColor = "#7CFF79";
    movesButton.style.backgroundColor = "#E8E8E8";

    // display bio-info, remove moves
    moves.style.display = "none";
    bioInfo.style.display = "block";

    // reset box height
    infoBox.style.height = "598px";
    
}

function loadInfo() {
    height.textContent = "height: 0."+ fHeight + "m";
    weight.textContent = "weight: " + fWeight + ".0kg";
    hp.textContent = "hp: " + fHp;
    attack.textContent = "attack: " + fAttack;
    defense.textContent = "defense: " + fDefense;
    specialAttack.textContent = "special-attack: " + fSpecialAttack;
    specialDefense.textContent = "special-defense: " + fSpecialDefense;
    speed.textContent = "speed: " + fSpeed;
}

function displayMoves() {
    loadMoves();

    // update header
    infoBoxHeader.textContent = "Moves";

    // update button colors
    movesButton.style.backgroundColor = "#7CFF79";
    infoButton.style.backgroundColor = "#E8E8E8";

    // display moves, remove bio-info
    moves.style.display = "block";
    bioInfo.style.display = "none";

    // adapts box height
    if (fMoves.length > 12) {
        infoBox.style.height = "fit-content";
    } else {
        infoBox.style.height = "598px";
    }
}

function loadMoves() {
    // creates a new <p> element for each move
    for (let i = 0; i < fMoves.length; i++) {
        const newMove = document.createElement("p");
        newMove.textContent = fMoves[i].move.name;
        moves.appendChild(newMove);
    }
}