export default class SQLParser {
  static parse(input) {
    const clean = input.trim().replace(/\s+/g, " ");
    const tokens = clean.split(" ");
    const command = tokens[0]?.toLowerCase();

    if (!command) return null;

    if (command === "insert") {
      // insert into users 1 Gilbert
      if (tokens[1] !== "into") return null;
      return {
        type: "insert",
        table: tokens[2],
        values: [Number(tokens[3]), tokens[4]]
      };
    }

    if (command === "update") {
      // update users set name=Kamau where id=1
      const table = tokens[1];

      const setIndex = tokens.indexOf("set");
      const whereIndex = tokens.indexOf("where");

      if (setIndex === -1 || whereIndex === -1) return null;

      const [field, value] = tokens[setIndex + 1].split("=");
      const [pkField, pkValue] = tokens[whereIndex + 1].split("=");

      return {
        type: "update",
        table,
        field,
        value,
        pk: Number(pkValue)
      };
    }

    if (command === "delete") {
      // delete from users where id=2
      const table = tokens[2];
      const [pkField, pkValue] = tokens[tokens.indexOf("where") + 1].split("=");

      return {
        type: "delete",
        table,
        pk: Number(pkValue)
      };
    }

    if (command === "select") {
      // select name from users where id=1
      return {
        type: "select",
        columns: tokens[1].split(","),
        table: tokens[3],
        where: tokens.includes("where")
          ? { key: tokens[tokens.indexOf("where") + 1].split("=")[0],
              value: Number(tokens[tokens.indexOf("where") + 1].split("=")[1]) }
          : null
      };
    }

    return null;
  }
}



