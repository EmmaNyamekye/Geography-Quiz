//Array of Objects
let quiz = [
    {
        question: 'What is the capital of Luxembourg?',
        answers: ['Echternach', 'Diekirch', 'Luxembourg', 'Vianden'],
        correct: 2,
        help: "It's easier than you think."
    },

    {
        question: 'In what continent is Morocco?',
        answers: ['Africa', 'North America', 'Asia', 'Europe'],
        correct: 0,
        help: "South Africa is also in this continent."
    },

    {
        question: 'Which two countries are surrounded by Italy?',
        answers: ['Sicily, Vatican City', 'Corsica, Sicily', 'Vatican City, Corsica', 'Vatican City, San Marino'],
        correct: 3,
        help: "Two words: Pope and Saint."
    },

    {
        question: 'What is the capital of the United Arab Emirates?',
        answers: ['Dubai', 'Abu Dhabi', 'Sharjah', 'Fujairah'],
        correct: 1,
        help: "It's not the most famous city."
    },

    {
        question: 'Which are the three Baltic States?',
        answers: ['Finland, Sweden, Norway', 'Poland, Czech Republic, Slovakia', 'Hungary, Romania, Bulgaria', 'Latvia, Lithuania, Estonia'],
        correct: 3,
        help: "They are really small countries NEXT to the Baltic Sea"
    },

    {
        question: 'Which country is known as the land of the rising sun?',
        answers: ['China', 'South Korea', 'Japan', 'Vietnam'],
        correct: 2,
        help: "This country has a \"sun\" on their flag."
    },

    {
        question: 'Mount Everest is part of which mountain range?',
        answers: ['Himalayas', 'Andes', 'Rocky Mountains', 'Alps'],
        correct: 0,
        help: "A famous type of salt comes from this place."
    },

    {
        question: 'Where is Machu Picchu located?',
        answers: ['Peru', 'Brazil', 'Colombia', 'Ecuador'],
        correct: 0,
        help: "North of Chile."
    },

    {
        question: 'What is the longest river in the European Union?',
        answers: ['Rhine', 'Seine', 'Thames', 'Danube'],
        correct: 3,
        help: "It's in Eastern Europe."
    },
    {
        question: 'Which country is famous for its tulips and windmills?',
        answers: ['Belgium', 'Netherlands', 'Denmark', 'Norway'],
        correct: 1,
        help: "One word: bicycles."
    }
];

//Empty Arrays
let selectedQuestionsNum = [];      
let selectedQuestions = [];
let selectedAnswers = [];
let selectedCorrect = [];
let selectedHelp = [];
let randomQuestions;
let countPage = 1;

//Random Selection of Index
while (selectedQuestionsNum.length < 5) {
    randomQuestionNum = Math.floor(Math.random() * quiz.length);

    if (selectedQuestionsNum.includes(randomQuestionNum)) {       //Check question already selected
        continue;
    };
    selectedQuestionsNum.push(randomQuestionNum);        //Add the selected question to array
}

console.log(selectedQuestionsNum);      //Check Random Selection of Index

//Push Parts (quetsions, answers, correct, help) Into Initial Empty Array
for (let i = 0; i < selectedQuestionsNum.length; i++) {
    let questionPart = quiz[selectedQuestionsNum[i]];
    selectedQuestions.push(questionPart.question);
    selectedAnswers.push(questionPart.answers);
    selectedCorrect.push(questionPart.correct);
    selectedHelp.push(questionPart.help);
}

//Check If Empty Arrays Have Been Populated
console.log(selectedQuestions);
console.log(selectedAnswers);
console.log(selectedCorrect);
console.log(selectedHelp);

//Display and Hide Help
function displayHelp() {
    document.getElementById("questionSection").addEventListener('mouseover', () => {
        const helpElement = document.getElementById("help");
        helpElement.style.visibility = "visible";
        helpElement.innerHTML = selectedHelp[current];
        }, false);

    document.getElementById("questionSection").addEventListener('mouseover', () => {
        const helpElement = document.getElementById("help");
        helpElement.style.backgroundColor = "#bbdd5d";
        helpElement.innerHTML = selectedHelp[current];
        }, false);

    document.getElementById("questionSection").addEventListener('mouseout', () => {
       const helpElement = document.getElementById("help");
        helpElement.style.visibility = "hidden";
        }, false);
}

//Current Question
let current = 0;

//Array of of All 4 Radio Inputs p tag
const texts = [document.getElementById("a"), document.getElementById("b"), document.getElementById("c"), document.getElementById("d")];

//Populate questionSection and Radio Inputs Function
function loadQuiz(e) {
    document.getElementById("questionSection").innerHTML = selectedQuestions[e];
    
    for(let i = 0; i < texts.length; i++){
        let t = texts[i];
        t.innerHTML = selectedAnswers[e][i];
    }

    if (e == selectedQuestions.length-1) {
        document.getElementById("nextButton").innerHTML = "Finish";
        }
    displayHelp();
}

//Populate Current Question
loadQuiz(current);

//clickedOn = All 4 Radio Inputs
let clickedOn = document.querySelectorAll("input");     

//Add EventListener to All 4 Radio Inputs
for (let i = 0; i < clickedOn.length; i++) {
    clickedOn[i].addEventListener('click',
        () => {document.getElementById("nextButton").style.visibility = "visible"},
        false);
}

//Empty Array for User Answers
const userAnswer = [];

//Function for NEXT button
function nextQuestion() {

    //Simple Progress "Bar"
    countPage++;
    
    if (countPage == 6) {
        countPage = 5;
        }
        
    document.getElementById("count").textContent = countPage;

    //Check if Radio Input Has Been Clicked and Add Answer To Array User Answer
    for (let i = 0; i < clickedOn.length; i++) { 
        let radio = clickedOn[i]; 
        if (radio.checked == true) { 
            userAnswer.push(parseInt(radio.value)); 
        } 
        radio.checked = false; 
    }

    current ++; 

    //If Last Page -> Pop Up Window
    if (current >= 5) {   
        window.open("summaryPage.html", "summary", 
        "width = " + (screen.width) / 2 + 
        ", height = " + (screen.height) / 2 + 
        ", left = " + (screen.width) / 4 + 
        ", top = " + (screen.height) / 4); 

        /*
        Title: Opening full width/height popup
        Author: Joshua Ohana
        Site owner/sponsor: stackoverflow.com
        Date: 2015
        Code version: Feb 19, 2015 at 15:51
        Availability: https://stackoverflow.com/questions/28610758/opening-full-width-height-popup
        (Accessed 4 December 2023)
        Modified: Just took ('width=' + screen.width + ', height=' + screen.height') concept
        */
    } 
    //Else Hide NEXT button
    else { 
        loadQuiz(current); 
        document.getElementById("nextButton").style.visibility = "hidden"; 
    } 
    localStorage.setItem("userAnswer", JSON.stringify(userAnswer)); 
}

//Add EventListener to NEXT button
document.getElementById("nextButton").addEventListener("click", nextQuestion, false);

//Check User Answer
console.log(userAnswer);

//Save String Into Local Storage 
localStorage.setItem("rightAnswer", JSON.stringify(selectedCorrect));
localStorage.setItem("possibleAnswer", JSON.stringify(selectedAnswers));
localStorage.setItem("Questions", JSON.stringify(selectedQuestions));

