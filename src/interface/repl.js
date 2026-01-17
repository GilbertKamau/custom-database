import readline from "readline";
import Storage from "../engine/storage.js";
import Indexer from "../engine/indexer.js";
import Query from "../engine/query.js";
import SQLParser from "../parser/sqlParser.js";

export default class REPL {
  constructor() {
    this.tables = {};
    this.indexes = {};
    this.rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
      prompt: "mydb> "
    });
  }

  loadTable(name) {
    if (!this.tables[name]) {
      const storage = new Storage(name);
      const indexer = new Indexer("id");
      indexer.build(storage.readAll());

      this.tables[name] = storage;
      this.indexes[name] = indexer;
    }
    return {
      storage: this.tables[name],
      indexer: this.indexes[name]
    };
  }

  start() {
    console.log("MyCustomDB ready 🚀");
    this.rl.prompt();
    this.rl.on("line", line => this.execute(line));
  }

  execute(input) {
  try {
    const cmd = SQLParser.parse(input);
    if (!cmd) throw new Error("Invalid command");

    const { storage, indexer } = this.loadTable(cmd.table);

    // 🔑 Always rebuild index before writes
    if (["insert", "update", "delete"].includes(cmd.type)) {
      indexer.build(storage.readAll());
    }

    if (cmd.type === "insert") {
      const [id, name] = cmd.values;
      storage.insert({ id, name }, indexer);
      console.log("Inserted");
    }

    if (cmd.type === "update") {
      storage.update(cmd.pk, { [cmd.field]: cmd.value }, indexer);
      console.log("Updated");
    }

    if (cmd.type === "delete") {
      storage.delete(cmd.pk, indexer);
      console.log("Deleted");
    }

    if (cmd.type === "select") {
      let rows = storage.readAll();
      if (cmd.where) rows = Query.where(rows, cmd.where);
      rows = Query.select(rows, cmd.columns);
      console.table(rows);
    }

  } catch (e) {
    console.error("Error:", e.message);
  }

  this.rl.prompt();
}
}