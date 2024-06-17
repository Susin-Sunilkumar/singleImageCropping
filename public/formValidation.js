function validateForm() {
    let isValid = true;

    const productname = document.getElementById("productname").value.trim();
    const category = document.getElementById("category").value.trim();
    const price = document.getElementById("productPrice").value.trim();
    const image = document.getElementById('imageInput').value
    
    const stock = document.getElementById("productStock").value.trim();

console.log("below declaration")
    // Product Name validation
    if (productname === "") {
      document.getElementById("productnameError").innerText =
        "Please enter the product name";
      isValid = false;
    } else {
      document.getElementById("productnameError").innerText = "";
    }

    // Category validation
    if (category === "") {
      document.getElementById("categoryError").innerText =
        "Please select the category from the options";
      isValid = false;
    } else {
      document.getElementById("categoryError").innerText = "";
    }
 
    // Price validation 
    if (price === "") {
      document.getElementById("priceError").innerText =
        "Please enter a price..";
      isValid = false;
    } else if (isNaN(price)) {
      document.getElementById("priceError").innerText =
        "Only numbers are allowed";
      isValid = false;
    } else if (parseInt(price) <= 0) {
      document.getElementById("priceError").innerText =
        "Price should be greater than 0";
      isValid = false;
    } else {
      document.getElementById("priceError").innerText = "";
    }
  
  
 
    // Image validation
    if(!image) {
console.log("inside the image if condition")
      document.getElementById("imgError").innerText =
        "Please add the image";
  
      isValid = false;
    
  
    } 
  
    // Stock validation
    if (stock === "") {
      document.getElementById("stockError").innerText =
        "Please add the stock";
      isValid = false;
    } else if (isNaN(stock)) {
      document.getElementById("stockError").innerText =
        "Only numbers are allowed";
      isValid = false;
    } else if (stock < 0) {
      document.getElementById("stockError").innerText =
        "Stock can be 0 or greater";
      isValid = false;
    } else {
      document.getElementById("stockError").innerText = "";
    }

    return isValid;
  }
    