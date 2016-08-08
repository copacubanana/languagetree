/* ======== FRUIT ELEMENTS ==========  */ 

var fruitContainer = document.getElementById('fruitContainer');

/* === INSTRUCTION ELEMENTS: start box, winningbox, gameover startbtn, tryagainbtn,  ===  */ 

var startbox = document.getElementById('startbox');
var winnerbox = document.getElementById('winnerbox');
var gameoverbox = document.getElementById('gameoverbox');

var startbtn = document.getElementById('startbtn');
var tryagainbtn = document.getElementById('tryagainbtn');
var playagainbtn = document.getElementById('playagainbtn');

/* ======== right side elements ==========  */ 

var incorrORcorr = document.getElementById('incorrectorcorrect');
var basket = document.getElementById('basket');
var correctmatches = document.getElementById('correctmatches');
var currentFruitName = document.getElementById('currentfruitname');

var correct = document.getElementById('correct');
var incorrect = document.getElementById('incorrect');

/* ======== EVENT LISTENERS for direction button elements ==========  */ 

startbtn.addEventListener('click', start, false);
tryagainbtn.addEventListener('click', gobacktostartscreen, false);
playagainbtn.addEventListener('click', gobacktostartscreen, false);

/* ======== allows dragging functionality on fruit#div container ==========  */  

/* reset: hides startbox, prevents fruit from being dragged */
var currentNumberofMatches = 0;
var fruitArrSpanish = [];
var fruitArrEnglish = [];

function start() { // onclick start button

fruitArrEnglish = ['banana', 'orange', 'lemon', 'cherries', 'pear', 'watermelon', 'apple',
'grapes', 'strawberry'];

fruitArrSpanish = ['el plátano', 'la naranja', 'el limón', 'la cereza', 'la pera',
'la sandía', 'la manzana', 'las uvas', 'la fresa'];

var childrenOfFruitContainer = document.getElementsByClassName('fruitlocation');
var k = 0;
var i = 0;
currentNumberofMatches = 0; 
correctmatches.textContent = currentNumberofMatches;

// bring back visibility of fruitfadeout by removing class
var fruitFadeOutElements = document.getElementsByClassName('fruitfadeout');

	while (fruitFadeOutElements.length > 0) {
		fruitFadeOutElements[0].setAttribute('class','');
		fruitFadeOutElements[0].setAttribute('id','');
	}
	
	// hide visibility on all directions boxes
	startbox.style.visibility = 'hidden';
	gameoverbox.style.visibility = 'hidden';
	winnerbox.style.visibility = 'hidden';
	
	// show fruitContainer visibility
	fruitContainer.style.visibility = 'visible';
	// set up fruit on tree
	
	for (k ; k < childrenOfFruitContainer.length ; k++) {
		
		var fruitname = document.createElement('DIV');
		childrenOfFruitContainer[k].appendChild(fruitname);
		fruitname.className = 'fruit';
		fruitname.id = fruitArrEnglish[k];
	
	//allow fruit elements to be draggable
		document.getElementById(fruitArrEnglish[k]).setAttribute('draggable', 'true');
	}
	generateFruitName();

}

function gobacktostartscreen() {
	gameoverbox.style.visibility = 'hidden';
	winnerbox.style.visibility = 'hidden';
	startbox.style.visibility = 'visible';
}

function getTarget(e) {
	return e.target;
}

function drag(e) {
	var target = getTarget(e);
    e.dataTransfer.setData('text', target.id);
}

fruitContainer.addEventListener('dragstart' , function(e) { 
		drag(e);
	}, false);
 
/* =========================== allows drop to Fruit Basket ==========  */ 

function allowDrop(e) {
	var target = getTarget(e);
	if (target.id == 'basket') {
    	e.preventDefault();
    }
}

function drop(e) {
	var target = getTarget(e);
	var targetId = target.Id;
	var data = e.dataTransfer.getData('text');
			e.preventDefault();
	if (target.id === 'basket' && checkFruitSpanish(data) === true) {
		target.appendChild(document.getElementById(data));
		currentNumberofMatches += 1;
		correctmatches.textContent = currentNumberofMatches; 
		correct.style.visibility = 'visible';
		document.getElementById(data).setAttribute('class', 'fruitfadeout'); /* make correct fruit fade, */     
    } else { 
		incorrect.style.visibility = 'visible';

    }
	setTimeout(generateFruitName, 1000); /*trigger another fruitname to appear with delay */
	setTimeout(function(){
		correct.style.visibility = 'hidden';  
		incorrect.style.visibility = 'hidden'; 
	}, 900);

}

/* ======== adds Event Listener to Fruit Basket ========== */ 

basket.addEventListener('drop', drop, false);
basket.addEventListener('dragover', allowDrop, false);

/* ======== display different fruit names ========== */ 

function generateFruitName() { //which fruitArr should be the param
	var randomIndex = Math.floor(Math.random() * fruitArrSpanish.length);
	var randFruit = fruitArrSpanish[randomIndex];

	if (fruitArrSpanish.length > 0) {
		currentFruitName.textContent = randFruit; // remove randFruit from array.
		fruitArrSpanish.splice(randomIndex, 1);  
	} else {
		if (currentNumberofMatches == 9) {
			winnerbox.style.visibility = 'visible';
		} else {
			gameoverbox.style.visibility = 'visible';
			document.getElementById('gameovermatchcount').textContent = currentNumberofMatches;
		}
	}
}

/* ======== check if fruit is correct ========== */ 

function checkFruitSpanish(data) {
	var fruitNameInSpanish = currentFruitName.textContent;
	var fruitIdfruitinSpanish = data + ' ' + fruitNameInSpanish;
	switch(fruitIdfruitinSpanish) {
	case 'banana el plátano':
		return true;
		break;
	case 'orange la naranja':
		return true;
		break;
	case 'lemon el limón':
		return true;
		break;
	case 'cherries la cereza':
		return true;
		break;
	case 'pear la pera':
		return true;
		break;
	case 'watermelon la sandía':
		return true;
		break;
	case 'apple la manzana':
		return true;
		break;
	case 'grapes las uvas':
		return true;
		break;
	case 'strawberry la fresa':
		return true;
		break;
	default:
		return false;
	}
}

