let accordion = document.getElementsByClassName("content-accordion");
let fetchURL = "https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@egesucu";
var mediumURL = "https://egesucu.medium.com";
let mediumList = document.getElementsByClassName("medium-section")[0];

let i;

for (i = 0; i < accordion.length; i++) {
    accordion[i].addEventListener("click", function() {
        this.classList.toggle("active");
        var panel = this.nextElementSibling;
        if (panel.style.maxHeight) {
            panel.style.maxHeight = null;
        } else {
            panel.style.maxHeight = panel.scrollHeight + "px";
        }
    });
}

function requestURL(url) {

    let title = document.createElement('h3');
    if (window.location.href.includes("en")) {
        title.textContent = "Articles"
    } else {
        title.textContent = "Yazılarım"
    }

    mediumList.appendChild(title);


    let mediumCarousel = document.createElement('div');
    mediumCarousel.className = "medium-articles"

    mediumList.appendChild(mediumCarousel);

    fetch(url)
        .then(response => response.json())
        .then(data => {

            let items = data.items.filter(function(item, pos) {
                return data.items.indexOf(item) == pos;
            })

            for (var item of items.slice(0, 3)) {

                let medium = {
                    title: item.title,
                    pubDate: item.pubDate,
                    link: item.link,
                    thumbnail: item.thumbnail
                }

                parseData(medium, mediumCarousel);
            }
        })
        .catch(console.error);


    let button = document.createElement('button');
    button.className = "medium-all-button";

    if (window.location.href.includes("en")) {
        button.textContent = "View All"
    } else {
        button.textContent = "Tümünü Gör"
    }

    button.addEventListener('click', function() {
        window.open(mediumURL, '_blank');
    })

    mediumList.appendChild(button);

}

function parseData(data, addingDocument) {

    let mediumArticle = document.createElement('div');
    mediumArticle.className = "medium-article";

    let articleImage = document.createElement('img');
    articleImage.className = "article-image";
    articleImage.src = data.thumbnail;

    mediumArticle.appendChild(articleImage);

    let articleTitle = document.createElement('p');
    articleTitle.className = "article-title";
    articleTitle.innerText = data.title;

    mediumArticle.appendChild(articleTitle);

    let articleURL = document.createElement('button');

    if (window.location.href.includes("en")) {
        articleURL.textContent = "Read More"
    } else {
        articleURL.textContent = "Devamını Oku"
    }
    articleURL.className = "article-button";
    articleURL.addEventListener("click", function() {
        window.open(data.link, "_blank");
    })

    mediumArticle.appendChild(articleURL);

    addingDocument.appendChild(mediumArticle);

}


requestURL(fetchURL);