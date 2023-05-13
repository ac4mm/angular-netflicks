import { Injectable } from "@angular/core";

@Injectable({ providedIn: 'root' })
export class UtilitiesService {

  /****** Math operator Utilities*/

  //Getting a random integer
  getRandomInt(max: number) {
    return Math.floor(Math.random() * max);
  }

  //Getting a random integer between two values, inclusive
  getRandomIntBetweenRange(min = 0, max = 100) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  //Get random word from dictionary
  getRandomWord(arr: any[]) {
    return arr[Math.floor(Math.random() * arr.length)];;
  }


  getMultipleRandItem(arr: any[], num: number) {
    const shuffled = [...arr].sort(() => 0.5 - Math.random());
  
    return shuffled.slice(0, num);
  }

  getRandomRatingNumberFromArray(arr: any[]) {
    // get random index value
    const randomIndex = Math.floor(Math.random() * arr.length);

    // get random item
    return arr[randomIndex];
  }

  getRandomNumberFromArray(arr: any[]) {
    // Shuffle array
    const shuffled = arr.sort(() => 0.5 - Math.random());

    // Get sub-array of first n elements after shuffled
    return shuffled.slice(0, arr.length);
  }

  /* Pick a rand number in [0,1) and iterate over the weight specification summing the weights  
    if the random number is less than the sum then return the associated value. 
    */
  getWeightedRandomNumber(objWithWeight: any) {
    var i, sum = 0, r = Math.random();
    for (i in objWithWeight) {
      sum += objWithWeight[i];
      if (r <= sum) return i;
    }
  }


  /****** Data Structures Utilities*/
  /**
 * @description
 * Takes an Array<V>, and a grouping function,
 * and returns a Map of the array grouped by the grouping function.
 *
 * @param list An array of type V.
 * @param keyGetter A Function that takes the the Array type V as an input, and returns a value of type K.
 *                  K is generally intended to be a property key of V.
 *
 * @returns Map of the array grouped by the grouping function.
 */
  groupBy(list, keyGetter) {
    const map = new Map();
    list.forEach((item) => {
      const key = keyGetter(item);
      const collection = map.get(key);
      if (!collection) {
        map.set(key, [item]);
      } else {
        collection.push(item);
      }
    });
    return map;
  }
}