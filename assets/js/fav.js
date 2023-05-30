const BASE_URL = "  http://localhost:8080/favs";


const cards= document.querySelector(".row")

async function drawFav() {
    const res= await axios(BASE_URL)
    const data = res.data
    cards.innerHTML=""
    data.forEach(element => {
        cards.innerHTML+= `
        <span class="col-lg-3">
        <div class="service">
            <img src="${element.photo}" alt="" />
            <h3>${element.title}</h3>
            <p>
           $ ${element.price}
            </p>
            <button class="btn btn-primary remove" onclick=delFav(${element.id},this)>Remove from Fav</button>
          </div>
    </span>
        `
    });
}

drawFav()
async function delFav(id,btn) {
    await axios.delete(`${BASE_URL}/${id}`);
    btn.closest("span").remove();
}