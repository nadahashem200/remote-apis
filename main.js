// Counters
let dogsViewed = 0;
let factsLearned = 0;


// Display Elements
const dogImage = document.getElementById("dogImage");
const breedName = document.getElementById("breedName");
const imageLoading = document.getElementById("imageLoading");
const dogFact = document.getElementById("dogFact");
const factLoading = document.getElementById("factLoading");

// Stats Elements
const dogsViewedElement = document.getElementById("dogsViewed");
const factsLearnedElement = document.getElementById("factsLearned");

// Buttons 
const newDogBtn = document.getElementById("newDogBtn");
const newImageBtn = document.getElementById("newImageBtn");
const newFactBtn = document.getElementById("newFactBtn");


function loadStats() {
    const savedDogs = localStorage.getItem('dogsViewed');
    const savedFacts = localStorage.getItem('factsLearned');

    if (savedDogs) { 
        dogsViewed = parseInt(savedDogs);
        dogsViewedElement.textContent = dogsViewed;
    }

    if (savedFacts) {
        factsLearned = parseInt(savedFacts);
        factsLearnedElement.textContent = factsLearned;
    }
} 


function setupButtons() {
    newDogBtn.addEventListener('click', loadBothDogAndFact);
    newImageBtn.addEventListener('click', loadDogImage);
    newFactBtn.addEventListener('click', loadDogFact);
} 
function saveStats () {
    localStorage.setItem('dogsViewed', dogsViewed);
    localStorage.setItem('factsLearned', factsLearned);
}

//Application entry point.
window.addEventListener('DOMContentLoaded', function() {
    loadStats();
    setupButtons();
    loadBothDogAndFact();
});

function loadBothDogAndFact() {} 

function loadDogImage() {
    dogsViewed++;
    dogsViewedElement.textContent = dogsViewed;
    saveStats();
}
function loadDogFact() {
    factsLearned++;
    factsLearnedElement.textContent = factsLearned;
    saveStats();
}




