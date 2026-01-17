export default class Indexer {
  constructor(primaryKey) {
    this.primaryKey = primaryKey;
    this.index = new Map();
  }

  build(rows) {
    this.index.clear();
    for (const row of rows) {
      this.index.set(row[this.primaryKey], row);
    }
  }

  find(key) {
    return this.index.get(key);
  }

  has(key) {
    return this.index.has(key);
  }
}
