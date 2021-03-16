const marvel = {
    render: () => {
      const urlAPI = 'https://gateway.marvel.com/v1/public/characters?limit=100&ts='+ TS + '&apikey='+ PUB_KEY + '&hash=' + HASH;
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
              </div>
              `;
          }
          container.innerHTML = contentHTML;
        })
    }
  };
marvel.render();
