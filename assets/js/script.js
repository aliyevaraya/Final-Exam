const cards = document.querySelector(".services-body");
const search = document.querySelector("#search");
const load = document.querySelector(".load");
const sort = document.querySelector(".sort");
const header = document.querySelector("header");

const BASE_URL = "  http://localhost:8080/services";
const BASE_URL_2 = "http://localhost:8080/favs"

let copyArr = [];
let filtered = [];
let defaultArr = [];
let num = 3;

function drawCard(arr) {
  cards.innerHTML = "";
  arr.forEach((element) => {
    const card = document.createElement("div");
    card.innerHTML = `
        <div class="service">
          <img src="${element.photo}" alt="" />
          <h3>${element.title}</h3>
          <p>
           $ ${element.price}
          </p>
          <a href="#" class="btn" onclick=delCard(${element.id},this)>Delete</a>
          <a href="./add-edit.html?id=${element.id}" class="btn" >Edit</a>
          <a href="#" class="btn" onclick=addFav(${element.id})>Add Fav</a>
          <a href="./detail.html?id=${element.id}"  class="btn" >Detail</a>
        </div>
        `;
    cards.append(card);
    card.classList.add("col-lg-4", "col-md-6", "mb-4");
  });
}

async function getData() {
  const res = await axios(BASE_URL);
  const data = res.data;
  copyArr = data;
  filtered =
    filtered.length || search.value
      ? filtered.slice(0, num)
      : data.slice(0, num);
  drawCard(filtered);
}
getData();

async function delCard(id, btn) {
  await axios.delete(`${BASE_URL}/${id}`);
  await axios.delete(`${BASE_URL_2}/${id}`);
  btn.closest(".service").remove();
}

load.addEventListener("click", (e) => {
  e.preventDefault();
  num = num + 3;
  filtered = copyArr
    .slice(0, num)
    .filter((item) =>
      item.title.toLocaleLowerCase().includes(search.value.toLocaleLowerCase())
    );
  getData();
});

search.addEventListener("input", (e) => {
  filtered = copyArr
    .slice(0, num)
    .filter((item) => item.title.toLocaleLowerCase().includes(e.target.value));
  defaultArr = filtered;
  getData();
});

sort.addEventListener("change", () => {
  if ((sort.value == "asc")) {
    filtered = filtered.sort((a, b) => a.price - b.price);
  } else if ((sort.value == "dsc")) {
    filtered = filtered.sort((a, b) => b.price - a.price);
  } else filtered = defaultArr;
  getData();
});

async function addFav(id) {
    const res= await axios(`${BASE_URL}/${id}`)
    const obj = res.data
    const res_2= await axios(`${BASE_URL_2}`)
    const data_2 = res_2.data
    let bool= data_2.find(item=>item.id==obj.id)
    if(!bool){
       await axios.post(BASE_URL_2,obj)
    }else alert("you already add this one to Fav")
}


// function scrollFun() {
//     if(document.body.scrollTop>100 || document.documentElement.scrollTop>100){
//         header.style.backgroundColor= "black"
//     }else header.style.backgroundColor= " "
//     console.log("hi");
// }

// window.onscroll() = function (){ scroll()}

// window.addEventListener("scroll",scrollFun())