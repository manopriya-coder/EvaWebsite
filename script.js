//Add To Cart
const cartIcon = document.querySelector(".span");
const mainCart = document.querySelector(".addToCart");
const closeIcon = document.querySelector(".cancelIcon");
const addCartBtn = document.querySelectorAll(".addBtn");
const touchBlur = document.querySelector(".bgBlur");
const inputPrice = document.querySelectorAll(".priceInput");
const cartNotify = document.querySelector(".notify");
const productArray = [];
const totalArray = [];
//Log In
const accIcon = document.querySelector(".fa-user");
const blurLogIn = document.querySelector(".bgBlurLogin");
const logInPage = document.querySelector(".logInDiv");

blurLogIn.addEventListener("click", function () {
  blurLogIn.classList.toggle("showAndHideLogin");
  logInPage.classList.toggle("showAndHideLogin");
  // blurLogIn.classList.toggle("pointer");
});

accIcon.addEventListener("click", function () {
  // blurLogIn.classList.toggle("showLogInByIcon");
  blurLogIn.classList.remove("showAndHideLogin");
  logInPage.classList.remove("showAndHideLogin");
});

// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.9.1/firebase-app.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "https://www.gstatic.com/firebasejs/11.9.1/firebase-auth.js";
//TODO: Add SDKs for Firebase products that you want to use
//https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyANRe1IEl_b5DeFBILzDL1PHK-tZBFmdro",
  authDomain: "eva-e-commerce.firebaseapp.com",
  projectId: "eva-e-commerce",
  storageBucket: "eva-e-commerce.firebasestorage.app",
  messagingSenderId: "436103324020",
  appId: "1:436103324020:web:0a95b773a0799da84f0c21",
  measurementId: "G-TVE393C8DR",
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const heading = document.querySelector(".logInHeading");
const form = document.querySelector(".authForm");
const emailField = document.querySelector("#emailField");
const passwordField = document.querySelector("#passwordField");
const confirmPasswordField = document.querySelector("#confirmPassword");
const toggleText = document.querySelector(".toggleText");
const message = document.querySelector(".meg");

let isSignup = true;

toggleText.addEventListener("click", function () {
  isSignup = !isSignup;
  heading.innerText = isSignup ? "Sign Up" : "Log In";
  toggleText.innerText = isSignup
    ? "Already have an account ? Log in"
    : "Don't have an account. Please Sign up";
});

function signupAndLoginToggle(isSignup = false) {
  heading.innerText = isSignup ? "Sign Up" : "Log In";
  toggleText.innerText = isSignup
    ? "Already have an account ? Log in"
    : "Don't have an account. Please Sign up";
}

form.addEventListener("submit", function (e) {
  e.preventDefault();
  const email = emailField.value;
  const password = passwordField.value;
  const confirmPassword = confirmPasswordField.value;

  if (email === "" || password === "") {
    message.innerText = "Email and Password Field are required";
  }
  if (password === confirmPassword) {
    if (isSignup) {
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Signed up
          const user = userCredential.user;
          message.innertext = "Signup Successfully";
          form.reset();
          signupAndLoginToggle();
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          message.innerText = errorMessage;
          // ..
        });
    } else {
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          message.innerText = "Login Successfully";
          blurLogIn.classList.add("showAndHideLogin");
          logInPage.classList.add("showAndHideLogin");

          // ...
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          message.innerText = errorMessage;
        });
    }
  }
});

//Add To Cart
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

        // console.log(delArrayIndex);

        productArray.splice(delArrayIndex, 1);

        // console.log(productArray);

        // console.log(delProductName);

        // console.log(delArrayIndex);

        deldiv.remove();

        cartNotify.innerText = productArray.length;

        localStorage.setItem("cartItem", JSON.stringify(productArray));
        updateTotal();
      }
    });
  });
}

function totalCalEach() {
  const cartProductDiv = document.querySelectorAll(".product1");

  cartProductDiv.forEach((cartProduct) => {
    const inputTag = cartProduct.querySelector("input");
    const price = cartProduct.querySelector(".productPrice");
    const priceDisplay = cartProduct.querySelector(".priceInput");
    inputTag.addEventListener("change", function (event) {
      const inputValue = event.target.value;
      const priceValue = price.innerText.replace("$", "");

      const totalPrice = priceValue * inputValue;

      priceDisplay.innerText = totalPrice;
      updateTotal();
    });
  });

  // const inputQuantity = document.querySelectorAll(".quantity");
  // const productPrice = document.querySelectorAll(".price").innerText;
  // const priceInput = document.querySelectorAll(".priceInput");
  // console.log(productPrice);
  // priceInput.forEach(function (priceTag) {
  //   priceTag.addEventListener("change", function (event) {
  //     if (event.target.value > 1) {
  //       const totPrice = productPrice * inputQuantity;
  //       productPrice.innerText = totPrice;
  //       console.log(totPrice);
  //     }
  //   });
  // });
}

const totalDisplay = document.querySelector(".totalDisplay");

function updateTotal() {
  const priceDisplayTotal = document.querySelectorAll(".priceInput");
  let total = 0;

  priceDisplayTotal.forEach((priceAmt) => {
    // const finalPrice =parseInt(totalDisplay.innerText);
    let sub = parseInt(priceAmt.innerText.replace("$", ""));
    total += sub;
    // console.log(total);
    totalDisplay.innerText = `$${total}`;
  });
}
// const quantity = parseInt(inputQuantity.value) || 0;

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

    localStorage.setItem("cartItem", JSON.stringify(productArray));

    const cartProductHold = document.querySelector(".cartProduct");
    // console.log(cartProductHold);
    cartProductHold.innerHTML += cartDesignFunction;

    cartNotify.innerText = productArray.length;

    delAndQuantity();

    totalCalEach();
    updateTotal();
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
                    <p class="priceInput">${price}</p>
                    <i class="ri-delete-bin-2-fill deleteIcon"></i>
                  </div>
                </div>
              </div> `;
}

window.addEventListener("DOMContentLoaded", function () {
  const storeItem = this.localStorage.getItem("cartItem");

  if (storeItem) {
    const parsedData = JSON.parse(storeItem);
    parsedData.forEach((proDetail) => {
      console.log(proDetail);
      this.document.querySelectorAll(".detail").forEach((pname) => {
        if (pname.innerText === proDetail) {
          const parent = pname.parentElement.parentElement;
          const productName = pname.innerText;

          const img = parent.querySelector(".front,.shoe").src;
          const price = parent.querySelector(".price").innerText;
          const cartDesignFunction = cartDesign(img, productName, price);

          const cartProductHold = document.querySelector(".cartProduct");
          cartProductHold.innerHTML += cartDesignFunction;

          cartNotify.innerText = parsedData.length;
        }
        
      });
    });
  }
  delAndQuantity();
  totalCalEach();
  updateTotal();
});
