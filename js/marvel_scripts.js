function requisicao(){
    var nome = document.getElementById('heroi').value;
    var id = "";
    var key = '?' + TS + '&apikey='+ PUB_KEY + '&hash=' + HASH
    var req = new XMLHttpRequest();
    
    
    req.onloadend = function(){
		resp = req.responseText;
        
        json = JSON.parse(resp);
    
        
        for (const hero of json.data.results) {
            if(hero.name == nome){
               id = hero.resourceURI + key;
            }
        }
        if (id == "")
            alert("Heroi não encontrado");
        else{
            const marvel = {
                render: () => {
                const urlAPI = id;
                const container = document.querySelector('#marvel-row');
                let contentHTML = '';
            
                fetch(urlAPI)
                    .then(res => res.json())
                    .then((json) => {
                    for (const hero of json.data.results) {
                        let urlHero = hero.urls[0].url;
                        contentHTML += `
                        <div class="card mb-4 col-md-4">
                            <a href="${urlHero}" target="_blank">
                                <img src="${hero.thumbnail.path}.${hero.thumbnail.extension}" alt="${hero.name}" class="img-thumbnail">
                            </a>
                            <h3 class="title">${hero.name}</h3>
                            <p>${hero.description}</p>
                            <div class="input-group mb-3">
                            <div class="input-group-append">
                              <button class="btn btn-outline-secondary" onclick="speak('${hero.name}')">Listen</button>
                              <button class="btn btn-outline-secondary" onclick="cancelSpeak()">Stop</button>
                            </div>
                        </div>
                            `;
                    }
                    container.innerHTML = contentHTML;
                    })
                }
            };
    marvel.render();
    }
        
            
    }

    req.open('GET', 'https://gateway.marvel.com/v1/public/characters?limit=100&ts='+ TS + '&apikey='+ PUB_KEY + '&hash=' + HASH);
    req.send(null);
    
}

function timestamp(){
    var date = new Date().getTime();
    return date;
}

function speak(message) {
    //console.log(message)
    let msg = new SpeechSynthesisUtterance(message);
    let voices = speechSynthesis.getVoices();
    msg.voice = voices[3];
    msg.rate = 1;
    msg.pitch = 1;
    msg.volume = 1;
    
    window.speechSynthesis.speak(msg);
}

function cancelSpeak() {
    window.speechSynthesis.cancel();
}

