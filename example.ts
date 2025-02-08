import { BloomFilter } from './bloom-filter.js';

const bloomFilter = new BloomFilter(5, 3);

// Añadimos algunos elementos
bloomFilter.add("Elemento1");
bloomFilter.add("Elemento2");
bloomFilter.add("Elemento3");


console.log(bloomFilter.has("Elemento1"));
console.log(bloomFilter.has("Elemento2"));
console.log(bloomFilter.has("Elemento3"));
console.log(bloomFilter.has("Elemento4"));
