
// Declaring Elements Variables
var productNameInput = document.getElementById("productName");
var productPriceInput = document.getElementById("productPrice");
var productCatInput = document.getElementById("productCat");
var productDetailsInput = document.getElementById("productDetails");
var tableBody = document.getElementById("tBody");
var addBtn = document.getElementById("addBtn");
var searchInput = document.getElementById("searchInput");
var updatedIndex;


// Getting producds from local storage
var productsList;
if (localStorage.getItem("products")) {
    productsList = JSON.parse(localStorage.getItem("products"));
    displayProducts(productsList)
} else {
    productsList = [];
};


// Adding Products to array
function addProducts() {
    if (addBtn.innerHTML === "Add Products") {
        var product = {
            name: productNameInput.value,
            price: productPriceInput.value,
            cat: productCatInput.value,
            details: productDetailsInput.value,
        }
        productsList.push(product);
    } else if (addBtn.innerHTML === "Update") {
        productsList[updatedIndex].name = productNameInput.value;
        productsList[updatedIndex].price = productPriceInput.value;
        productsList[updatedIndex].cat = productCatInput.value;
        productsList[updatedIndex].details = productDetailsInput.value;
        addBtn.innerHTML = "Add Products";
    }
    clear()
    addToLocatStorage()
    displayProducts(productsList);
};


// Display products
function displayProducts(pList) {
    var content = ``
    for (var i = 0; i < pList.length; i++) {
        content += `
    <tr>
        <td>${i + 1}</td>
        <td>${pList[i].name}</td>
        <td>${pList[i].price} EGP</td>
        <td>${pList[i].cat}</td>
        <td>${pList[i].details}</td>
        <td><button class="btn btn-success" onclick="updateProduct(${i})">Update</button></td>
        <td><button class="btn btn-danger" onclick="deleteProduct(${i})">Delete</button></td>
    </tr>`
    }
    tableBody.innerHTML = content;
};


//Clear inputs
function clear() {
    productNameInput.value = "";
    productPriceInput.value = "";
    productCatInput.value = "";
    productDetailsInput.value = "";
};


// Adding product list to local storage
function addToLocatStorage() {
    localStorage.setItem("products", JSON.stringify(productsList));
};


// Deleting product
function deleteProduct(i) {
    productsList.splice(i, 1);
    displayProducts(productsList)
    addToLocatStorage()
};


// Updating product
function updateProduct(i) {
    updatedIndex = i;
    productNameInput.value = productsList[i].name;
    productPriceInput.value = productsList[i].price;
    productCatInput.value = productsList[i].cat;
    productDetailsInput.value = productsList[i].details;
    addBtn.innerHTML = "Update";
}

// Searching products
function searchProducts() {
    var term = searchInput.value;
    var searchList = []
    for (var i = 0; i < productsList.length; i++) {
        if (productsList[i].name.toLowerCase().includes(term.toLowerCase())) {
            searchList.push(productsList[i])
        }
    }
    displayProducts(searchList)
}