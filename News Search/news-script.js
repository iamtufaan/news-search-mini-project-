const apiKey = "169fa6e3f2bd43568c3fdff419dad85d";
let main = document.querySelector(".main");
let searchInput = document.querySelector("#search-input");
let searchButton = document.querySelector("button");

async function fetchRandomNews() {
  try {
    const apiUrl = `https://newsapi.org/v2/top-headlines?sources=techcrunch&pageSize=10&apiKey=${apiKey}`;
    let response = await fetch(apiUrl);
    let data = await response.json();
    return data.articles;
  } catch (error) {
    console.log("error fetching news", error);
    return [];
  }
}

function displayBlogs(articles) {
  main.innerHTML = "";
  articles.forEach((article) => {
    const card = document.createElement("div");
    card.classList.add("card");

    const img = document.createElement("img");
    img.src = article.urlToImage;
    img.alt = article.title;

    const title = document.createElement("h2");
    const trimTitle =
      article.title.length > 30
        ? article.title.slice(0, 30) + "..."
        : article.title;
    title.textContent = trimTitle;

    const description = document.createElement("p");
    const trimDescription =
      article.description.length > 120
        ? article.description.slice(0, 120) + "..."
        : article.description;
    description.textContent = trimDescription;

    card.appendChild(img);
    card.appendChild(title);
        card.appendChild(description);
        card.addEventListener('click', function () {
              window.open(article.url, '_blank')
        })
    main.appendChild(card);
  });
}

(async () => {
  try {
    const articles = await fetchRandomNews(); // Corrected function call
    displayBlogs(articles);
  } catch (error) {
    console.log("error fetching news", error);
  }
})();

// * search value

searchButton.addEventListener('click', async () => {
      const query = searchInput.value.trim()

      if (query !== '') {
            try {
                  const articles = await fetchNewsQuery(query)
                  displayBlogs(articles)
            } catch (error) {
                  console.log('error fetching news by query',error);
                  
            }
      }
})


async function fetchNewsQuery(query) {
        try {
    const apiUrl = `
https://newsapi.org/v2/everything?q=${query}&pageSize=10&apiKey=${apiKey}`;
    let response = await fetch(apiUrl);
    let data = await response.json();
    return data.articles;
  } catch (error) {
    console.log("error fetching news", error);
    return [];
  }
}