// BUILD DECK
const faces = [..."A23456789TJQK"]; // T is Ten
const suits = [..."SCDH"];

const deck = [];
faces.forEach(face=>suits.forEach(suit=>deck.push(face + suit)))

// Define the queries
const isRed = (card) => 'DH'.indexOf(card[1]) !== -1;
const isFace = (card) => 'JQK'.indexOf(card[0]) !== -1;
const isAceOfSpades = (card) => card === 'AS';

const not = (query) => {
  return (card) => !query(card)
}

// For each query
[
  isRed,
  isFace,
  isAceOfSpades
].forEach(query => {

  const inGroup = deck.filter(query);
  const outGroup = deck.filter(not(query))

  let probabilitySum = 0;

  // Measure the probability of guessing the right card,
  // given the answer to the query.
  deck.forEach(randomSelection => {
    const guesses = query(randomSelection) ? inGroup : outGroup;

    let right = 0;
    let wrong = 0;
    let tries = 0;

    guesses.forEach(guess=>{
      if (guess === randomSelection) {
        right++;
      } else {
        wrong++;
      }
      tries++;
    });

    probabilitySum += right / tries;

  });

  // Display the average probability of choosing correctly.
  console.log(query.name);
  console.log(` - Average probability of being right:  \t${probabilitySum / deck.length * 100}%`);
});