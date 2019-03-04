var word=["adult", "aircraft", "alphabet",
        "backpack", "balloon", "bomb",
        "carrot", "chocolate", "computer",
        "drill", "diamond", "dress",
        "earth", "explosion", "eraser",
        "festival", "finger", "flower",
        "garden", "gateway", "guitar",
        "hammer", "horoscope", "horse",
        "icecream", "insect", "igloo",
        "juice", "jar", "journey",
        "kitchen", "kitten", "knife",
        "library", "liquid", "leaf",
        "milkshake", "mushroom", "meteor", 
        "necklace", "needle", "nail",
        "onion", "ocean", "orange",
        "pillow", "potato", "paper",
        "queen", "quarrel", "question",
        "revolver", "rocket", "rainbow",
        "snake", "star", "skeleton",
        "tennis", "turtle", "tornado",
        "umbrella", "undertaker", "university",
        "vampire", "vendetta", "vegetable",
        "window", "weapon", "widow",
        "xylophone","yacht","zombie"];

 /* variable initialization */
 var win=0;
 //var lose=0;
 var count=16;
 var startCount=16;
 var computerChoose="";
 var screenWord="";
 var userChoose="";
 var answer="";
 var backSound="";

 /* for New game */
 function initCount() {
     count=16; 
     document.getElementById("start").textContent="Press any key to start next game!!";
 }

 /* choice of computer */
 function random() {
     var computerIndex=Math.floor(Math.random()*word.length);
     computerChoose=word[computerIndex];
     answer=computerChoose; //Save the answer;
 }
 
 /* screen clear for new game */
 function makeBlank() {
     userChoose="";
     screenWord="";
     for(var i=0;i<computerChoose.length;i++) {
        screenWord=screenWord+"-";
     }
 }

 /*rewrite all information at the end of game */
 function write(){
     document.getElementById("win").textContent=win;
//     document.getElementById("lose").textContent=lose;
     document.getElementById("count").textContent="";
     document.getElementById("screen").textContent="";
     document.getElementById("guess").textContent=userChoose;
 }

 /* music */
 function sound() {
     var soundArray=["FF7","mario","metal","zelda"];
     var computerIndex=Math.floor(Math.random()*soundArray.length);
     backSound=soundArray[computerIndex];
     document.getElementById("music").src="assets/music/"+backSound+".mp3";
     document.getElementById("music").loop="loop"
     document.getElementById("music").play();
 }

 /* when you win, music is changed */
 function winSound() {
    document.getElementById("music").src="assets/music/"+backSound+"win"+".mp3";
    document.getElementById("music").loop="";
    document.getElementById("music").play();
}

/* when you lose, music is changed */
function loseSound() {
    document.getElementById("music").src="assets/music/"+backSound+"lose"+".mp3";
    document.getElementById("music").loop="";
    document.getElementById("music").play();
}

/* new game start */
function start(){
    document.getElementById("WinLose").textContent="";
    document.getElementById("start").textContent="Guess the word!!";
    document.getElementById("screen").textContent=screenWord;
    document.getElementById("count").textContent=count;
    document.getElementById("changeImg").src="assets/images/wonder.jpg";
}

/*if you press wrong key */ 
function wrongPress(userKey) {
    userChoose=userChoose+userKey;
}

/*if you press matched key */ 
function rightPress(userKey) {
    for(var i=0; i<computerChoose.length;i++) { //for case when the number of matched character is more than 1.
        var correctPos = computerChoose.indexOf(userKey);
        if(correctPos>=0) { //screenWord is changed like _a_ and computerChoose is changed like c_r. 
            screenWord=screenWord.substr(0,correctPos)+computerChoose[correctPos]+screenWord.substr(correctPos+1);
            computerChoose=computerChoose.substr(0,correctPos)+"-"+computerChoose.substr(correctPos+1);  
        }
    }
}

/*if you win, you can see this message */
function winMessage() {
    document.getElementById("changeImg").src="assets/images/"+answer+".jpg";
    document.getElementById("WinLose").textContent="Good job! Keep it up!"
}

/*if you lose, you can see this message */
function loseMessage() {
    document.getElementById("changeImg").src="assets/images/laugh.jpg";
    document.getElementById("WinLose").textContent="You are idiot!! The answer was "+answer+"!!";
}

/* during the game */
function onGame() {
    var userString="";
    document.getElementById("screen").textContent=screenWord;
    document.getElementById("count").textContent=count;
    for (var i=0;i<userChoose.length;i++) {
        userString=userString+userChoose[i];
        if(i!=userChoose.length-1) {
            userString=userString+", ";
        }
    }
    document.getElementById("guess").textContent=userString;
}

/* check type of key */
function typeofKey(num) {
    if(num===0) {
        document.getElementById("wrong").textContent=""; 
        document.getElementById("changeImg").src="assets/images/wonder.jpg";
    } else if(num==1) {
        document.getElementById("wrong").textContent="You already pressed the same key before."; 
    } else {
        document.getElementById("wrong").textContent="Wrong Input!! You should input Alpahbet(a-z)";
    }  
}

 /*start with computer's choice */
 random();
 makeBlank();

 /*if you press keyboard, */
 document.onkeyup=function(event) {
     if(count===startCount) {
        if (event.key!="F5") {
            count--;
            start();
            sound();
        }
     } else {
        var userKey=event.key.toLowerCase();   //get the information of key which is pressing.
        if("abcdefghijklmnopqrstuvwxyz".split("").indexOf(userKey)>=0) {    //if you press alphabet,
            typeofKey(0);
            if(userChoose.indexOf(userKey)<0 && screenWord.indexOf(userKey)<0) { //if you don't press the same button before,
                if(computerChoose.indexOf(userKey)<0) { //if you didn't press the mathced key inside of answer,
                    wrongPress(userKey);
                } else { //if you press the mathced key inside of answer,
                    rightPress(userKey);
                }
                if(screenWord===answer) { //if you match whole character of answer,
                    win++;
                    winSound();
                    winMessage();
                    initCount();
                    random();
                    makeBlank();
                    write();
                } else { //if you didn't, 
                    count--;
                    if(count===0) {   //When count is 0, then you lose. And new game starts.
//                      lose++;
                        loseSound();
                        loseMessage();
                        initCount();
                        random();
                        makeBlank();
                        write();
                    } else {
                        onGame();
                    }
                }
            } else {
                typeofKey(1);
            }
        } else { //if you didn't press alphabet,
            typeofKey(2);
        }
     }  
 }