//Restrive Local Storage and Divide Back Into Array
let userAnswer = JSON.parse(localStorage.getItem("userAnswer"));
let rightAnswer = JSON.parse(localStorage.getItem("rightAnswer"));
let possibleAnswer = JSON.parse(localStorage.getItem("possibleAnswer"));
let questions = JSON.parse(localStorage.getItem("Questions"));

//Check Local Storage
console.log(userAnswer);
console.log(rightAnswer);
console.log(possibleAnswer);
console.log(questions);

//Wrong Answer Counter
let wrong = 0;

for (let i = 0; i < userAnswer.length; i++) {
  //Crete h2 For Question
  let questionBox = document.createElement("h2");
  let text = document.createTextNode(questions[i]);
  questionBox.appendChild(text);
  document.getElementById("results").appendChild(questionBox);

  let oneLine = document.createElement("div");
  oneLine.setAttribute("id", `line${[i]}`);
  oneLine.style.display = "flex";
  document.getElementById("results").appendChild(oneLine);

    /*
  Title: CreateElement with id?
  Author: lkaradashkov
  Site owner/sponsor: stackoverflow.com
  Date: 2012
  Code version: May 16, 2018 at 22:03
  Availability: https://stackoverflow.com/questions/9422974/createelement-with-id
  (Accessed 4 December 2023)
  Modified: Different Id name
  */
  
  for (let j = 0; j < possibleAnswer[i].length; j++){
    //Create p For Each possibleAnswer
    let answerBox = document.createElement("p");
    answerBox.innerHTML = possibleAnswer[i][j];
    answerBox.style.paddingRight = "2%";
    document.getElementById(`line${[i]}`).appendChild(answerBox);

    //Change Color of User Answer and Correct Answer
    if (rightAnswer[i] == j){
      answerBox.style.color = "#bbdd5d";
      answerBox.style.fontWeight = "bold";
    }
    else if (userAnswer[i] == j && userAnswer[i] != rightAnswer[i]){
      answerBox.style.color = "#ff7f50";
      answerBox.style.fontWeight = "bold";

      wrong ++;
    }
  }
}

//Calculate Percentage of Right Answers
let right = userAnswer.length - wrong;
let resultPercentage = right*100/userAnswer.length;
let resultColor;

//Change Color of Result Text Depending on The Percentage
if (resultPercentage >= 50){
  resultColor = "#bbdd5d";
}
else{
  resultColor = "#ff7f50";
}

//Create and Display Results Text
let resultBox = document.createElement("h2");
let text = document.createTextNode(`You got ${resultPercentage} % of the questions right!`);
resultBox.appendChild(text);
resultBox.style.color = resultColor;
document.getElementById("results").appendChild(resultBox);
