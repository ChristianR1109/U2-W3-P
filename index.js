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
        const card = document.createElement("div");
        card.classList.add("product-card", "col-lg-2", "col-md-3", "col-sm-4", "col-6", "mw-100", "border", "border-dark", "text-center");

        const h3 = document.createElement("h3");
        h3.innerText = `${product.name}`;
        h3.classList.add("h3");
        card.appendChild(h3);

        const img = document.createElement("img");
        img.src = product.imageUrl;
        img.style.width = "100px";
        img.style.height = "200px";
        card.appendChild(img);
        const p = document.createElement("p");
        p.innerText = `${product.description}`;
        p.classList.add("p");
        card.appendChild(p);
        const p2 = document.createElement("p");
        p2.innerText = ` Brand: ${product.brand}`;
        p2.classList.add("p");
        card.appendChild(p2);
        const p3 = document.createElement("p");
        p3.innerText = `Prezzo: € ${product.price}`;
        p3.classList.add("p");
        card.appendChild(p3);
        const editButton = document.createElement("button");
        editButton.textContent = "Modifica ✏️";
        editButton.onclick = () => {
          window.location.href = `backoffice.html?productId=${product._id}`;
        };
        card.appendChild(editButton);
        const detailButton = document.createElement("button");
        detailButton.textContent = "Scopri di più";
        detailButton.onclick = () => {
          window.location.href = `details.html?productId=${product._id}`;
        };
        card.appendChild(detailButton);
        container.appendChild(card);
      });
    })

    .catch((error) => {
      console.log(error);
    });
};
getProducts();
