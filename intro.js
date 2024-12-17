const API_KEY = "7eaa8d9cc48b7d2a251b5bf21b54ba9f";
const url = "http://api.mediastack.com/v1/news?access_key=" + API_KEY + "&languages=en&q=";

window.addEventListener("load", () => fetchNews("India"));

function reload() {
    window.location.reload();
}

async function fetchNews(query) {
    try {
        const res = await fetch(`${url}${query}`);
        const data = await res.json();

        // MediaStack API wraps articles in 'data'
        if (data && data.data) {
            bindData(data.data);  
        } else {
            console.error("No data found in API response:", data);
        }
    } catch (error) {
        console.error("Error fetching news:", error);
    }
}

function bindData(articles) {
    const cardsContainer = document.getElementById("cards-container");
    const newsCardTemplate = document.getElementById("template-news-card");

    cardsContainer.innerHTML = "";

    articles.forEach(article => {
        if (!article.image) return; // MediaStack uses 'image' instead of 'urlToImage'
        const cardClone = newsCardTemplate.content.cloneNode(true);
        fillDataInCard(cardClone, article);
        cardsContainer.appendChild(cardClone);
    });
}

function fillDataInCard(cardClone, article) {
    const newsImg = cardClone.querySelector("#news-img");
    const newsTitle = cardClone.querySelector("#news-title");
    const newsSource = cardClone.querySelector("#news-source");
    const newsDesc = cardClone.querySelector("#news-desc");

    newsImg.src = article.image; // Use 'image' from MediaStack API
    newsTitle.innerHTML = article.title || "No Title";
    newsDesc.innerHTML = article.description || "No Description";

    const date = new Date(article.published_at).toLocaleString("en-US", {
        timeZone: "Asia/Jakarta",
    });

    newsSource.innerHTML = `${article.source || "Unknown Source"} . ${date}`;

    cardClone.firstElementChild.addEventListener("click", () => {
        window.open(article.url, "_blank");
    });
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

// Dark mode logic
let page = document.querySelector('body');
let nav = document.querySelector('nav');

function mode() {
    let card = document.querySelectorAll(".card");
    let modeImg = document.getElementById("mode");

    if (page.style.backgroundColor !== "black") {
        // Dark Mode
        page.style.backgroundColor = "black";
        page.style.color = "white";
        nav.style.backgroundColor = "black";
        nav.style.color = "white";
        modeImg.src = "img/sun.svg";

        card.forEach(a => {
            a.style.backgroundColor = "black";
            a.style.color = "white";
        });
    } else {
        // Light Mode
        page.style.backgroundColor = "white";
        page.style.color = "black";
        nav.style.backgroundColor = "#fefaff";
        nav.style.color = "#2294ed";
        modeImg.src = "img/dark.svg";

        card.forEach(a => {
            a.style.backgroundColor = "white";
            a.style.color = "black";
        });
    }
}
