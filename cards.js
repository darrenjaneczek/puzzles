// BUILD DECK
const faces = [..."A23456789TJQK"]; // T is Ten
const suits = [..."SCDH"];

const deck = [];
faces.forEach(face=>suits.forEach(suit=>deck.push(face + suit)))


const isRed = (card) => 'DH'.indexOf(card[1]) !== -1;
const isFace = (card) => 'JQK'.indexOf(card[0]) !== -1;
const isAceOfSpades = (card) => card === 'AS';

const not = (query) => {
  return (card) => !query(card)
}

// Probably not a useful measure
[
  isRed,
  isFace,
  isAceOfSpades
].forEach(query => {

  const inGroup = deck.filter(query);
  const outGroup = deck.filter(not(query))

  let wrong = 0;
  let right = 0;
  let tries = 0;


  deck.forEach(randomSelection => {
    const guesses = query(randomSelection) ? inGroup : outGroup;

    guesses.forEach(guess=>{
      if (guess === randomSelection) {
        right += 1;
      } else {
        wrong += 1;
      }
      tries += 1;
    });

  });

  console.log(query.name);
  console.log(` - Guesses:  \t${tries}`);
  console.log(` - Correct:  \t${right} (${right/tries * 100}%)`);
  console.log(` - Incorrect:\t${wrong} (${wrong/tries * 100}%)`);

});


// Possibly the answer
[
  isRed,
  isFace,
  isAceOfSpades
].forEach(query => {

  const inGroup = deck.filter(query);
  const outGroup = deck.filter(not(query))

  let probabilitySum = 0;

  deck.forEach(randomSelection => {
    const guesses = query(randomSelection) ? inGroup : outGroup;

    let right = 0;
    let wrong = 0;
    let tries = 0;

    guesses.forEach(guess=>{
      if (guess === randomSelection) {
        right += 1;
      } else {
        wrong += 1;
      }
      tries += 1;
    });

    probabilitySum += right / tries;

  });

  console.log(query.name);
  console.log(` - Average probability of being right:  \t${probabilitySum / deck.length * 100}%`);
});