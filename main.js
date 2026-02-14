// Pulls items from index.html
const pokeSprite = document.getElementById("poke-sprite");
const pokeName = document.getElementById("poke-name");
const prevButton = document.getElementById("prev");
const nextButton = document.getElementById("next");
const type1 = document.getElementById("type-1");
const type2 = document.getElementById("type-2");
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

// Loads the Pokemon data
async function loadPokemon(id) {
    const response = await fetch("https://pokeapi.co/api/v2/pokemon/" + id);
    const data = await response.json();

    pokeSprite.src = data.sprites.front_default;
    pokeName.textContent = data.species.name;

    type1String = data.types[0].type.name;
    type2String = null;

    if (data.types[1]) {
    type2String = data.types[1].type.name;
    }

    type1.textContent = type1String;
    type2.textContent = type2String;
    type1.style.backgroundColor = typeColorMap.get(type1String);
    type2.style.backgroundColor = typeColorMap.get(type2String);
}