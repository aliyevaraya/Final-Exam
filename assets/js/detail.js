const cards = document.querySelector(".row");

const BASE_URL = "  http://localhost:8080/services";

let id = new URLSearchParams(window.location.search).get("id");

async function getDetail() {
  const res = await axios(`${BASE_URL}/${id}`);
  const data = res.data;
  cards.innerHTML = "";
  cards.innerHTML = `
        <span class="col-lg-3">
        <div class="service">
            <img src="${data.photo}" alt="" />
            <h3>${data.title}</h3>
            <p>
           $ ${data.price}
            </p>

          </div>
    </span>
        `;
}
getDetail();
