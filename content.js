
var giphy = "https://api.giphy.com/v1/gifs/random?api_key=Zv7BFWc1GaxQe5tDfr9nO9FEes8AcZKa";

function changeSrc(img) {

  var xhr = new XMLHttpRequest();
  xhr.open("GET", giphy, true);
  xhr.onreadystatechange = function() {
    if (xhr.readyState == 4) {
      // JSON.parse does not evaluate the attacker's scripts.
      var json = JSON.parse(xhr.responseText);

      if ( json.data ) {
        img.srcset = json.data.images.source.url + " 100w";
        img.src = json.data.images.source.url;
      }
    }
  }
  xhr.send();

  img.src =  ""
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

chrome.extension.sendMessage({}, function(response) {
    var readyStateCheckInterval = setInterval(function() {
    if (document.readyState === "complete") {
        clearInterval(readyStateCheckInterval);

        var images = document.getElementsByTagName("img");
        for (var i = 0; i < images.length; i++) {
          changeSrc(images[i]);
        }

        /*
        var divs = document.getElementsByTagName("div");
        for (var i = 0; i < divs.length; i++) {
          var div = divs[i];

          if ( div.style.backgroundImage != "" ) {
            console.log(div.style.backgroundImage)
          }
        }
        */

        // bgImages();

    }
    }, 10);
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
