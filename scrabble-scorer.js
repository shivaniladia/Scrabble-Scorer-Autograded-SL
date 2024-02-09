// This assignment is inspired by a problem on Exercism (https://exercism.org/tracks/javascript/exercises/etl) that demonstrates Extract-Transform-Load using Scrabble's scoring system. 

const input = require("readline-sync");

const oldPointStructure = {
  1: ['A', 'E', 'I', 'O', 'U', 'L', 'N', 'R', 'S', 'T'],
  2: ['D', 'G'],
  3: ['B', 'C', 'M', 'P'],
  4: ['F', 'H', 'V', 'W', 'Y'],
  5: ['K'],
  8: ['J', 'X'],
  10: ['Q', 'Z']
};

function oldScrabbleScorer(word) {
	word = word.toUpperCase();
	let letterPoints = "";
 
	for (let i = 0; i < word.length; i++) {
 
	  for (const pointValue in oldPointStructure) {
 
		 if (oldPointStructure[pointValue].includes(word[i])) {
			letterPoints += `Points for '${word[i]}': ${pointValue}\n`
		 }
 
	  }
	}
	return letterPoints;
 }

// your job is to finish writing these functions and variables that we've named //
// don't change the names or your program won't work as expected. //
/////let firstInput = "";
function initialPrompt() {
   console.log("Let's play some scrabble! :");
   let word = input.question("Enter a word to score: ");
   let result = oldScrabbleScorer(word);
   console.log(result);
}

let simpleScorer = function(word) {
 word = word.toUpperCase();	
   let wordPoints = 0;   
   for (let i = 0; i < word.length; i++) {
      wordPoints += 1  ;
   }
   return wordPoints;
 }

 let vowelBonusScorer = function(word) {
	
   let wordPoints = 0;
   let vowels =  ['A', 'E', 'I', 'O', 'U'];
   for (let i = 0; i < word.length; i++) {
      if (vowels.includes(word[i].toUpperCase())) {
         wordPoints += 3;
      } else {
         wordPoints += 1;
      }  
 }
 return wordPoints;
}
console.log (vowelBonusScorer("ae"));

let scrabbleScorer = function(word){
   let score = 0;
for (let i = 0; i < word.length; i++){
   score += newPointStructure[word[i].toLowerCase()];
}

   return score;
};

const scoringAlgorithms = [
   {
      name: 'Simple Score',
      description: 'Each letter is worth 1 point.',
      // scoringFunction: simpleScorer
      scorerFunction: simpleScorer
   },
   {
      name: 'Bonus Vowels',
      description: 'Vowels are 3 pts, consonants are 1 pt.',
      // scoringFunction: vowelBonusScorer
      scorerFunction: vowelBonusScorer
   },
   {
      name: 'Scrabble',
      description: 'The traditional scoring algorithm.',
      // scoringFunction: scrabbleScorer
      scorerFunction: scrabbleScorer
   }
];

function scorerPrompt() {
   console.log("Let's play some scrabble! :");
   let word = input.question("Enter a word to score: ");
   console.log("Which scoring algorithm would you like to use?" );

   console.log("0 - ", scoringAlgorithms[0].name + scoringAlgorithms[0].description );
   console.log("1 - ", scoringAlgorithms[1].name + scoringAlgorithms[1].description );
   console.log("2 - ", scoringAlgorithms[2].name + scoringAlgorithms[2].description );

   let option = input.question(" Enter 0, 1, or 2:" );
   return {
      word: word,
      option: option
   } 
}

function transform(oldPointStructure) {
   let outputObject = {};
   

   for (let key in oldPointStructure) {
      for (let i = 0; i < oldPointStructure[key].length; i++) {
         outputObject[oldPointStructure[key][i].toLowerCase()] = Number(key);
      }
   }
return outputObject;
}

let newPointStructure = transform(oldPointStructure);

function runProgram() {
  initialPrompt();
  let selections = scorerPrompt();
  let word = selections.word;
  let option = selections.option;
  let score = scoringAlgorithms[option].scorerFunction(word);
  console.log(`Score for '${word}': ${score}`);
}

// Don't write any code below this line //
// And don't change these or your program will not run as expected //
module.exports = {
   initialPrompt: initialPrompt,
   transform: transform,
   oldPointStructure: oldPointStructure,
   simpleScorer: simpleScorer,
   vowelBonusScorer: vowelBonusScorer,
   scrabbleScorer: scrabbleScorer,
   scoringAlgorithms: scoringAlgorithms,
   newPointStructure: newPointStructure,
	runProgram: runProgram,
	scorerPrompt: scorerPrompt
};
