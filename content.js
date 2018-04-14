
var apiKeys = [
  "Zv7BFWc1GaxQe5tDfr9nO9FEes8AcZKa",
  "FghTmuMQVZ0SSX52jN0iu9PAi8zC0lDB"
];

var randomApiKey = apiKeys[Math.floor(Math.random()*apiKeys.length)];

var giphy = "https://api.giphy.com/v1/gifs/random?api_key=" + randomApiKey;

var loading = "https://i.imgur.com/ONBvABV.png";

var giphyArray = [];

function randomImage() {
  return giphyArray[Math.floor(Math.random()*giphyArray.length)];
}

function changeImage(img, url) {
  img.srcset = url + " 100w";
  img.src = url;
  img.style.objectFit = "cover"
}

function changeBgUrl(img, url) {
  img.style.backgroundImage = "url(" + img + ")"
  img.style.backgroundSize = "cover"
}

function changeSrc(img) {

  try {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", giphy, true);
    xhr.onreadystatechange = function() {
      if (xhr.readyState == 4) {
        // JSON.parse does not evaluate the attacker's scripts.
        var json = JSON.parse(xhr.responseText);
        var url = ""

        if ( json.data ) {
          url = json.data.images.source.url
          giphyArray.push(url)
        } else {
          url = randomImage();
        }

        changeImage(img, url);
      }
    }
    xhr.send();
  } catch (e) {
    changeImage(img, randomImage());
  }
}

function changeBg(element) {

  try {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", giphy, true);
    xhr.onreadystatechange = function() {
      if (xhr.readyState == 4) {
        // JSON.parse does not evaluate the attacker's scripts.
        var json = JSON.parse(xhr.responseText);
        var url = ""

        if ( json.data ) {
          url = json.data.images.source.url
          giphyArray.push(url)
        } else {
          url = randomImage();
        }

        changeBgUrl(element, url);
      }
    }
    xhr.send();
  } catch (e) {
    changeBgUrl(element, randomImage());
  }
}

function bgImages() {
  var sheet = document.styleSheets[0];
  var rules = sheet.cssRules || sheet.rules;

  for (var i = 0; i < rules.length; i++) {
    if ( rules[i].style.backgroundImage != "" ) {
      console.log(rules[i]);
    }
  }
}

function loopImages(images) {
  for (var i = 0; i < images.length; i++) {
    img = images[i]

    if ( img.classList.contains("meme-ok") ) continue;

    if ( img.classList.contains("meme-loading") ) {
      changeSrc(images[i]);
      img.classList.add("meme-ok");
      img.classList.remove("meme-loading");
    } else {
      img.classList.add("meme-loading")
      img.style.height = img.height + "px"
      img.style.width = img.width + "px"
      images[i].src = loading;
    }
  }
}

function loopBackgrounds(items) {
  for (var i = 0; i < items.length; i++) {
    var item = items[i];

    if ( item.style.backgroundImage == "" ) continue

    if ( item.classList.contains("meme-bg-ok") ) continue;

    if ( item.classList.contains("meme-bg-loading") ) {
      changeBg(item);
      item.classList.add("meme-bg-ok");
      item.classList.remove("meme-bg-loading");
    } else {
      item.classList.add("meme-bg-loading")
      item.style.backgroundImage = "url(" + loading + ")";
    }
  }
}

chrome.extension.sendMessage({}, function(response) {
  var readyStateCheckInterval = setInterval(function() {

    //loopBackgrounds( document.getElementsByTagName("a") )
    //loopBackgrounds( document.getElementsByTagName("div") )


    loopImages(document.getElementsByTagName("img"));
    loopImages(document.getElementsByTagName("video"));

  }, 40);
});

window.addEventListener ("load", myMain, false);

function myMain (evt) {
    console.log('aaaaaAAAAAAAAaaaAAA');



    var jsInitChecktimer = setInterval (checkForJS_Finish, 111);

    function checkForJS_Finish () {
        if (    typeof SOME_GLOBAL_VAR != "undefined"
            ||  document.querySelector ("SOME_INDICATOR_NODE_css_SELECTOR")
        ) {
            clearInterval (jsInitChecktimer);
            // DO YOUR STUFF HERE.

            console.log('hi');
        }
    }
}
