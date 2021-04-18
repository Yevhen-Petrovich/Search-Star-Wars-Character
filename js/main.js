const searchButton = document.getElementById("button-element") 
searchButton.addEventListener("click", fetchDataStarWars) 

const personInfo = document.getElementById("displayText") 

const searchInput = document.getElementById("input-element") 
searchInput.addEventListener("keypress", handleKeyPress) 

document.getElementById("year").innerHTML = new Date().getFullYear()

function handleKeyPress(event) {
	if (event.code === "Enter") {
		fetchDataStarWars() 
	}
}

function removeChild(node) {
	while (node.firstChild) {
		node.removeChild(node.lastChild)
	}
}

async function fetchDataStarWars() {
	const outComeElement = searchInput.value 
	// console.log("OUTCOME", outComeElement, !outComeElement) 

	if (!outComeElement) {
		return
	}
	
	else {	personInfo.innerHTML = `<img src="https://acegif.com/wp-content/uploads/loading-27.gif" class="card-img mt-auto">`}

	const errorMessage = document.getElementById("error-msg") 
	errorMessage.textContent = "" 

	const response = await axios.get(`https://swapi.dev/api/people?search=${outComeElement}`) 
	//console.log("RESPONSE", response) 
	if (response.data.count === 0) {
		personInfo.innerHTML = ""
		return errorMessage.innerHTML = `<p style="margin-bottom: 200px;">This character does not exists in Star Wars. Try again!</p>` 
	}


	// console.log("Response DATA", response.data) 

	let starWarsData = response.data.results 
	//console.log("Data", starWarsData) 

	searchInput.value = "" 

	removeChild(displayText) 
		try {
		// const names = document.getElementById("name-result") 
		// console.log(names) 

		for (const character of starWarsData) {
			// console.log("1 actor at a time?", character) 
			// console.log("URL", character.url) 
			let id = parseInt(character.url.match(/\d+/))
			//console.log(id)

			fetch(`https://miadil.github.io/starwars-api/api/id/${id}.json`)
				.then(res => res.json())
				.then(res => {
					pictureCharactere = res.image
					//console.log(pictureCharactere)
					imageC = pictureCharactere
					const info = `
					 
					 <div class="cardOne card mb-3 mt-5 " style="width: 300px">
					   <div class="row">
						 
						 <div class="">
						   <div class="card bg-dark" >
						   <img src="${imageC}" class="card-img mt-auto">
							 <h5  class="name text-center card-title">${character.name}</h5>
							 <div class="row">
							   <div class="col-6"><strong>Gender</strong></div>
							   <div  class="mass col-6">${character.gender}</div>
							 </div>
							 <div class="row">
							   <div class="col-6"><strong>Mass(kg)</strong></div>
							   <div  class="mass col-6">${character.mass}</div>
							 </div>
							 <div class="row">
							   <div class="col-6"><strong>Height(cm)</strong></div>
							   <div  class="mass col-6">${character.height}</div>
							 </div>
							   <div class="row">
							   <div class="col-6"><strong>Hair color</strong></div>
							   <div  class="mass col-6">${character.hair_color}</div>
							 </div>
							    <div class="row">
							   <div class="col-6"><strong>Eye color</strong></div>
							   <div  class="mass col-6">${character.eye_color}</div>
							 </div>
								<div class="row">
								<div class="col-6"><strong>Birth year</strong></div>
								<div  class="mass col-6">${character.birth_year}</div>
							</div>					
						   </div>
						 </div>
					   </div>
					 </div>
					 `
					characterInfo = document.createElement("p") 
					characterInfo.innerHTML += info 
					// console.log("INFO", characterInfo) 
					personInfo.appendChild(characterInfo) 
				})
				
		}

	} catch (error) {
		console.log(error) 
		// errorMessage.textContent = `This character does not exists in Star Wars. Try again!` 
	} 

}

