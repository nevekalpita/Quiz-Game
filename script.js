let lives = 3;
let correctAnswers = 0;
let currentPlayer = "";
let timeLeft = 10;
let timer;
let gameActive = false;
let players = [];

let selectedCategory = "";
let currentQuestions = [];

let questions = {

    science: [
        {
            question: "Which planet is Red Planet?",
            options: ["Mars", "Earth", "Venus", "Jupiter"],
            correct: 0
        },
        {
            question: "What gas do plants use?",
            options: ["Oxygen", "Carbon Dioxide", "Hydrogen", "Nitrogen"],
            correct: 1
        },
        {
            question: "What is the chemical symbol for water?",
            options: ["WO"," Wa "," H₂O "," O₂H"],
            correct: 2
        },
        {
            question: "What is the boiling point of water at sea level?",
            options: [" 90°C "," 100°C ","110°C "," 120°C "],
            correct: 1
        },
        {
            question: "The center of an atom is called?",
            options: ["Electron "," Nucleus"," Proton","Neutron"],
            correct: 1
        },
        {
            question: "What organ pumps blood in the human body",
            options: ["Brain "," Lungs "," Heart","  Liver"],
            correct: 2
        },

    ],

    movies: [
        {
            question: "Who played Iron Man?",
            options: ["Chris Evans", "Robert Downey Jr.", "Tom Holland", "Chris Pratt"],
            correct: 1
        },
        {
            question: "Which movie has Jack Sparrow?",
            options: ["Avatar", "Titanic", "Pirates", "Jumanji"],
            correct: 2
        },
        {
            question:"Who played Tiger in Tiger Zinda Hai?",
            options: [" Salman Khan", "Shah Rukh Khan","Aamir Khan", " Ranveer Singh "],
            correct:0
        },
        {
            question:"Which film won Best Picture at Filmfare 2020?",
            options: ["Gully Boy", "Article 15"," Uri"," Kesari "],
            correct:0
        },
        {
            question:"“Badtameez Dil” song is from which movie?",
            options: [" Yeh Jawaani Hai Deewani","Kabir Singh"," Student of the Year","Ae Dil Hai Mushkil "],
            correct:0
        },
        {
            question:"Which actress played Shivani Shivaji Roy in Mardaani?",
            options: ["Katrina Kaif "," Deepika Padukone "," Rani Mukerji "," Priyanka Chopra "],
            correct:2
        },
        
      
    ],

    cartoons: [
        {
            question: "Who lives in pineapple under sea?",
            options: ["Shinchan", "SpongeBob", "Tom", "Doraemon"],
            correct: 1
        },
        {
            question: "What is Shinchan's dog name?",
            options: ["Shiro", "Tom", "Scooby", "Bruno"],
            correct: 0
        },
          
          {
            question: "In Doraemon, what is Doraemon’s favorite snack?",
            options: ["Dorayaki", "Pizza", "Ice Cream", "Biscuit"],
            correct: 0
        },
          {
            question: "Mickey Mouse belongs to which company?",
            options: ["Warner Bros"," Disney"," Nickelodeon","  Cartoon Network "],
            correct: 1
        },
          {
            question: "Tom & Jerry are…",
            options: [" Friends", " Brothers", " Rivals "," Teachers"],
            correct: 2
        },
          {
            question:"What is name of Oggy's cousin?",
            options: [" Bob", " James", " Joey "," Jack"],
            correct: 3
        },
    ],

    sports: [
        {
            question: "How many players in football team?",
            options: ["9", "10", "11", "12"],
            correct: 2
        },
        {
            question: "Which sport uses bat and ball?",
            options: ["Tennis", "Cricket", "Football", "Hockey"],
            correct: 1
        },
         {
            question: "Who has scored the most Test runs for India?",
            options: ["Virat Kohli", " Sachin Tendulkar "," Rahul Dravid "," Sourav Ganguly"],
            correct: 0
        },
         {
            question: "India won the Cricket World Cup in which year?",
            options: [" 1983 ", "1992 ","2007 ", "2011 "],
            correct: 0
        },
         {
            question: "What position does Sunil Chhetri play?",
            options: ["Goalkeeper","Defender","Midfielder","Forward"],
            correct: 3
        },
         {
            question: "Sunil Chhetri is one of the most highest international gaol score after?",
            options: ["Neymar & Mbappe", "Ronaldo & Messi", "Pele & Maradona", "Rooney & Zlatan"],
            correct: 1
        },


    ],
};

function startGame() {

    currentPlayer = document.getElementById("playerName").value;
    let selected = document.querySelector('input[name="category"]:checked');

    if (currentPlayer === "") {
        alert("Please enter your name!");
        return;
    }

    if (!selected) {
        alert("Please select a category!");
        return;
    }

    selectedCategory = selected.value;
    currentQuestions = questions[selectedCategory];

    if (!currentQuestions || currentQuestions.length === 0) {
        alert("No questions found!");
        return;
    }

    lives = 3;
    correctAnswers = 0;
    gameActive = true;

    document.getElementById("result").innerHTML = "";
    document.getElementById("leaderboardList").innerHTML = "";

    document.getElementById("welcome").style.display = "none";
    document.getElementById("quiz").style.display = "block";
    document.getElementById("gameArea").style.display = "block";
    document.getElementById("endScreen").style.display = "none";
    document.getElementById("leaderboardScreen").style.display = "none";

    document.getElementById("categoryTitle").innerHTML =
        "Category: " + selectedCategory.toUpperCase();

    updateLives();
    updateProgress();

    showQuestion();
}

function showQuestion() {

    if (!gameActive) return;

    clearInterval(timer);

    let randomIndex = Math.floor(Math.random() * currentQuestions.length);
    let q = currentQuestions.splice(randomIndex,1)[0];

    document.getElementById("question").innerHTML = q.question;

    let buttons = document.querySelectorAll("#gameArea button");

    for (let i = 0; i < 4; i++) {
        buttons[i].innerHTML = q.options[i];
        buttons[i].setAttribute("data-correct", q.correct);
    }

    startTimer();
}

function startTimer() {

    timeLeft = 15;
    document.getElementById("timer").innerHTML = "Time Left: " + timeLeft;

    timer = setInterval(() => {

        if (!gameActive) {
            clearInterval(timer);
            return;
        }

        timeLeft--;
        document.getElementById("timer").innerHTML = "Time Left: " + timeLeft;

        if (timeLeft <= 0) {
            clearInterval(timer);
            loseLife();
        }

    }, 1000);
}

function startCategory(categoryName){
    // Copy questions fresh every time
    if(categoryName === "Sports") currentQuestions = [...sportsQuestions];
    else if(categoryName === "Movies") currentQuestions = [...moviesQuestions];
    else if(categoryName === "Science") currentQuestions = [...scienceQuestions];
    else if(categoryName === "Cartoon") currentQuestions = [...cartoonQuestions];

    // Reset game stats
    lives = 3;
    correctAnswers = 0;
    xp = 0;
    level = 1;
    gameActive = true;

    document.getElementById("welcome").style.display="none";
    document.getElementById("quiz").style.display="block";
    document.getElementById("endScreen").style.display="none";

    updateLives();
    updateProgress();
    updateXP();
    showQuestion();
}

function submitAnswer() {
    let selected = document.querySelector('input[name="option"]:checked');

    if(!selected) {
        alert("Select an option!");
        return;
    }

    let answer = parseInt(selected.value);

    clearInterval(timer);

    if(answer === window.currentCorrect){
        correctAnswers++;
        document.getElementById("correctSound").play();
        updateXP();
        updateProgress();
        showQuestion();
    } else {
        document.getElementById("wrongSound").play();
        loseLife();
    }

    // Reset selection for next question
    selected.checked = false;
}



function checkAnswer(index) {

    if (!gameActive) return;

    clearInterval(timer);

    let correctIndex = document.querySelector("#gameArea button")
        .getAttribute("data-correct");

    if (index == correctIndex) {
        correctAnswers++;
        document.getElementById("result").innerHTML = "Correct! 🎉";
        updateProgress();

        if (correctAnswers === 6) {
            endGame(true);
            return;
        }

        setTimeout(() => {
            document.getElementById("result").innerHTML = "";
            showQuestion();
        }, 800);

    } else {
        loseLife();
    }
}

function loseLife() {

    lives--;
    updateLives();
    document.getElementById("result").innerHTML = "Wrong! 💔";

    if (lives <= 0) {
        setTimeout(() => endGame(false), 800);
        return;
    }

    setTimeout(() => {
        document.getElementById("result").innerHTML = "";
        showQuestion();
    }, 800);
}

function updateLives() {
    let hearts = "";
    for (let i = 0; i < lives; i++) hearts += "❤️ ";
    document.getElementById("lives").innerHTML = hearts;
}

function updateProgress() {
    document.getElementById("progress").innerHTML =
        "Correct: " + correctAnswers + " / 6";
}

function endGame(isWinner) {

    gameActive = false;
    clearInterval(timer);

    players.push({
        name: currentPlayer,
        score: correctAnswers,
        category: selectedCategory
    });

    document.getElementById("gameArea").style.display = "none";
    document.getElementById("endScreen").style.display = "block";

    document.getElementById("finalMessage").innerHTML =
        isWinner ? "🏆 YOU WIN!" : "💀 GAME OVER!";

    document.getElementById("finalScore").innerHTML =
        "Final Score: " + correctAnswers;
}

function showLeaderboard() {

    document.getElementById("endScreen").style.display = "none";
    document.getElementById("leaderboardScreen").style.display = "block";

    players.sort((a, b) => b.score - a.score);

    let html = "";

    for (let i = 0; i < players.length; i++) {
        html += "<p>" + (i + 1) + ". " +
            players[i].name + " (" +
            players[i].category + ") - " +
            players[i].score + "</p>";
    }

    document.getElementById("leaderboardList").innerHTML = html;
}

function restartGame() {

    document.getElementById("quiz").style.display = "none";
    document.getElementById("welcome").style.display = "block";

    document.querySelectorAll('input[name="category"]')
        .forEach(r => r.checked = false);

    document.getElementById("playerName").value = "";
}