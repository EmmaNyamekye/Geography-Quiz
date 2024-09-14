let count = 5;      //Initialize countdown counter to 5
let countdown = setInterval(startCountdown, 1000);      //Start countdown timer with 1-second interval
    
function startCountdown() {
    document.getElementById('countdown').innerHTML = count;       //Update the countdown text
    --count;        //Decrement countdown counter

    if (count == 0) {       //Check if countdown = 0
        clearInterval(countdown);       //Stop countdown
        location.href = "quizPage.html";        //Go to Quiz Page
    }
}
