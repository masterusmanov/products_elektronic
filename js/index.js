let texxt = document.querySelector("#texxt");

const btn = document.querySelector(".searchButton");

let currentData = [];

async function getData() {
  const response = await fetch(`https://dummyjson.com/products`);
  const data = await response.json();
  return data.products;
}

async function main() {
  const postsData = await getData();
  let currentPage = 1;
  let rows = 20;

  const select = document.getElementById("select");

  const categories = [
    ...new Set(postsData.map((product) => product.category)),
  ];

  categories.forEach((el) => {
    const option = document.createElement("option");
    option.textContent = el;
    option.value = el;
    option.style.padding = '15px';
    
    select.appendChild(option);
  });

  select.addEventListener('change', () => {
    let selectedValue = select.value;
    let filterData = postsData.filter((product) => product.category == selectedValue);
    currentPage = 1;
    displayList(filterData, rows, currentPage)

  })

  function displayList(arrData, rowPerPage, page) {
    const postsEl = document.querySelector(".posts");
    postsEl.innerHTML = "";
    page--;

    const start = rowPerPage * page;
    const end = start + rowPerPage;
    const paginatedData = arrData.slice(start, end);

    paginatedData.forEach((el) => {
      let card = document.createElement("div");
      card.style.width = "250px";
      card.style.display = "grid";
      card.style.justifyContent = "center";
      card.style.alignItems = "center";
      card.style.border = "2px solid gray";

      let images = document.createElement("img");
      images.className = "images";
      images.src = `${el.images[0]}`;
      images.style.width = "240px";
      images.style.margin = "auto";
      images.style.height = "200px";
      images.style.objectFit = "fill";

      let card1 = document.createElement("div");

      let p = document.createElement("p");
      p.innerHTML = `${el.category} ${el.brand}`;
      p.style.fontSize = "14px";
      p.style.textAlign = "left";
      p.style.color = "red";
      p.style.margin = "14px ";

      let h1 = document.createElement("h1");
      h1.innerHTML = `${el.title}`;
      h1.style.fontSize = "18px";
      h1.style.fontWeight = "bold";

      let p3 = document.createElement("p");
      p3.innerHTML = `- ${el.discountPercentage}%`;
      p3.style.textAlign = "right";
      p3.style.marginRight = "15px";
      p3.style.fontWeight = "bold";
      p3.style.color = "green";

      let card2 = document.createElement("div");
      card2.style.width = "250px";
      card2.style.display = "flex";
      card2.style.justifyContent = "center";
      card2.style.alignItems = "center";
      card2.style.padding = "10px";

      let p1 = document.createElement("p");
      p1.innerHTML = `⭐ ${el.rating}`;
      p1.style.color = "blue";
      p1.style.fontWeight = "bold";
      p1.style.marginRight = "60px";
      let p2 = document.createElement("p");
      p2.innerHTML = `$${el.price}`;
      p2.style.fontWeight = "bold";
      p2.style.color = "red";

      let a = document.createElement("a");
      a.innerHTML = '🛒 Add Cart';
      a.style.float = 'right';
      a.style.padding = '15px';
      a.style.color = 'blue';
      a.style.cursor = 'pointer';
      a.addEventListener('click', () => {
        currentData.push(el.title)
        localStorage.setItem('product_id', JSON.stringify(currentData));
        alert("Your selected product has been added to the cart!")
      })

      card2.append(p1, p2);
      card1.append(p, h1, p3, card2, a);
      card.append(images, card1);

      postsEl.appendChild(card);
    });
  }

  function displayPagination(arrData, rowPerPage) {
    const paginationEl = document.querySelector(".pagination");
    const pagesCount = Math.ceil(arrData.length / rowPerPage);
    const ulEl = document.createElement("ul");
    ulEl.classList.add("pagination__list");

    for (let i = 0; i < pagesCount; i++) {
      const liEl = displayPaginationBtn(i + 1);
      ulEl.appendChild(liEl);
    }
    paginationEl.appendChild(ulEl);
  }

  function displayPaginationBtn(page) {
    const liEl = document.createElement("li");
    liEl.classList.add("pagination__item");
    liEl.innerText = page;

    if (currentPage == page) liEl.classList.add("pagination__item--active");

    liEl.addEventListener("click", () => {
      currentPage = page;
      displayList(postsData, rows, currentPage);

      let currentItemLi = document.querySelector("li.pagination__item--active");
      currentItemLi.classList.remove("pagination__item--active");

      liEl.classList.add("pagination__item--active");
    });

    return liEl;
  }

  displayList(postsData, rows, currentPage);
  displayPagination(postsData, rows);
  

  async function searchingFetch() {
    try {
      let searchText = document.querySelector("#inputText").value;
      let searchResult = document.querySelector(".searchresult");
      const postsEl = document.querySelector(".posts");
      postsEl.style.display = "none";
      const response = await fetch(
        `https://dummyjson.com/products/search?q=${searchText}`
      );
      const data = await response.json();

      data.products.forEach((el) => {
        let card = document.createElement("div");
        card.style.width = "250px";
        card.style.display = "grid";
        card.style.justifyContent = "center";
        card.style.alignItems = "center";
        card.style.border = "2px solid gray";

        let images = document.createElement("img");
        images.className = "images";
        images.src = `${el.images[0]}`;
        images.style.width = "240px";
        images.style.margin = "auto";
        images.style.height = "200px";
        images.style.objectFit = "fill";

        let card1 = document.createElement("div");

        let p = document.createElement("p");
        p.innerHTML = `${el.category} ${el.brand}`;
        p.style.fontSize = "14px";
        p.style.textAlign = "left";
        p.style.color = "red";
        p.style.margin = "14px ";

        let h1 = document.createElement("h1");
        h1.innerHTML = `${el.title}`;
        h1.style.fontSize = "18px";
        h1.style.fontWeight = "bold";

        let p3 = document.createElement("p");
        p3.innerHTML = `- ${el.discountPercentage}%`;
        p3.style.textAlign = "right";
        p3.style.marginRight = "15px";
        p3.style.fontWeight = "bold";
        p3.style.color = "green";

        let card2 = document.createElement("div");
        card2.style.width = "250px";
        card2.style.display = "flex";
        card2.style.justifyContent = "center";
        card2.style.alignItems = "center";
        card2.style.padding = "10px";

        let p1 = document.createElement("p");
        p1.innerHTML = `⭐ ${el.rating}`;
        p1.style.color = "blue";
        p1.style.fontWeight = "bold";
        p1.style.marginRight = "60px";
        let p2 = document.createElement("p");
        p2.innerHTML = `$${el.price}`;
        p2.style.fontWeight = "bold";
        p2.style.color = "red";

        card2.append(p1, p2);
        card1.append(p, h1, p3, card2);
        card.append(images, card1);

        searchResult.appendChild(card);
        searchResult.style.display = "flex";
        searchResult.style.flexWrap = "wrap";

        searchResult.style.justifyContent = "center";

        searchResult.style.gap = "1rem";
      });
    } catch (err) {
      console.error(err);
      return [];
    }
  }

  btn.addEventListener("click", () => {
    searchingFetch();
  });
}

main();
