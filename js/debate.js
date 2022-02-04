let currentAudio = 0;

const audio = document.querySelector("#audio");

const seekBar = document.querySelector(".seek-bar");
const songName = document.querySelector(".music-name");
const artistName = document.querySelector(".artist-name");
const currentTime = document.querySelector(".current-time");
const audioDuration = document.querySelector(".song-duration");
const playBtn = document.querySelector(".play-btn");
const playBtn2 = document.querySelector(".play2-btn");
const playBtn3 = document.querySelector(".play3-btn");
const playBtn4 = document.querySelector(".play4-btn");
const playBtn5 = document.querySelector(".play5-btn");
const playBtn6 = document.querySelector(".play6-btn");
const playBtn7 = document.querySelector(".play7-btn");
const playBtn8 = document.querySelector(".play8-btn");
const forwardBtn = document.querySelector(".forward-btn");
const backwardBtn = document.querySelector(".backward-btn");

playBtn.addEventListener("click", () => {
  if (playBtn.className.includes("pause")) {
    audio.play();
  } else {
    audio.pause();
  }

  playBtn.classList.toggle("pause");
  playBtn2.classList.toggle("pause");
});

playBtn2.addEventListener("click", () => {
  if (playBtn2.className.includes("pause")) {
    audio.play(audio.src);
  } else {
    audio.pause();
  }

  playBtn.classList.toggle("pause");
  playBtn2.classList.toggle("pause");
});

playBtn3.addEventListener("click", () => {
  if (playBtn3.className.includes("pause")) {
    audio.play();
  } else {
    audio.pause();
  }

  playBtn.classList.toggle("pause");
  playBtn3.classList.toggle("pause");
});

playBtn4.addEventListener("click", () => {
  if (playBtn4.className.includes("pause")) {
    audio.play();
  } else {
    audio.pause();
  }

  playBtn.classList.toggle("pause");
  playBtn4.classList.toggle("pause");
});

playBtn5.addEventListener("click", () => {
  if (playBtn5.className.includes("pause")) {
    audio.play();
  } else {
    audio.pause();
  }

  playBtn.classList.toggle("pause");
  playBtn5.classList.toggle("pause");
});

playBtn6.addEventListener("click", () => {
  if (playBtn6.className.includes("pause")) {
    audio.play();
  } else {
    audio.pause();
  }

  playBtn.classList.toggle("pause");
  playBtn6.classList.toggle("pause");
});

playBtn7.addEventListener("click", () => {
  if (playBtn7.className.includes("pause")) {
    audio.play();
  } else {
    audio.pause();
  }

  playBtn.classList.toggle("pause");
  playBtn7.classList.toggle("pause");
});

playBtn8.addEventListener("click", () => {
  if (playBtn8.className.includes("pause")) {
    audio.play();
  } else {
    audio.pause();
  }

  playBtn.classList.toggle("pause");
  playBtn8.classList.toggle("pause");
});

const setAudio = (i) => {
  seekBar.value = 0;
  let song = songs[i];
  currentAudio = i;
  audio.src = song.path;

  songName.innerHTML = song.name;
  artistName.innerHTML = song.artist;

  currentTime.innerHTML = "00:00";
  setTimeout(() => {
    seekBar.max = audio.duration;
    console.log(audio.duration);
    audioDuration.innerHTML = formatTime(audio.duration);
  }, 300);
};

setAudio(0);

const formatTime = (time) => {
  let min = Math.floor(time / 60);
  if (min < 10) {
    min = `0${min}`;
  }

  let sec = Math.floor(time % 60);
  if (sec < 10) {
    sec = `0${sec}`;
  }
  return `${min} : ${sec}`;
};

setInterval(() => {
  seekBar.value = audio.currentTime;
  currentTime.innerHTML = formatTime(audio.currentTime);
  if (Math.floor(audio.currentTime) == Math.floor(seekBar.max))
    forwardBtn.click();
}, 500);

seekBar.addEventListener("change", () => {
  audio.currentTime = seekBar.value;
});

forwardBtn.addEventListener("click", () => {
  if (currentAudio >= songs.length - 1) {
    currentAudio = 0;
  } else {
    currentAudio++;
  }
  setAudio(currentAudio);
  playAudio();
});

backwardBtn.addEventListener("click", () => {
  if (currentAudio <= 0) {
    currentAudio = songs.length - 1;
  } else {
    currentAudio--;
  }
  setAudio(currentAudio);
  playAudio();
});

var placeSearch, autocomplete;

var componentForm = {
  autocomplete: ["street_number", "route"],
  inputCity: "locality",
  inputState: "administrative_area_level_1",
  inputZip: "postal_code",
  inputCounty: "administrative_area_level_2",
  inputCountry: "country",
};

function initAutocomplete() {
  autocomplete = new google.maps.places.Autocomplete(
    /** @type {!HTMLInputElement} */ (document.getElementById("autocomplete")),
    { type: ["geocode"] }
  );

  autocomplete.addListener("place_changed", fillInAddress);
}

function fillInAddress() {
  var place = autocomplete.getPlace();
  console.log(place);

  for (var component in componentForm) {
    document.getElementById(component).disabled = false;
    document.getElementById(component).value = search(
      componentForm[component],
      place.address_components
    );
  }

  if (search("street_number", place.address_components) != "") {
    document.getElementById("autocomplete").value =
      search("street_number", place.address_components) + " ";
  }
  document.getElementById("autocomplete").value += search(
    "route",
    place.address_components
  );

  function search(type, placeObject) {
    for (var i = 0; i < placeObject.length; i++) {
      if (placeObject[i].types[0] === type) {
        return placeObject[i].short_name;
      } else if (i === placeObject.length - 1) {
        return "";
      }
    }
  }
}

// shopping cart

updateCartTotal();

/* button event listeners */
document.getElementById("emptycart").addEventListener("click", emptyCart);
var btns = document.getElementsByClassName("addtocart");
for (var i = 0; i < btns.length; i++) {
  btns[i].addEventListener("click", function () {
    addToCart(this);
  });
}

/* ADD TO CART functions */

function addToCart(elem) {
  //init
  var sibs = [];
  var getprice;
  var getproductName;
  var cart = [];
  var stringCart;
  //cycles siblings for product info near the add button
  while ((elem = elem.previousSibling)) {
    if (elem.nodeType === 3) continue; // text node
    if (elem.className == "price") {
      getprice = elem.innerText;
    }
    if (elem.className == "productname") {
      getproductName = elem.innerText;
    }
    sibs.push(elem);
  }
  //create product object
  var product = {
    productname: getproductName,
    price: getprice,
  };
  //convert product data to JSON for storage
  var stringProduct = JSON.stringify(product);
  /*send product data to session storage */

  if (!sessionStorage.getItem("cart")) {
    //append product JSON object to cart array
    cart.push(stringProduct);
    //cart to JSON
    stringCart = JSON.stringify(cart);
    //create session storage cart item
    sessionStorage.setItem("cart", stringCart);
    addedToCart(getproductName);
    updateCartTotal();
  } else {
    //get existing cart data from storage and convert back into array
    cart = JSON.parse(sessionStorage.getItem("cart"));
    //append new product JSON object
    cart.push(stringProduct);
    //cart back to JSON
    stringCart = JSON.stringify(cart);
    //overwrite cart data in sessionstorage
    sessionStorage.setItem("cart", stringCart);
    addedToCart(getproductName);
    updateCartTotal();
  }
}
/* Calculate Cart Total */
function updateCartTotal() {
  //init
  var total = 0;
  var price = 0;
  var items = 0;
  var productname = "";
  var carttable = "";
  if (sessionStorage.getItem("cart")) {
    //get cart data & parse to array
    var cart = JSON.parse(sessionStorage.getItem("cart"));
    //get no of items in cart
    items = cart.length;
    //loop over cart array
    for (var i = 0; i < items; i++) {
      //convert each JSON product in array back into object
      var x = JSON.parse(cart[i]);
      //get property value of price
      price = parseFloat(x.price.split("$")[1]);
      productname = x.productname;
      //add price to total
      carttable +=
        "<tr><td>" +
        productname +
        "</td><td>$" +
        price.toFixed(2) +
        "</td></tr>";
      total += price;
    }
  }
  //update total on website HTML
  document.getElementById("total").innerHTML = total.toFixed(2);
  //insert saved products to cart table
  document.getElementById("carttable").innerHTML = carttable;
  //update items in cart on website HTML
  document.getElementById("itemsquantity").innerHTML = items;
}
//user feedback on successful add
function addedToCart(pname) {
  var message = pname + " was added to the cart";
  var alerts = document.getElementById("alerts");
  alerts.innerHTML = message;
  if (!alerts.classList.contains("message")) {
    alerts.classList.add("message");
  }
}
/* User Manually empty cart */
function emptyCart() {
  //remove cart session storage object & refresh cart totals
  if (sessionStorage.getItem("cart")) {
    sessionStorage.removeItem("cart");
    updateCartTotal();
    //clear message and remove class style
    var alerts = document.getElementById("alerts");
    alerts.innerHTML = "";
    if (alerts.classList.contains("message")) {
      alerts.classList.remove("message");
    }
  }
}
