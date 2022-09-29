const weatherForm = document.querySelector("form");
const searchElement = document.querySelector("input");
const messageOne = document.querySelector("#message-1")
const messageTwo = document.querySelector("#message-2")
const currentLocationBtn = document.getElementById('current-location')

weatherForm.addEventListener("submit", (e) => {
  e.preventDefault();
  messageOne.textContent = "Loading..."
  messageTwo.textContent = ""
  // below is used for local host
  // fetch("http://localhost:3000/weather?address=" + searchElement.value).then((response) => {
    fetch("/weather?address=" + searchElement.value).then((response) => {
    response.json().then((data) => {
      if (data.error) {
        messageOne.textContent = data.error
      } else {
        messageOne.textContent = data.location
        messageTwo.textContent = data.forecast
      }
    });
  });
});

currentLocationBtn.addEventListener('click', e => {
  messageOne.textContent = "Loading..."
  messageTwo.textContent = ""
  if(!navigator.geolocation) {
    messageOne.textContent = 'Current Location does not supported.'
    return
  }
  navigator.geolocation.getCurrentPosition(position => {
    currentLocationBtn.disabled = true
    fetch("/weather?coords=" + position.coords.latitude + "," + position.coords.longitude).then((response) => {
      response.json().then((data) => {
        if (data.error) {
          messageOne.textContent = data.error
        } else {
          messageOne.textContent = data.location
          messageTwo.textContent = data.forecast
          currentLocationBtn.disabled = false
          searchElement.value = ""
        }
      });
    });
  }, error => {
    messageOne.textContent = 'Location access needed to use this feature.'
  })
})


