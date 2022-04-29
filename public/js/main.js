const authButton = document.querySelector("#auth");
const vibrateButton = document.querySelector("#vibrate");
const beepButton = document.querySelector("#beep");
const zapButton = document.querySelector("#zap");

authButton.addEventListener("click", () => {
    window.location="/auth";
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
