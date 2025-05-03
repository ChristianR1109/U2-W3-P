const URL = "https://striveschool-api.herokuapp.com/api/product/";
const container = document.getElementById("prod-container");
const getProducts = () => {
  fetch(URL, {
    headers: {
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2ODE0ODZlMjFjMjUwNDAwMTUxYWI2NzgiLCJpYXQiOjE3NDYxNzU3MTQsImV4cCI6MTc0NzM4NTMxNH0.vO359hNQnfe62iDEAoGI7WugeibpvBcmkz2NVFUepiM",
      "Content-Type": "application/json",
    },
  })
    .then((resp) => {
      console.log(resp);
      if (!resp.ok) {
        if (resp.status === 404) {
          throw new Error("Risorsa non trovata");
        } else if (resp.status >= 500) {
          throw new Error("Errore lato server");
        }

        throw new Error("Errore nella fetch");
      }

      return resp.json();
    })
    .then((products) => {
      products.forEach((product) => {
        const cardPos = document.getElementById("prod-container");
        cardPos.classList.add("mb-5", "row", "g-3");
        const card = document.createElement("div");
        card.classList.add("card", "col-lg-3", "col-md-4", "col-sm-6", "col-6");
        //title
        const cardTitle = document.createElement("div");
        cardTitle.classList.add("card-title", "text-center");
        const name = document.createElement("h2");
        name.classList.add("h2");
        name.innerText = product.name;
        //img
        const imgDiv = document.createElement("div");
        imgDiv.classList.add("card-img", "text-center");
        const img = document.createElement("img");
        img.src = product.imageUrl;
        img.classList.add("img-fluid", "object-fit-contain", "w-100");
        img.style.height = "200px";

        imgDiv.appendChild(img);
        //description & Brand & price
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
        // buttons modifica / elimina
        const buttonsDiv = document.createElement("div");
        buttonsDiv.classList.add("d-flex", "justify-content-around", "mb-3");

        const editButton = document.createElement("button");
        editButton.classList.add("btn", "editButton");
        editButton.innerHTML = `<i class="bi bi-pencil"></i>`;
        editButton.onclick = () => {
          window.location.href = `backoffice.html?productId=${product._id}`;
        };

        const deleteButton = document.createElement("button");
        deleteButton.classList.add("btn", "btn-danger", "deleteButton");
        deleteButton.innerHTML = `<i class="bi bi-trash3-fill"></i>`;
        deleteButton.onclick = () => {
          window.location.href = `backoffice.html?productId=${product._id}`;
        };
        // button scopri di piu
        const detailDiv = document.createElement("div");
        detailDiv.classList.add("d-flex", "justify-content-center");
        const detailButton = document.createElement("button");
        detailButton.innerText = "Scopri di più";
        detailButton.classList.add("btn", "mb-2", "detailButton");
        detailDiv.appendChild(detailButton);

        detailButton.textContent = "Scopri di più";
        detailButton.onclick = () => {
          window.location.href = `details.html?productId=${product._id}`;
        };
        //append
        buttonsDiv.appendChild(editButton);
        buttonsDiv.appendChild(deleteButton);

        cardTitle.appendChild(name);
        card.appendChild(cardTitle);
        card.appendChild(imgDiv);
        card.appendChild(textDiv);
        card.appendChild(buttonsDiv);
        card.appendChild(detailDiv);
        cardPos.appendChild(card);
      });
    })

    .catch((error) => console.log(error));
};
getProducts();
