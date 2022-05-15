// API endpoint
const baseUrl = 'https://pokeapi.co/api/v2/pokemon/';

// Get Elements
const searchInput = getElement('.search-input'),
      searchButton = getElement('.search-button'),
      container = getElement('.pokemon'),
      erroMessage = getElement('.error');
      animateLoaging = getElement('.loading');

var pokeName, // Nome ou numero passado na caixa de busca
    pokemon, // Responsavel por receber o jason com as informações da API
    pokeInfo, // Responsavel por receber as informações da variavel "pokemon"      
    error, // Responsavel por receber o erros da requisição Pokemon
    //pokemonEvoluido, // Responsavel por guardar os dados recebidos da Evolução
    errorEvolucao; // Responsavel por receber o erros da requisição Evolução


//Funções---------------------------------------------------------------------------------------------


//Função para diminuir a escrita na hora de pegar os elementos HTML
function getElement(element) {
  return document.querySelector(element);
}

// Função responsavel por fazer requisições para a API e inserir as respostas na variavel pokemon
function requestPokeInfo(url, name) {
  fetch(url + name)
    .then(response => response.json())

    .then(data => {
      pokemon = data;      
    })

    .catch(err => {
      error = err;
    });    
}

// Função que faz a chamada das principais funções e inicia o app
function startApp(pokeName) {  

	requestPokeInfo(baseUrl, pokeName);

	setTimeout(function () {    

	    //requestPokeEvolucao (baseUrlEvolucao, pokemon.id);

	    //Exibe uma mensagem caso o pokemon pesquisado não exista
	    if(error) {
	      animateLoaging.style.display = 'none';
	      container.style.display = 'none';
	      erroMessage.classList.add('animate__animated', 'animate__fadeIn');
	      erroMessage.style.display = 'block';        
	      erroMessage.innerHTML = createHtmlError();
	      error = '';
	      
	    } else{
	     
			// Responsavel por guardar os dados recebidos do Pokemon
			pokeInfo = {
				id: pokemon.id,
				img: pokemon.sprites.other.dream_world.front_default,
				nome: pokemon.name,
				tipo: pokemon.types.map(item => ' ' + item.type.name).toString(),
				altura: pokemon.height  / 10,
				peso: pokemon.weight  / 10,
				hp: pokemon.stats[0].base_stat,
				ataque: pokemon.stats[1].base_stat,
				ataqueEspecial: pokemon.stats[3].base_stat,
				defesa: pokemon.stats[2].base_stat,
				defesaEspecial: pokemon.stats[4].base_stat,
				velocidade: pokemon.stats[5].base_stat,
				habilidades: habilidades = pokemon.abilities.map(item => ' ' + item.ability.name).toString(),
				exp: pokemon.base_experience,
			}

			erroMessage.style.display = 'none';        
			animateLoaging.style.display = 'none';
			container.classList.remove('animate__animated', 'animate__fadeOutDownBig');
			container.classList.add('animate__animated', 'animate__fadeIn');
			container.style.display = 'block';
			container.innerHTML = createCardPokemon();

			var btnAnterior;

			if (pokemon.id == 1) {			
				btnAnterior = getElement(".btn-anterior");
				btnAnterior.classList.add('desabilita-link');
			}

			if (pokemon.id == 898) {			
				btnAnterior = getElement(".btn-proximo");
				btnAnterior.classList.add('desabilita-link');
			}
	    }

	}, 3000);
}

//Função que captura o nome ou o número do Pokemon digita na barra de pesquisa
function capturaPokemonDigitado () {
	event.preventDefault();
	var searchInput = getElement(".searchInput");

	//A api só aceita nomes minusculos, então vamos usar a função toLowerCase para garantir que nenhuma letra maiuscula seja passada.
	pokeName = searchInput.value.toLowerCase();

	//Remove efeito fadeIn  
	container.classList.remove('animate__animated', 'animate__fadeIn');  
	//Adiciona efeito fadeOutDownBig
	//container.classList.add('animate__animated', 'animate__fadeOutDownBig');
	container.style.display = 'none';  

	startApp(pokeName);

	//Limpa o campo imput
	searchInput.value = '';  

	//Removendo o erro da tela
	erroMessage.style.display = 'none';

	//Animação de loading    
	animateLoaging.style.display = 'block';
	animateLoaging.innerHTML = createAnimateLoaging (); 	
}

//Verifica se escolheu o botão Pokemon "Anterior"
function pokemonAnteriorDaLista () {
	event.preventDefault();

	//Remove efeito fadeIn  
	container.classList.remove('animate__animated', 'animate__fadeIn');  
		
	container.style.display = 'none';  

	startApp(pokeInfo.id - 1);	  

	//Removendo o erro da tela
	erroMessage.style.display = 'none';

	//Animação de loading    
	animateLoaging.style.display = 'block';
	animateLoaging.innerHTML = createAnimateLoaging ();
}

//Verifica se escolheu o botão "Próximo" Pokemon
function proximoPokemonDaLista () {
	event.preventDefault();

	//Remove efeito fadeIn  
	container.classList.remove('animate__animated', 'animate__fadeIn');
	
	container.style.display = 'none';  

	startApp(pokeInfo.id + 1);	  

	//Removendo o erro da tela
	erroMessage.style.display = 'none';

	//Animação de loading    
	animateLoaging.style.display = 'block';
	animateLoaging.innerHTML = createAnimateLoaging ();
}


//Codigos HTML---------------------------------------------------------------------------


// Função responsavel por montar o HTML exibido na pagina
function createCardPokemon () {
  htmlCardPokemon = `
    <div align="center">
      <div class="card mb-5 mt-4" style="width: 18rem;">
        <div class="card-body">
          <h5 class="card-title capitalized">
            ${pokeInfo.nome} <span>${pokeInfo.hp}hp</span>           
          </h5>          
        </div>
        <img src="${pokeInfo.img}" class="card-img-top img-pokemon" alt="Sprite of ${pokeInfo.nome}">
        <div class="card-body">          
          <p class="card-text">
            Pokemon do tipo <span class="capitalized">${pokeInfo.tipo}</span>, sua altura
            é de <span class="capitalized">${pokeInfo.altura}m</span> e seu peso é de <span class="capitalized">${pokeInfo.peso}kg</span>.
            Suas habilidades são <span class="capitalized">${pokeInfo.habilidades}</span>.
          </p>
        </div>
        <ul class="list-group list-stats-pokemon">
          <li class="list-group-item">
            <i class="bi bi-hourglass-split exp-pokemon-color"></i>
            EXPERIÊNCIA <span class="exp-pokemon">${pokeInfo.exp}xp</span>
          </li>
          <li class="list-group-item">
            <i class="bi bi-lightning atk-pokemon-color"></i> 
            ATAQUE <span class="atk-pokemon">${pokeInfo.ataque}k</span>            
          </li>
          <li class="list-group-item">            
            <i class="bi bi-lightning-fill atk-esp-pokemon-color"></i>
            ATAQUE ESPECIAL <span class="atk-pokemon atk-pokemon-esp-bg-color">${pokeInfo.ataqueEspecial}k</span>
          </li>          
          <li class="list-group-item">
            <i class="bi bi-shield def-pokemon-color"></i> 
            DEFESA <span class="def-pokemon">${pokeInfo.defesa}k</span>            
          </li>                    
          <li class="list-group-item">            
            <i class="bi bi-shield-shaded def-esp-pokemon-color"></i> 
            DEFESA ESPECIAL <span class="def-pokemon def-pokemon-esp-bg-color"> ${pokeInfo.defesaEspecial}k</span>
          </li>
        </ul>
        <div class="card-body">
			<a href="#" class="card-link btn-troca-pokemon btn-anterior" onclick="pokemonAnteriorDaLista();">Anterior</a>
			<a class="card-link num-pokemon">N° ${pokeInfo.id}</a>
	    	<a href="#" class="card-link btn-troca-pokemon btn-proximo" onclick="proximoPokemonDaLista();">Próximo</a>
        </div>
      </div>
    </div>         
    `;
  return htmlCardPokemon;
}

// Função responsavel por montar o HTML de erro exibido na pagina
function createHtmlError () {
  htmlError = `    
      <div class="alert alert-warning alert-dismissible fade show mt-4" role="alert">        
        <strong>Pokemon não encontrado!</strong> Ocorreu um erro durante a consulta. <br>
        Error: ${error}.
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
      </div>             
    `;
  return htmlError;  
}

// Função responsavel por montar o HTML de loading exibido na pagina
function createAnimateLoaging () {
  htmlLoading = `
      <div class="text-center mt-5 animate__animated animate__slideInLeft">        
        <img src="img/pokeball.png" class="img-fluid img-pokeball animate__animated animate__headShake animate__infinite" alt="Pokeball Logo">
      </div>            
    `;
  return htmlLoading;  
}


