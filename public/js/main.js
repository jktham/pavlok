const authButton = document.querySelector("#auth");
const tokenButton = document.querySelector("#token");

const vibrateButton = document.querySelector("#vibrate");
const beepButton = document.querySelector("#beep");
const zapButton = document.querySelector("#zap");

let token = "";

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
                });                
            } else {
                tokenButton.innerHTML = "Failed";
            }
        });
});

vibrateButton.addEventListener("click", () => {
    console.log("1");
});

beepButton.addEventListener("click", () => {
    console.log("2");
});

zapButton.addEventListener("click", () => {
    console.log("3");
});
