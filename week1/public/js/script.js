'use strict'
const app = document.querySelector('#root');
const container = document.createElement('div');
container.setAttribute('class', 'container');
const array = []
const url = 'https://pokeapi.co/api/v2/pokemon'
app.appendChild(container);

getData()

function getData(){
    fetch(url)
    .then(data=>{
        return data.json()
    })
    .then(res=>{
        const pokemonUrlArray = []
        res.results.forEach((x)=>{
            pokemonUrlArray.push(x.url)
        })
        return pokemonUrlArray
    })
    .then(pokemons=>{
        const requests = pokemons.map(pokemon=>{
            return fetch(pokemon);
        });

        //> requests = [Promise<data>, Promise<data>, ...]
        Promise.all(requests).then(fulfilledRequests => {
            return fulfilledRequests.map(dataBlob => {
                return dataBlob.json();
            });
        }).then(jsons=>{
            //> jsons = [Promise<{..}>, Promise<{..}>, ...]
            Promise.all(jsons).then(jsonArray => {
                console.log(jsonArray)
                jsonArray.forEach((i)=>{
                    array.push(makeObject(i))
                })
                makeElements(array)
                // let array2 = jsonArray.map((pokemonDetail)=>{
                //     return makeObject(pokemonDetail)
                // })
                console.log(array);
            });
        })
    })         
}

function sortData(a,b){
    return a.id - b.id
}

function makeObject(item){
    return {
        name: item.name,
        id: item.id,
        defaultBack: item.sprites.back_default,
        defaultFront: item.sprites.front_default,
        shinyFront: item.sprites.front_shiny,
        shinyBack: item.sprites.back_shiny,
    }
}

function makeElements(a){
    a.forEach((x,index)=>{
        var newElement = `
            <div class="pokemon ${x.id} flexCenter">
                <h2>${x.name}</h2>
                <img class="mainImage" src="${x.defaultFront}"></img>
                <div class="allImages">
                    <img src="${x.defaultFront}">
                    <img src="${x.defaultBack}">
                    <img src="${x.shinyFront}">
                    <img src="${x.shinyBack}">
                </div>
            </div>
            `
        container.insertAdjacentHTML( 'beforeend', newElement )
    })

    container.querySelectorAll(".allImages img").forEach((i)=>{
        i.addEventListener("mouseover", function(event){
            console.log()
            this.parentNode.parentNode.querySelector(".mainImage").src = this.src
        })
        i.addEventListener("mouseout", function(event){
            // document.querySelector(".mainImage").src = this.src
        })
    })
}

