const params = new URLSearchParams(window.location.search);
const id = params.get("productId");

const URL = "https://striveschool-api.herokuapp.com/api/product/";
const container = document.getElementById("product-details");

fetch(URL + id, {
  headers: {
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2ODE0ODZlMjFjMjUwNDAwMTUxYWI2NzgiLCJpYXQiOjE3NDYxNzU3MTQsImV4cCI6MTc0NzM4NTMxNH0.vO359hNQnfe62iDEAoGI7WugeibpvBcmkz2NVFUepiM",
    "Content-Type": "application/json",
  },
})
  .then((resp) => {
    if (!resp.ok) throw new Error("Errore");
    return resp.json();
  })
  .then((product) => {
    const card = document.createElement("div");
    card.classList.add("card");

    const h2 = document.createElement("h2");
    h2.innerText = product.name;
    h2.classList.add("h2", "mb-3");

    const imgDiv = document.createElement("div");
    imgDiv.classList.add("card-img", "text-center");
    const img = document.createElement("img");
    img.src = product.imageUrl;
    img.classList.add("img-fluid", "object-fit-contain", "w-100");
    img.style.height = "500px";
    imgDiv.appendChild(img);

    const textDiv = document.createElement("div");
    textDiv.classList.add("text-center");
    const desc = document.createElement("p");
    desc.classList.add("p", "mb-0");
    desc.innerText = product.description;
    textDiv.appendChild(desc);

    const brand = document.createElement("h4");
    brand.classList.add("h5");
    brand.innerText = product.brand;
    textDiv.appendChild(brand);

    const price = document.createElement("p");
    price.classList.add("p");
    price.innerText = "Price " + product.price + "€";
    textDiv.appendChild(price);

    const aDiv = document.createElement("div");
    const a = document.createElement("a");
    a.href = "index.html";
    a.innerText = "Torna alla home";
    aDiv.appendChild(a);

    //append
    card.appendChild(h2);
    card.appendChild(imgDiv);
    card.appendChild(textDiv);
    card.appendChild(aDiv);
    container.appendChild(card);
  })
  .catch((error) => console.log(error));
