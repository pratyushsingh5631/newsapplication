const API_KEY = "00f786f443704719915868ddf24ccd65";
const url = "https://newsapi.org/v2/everything?q=";

window.addEventListener("load",() => fetchNews("India"));

function reload() {
    window.location.reload();
}

async function fetchNews(query) {
    const res = await fetch(`${url}${query}&apiKey=${API_KEY}`);
    const data = await res.json();    
    bindData(data.articles);  
}

function bindData(articles) {
    const cardsContainer = document.getElementById("cards-container");
    const newsCardTemplate = document.getElementById("template-news-card");

    cardsContainer.innerHTML = "";

    articles.forEach(article => {
        if (!article.urlToImage) return;
        const cardClone =  newsCardTemplate.content.cloneNode(true);
        fillDataInCard(cardClone, article);
        cardsContainer.appendChild(cardClone);
    });
}

function fillDataInCard(cardClone, article) {
    const newsImg = cardClone.querySelector("#news-img");
    const newsTitle = cardClone.querySelector("#news-title");
    const newsSource = cardClone.querySelector("#news-source");
    const newsDesc = cardClone.querySelector("#news-desc");

    newsImg.src = article.urlToImage;
    newsTitle.innerHTML = article.title;
    newsDesc.innerHTML = article.description;

    const date = new Date(article.publishedAt).toLocaleString("en-US", {
        timeZone: "Asia/Jakarta",
    });

    newsSource.innerHTML =`${article.source.name} . ${date}`;

    cardClone.firstElementChild.addEventListener("click", () => {
        window.open(article.url, "_blank");
    })
}

let curSelectedNav = null;

function onNavItemClick(id) {
    fetchNews(id);
    const navItem = document.getElementById(id);
    curSelectedNav?.classList.remove("active");
    curSelectedNav = navItem;
    curSelectedNav.classList.add("active");
}

const searchButton = document.getElementById("search-button");
const searchText = document.getElementById("search-text");

searchButton.addEventListener("click", () => {
    const query = searchText.value;
    if (!query) return;
    fetchNews(query);
    curSelectedNav?.classList.remove("active");
    curSelectedNav = null;
});

let page = document.querySelector('body');
let nav = document.querySelector('nav');
let txt = document.querySelector('#dark');


function mode() {
    let card = document.querySelectorAll(".card");
    let temp = document.querySelector("#template-news-card");
    let title = document.querySelectorAll("#news-title");
    let source = document.querySelectorAll("#news-source");
    let desc = document.querySelectorAll("#news-desc");
    let mode = document.getElementById("mode");
    let dark = document.getElementById("dark");

    if (page.style.backgroundColor!= "black") {
        page.style.backgroundColor = "black";
        page.style.transition = "2s ease";
        nav.style.backgroundColor = "black";
        nav.style.color = "white";
        nav.style.transition = "2s ease";
        mode.src =  "img/sun.svg"
        // setTimeout(()=>{
        //     mode.src =  "img/sun.svg"
        // },1000)
        dark.style.transition = "2s ease";
        temp.style.backgroundColor = "black";
        
        card.forEach((a)=>{
            a.style.backgroundColor = "black";
            a.style.transition = "2s ease";
        });
        
        title.forEach((a)=>{
            a.style.color = "white";
            a.style.transition = "2s ease";
        });
        
        source.forEach((a)=>{
            a.style.color = "white";
            a.style.transition = "2s ease";
        });
        
        desc.forEach((a)=>{
            a.style.transition = "2s ease";
            a.style.color = "white";
        });
        
    }
    else{
        page.style.backgroundColor = "white";
        page.style.color = "black";
        page.style.transition = "2s ease";
        nav.style.backgroundColor = "#fefaff";
        nav.style.transition = "2s ease";
        nav.style.color = "#2294ed";
        mode.src = "img/dark.svg";
        dark.style.transition = "2s ease";

        card.forEach((a)=>{
            a.style.backgroundColor = "white";
            a.style.transition = "2s ease";
        });

        title.forEach((a)=>{
            a.style.transition = "2s ease";
            a.style.color = "black";
        });

        source.forEach((a)=>{
            a.style.transition = "2s ease";
            a.style.color = "black";
        });

        desc.forEach((a)=>{
            a.style.transition = "2s ease";
            a.style.color = "black";
        });
    }
}