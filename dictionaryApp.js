const result = document.getElementById("result");
const searchBtn = document.getElementById("search-btn");
const audio1 = document.getElementById("sound");
//const inpWord = document.getElementById("inp-word").value;
//const url = `https://api.dictionaryapi.dev/api/v2/entries/en/${inpWord}`;

searchBtn.onclick = (url) => getResponse();

async function getResponse(){
    const inpWord = document.getElementById("inp-word").value;
    const url = `https://api.dictionaryapi.dev/api/v2/entries/en/${inpWord}`;

    try{
        const response = await fetch(url);
        const data = await response.json();
        console.log(data,inpWord);
        displayDetails(data,inpWord);
    } catch (error) {
        console.log(error,'--error')
        result.innerHTML = `<h3 class="error">Couldn't Find The Word</h3>`;
    }

}

displayDetails = (data,inpWord) => {
    result.innerHTML = 
    `
    <div class = "word"> 
    <h3>${inpWord}</h3>
    <button id="sound" onclick="playSound()">
        <i class="fas fa-volume-up"></i>
    </button>
    </div>`;
    for(i=0; i<(data[0].meanings).length ; i++){
        console.log((data[0].meanings).length)
    
    result.innerHTML += `
    <div class= "details">
    <p> ${data[0].meanings[i].partOfSpeech} </p>
    <p> ${data[0].phonetic || ""} </p>
    </div>
    <div class= "word-meaning">
    <p> ${data[0].meanings[i].definitions[0].definition} </p>
    </div>
    <div class= "word-example">
    <p> ${data[0].meanings[i].definitions[0].example || ""} </p>
    </div>
    `
    }
    const audio1 = new Audio(`https:${data[0].phonetics[0].audio}`);
    //playSound(audio1);
    //audio1.setAttribute("src", `https:${data[0].phonetics[0].audio}`);
}

function playSound() {
    audio1.play();
}