const url = `https://api.thecatapi.com/v1/breeds`;

const api_key = "live_TwFm0uBLKG82EOotMZ2YdWdPBJad6H6iJ9tArBswzDB4ro5RWFiAfadQoFOSQRLY";

// a variable to store the information about the breeds

let storedBreeds = [];

// a function to select a random breed

function getRandomInt(min, max) {
return Math.floor(Math.random() * (max - min + 1)) + min;
}


// a function to show images and information of the breeds
function showCatImageAndInformation(index) {

// This will display the image of the cat
  document.getElementById("cat_image").src = storedBreeds[index].image.url;

// This will get the breed name
  document.getElementById("breed_name").innerHTML = storedBreeds[index].name;

// This will get the breed name
document.getElementById("intelligenz").innerHTML = storedBreeds[index].intelligence + "<span style='font-size:0.7rem'>/5</span>";

// This will get the affection
document.getElementById("affection").innerHTML = storedBreeds[index].affection_level + "<span style='font-size:0.7rem'>/5</span>";

// This will get the energy
document.getElementById("energie").innerHTML = storedBreeds[index].energy_level + "<span style='font-size:0.7rem'>/5</span>";

//This will get the weight
function calculateaverage(pullweight){
    const [min, max] = pullweight.split(" - ");

    const minweight = parseFloat(min);
    const maxweight = parseFloat(max);

    const average = (minweight + maxweight) / 2;

    return average
}
const pullweight = storedBreeds[index].weight.metric;
const rounded = Math.round(calculateaverage(pullweight));
document.getElementById("gewicht").innerHTML = rounded + "<span style='font-size:0.7rem'>kg</span>";

// This will get the wiki link
  document.getElementById("wiki_link").href = storedBreeds[index].wikipedia_url;

// Conditional Coloring of points
 if (storedBreeds[index].intelligence >= 4){
    document.getElementById("intelligenz").style.color = "green";
 } else if (storedBreeds[index].intelligence >= 2){
    document.getElementById("intelligenz").style.color = "orange";
 };
 if (storedBreeds[index].affection_level >= 4){
    document.getElementById("affection").style.color = "green";
 } else if (storedBreeds[index].affection_level >= 2){
    document.getElementById("affection").style.color = "orange";
 };
 if (storedBreeds[index].energy_level >= 4){
    document.getElementById("energie").style.color = "green";
 } else if (storedBreeds[index].energy_level >= 2){
    document.getElementById("energie").style.color = "orange";
 };

  document.getElementById("wiki_link").innerHTML =
    storedBreeds[index].wikipedia_url;  

// This will get the characteristics of the cat
document.getElementById('breed_json').style.display = "none";
  document.getElementById("breed_json").textContent =
    storedBreeds[index].temperament;

    // Beispielaufruf der Übersetzungsfunktion

translateText(document.getElementById('breed_json').textContent, 'de');
}


// a function to retrieve data from the API
fetch(url, {
  headers: {
    "x-api-key": api_key,
  },
})
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    // Storing the retrieved data from the API in our variable
    storedBreeds = data;


    // Using the random function to select a specific breed. Then extracting information from that breed
    showCatImageAndInformation(getRandomInt(0, storedBreeds.length - 1));
  })
  .catch(function (error) {
    console.log(error);
  });

  // Funktion, um die Daten erneut abzurufen
function fetchData() {
    fetch(url, {
      headers: {
        "x-api-key": api_key,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        // Speichern der abgerufenen Daten in der Variable
        console.log(data);
        storedBreeds = data;
  
        // Verwendung der zufälligen Funktion, um eine bestimmte Rasse auszuwählen. Dann Extrahieren von Informationen aus dieser Rasse
        showCatImageAndInformation(getRandomInt(0, storedBreeds.length - 1));
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  
  // Initialer Aufruf der fetchData()-Funktion beim Laden der Seite
  fetchData();


// Übersetzungsfunktion
function translateText(text, targetLanguage) {
    // Dein Azure Translator Text API-Schlüssel
    const apiKey2 = '35de3f3f832d4fad9c354b1e102a019b';
  
    // URL zur Translator Text API
    const url2 = `https://api.cognitive.microsofttranslator.com/translate?api-version=3.0&to=${targetLanguage}`;
  
    // Anfrage an die Translator Text API senden
    fetch(url2, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Ocp-Apim-Subscription-Key': apiKey2,
        'Ocp-Apim-Subscription-Region': 'germanywestcentral',
      },
      body: JSON.stringify([
        {
          text: text,
        },
      ]),
    })
      .then(response => response.json())
      .then(data => {
        // Übersetzten Text in die div einfügen
        const translatedText = data[0].translations[0].text;
        document.getElementById('breed_json').textContent = translatedText;
      })
      .catch(error => console.log(error))
      .finally(() => {
        // Display auf "block" setzen, nach Abschluss der Funktion
        document.getElementById('breed_json').style.display = "block";
      });
  }

