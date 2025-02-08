import { BloomFilter } from './bloom-filter.js';

const WORDS = 8000
const SIZE = 100_000

function genRandomStrings(cantidad: number): Set<string> {
  const strings = new Set<string>();
  while (strings.size < cantidad) {
    const longitud = Math.floor(Math.random() * 10) + 5;
    let cadena = '';
    for (let i = 0; i < longitud; i++) {
      cadena += String.fromCharCode(Math.floor(Math.random() * 26) + 97);
    }
    strings.add(cadena);
  }
  return strings;
}

function runTest(arraySize: number, hashFunctions: number) {
  const bloomFilter = new BloomFilter(arraySize, hashFunctions)
  let falsePositives = 0;
  
  const setOne = genRandomStrings(WORDS)
  const setTwo = genRandomStrings(WORDS)

  setOne.forEach(val => bloomFilter.add(val))
  
  setTwo.forEach(word => {
    const inBloomFilter = bloomFilter.has(word);
    const inSetOne = setOne.has(word);
      
    if (inBloomFilter && !inSetOne) falsePositives++;
  });
  
  console.log("#".repeat(20))
  console.log(`- Cantidad de funciones hash: ${hashFunctions}`)
  console.log(`- Falsos positivos: ${falsePositives}`);
  console.log(`- Correctos: ${WORDS - falsePositives}`);
  console.log(`- % error: ${(falsePositives/WORDS) * 100}`);
  console.log("#".repeat(20))
  console.log()
  console.log()
}

runTest(SIZE, 1);
runTest(SIZE, 3);
runTest(SIZE, 50);

const optimK = Math.round(((SIZE*1.0)/WORDS) * Math.LN2);
runTest(SIZE, optimK);
