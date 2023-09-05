let natija = localStorage.getItem('product_id');

console.log(natija);

if (natija) {
  const natijaArray = JSON.parse(natija);

  async function fetchData() {
    try {
    const postsEl = document.querySelector(".posts");

      const response = await fetch('https://dummyjson.com/products');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();

      data.products.forEach((el) => {
        for (let nat of natijaArray) {
          if (nat == el.title) {
            console.log(el);
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
      
            
            let card2 = document.createElement("div");
            card2.style.width = "250px";
            card2.style.display = "flex";
            card2.style.justifyContent = "center";
            card2.style.alignItems = "center";
            card2.style.padding = "10px";
            
            let p3 = document.createElement("p");
            p3.innerHTML = `- ${el.description}%`;
            p3.style.textAlign = "center";
            p3.style.marginRight = "15px";
            p3.style.fontWeight = "bold";
            p3.style.color = "green";
           
            let p2 = document.createElement("p");
            p2.innerHTML = `Price - $${el.price}`;
            p2.style.fontWeight = "bold";
            p2.style.color = "red";
      
            let a = document.createElement("a");
            a.innerHTML = '🛒 Add Cart';
            a.style.float = 'right';
            a.style.padding = '15px';
            a.style.color = 'blue';
            a.style.cursor = 'pointer';
            a.style.display = 'none';
            a.addEventListener('click', () => {
              currentData.push(el.title)
              localStorage.setItem('product_id', JSON.stringify(currentData));
            })
      
            card2.append( p2);
            card1.append(p, h1, p3, card2, a);
            card.append(images, card1);
            postsEl.appendChild(card);

          }
        }
      });

    } catch (error) {
      console.error('There was a problem with the fetch operation:', error);
    }
  }

  fetchData();
} else {
  console.error('No data found in localStorage for "product_id"');
}
