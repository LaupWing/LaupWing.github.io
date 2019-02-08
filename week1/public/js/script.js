const url = 'http://gateway.marvel.com/v1/public/characters?ts=1&apikey=d7a95ef221339f97365a4e271ede5efb&hash=e3e887639aa48b1e7e476988215f50ba&limit=100&offset=0'
const app = document.querySelector('#root');
const container = document.createElement('div');
container.setAttribute('class', 'container');
app.appendChild(container);

const marvelRequest = (function(){
    const getData = new Promise(function(resolve, reject){
        const request = new XMLHttpRequest();
        request.open("GET", url, true)
        request.onload = function(){
            if(this.status >= 200 && this.status <400 ){
                console.log("status is ok")
                const data = JSON.parse(this.responseText)
                resolve(data)
            }else{
                console("sorry couldn't keep my promise")
                reject(error)
            }
        }
        request.send()
    })
    getData.then((data)=>{
        console.log(data)
        makeElements(data.data.results)
    })
}())


function makeElements(a){
    a.forEach((x)=>{
        if(x.thumbnail.path === "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available" || x.thumbnail.path === "http://i.annihil.us/u/prod/marvel/i/mg/f/60/4c002e0305708"){
            return
        }else{
            var newElement = `
                <div class="character ${x.id} flexCenter">
                    <h2>${x.name}</h2>
                    <img class="thumbnail" src="${x.thumbnail.path}/portrait_fantastic.${x.thumbnail.extension}"></img>
                </div>
                `
            container.insertAdjacentHTML( 'beforeend', newElement )
        }
    })
    container.querySelectorAll(".character").forEach((i)=>{
        i.addEventListener("click", function(){
            console.log(this)
        })
    })
}

// TODO headless pupperteer for searching the missing images
