import fs from "fs";
import path from "path";

export default class Storage {
  constructor(tableName, dataDir = "data", primaryKey = "id") {
    this.tableName = tableName;
    this.primaryKey = primaryKey;
    this.filePath = path.join(process.cwd(), dataDir, `${tableName}.json`);

    if (!fs.existsSync(this.filePath)) {
      fs.writeFileSync(this.filePath, JSON.stringify([]));
    }
  }

  readAll() {
    return JSON.parse(fs.readFileSync(this.filePath, "utf8"));
  }

  writeAll(rows) {
    fs.writeFileSync(this.filePath, JSON.stringify(rows, null, 2));
  }

  insert(row, indexer) {
    if (indexer.has(row[this.primaryKey])) {
      throw new Error("Primary key already exists");
    }
    const rows = this.readAll();
    rows.push(row);
    this.writeAll(rows);
    indexer.build(rows);
  }

  update(pk, updates, indexer) {
  const rows = this.readAll();
  let found = false;

  for (const row of rows) {
    if (row[this.primaryKey] === pk) {
      Object.assign(row, updates);
      found = true;
      break;
    }
  }

  if (!found) throw new Error("Row not found");

  this.writeAll(rows);
  indexer.build(rows); // keep index in sync
}

delete(pk, indexer) {
  const rows = this.readAll();
  const filtered = rows.filter(r => r[this.primaryKey] !== pk);

  if (filtered.length === rows.length) throw new Error("Row not found");

  this.writeAll(filtered);
  indexer.build(filtered); // keep index in sync
}



  delete(pk, indexer) {
  const rows = this.readAll();
  const filtered = rows.filter(r => r[this.primaryKey] !== pk);

  if (filtered.length === rows.length) {
    throw new Error("Row not found");
  }

  this.writeAll(filtered);
  indexer.build(filtered);
}
}