# MyCustomDB

A **mini SQL-like database engine** built in Node.js. This project simulates basic database functionalities including **INSERT, SELECT, UPDATE, DELETE**, indexing, and command-line interaction via a REPL.  

It’s designed as a learning project to understand **database internals, file storage, indexing, and query parsing** using **object-oriented programming (OOP)** principles.

---

## Project Structure
```
my-custom-db/
├── data/ # Persistent storage for table files (.json)
├── src/
│ ├── engine/ # Core database logic ("The Brain")
│ │ ├── storage.js # Handles reading/writing table data to disk
│ │ ├── indexer.js # Builds and manages indexes for fast lookups
│ │ └── query.js # Processes SELECT, WHERE filters
│ ├── parser/ # SQL parsing logic ("The Translator")
│ │ └── sqlParser.js # Converts SQL-like commands to JS objects
│ ├── interface/ # Command-line interface ("The Dashboard")
│ │ └── repl.js # Interactive REPL for running queries
│ └── app.js # Test drive or API entry point
├── index.js # Main entry point to start the REPL
├── package.json # Project dependencies and scripts
└── README.md # Documentation
```

---

## Features

- **Interactive REPL**: Run commands like a real SQL database.
- **Basic SQL commands**: `INSERT`, `SELECT`, `UPDATE`, `DELETE`.
- **Indexing**: Simple primary key indexing for fast row lookup.
- **Persistence**: Tables are stored as JSON files in `/data`.
- **OOP Design**: Classes for storage, query processing, indexing, and parsing.

---

## Example Usage

```bash
MyCustomDB ready 🚀
mydb> insert into users 1 Gilbert
Inserted
mydb> insert into users 2 Chris
Inserted
mydb> select * from users
┌─────────┬────┬─────────┐
│ (index) │ id │ name    │
├─────────┼────┼─────────┤
│ 0       │ 1  │ Gilbert │
│ 1       │ 2  │ Chris   │
└─────────┴────┴─────────┘
mydb> select name from users where id=1
┌─────────┬─────────┐
│ (index) │ name    │
├─────────┼─────────┤
│ 0       │ Gilbert │
└─────────┴─────────┘
mydb> update users set name=Kamau where id=1
Updated
mydb> delete from users where id=2
Deleted
```
---

## Lessons Learned
During this project, I learned:

Database Internals

How indexing works and why stale indexes break UPDATE operations.

How to filter and select data efficiently using WHERE clauses.

The difference between disk storage and in-memory cache (index).

Using classes to structure storage, parsing, query handling, and REPL.

Importance of modular architecture (engine, parser, interface).

Reading/writing JSON files for persistence.

SQL Parsing

Parsing simple SQL-like commands to objects for execution.

Handling edge cases: UPDATE, DELETE, SELECT *, multiple columns.

Debugging

Identifying issues like stale indexes causing Row not found.

Fixing type mismatches ("1" vs 1) in comparisons.

Understanding parser-output shapes and how they affect downstream logic.

---

## AI Assistance

AI helped identify root causes of issues with update/select commands.

AI suggested index rebuild strategies, parser fixes, and Query.select corrections.

Guidance on structuring OOP code and error handling.

---

## Mistakes & Challenges
Initially, UPDATE and DELETE failed due to stale index usage.

SELECT * returned undefined because the parser returned an array with "*" instead of a string.

Type mismatches in the parser (string vs number) caused row lookups to fail.

Error handling in the REPL was not robust at first, leading to confusing messages.

---

## Improvements & Next Steps
To make this mini DB even better:

Advanced SQL Support:

Multiple WHERE conditions (AND/OR)

JOINs, GROUP BY, and aggregation functions

Transactions: Support BEGIN, COMMIT, ROLLBACK

Persistent Indexing: Save indexes to disk for faster load

Query Optimization: Decide between index lookup vs full scan

Asynchronous Storage: Use fs.promises for large tables

Testing: Add unit and integration tests for all modules

Concurrency & Networking: Make it a simple SQL server with multi-user access

---

## Key Takeaways
Building a mini database engine teaches core programming, data structures, and system design.

OOP and modular structure make it easier to maintain and scale.

AI can be a valuable assistant in debugging, improving architecture, and identifying subtle bugs.

Understanding the difference between memory and disk is critical in DB design.

---

How to Run
```bash
npm install
npm start
```
The REPL will start: mydb> prompt

Enter commands like insert into users 1 Gilbert, select * from users, etc.

---

## Acknowledgements
AI guidance helped debug and optimize the database, particularly index handling and parser fixes.

Inspired by learning database fundamentals and Node.js OOP design.

---

## Author
Gilbert Kamau – Backend Developer | Cloud developer | Ai Enthusiast | Learning database engineering in Node.js


---

This README **documents your project fully**:  

- Structure ✅  
- Features ✅  
- Usage ✅  
- Lessons learned ✅  
- Mistakes ✅  
- AI assistance ✅  
- Future improvements ✅  

---


