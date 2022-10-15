const sha256 = require('js-sha256');

class KeyValuePair {
  constructor(key, value) {
    this.key = key;
    this.value = value;
    this.next = null;
  }
}

class HashTable {

  constructor(numBuckets = 4) {
    // Your code here
    this.count = 0;
    this.capacity = numBuckets;
    this.data = Array(numBuckets).fill(null);
  }

  hash(key) {
    // Your code here
    return parseInt(sha256(key).slice(0,8),16);
  }

  hashMod(key) {
    // Your code here
    return this.hash(key) % this.capacity;

  }

  insertNoCollisions(key, value) {
    // Your code here
    let keyValuePair = new KeyValuePair(key,value)
    let dataBucketLocation = this.hashMod(key)
    if (this.data[dataBucketLocation]) {
      throw Error('hash collision or same key/value pair already exists!');
    } else {
      this.data[dataBucketLocation] = keyValuePair;
      this.count++      
    }
  }

  insertWithHashCollisions(key, value) {
    // Your code here
    let keyValuePair = new KeyValuePair(key,value)
    let dataBucketLocation = this.hashMod(key)
    this.count++
    if (this.data[dataBucketLocation]) {
      let prev = this.data[dataBucketLocation];
      this.data[dataBucketLocation] = keyValuePair;
      this.data[dataBucketLocation].next = prev;
    } else {
      this.data[dataBucketLocation] = keyValuePair;            
    }
  }

  insert(key, value) {
    // Your code 
    let keyValuePair = new KeyValuePair(key,value)
    let dataBucketLocation = this.hashMod(key)
    
    if (this.data[dataBucketLocation]) {
      // search for same key
      let storedKeyValuePair = this.data[dataBucketLocation]
      while (storedKeyValuePair !== null
            && storedKeyValuePair.key !== key) {
        storedKeyValuePair = storedKeyValuePair.next;
      }
      if (storedKeyValuePair === null) {
        let prev = this.data[dataBucketLocation];
        this.data[dataBucketLocation] = keyValuePair;
        this.data[dataBucketLocation].next = prev;
        this.count++
      } else {
      // (storedKeyValuePair.key === key) {
        storedKeyValuePair.value = keyValuePair.value;
      } ;
    } else {
      this.data[dataBucketLocation] = keyValuePair;
      this.count++            
    }
  }

}


module.exports = HashTable;