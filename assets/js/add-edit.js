const form = document.querySelector("form");
const title = document.querySelector("#title");
const price = document.querySelector("#price");
const photo = document.querySelector("#photo");
const submitBtn = document.querySelector(".submitBtn");
const heading = document.querySelector(".heading");

const BASE_URL = "  http://localhost:8080/services";

let id = new URLSearchParams(window.location.search).get("id");

async function fillInput() {
  let res = await axios(`${BASE_URL}/${id}`);
  title.value = res.data.title;
  price.value = res.data.price;
  submitBtn.innerHTML="Edit"
  heading.innerHTML="Edit Services"
}

if (id) {
  fillInput();
}

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  let services = {
    title: title.value,
    price: price.value,
    photo: `./assets/images/${photo.value.split("\\")[2]}`
  };
  if (!id) {
    axios.post(BASE_URL, services);
  } else axios.patch(`${BASE_URL}/${id}`,services);
  window.location="./index.html"
});
