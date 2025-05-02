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
        const card = document.createElement("div");
        card.classList.add("card", "col-lg-3", "col-md-4", "col-sm-6", "col-6", "g-3");
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
        img.style.width = "100px";
        img.style.height = "200px";
        imgDiv.appendChild(img);
        //description & Brand & price
        const textDiv = document.createElement("div");
        textDiv.classList.add("text-center");
        const desc = document.createElement("p");
        desc.classList.add("p");
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
        const detailButton = document.createElement("button");

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
        cardPos.appendChild(card);

        /* const card = document.createElement("div");
        card.classList.add("card", "col-lg-2", "col-md-3", "col-sm-4", "col-6", "mw-100");
        const cardContent = document.createElement("div");
        cardContent.classList.add("card-body", "d-flex");

        const h3 = document.createElement("h3");
        h3.innerText = `${product.name}`;
        h3.classList.add("h3");
        cardContent.appendChild(h3);

        const img = document.createElement("img");
        img.src = product.imageUrl;
        img.style.width = "100px";
        img.style.height = "200px";
        cardContent.appendChild(img);
        const p = document.createElement("p");
        p.innerText = `${product.description}`;
        p.classList.add("p");
        cardContent.appendChild(p);
        const p2 = document.createElement("p");
        p2.innerText = ` Brand: ${product.brand}`;
        p2.classList.add("p");
        cardContent.appendChild(p2);
        const p3 = document.createElement("p");
        p3.innerText = `Prezzo: € ${product.price}`;
        p3.classList.add("p");
        cardContent.appendChild(p3);
        const editButton = document.createElement("button");
        editButton.textContent = "Modifica ✏️";
        editButton.onclick = () => {
          window.location.href = `backoffice.html?productId=${product._id}`;
        };
        cardContent.appendChild(editButton);
        const detailButton = document.createElement("button");
        detailButton.textContent = "Scopri di più";
        detailButton.onclick = () => {
          window.location.href = `details.html?productId=${product._id}`;
        };
        cardContent.appendChild(detailButton);

        card.appendChild(cardContent);
        container.appendChild(card); */
      });
    })

    .catch((error) => {
      console.log(error);
    });
};
getProducts();
