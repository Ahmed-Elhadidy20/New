let title = document.getElementById("title");
let price = document.getElementById("price");
let taxes = document.getElementById("taxes");
let ads = document.getElementById("ads");
let discount = document.getElementById("discount");
let category = document.getElementById("category");
let count = document.getElementById("count");
let total = document.getElementById("total");
let create = document.getElementById("submit");
let btnDeleteAll = document.getElementById("deleteAll");
let datapro;
let mood = 'create';
let tmp;

if (localStorage.product != null) {
  datapro = JSON.parse(localStorage.product);
} else {
  datapro = [];
}
// create total

function getTotal() {
  if (price.value != "") {
    let result = +price.value + +taxes.value + +ads.value - discount.value;

    total.innerHTML = result;

    total.style.background = "green";
  } else {
    total.innerHTML = "";

    total.style.background = "red";
  }
}

//

// create pro
create.onclick = function () {
  let newpro = {
    title: title.value.toLowerCase(),
    price: price.value,
    taxes: taxes.value,
    ads: ads.value,
    discount: discount.value,
    category: category.value.toLowerCase(),
    total: total.innerHTML,
    count: count.value,
  };
  //
  // create count

 if(mood === 'create'){
  if (newpro.count > 1) {
    for (let i = 0; i < newpro.count; i++) {
      datapro.push(newpro);
    }
  } else {
    datapro.push(newpro);
  }
 }else{
  datapro[tmp] = newpro;
  mood = 'create';
  create.innerHTML = 'Create';
  count.style.display ='block';
 }
  //
  localStorage.setItem("product", JSON.stringify(datapro));
  showData();

  //

  clearData();
};

//

// clear inputs
function clearData() {
  title.value = "";
  price.value = "";
  taxes.value = "";
  discount.value = "";
  ads.value = "";
  category.value = "";
  count.value = "";
  total.value = "";
  getTotal();
}

//
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

  document.getElementById("tbody").innerHTML = table;

  //

  if (datapro.length > 0) {
    btnDeleteAll.innerHTML = `
    <button onclick='deleteAll()'>Delete All (${datapro.length})</button>`;
  } else {
    btnDeleteAll.innerHTML = "";
  }
}
showData();
// deleteAll

function deleteAll() {
  localStorage.clear();

  datapro.splice(0);
  showData();
}
// delete
function deleteData(i) {
  datapro.splice(i, 1);

  localStorage.product = JSON.stringify(datapro);

  showData();
}

// update

function updateData(i){
title.value = datapro[i].title;
price.value = datapro[i].price;
taxes.value = datapro[i].taxes;
ads.value = datapro[i].ads;
category.value = datapro[i].title;
getTotal()
count.style.display ="none";
create.innerHTML = 'Update'
mood = 'update';
tmp=i
scroll({
  top:0,
  behavior:"smooth",
})
}

// search
search = document.getElementById("search");

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