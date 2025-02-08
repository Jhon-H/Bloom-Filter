import { murmurHash } from "ohash";

/**
 * Algoritmo BloomFilter - Link https://es.wikipedia.org/wiki/Filtro_de_Bloom
 * BloomFilter es una estrcuctura probabilística para validar rápidamente si un elemento pertenece a un conjunto.
 * Es muy eficiente en espacio O(1) y tiempo O(1), pero puede generar **falsos positivos**
 * 
 * @example
 * const bloomFilter = new BloomFilter()
 * bloomFilter.add("Cadena1") // Agrega el elemento "Cadena1"
 * bloomFilter.add("Cadena2") // Agrega el elemento "Cadena2"
 * console.log(bloomFilter.has("Cadena1")) // true  - El elemento "Cadena1" está en el conjunto
 * console.log(bloomFilter.has("Cadena5")) // false - El elemento "Cadena5" no está en el conjunto
 * console.log(bloomFilter.has("Cadena11")) // true  - Falso positivo (puede marcarlo como presente, aunque no fue añadido)
 */
export class BloomFilter {
  private readonly bloomFilter: boolean[]
  private readonly seeds: number[];

  constructor(
    private readonly arraySize: number = 10,
    private readonly hashFunctions: number = 5
  ) {
    this.bloomFilter = new Array(arraySize).fill(false);
    this.seeds = new Array(this.hashFunctions)

    for(let i=0; i<this.hashFunctions; ++i) {
      this.seeds[i] = Math.round(Math.random() * 10_000)
    }
  }
  
  /**
   * Crea un BloomFilter con una cantidad óptima de funciones hash
   * 
   * @param arraySize - Cantidad de bits del bloomFilter
   * @param maxElements - Maxima cantidad de elementos a almacenar
   */
  static createWithOptimalHash(arraySize: number, maxElements: number): BloomFilter {
    const optimalHashFunctions = Math.ceil(((arraySize * 1.0) / maxElements) * Math.LN2)
    return new BloomFilter(arraySize, optimalHashFunctions)
  }

  private getIndexs(item: string): number[] {
    return this.seeds.map(seed => {
      const hashValue = murmurHash(item, seed);
      return Math.abs(hashValue) % this.arraySize;
    })
  }

  /**
   * Añade un elemento al BloomFilter.
   */
  add(item: string): void {
    const indexs = this.getIndexs(item);
    indexs.forEach(index => {
      this.bloomFilter[index] = true;
    });
  }

  /**
   * Verifica si un elemento está presente en el conjunto.
   * Este método puede dar falsos positivos, pero nunca falsos negativos.
   */
  has(item: string): boolean {
    const indexs = this.getIndexs(item);
    return indexs.every(index => this.bloomFilter[index]);
  }
}
