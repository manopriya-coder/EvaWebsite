const cartIcon = document.querySelector(".span");
const mainCart = document.querySelector(".addToCart");
const closeIcon = document.querySelector(".cancelIcon");
const addCartBtn = document.querySelectorAll(".addBtn");
const touchBlur = document.querySelector(".bgBlur");
const productArray = [];

// console.log(deleteIcon);

cartIcon.addEventListener("click", function () {
  mainCart.classList.toggle("showAddToCart");
});

closeIcon.addEventListener("click", function () {
  mainCart.classList.remove("showAddToCart");
});

touchBlur.addEventListener("click", function () {
  mainCart.classList.remove("showAddToCart");
});

function delAndQuantity() {
  const inputQuantity = document.querySelectorAll(".quantity");
  const deleteIcon = document.querySelectorAll(".deleteIcon");

  inputQuantity.forEach(function (inputTag) {
    inputTag.addEventListener("change", function (event) {
      if (event.target.value < 1) {
        event.target.value = 1;
        alert("Product quantity cannot be negative..");
      }
    });
  });

  deleteIcon.forEach(function (delIcon) {
    delIcon.addEventListener("click", function () {
      if (confirm("Are you sure ?")) {
        const deldiv = this.parentNode.parentNode.parentNode;

        const delProductName = deldiv.querySelector(".productDetail").innerText;

        const delArrayIndex = productArray.findIndex(function (delIndex) {
          return delIndex === delProductName;
        });

        console.log(delArrayIndex);

        productArray.splice(delArrayIndex, 1);

        console.log(productArray);

        console.log(delProductName);

        console.log(delArrayIndex);

        deldiv.remove();
      }
    });
  });
}



function calTotalForEach() {
  const inputPrice = document.querySelectorAll(".priceInput");
  const inputQuantity = document.querySelectorAll(".quantity");
  const productPrice = document.querySelectorAll(".price").innerText;

  const quantity=parseInt(inputQuantity.value)||0;

  const totPrice =productPrice * quantity;

  inputPrice.innerText= totPrice;
  console.log(totPrice);
}
calTotalForEach();



addCartBtn.forEach(function (btn) {
  btn.addEventListener("click", function () {
    const productParent = this.parentNode.parentNode;
    const productImg = productParent.querySelector(".front,.shoe").src;
    const productDetail = productParent.querySelector(".detail").innerText;
    const productPrice = productParent.querySelector(".price").innerText;
    // console.log(productImg,productDetail,productPrice);
    const cartDesignFunction = cartDesign(
      productImg,
      productDetail,
      productPrice
    );
    // console.log(cartDesignFunction);

    const findInArray = productArray.find(function (arrayProductName) {
      return arrayProductName === productDetail;
    });

    if (findInArray) {
      return alert("already added");
    } else {
      productArray.push(productDetail);
    }

    console.log(productArray);

    const cartProductHold = document.querySelector(".cartProduct");
    // console.log(cartProductHold);
    cartProductHold.innerHTML += cartDesignFunction;

    delAndQuantity();
  });
});

function cartDesign(image, detail, price) {
  return ` <div class="product1">
                <div class="productImg">
                  <img
                    src="${image}"
                    alt=""
                    class="productImg"
                  />
                </div>
                <div class="textContent">
                  <div class="describtion">
                    <p class="productDetail">${detail}</p>
                    <h3 class="productPrice">${price}</h3>
                  </div>
                  <div class="inputBox">
                    <input type="number" name ="quantity" class="quantity" value="1">
                    <p class="priceInput">${price }</p>
                    <i class="ri-delete-bin-2-fill deleteIcon"></i>
                  </div>
                </div>
              </div> `;
}
