const authButton = document.querySelector("#auth-button");
const tokenButton = document.querySelector("#token-button");

const tokenSpan = document.querySelector("#token-span");

const vibrateButton = document.querySelector("#vibrate-button");
const beepButton = document.querySelector("#beep-button");
const shockButton = document.querySelector("#shock-button");

const intensitySlider = document.querySelector("#intensity-slider");
const intensitySpan = document.querySelector("#intensity-span");

let token = "";
let intensity = intensitySlider.value;

authButton.addEventListener("click", () => {
    window.location="/auth";
});

tokenButton.addEventListener("click", () => {
    fetch("http://127.0.0.1:3000/token")
        .then( response => {
            if (response.ok) {
                response.text().then(function (text) {
                    token = text;
                    tokenButton.innerHTML = "Success";
                    tokenSpan.innerHTML = token;
                });                
            } else {
                tokenButton.innerHTML = "Failed";
            }
        });
});

vibrateButton.addEventListener("click", () => {
    fetch("https://pavlok-mvp.herokuapp.com/api/v1/stimuli/vibration/" + intensity, {
        method: "POST",
        headers: {
            Authorization: `Bearer ${token}`
        }
    }).then( response => {
        if (response.ok) {
            console.log("Received instruction: vibration, " + intensity);
        }
    });
});

beepButton.addEventListener("click", () => {
    fetch("https://pavlok-mvp.herokuapp.com/api/v1/stimuli/beep/" + intensity, {
        method: "POST",
        headers: {
            Authorization: `Bearer ${token}`
        }
    }).then( response => {
        if (response.ok) {
            console.log("Received instruction: beep, " + intensity);
        }
    });
});

shockButton.addEventListener("click", () => {
    fetch("https://pavlok-mvp.herokuapp.com/api/v1/stimuli/shock/" + intensity, {
        method: "POST",
        headers: {
            Authorization: `Bearer ${token}`
        }
    }).then( response => {
        if (response.ok) {
            console.log("Received instruction: shock, " + intensity);
        }
    });
});

intensitySlider.addEventListener("input", () => {
    intensity = intensitySlider.value;
    intensitySpan.innerHTML = intensitySlider.value;
});
