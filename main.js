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

async function loadDogImage() {
    setLoadingState('image', true);
    
    const url = 'https://dog.ceo/api/breeds/image/random';
    const data = await fetchData(url);
    
    if (!data || data.status !== 'success') {
        breedName.textContent = "Error loading image.";
        setLoadingState('image', false);
        return;
    }

    const imgUrl = data.message;
    const img = new Image(); 
    
    img.onload = function() {
        dogImage.src = imgUrl;

        const breedPath = imgUrl.split('/breeds/')[1].split('/')[0];
        const breed = breedPath.split('-').map(word => 
            word.charAt(0).toUpperCase() + word.slice(1)
        ).join(' ');

        breedName.textContent = breed;

        dogsViewed++;
        dogsViewedElement.textContent = dogsViewed;
        saveStats();

        setLoadingState('image', false);
    };
    
    img.src = imgUrl; 
}

async function loadDogFact() {
    setLoadingState('fact', true);
    
    const url = 'https://dog-api.kinduff.com/api/facts';
    const data = await fetchData(url);
    
    if (!data || !data.facts || data.facts.length === 0) {
        dogFact.textContent = "Could not fetch a fact.";
        setLoadingState('fact', false);
        return;
    }

    dogFact.textContent = data.facts[0];
    
    factsLearned++;
    factsLearnedElement.textContent = factsLearned;
    saveStats();
    
    setLoadingState('fact', false);
}

function setLoadingState(type, isLoading) {
   
    const loadingElement = (type === 'image') ? imageLoading : factLoading;
    const contentElement = (type === 'image') ? dogImage : dogFact;

    if (isLoading) {
        loadingElement.style.display = 'block';
        contentElement.style.display = 'none';
    } else {
        loadingElement.style.display = 'none';
        contentElement.style.display = 'block';
    }
}

async function fetchData(url) {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
     return await response.json();

    } catch (error) {
        console.error("Fetch failed:", error);
        
        alert("Sorry, a network error occurred. Please check your connection.");
        
        return null; 
    }
}

