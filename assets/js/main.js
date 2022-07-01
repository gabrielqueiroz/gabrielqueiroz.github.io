var konamyKeys = {
  37: 'left',
  38: 'up',
  39: 'right',
  40: 'down',
  65: 'a',
  66: 'b'
};

// 'official' Konami Code sequence
var konamiCode = ['up', 'up', 'down', 'down', 'left', 'right', 'left', 'right', 'b', 'a'];

var konamiCodePosition = 0;

var currentStyle = 'work'

document.addEventListener('keydown', function(e) {
  var key = konamyKeys[e.keyCode];
  var requiredKey = konamiCode[konamiCodePosition];

  var konamiToast = document.getElementById('konamiToast')
  var toastContent = document.getElementById('toastContent')
  var konamiToastInstance = bootstrap.Toast.getOrCreateInstance(konamiToast)

  if (key == requiredKey) {
    konamiCodePosition++;

    if (key === 'a' || key === 'b') {
      toastContent.innerHTML += "<b>" + key.toUpperCase() + "</b>&nbsp;"
    } else {
      toastContent.innerHTML += "<i class=\"fa fa-arrow-" + konamyKeys[e.keyCode] + "\"></i>&nbsp;"
    }
    konamiToastInstance.show()

    if (konamiCodePosition == konamiCode.length) {
      changeStyle();

      konamiCodePosition = 0;

      toastContent.innerHTML = "";
      konamiToastInstance.dispose()
    }
  } else {
    konamiCodePosition = 0;

    toastContent.innerHTML = "";
    konamiToastInstance.dispose()
  }
});

function changeStyle() {
  if (currentStyle === 'work') {
    currentStyle = 'konami'

    makeItInvisible('work')
    makeItVisible('konami')

    document.body.classList.add('konami-background')
  } else {
    currentStyle = 'work'

    makeItInvisible('konami')
    makeItVisible('work')

    document.body.classList.remove('konami-background')
  }
}

async function makeItInvisible(elementId) {
  var element = document.getElementById(elementId);

  element.classList.remove("visible", "animate__fadeInLeft");
  element.classList.add("animate__fadeOutRight");
  await new Promise(resolve => setTimeout(resolve, 300));
  element.classList.add("not-visible");
}

function makeItVisible(elementId) {
  var element = document.getElementById(elementId);

  element.classList.remove("not-visible", "animate__fadeOutRight");
  element.classList.add("visible", "animate__fadeInLeft");
}