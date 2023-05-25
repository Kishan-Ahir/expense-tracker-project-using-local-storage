// Get the button element and the ul element
let button = document.getElementById("button");
let ul = document.getElementById("productlist");
let findproduct = document.getElementById("findproduct");

// Attach a click event listener to the button
button.addEventListener("click", save);

// Retrieve and recreate the saved product items during page load
window.addEventListener("load", function() {
    for (let i = 0; i < localStorage.length; i++) {
        let producttype = localStorage.key(i);
        let productprice = localStorage.getItem(producttype);
        let productname = productprice.split(" ")[1];
        createProductItem(productname, productprice, producttype);
    }
    updateTotalAmount();
});

function save(event) {
    event.preventDefault(); // Prevent the default form submission behavior

    // Get the values of the product name and product price input fields
    let productname = document.getElementById("productname").value;
    let productprice = document.getElementById("productprice").value;
    let producttype = document.getElementById("producttype").value;

    // Save the product name and product price in local storage
    localStorage.setItem(producttype, productprice + " " + productname);

    // Create a new li element and append it to the ul element
    createProductItem(productname, productprice, producttype);

    // Update the total amount
    updateTotalAmount();

    // Clear the input fields
    document.getElementById("productname").value = "";
    document.getElementById("productprice").value = "";
}

function createProductItem(productname, productprice, producttype) {
    // Create a new li element
    let li = document.createElement("li");
    li.className = "list-group-item";

    // Add a text node to the li element with the product name and product price
    li.appendChild(
        document.createTextNode(
            "Product name is " +
            productname +
            ". Product price is " +
            productprice +
            ". Product type is " +
            producttype
        )
    );

    // Create a delete button
    let deletebtn = document.createElement("button");
    deletebtn.className = "btn btn-danger btn-sm delete";
    deletebtn.setAttribute("style", "float: right;");
    deletebtn.appendChild(document.createTextNode("X"));

    // Append the delete button to the li element
    li.appendChild(deletebtn);

    // Create an edit button
    let editbtn = document.createElement("button");
    editbtn.className = "btn btn-dark btn-sm edit";
    editbtn.setAttribute("style", "float: right; margin-right: 5px;");
    editbtn.appendChild(document.createTextNode("Edit"));

    // Append the edit button to the li element
    li.appendChild(editbtn);

    // Append the li element to the ul element
    ul.appendChild(li);
}

// Adding delete button functionality
ul.addEventListener("click", removeitem);

function removeitem(event) {
    if (event.target.classList.contains("delete")) {
        let li = event.target.parentNode; // Get the parent li element
        let productType = li.firstChild.textContent.split(" is ")[li.firstChild.textContent.split(" is ").length - 1]; // Extract the product type from the li text
        localStorage.removeItem(productType); // Remove the corresponding item from local storage
        ul.removeChild(li); // Remove the li element from the ul

        // Update the total amount
        updateTotalAmount();
    }
}

// Adding edit button functionality
ul.addEventListener("click", edititem);

function edititem(event) {
    if (event.target.classList.contains("edit")) {
        let li = event.target.parentNode; // Get the parent li element
        let productName = li.firstChild.textContent.split(" is ")[1].split(".")[0]; // Extract the product name from the li text
        let productprice = li.firstChild.textContent.split(" is ")[2].split(".")[0];
        let productType = li.firstChild.textContent.split(" is ")[li.firstChild.textContent.split(" is ").length-1]; // Extract the product name from the li text
        localStorage.removeItem(productType); // Remove the corresponding item from local storage
        ul.removeChild(li); // Remove the li element from the ul
        document.getElementById("productname").value = productName;
        document.getElementById("productprice").value = productprice;
        document.getElementById("producttype").value = productType;

        // Update the total amount
        updateTotalAmount();
    }
}

// Function to update the total amount
function updateTotalAmount() {
    let totalamountinput = document.getElementById("totalamount");
    totalamountinput.value = calculateTotalAmount();
}

// Function to calculate the total amount
function calculateTotalAmount() {
    let total = 0;
    for (let i = 0; i < localStorage.length; i++) {
        let productprice = parseFloat(localStorage.getItem(localStorage.key(i)).split(" ")[0]); // Extract the price from the saved product item
        total += productprice;
    }
    return total;
}

// Function to search products
findproduct.addEventListener("keyup", searchproduct);

function searchproduct() {
    let li = document.querySelectorAll(".list-group-item");
    li.forEach((product) => {
        let productname = product.firstChild.textContent.split(" is ")[1].split(".")[0];
        if (productname.toLowerCase().indexOf(findproduct.value.toLowerCase())) {
            product.style.display = "none";
        } else {
            product.style.display = "block";
        }
    });
}
