const params = new URLSearchParams(window.location.search);
const id = params.get("productId");

const URL = "https://striveschool-api.herokuapp.com/api/product/";
const form = document.getElementById("backoffice-form");

form.onsubmit = function (e) {
  e.preventDefault();

  const name = document.getElementById("name");

  const description = document.getElementById("description");

  const brand = document.getElementById("brand");

  const imageUrl = document.getElementById("imageUrl");

  const price = document.getElementById("price");

  if (!name.value || !description.value || !brand.value || !imageUrl.value || !price.value) {
    alert("I campi non sono compilati correttamente");
    return;
  }

  const newProduct = {
    name: name.value,
    description: description.value,
    brand: brand.value,
    imageUrl: imageUrl.value,
    price: price.value,
  };

  console.log("Test prodotto", newProduct);

  fetch(URL, {
    method: "POST",
    body: JSON.stringify(newProduct),
    headers: {
      "Content-Type": "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2ODE0ODZlMjFjMjUwNDAwMTUxYWI2NzgiLCJpYXQiOjE3NDYxNzU3MTQsImV4cCI6MTc0NzM4NTMxNH0.vO359hNQnfe62iDEAoGI7WugeibpvBcmkz2NVFUepiM",
    },
  })
    .then((resp) => {
      if (!resp.ok) {
        throw new Error("Errore nella creazione del prodotto");
      }
      return resp.json();
    })
    .then((createdProduct) => {
      console.log(" Prodotto creato:", createdProduct);

      form.reset();
    })
    .catch((error) => console.log(error));
};

const editBtn = document.getElementById("editBtn");

editBtn.onclick = function () {
  const productIdLoc = document.getElementById("productId");
  const productId = productIdLoc.value;

  if (!productId) {
    alert("ID non valido");
    return;
  }

  const name = document.getElementById("name");
  const description = document.getElementById("description");
  const brand = document.getElementById("brand");
  const imageUrl = document.getElementById("imageUrl");
  const price = document.getElementById("price");

  const updatedProduct = {
    name: name.value,
    description: description.value,
    brand: brand.value,
    imageUrl: imageUrl.value,
    price: price.value,
  };

  fetch(`${URL}/${productId}`, {
    method: "PUT",
    body: JSON.stringify(updatedProduct),
    headers: {
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2ODE0ODZlMjFjMjUwNDAwMTUxYWI2NzgiLCJpYXQiOjE3NDYxNzU3MTQsImV4cCI6MTc0NzM4NTMxNH0.vO359hNQnfe62iDEAoGI7WugeibpvBcmkz2NVFUepiM",
      "Content-Type": "application/json",
    },
  })
    .then((resp) => {
      if (!resp.ok) {
        throw new Error("Errore durante la modifica del prodotto");
      }
      return resp.json();
    })
    .then((modifiedProduct) => {
      console.log("Prodotto modificato:", modifiedProduct);
      form.reset();
    })
    .catch((error) => console.log(error));
};

deleteBtn.onclick = function () {
  const productIdLoc = document.getElementById("productId");
  const productId = productIdLoc.value;
  if (!productId) {
    alert("ID non valido");
    return;
  }

  if (productId && confirm("Confermi di voler eliminare questo prodotto?")) {
    fetch(URL + productId, {
      method: "DELETE",
      headers: {
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2ODE0ODZlMjFjMjUwNDAwMTUxYWI2NzgiLCJpYXQiOjE3NDYxNzU3MTQsImV4cCI6MTc0NzM4NTMxNH0.vO359hNQnfe62iDEAoGI7WugeibpvBcmkz2NVFUepiM",
        "Content-Type": "application/json",
      },
    })
      .then((resp) => {
        if (!resp.ok) {
          throw new Error("Errore durante la cancellazione del prodotto");
        }
        alert("Prodotto eliminato correttamente!");

        form.reset();
      })
      .catch((error) => console.log(error));
  }
};

const resetBtn = document.getElementById("resetBtn");
resetBtn.onclick = function () {
  if (confirm("Sei sicuro di voler resettare?")) {
    form.reset();
  }
};

if (id) {
  // Modalità modifica: carica i dati del prodotto esistente
  fetch("https://striveschool-api.herokuapp.com/api/product/" + id, {
    headers: {
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2ODE0ODZlMjFjMjUwNDAwMTUxYWI2NzgiLCJpYXQiOjE3NDYxNzU3MTQsImV4cCI6MTc0NzM4NTMxNH0.vO359hNQnfe62iDEAoGI7WugeibpvBcmkz2NVFUepiM",
    },
  })
    .then((res) => res.json())
    .then((product) => {
      document.getElementById("name").value = product.name;
      document.getElementById("description").value = product.description;
      document.getElementById("brand").value = product.brand;
      document.getElementById("price").value = product.price;
      document.getElementById("imageUrl").value = product.imageUrl;
      document.getElementById("productId").value = id;
    })
    .catch((error) => console.log(error));
}
