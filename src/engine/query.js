export default class Query {
  // columns: array of strings or "*"
  static select(rows, columns) {
  // handle both "*" as string or ["*"] array
  if (columns === "*" || (Array.isArray(columns) && columns.length === 1 && columns[0] === "*")) {
    return rows;
  }

  return rows.map(row => {
    const res = {};
    columns.forEach(col => {
      res[col] = row[col];
    });
    return res;
  });
}


  // rows: array of objects
  // where: { key, value } object (from fixed parser)
  static where(rows, where) {
    if (!where) return rows;
    return rows.filter(r => r[where.key] === where.value);
  }
}
