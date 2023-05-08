let title = document.getElementById("title");
let price = document.getElementById("price");
let taxes = document.getElementById("taxes");
let ads = document.getElementById("ads");
let discount = document.getElementById("discount");
let total = document.getElementById("total");
let count = document.getElementById("count");
let category = document.getElementById("category");
let create = document.getElementById("create");
let btnDelete = document.getElementById("deleteAll");
let mood = "create";
let tmb;
let datapro;

function getTotal() {
  if (price.value != "") {
    let result = +price.value + +taxes.value + +ads.value - +discount.value;
    total.innerHTML = result;
    total.style.background = "#040";
  } else {
    total.innerHTML = "";
    total.style.background = "crimson";
  }
}

// create product


if (localStorage.product != null) {
  datapro = JSON.parse(localStorage.product);
} else {
  datapro = [];
}

create.onclick = function () {
  let newpro = {
    title: title.value.toLowerCase(),
    price: price.value,
    taxes: taxes.value,
    ads: ads.value,
    discount: discount.value,
    total: total.innerHTML,
    category: category.value.toLowerCase(),
    count: count.value,
  };
  if (
    title.value != "" &&
    price.value != "" &&
    category.value != "" &&
    newpro.count < 1000
  ) {
    if (mood === "create") {
      if (newpro.count > 1) {
        for (let i = 0; i < newpro.count; i++) {
          datapro.push(newpro);
        }
      } else {
        datapro.push(newpro);
      }
    } else {
      datapro[tmb] = newpro;
      mood = "create";
      count.style.display = "block";
      create.innerHTML = "create";
    }
    claerDta();
  }
  // save localStorage
  localStorage.setItem("product", JSON.stringify(datapro));

  showData();

  getTotal();
};

// claer Input
function claerDta() {
  title.value = "";
  price.value = "";
  taxes.value = "";
  ads.value = "";
  discount.value = "";
  total.innerHTML = "";
  count.value = "";
  category.value = "";
}

// read

function showData() {
  let table = "";
  for (let i = 0; i < datapro.length; i++) {
    table += `
        <tr> 
            <td>${i + 1}</td>
            <td>${datapro[i].title}</td>
            <td>${datapro[i].price}</td>
            <td>${datapro[i].taxes}</td>
            <td>${datapro[i].ads}</td>
            <td>${datapro[i].discount}</td>
            <td>${datapro[i].total}</td>
            <td>${datapro[i].category}</td> 
            <td><button onclick="updateData(${i})" id="update">update</button></td>
            <td><button onclick = "deleteData(${i})" id="delete">delete</button></td>
        </tr>`;
  }
  // deleteAll
  document.getElementById("tbody").innerHTML = table;
  if (datapro.length > 0) {
    btnDelete.innerHTML = `
        <button onclick="deleteAll()">Delete All(${datapro.length})</button>
        `;
  } else {
    btnDelete.innerHTML = "";
  }
  getTotal();
}
showData();
function deleteData(i) {
  datapro.splice(i, 1);
  localStorage.product = JSON.stringify(datapro);
  showData();
}
function updateData(i) {
  title.value = datapro[i].title;
  price.value = datapro[i].price;
  taxes.value = datapro[i].taxes;
  ads.value = datapro[i].ads;
  discount.value = datapro[i].discount;
  category.value = datapro[i].category;
  tmb = i;
  mood = "update";
  create.innerHTML = "update";
  count.style.display = "none";
  scroll({
    top: 0,
    behavior: "smooth",
  });
  getTotal();
}

// clear All
function deleteAll() {
  localStorage.clear();
  datapro.splice("");
  showData();
}

// search
let search = document.getElementById("search");

let searchMood = "title";

function getSearchMood(id) {
  if (id == "searchTitle") {
    searchMood = "title";
  } else {
    searchMood = "category";
  }

  search.placeholder = "search By " + searchMood;

  search.focus();
  search.value = "";
  showData();
}
function searchData(value) {
  let table = "";
  for (let i = 1; i < datapro.length; i++) {
    if (searchMood == "title") {
      if (datapro[i].title.includes(value.toLowerCase())) {
        table += `
      <tr> 
          <td>${i}</td>
          <td>${datapro[i].title}</td>
          <td>${datapro[i].price}</td>
          <td>${datapro[i].taxes}</td>
          <td>${datapro[i].ads}</td>
          <td>${datapro[i].discount}</td>
          <td>${datapro[i].total}</td>
          <td>${datapro[i].category}</td> 
          <td><button onclick="updateData(${i})" id="update">update</button></td>
          <td><button onclick = "deleteData(${i})" id="delete">delete</button></td>
      </tr>`;
      }
    } else {
      if (datapro[i].category.includes(value.toLowerCase())) {
        table += `
        <tr> 
            <td>${i}</td>
            <td>${datapro[i].title}</td>
            <td>${datapro[i].price}</td>
            <td>${datapro[i].taxes}</td>
            <td>${datapro[i].ads}</td>
            <td>${datapro[i].discount}</td>
            <td>${datapro[i].total}</td>
            <td>${datapro[i].category}</td> 
            <td><button onclick="updateData(${i})" id="update">update</button></td>
            <td><button onclick = "deleteData(${i})" id="delete">delete</button></td>
        </tr>`;
      }
    }
  }
  document.getElementById("tbody").innerHTML = table;
}

// console.log(title,price,ads,discount,taxes, total,count ,category,create)
