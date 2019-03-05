var game ={
    word : ["adult", "aircraft", "alphabet",
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
        "xylophone","yacht","zombie"],
    soundArray:["FF7","mario","metal","zelda"],
    win:0,
    count:16,
    startCount:16,
    computerChoose:"",
    screenWord:"",
    userChoose:"",
    answer:"",
    backSound:"",

    random:function() {  /* random choice of computer for new game */
        var computerIndex=Math.floor(Math.random()*this.word.length);
        this.computerChoose=this.word[computerIndex];
        this.answer=this.computerChoose; //Save the answer;
    },

    makeBlank:function() { /* screen clear for new game */
        this.userChoose="";
        this.screenWord="";
        for(var i=0;i<this.computerChoose.length;i++) {
           this.screenWord=this.screenWord+"-";
        }
    }, 

    init:function() { /* the set of starting game */
        this.random();
        this.makeBlank();
    },

    initCount:function() { /* count reset for new game */
        this.count=16; 
        document.getElementById("start").textContent="Press any key to start next game!!";
    },

    write:function(){  /* rewrite all information for new game */
        document.getElementById("win").textContent=this.win;
        document.getElementById("count").textContent="";
        document.getElementById("screen").textContent="";
        document.getElementById("guess").textContent=this.userChoose;
    },

    newGame:function() { /* the set of starting new game */
        this.init();
        this.initCount();
        this.write();
    },

    startMessage:function(){ /*message is changed when new game starts */
        document.getElementById("WinLose").textContent="";
        document.getElementById("start").textContent="Guess the word!!";
        document.getElementById("screen").textContent=this.screenWord;
        document.getElementById("count").textContent=this.count;
        document.getElementById("changeImg").src="assets/images/wonder.jpg";
    },

    soundStart:function() { /* music starts during the game */
        var computerIndex=Math.floor(Math.random()*this.soundArray.length);
        this.backSound=this.soundArray[computerIndex];
        document.getElementById("music").src="assets/music/"+this.backSound+".mp3";
        document.getElementById("music").loop="loop"
        document.getElementById("music").play();
    },

    pressStart:function(){ /* the set when press any key to start game */
        this.count--;
        this.startMessage();
        this.soundStart();
    },

    isAlpha:function(userKey) { /* check if key is alphabet */
        return "abcdefghijklmnopqrstuvwxyz".split("").indexOf(userKey)>=0;
    },

    isNotSameKey:function(userKey) { /* check if you press the same key before */
        return game.userChoose.indexOf(userKey)<0 && game.screenWord.indexOf(userKey)<0;
    },

    isNotMatched:function(userKey){ /* check if you press unmatched key */
        return game.computerChoose.indexOf(userKey)<0;
    },

    typeofKey:function(type) { /* check the validation of key */
        if(type==="alpha") {
            document.getElementById("wrong").textContent=""; 
            document.getElementById("changeImg").src="assets/images/wonder.jpg";
        } else if(type==="same") {
            document.getElementById("wrong").textContent="You already pressed the same key before."; 
        } else {
            document.getElementById("wrong").textContent="Wrong Input!! You should input Alpahbet(a-z)";
        }  
    }, 

    wrongPress:function(userKey) { /*if you press unmatched key */ 
        this.userChoose=this.userChoose+userKey;
    },

    rightPress:function(userKey) { /*if you press matched key */ 
        for(var i=0; i<this.computerChoose.length;i++) { /*for case when the number of matched character is more than 1. */
            var correctPos = this.computerChoose.indexOf(userKey);
            if(correctPos>=0) { /* screenWord is changed like _a_ and computerChoose is changed like c_r. */ 
                this.screenWord=this.screenWord.substr(0,correctPos)+this.computerChoose[correctPos]+this.screenWord.substr(correctPos+1);
                this.computerChoose=this.computerChoose.substr(0,correctPos)+"-"+this.computerChoose.substr(correctPos+1);  
            }
        }
    },

    endingSound:function(m) { /* when game ends, music is changed */
        if(m=="win") {
            document.getElementById("music").src="assets/music/"+this.backSound+"win"+".mp3"; 
        } else {
            document.getElementById("music").src="assets/music/"+this.backSound+"lose"+".mp3";
        }
        document.getElementById("music").loop="";
        document.getElementById("music").play();
    },

    message:function(m) { /*if game ends, you can see this message and picture */
        if(m=="win") {
            document.getElementById("changeImg").src="assets/images/"+this.answer+".jpg";
            document.getElementById("WinLose").textContent="Good job! Keep it up!"
        } else {
            document.getElementById("changeImg").src="assets/images/laugh.jpg";
            document.getElementById("WinLose").textContent="You are idiot!! The answer was "+this.answer+"!!";
        }
    },

    winCase:function() { /* the set of winning case */
        this.win++;
        this.endingSound("win");
        this.message("win");
        this.newGame();
    },

    loseCase:function(){ /* the set of winning case */
//      lose++;
        this.endingSound("lose");
        this.message("lose");
        this.newGame();
    },

    onGame:function() { /* during the game */
        var userString="";
        document.getElementById("screen").textContent=this.screenWord;
        document.getElementById("count").textContent=this.count;
        for (var i=0;i<this.userChoose.length;i++) {
            userString=userString+this.userChoose[i];
            if(i!=this.userChoose.length-1) {
                userString=userString+", ";
            }
        }
        document.getElementById("guess").textContent=userString;
    },

    checkCase:function(){ /* check the status (win, lose, ongame) */
        if(this.screenWord===this.answer) { /* if you find the answer */
            this.winCase();
        } else { /*if you didn't, */
            this.count--;
            if(this.count===0) {   /* When count is 0, then you lose. */
                this.loseCase();
            } else {
                this.onGame();
            }
        }
    }
};

/* before game starts */
game.init();

 /*if you press keyboard, */
 document.onkeyup=function(event) {
     if(game.count===game.startCount) { /* wait for pressing any key to start */
        if (event.key!="F5") {
            game.pressStart(); /*game starts*/
        }
     } else { /*after press any key to start game */ 
        var userKey=event.key.toLowerCase();   /*get pressing key information */
        if(game.isAlpha(userKey)) { /*if you press alphabet */
            game.typeofKey("alpha");
            if(game.isNotSameKey(userKey)) { //if you don't press the same button before,
                if(game.isNotMatched(userKey)) { //if you didn't press the mathced key inside of answer,
                    game.wrongPress(userKey);
                } else { //if you press the mathced key inside of answer,
                    game.rightPress(userKey);
                }
                game.checkCase(); /* check if game is win, lose or on game */
            } else {
                game.typeofKey("same"); /*if you press same key before*/
            }
        } else { //if you didn't press alphabet,
            game.typeofKey("etc");
        }
     }  
 }