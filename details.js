const params = new URLSearchParams(window.location.search);
const id = params.get("appId");

const URL = "https://striveschool-api.herokuapp.com/api/product/";

fetch(URL + id, {
  headers: {
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2ODE0ODZlMjFjMjUwNDAwMTUxYWI2NzgiLCJpYXQiOjE3NDYxNzU3MTQsImV4cCI6MTc0NzM4NTMxNH0.vO359hNQnfe62iDEAoGI7WugeibpvBcmkz2NVFUepiM",
  },
})
  .then((resp) => {
    if (!resp.ok) throw new error("Errore");
    return resp.json();
  })
  .then((product) => {
    const detail = document.createElement("div");
    detail.innerHTML = `
      <h1>${product.name}</h1>
      <img src="${product.imageUrl}" alt="${product.name}" style="max-width:300px;" />
      <p>${product.description}</p>
      <p><strong>Brand:</strong> ${product.brand}</p>
      <p><strong>Prezzo:</strong> €${product.price}</p>
    `;
    detailContainer.appendChild(detail);
  })
  .catch((error) => {});
