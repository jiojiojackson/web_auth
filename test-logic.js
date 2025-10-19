// test-logic.js

function generateRandomNumbers() {
  const numbers = new Set();
  while (numbers.size < 3) {
    numbers.add(Math.floor(Math.random() * 10));
  }
  return Array.from(numbers);
}

function verify(correctNumber, selectedNumber) {
  return correctNumber === selectedNumber;
}

console.log('Running logic test...');

// 1. Generate a challenge
const numbers = generateRandomNumbers();
const correctNumber = numbers[Math.floor(Math.random() * numbers.length)];

console.log(`Generated numbers: ${numbers}`);
console.log(`Correct number: ${correctNumber}`);

// 2. Test with correct number
let selectedNumber = correctNumber;
let success = verify(correctNumber, selectedNumber);
console.log(`Testing with correct number (${selectedNumber})... Success: ${success}`);
if (!success) {
  console.error('Test failed: Correct number was not verified.');
  process.exit(1);
}

// 3. Test with incorrect number
selectedNumber = numbers.find(n => n !== correctNumber);
success = verify(correctNumber, selectedNumber);
console.log(`Testing with incorrect number (${selectedNumber})... Success: ${!success}`);
if (success) {
  console.error('Test failed: Incorrect number was verified.');
  process.exit(1);
}

console.log('All logic tests passed!');
