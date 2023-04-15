"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const sqlite3 = __importStar(require("sqlite3"));
const path = __importStar(require("path"));
const userRouter = require("../src/users/controller.ts");
const sqlite3Verbose = sqlite3.verbose();
exports.app = (0, express_1.default)();
exports.app.use(express_1.default.json());
const dbPath = path.join(__dirname, "myDatabase.db");
const db = new sqlite3Verbose.Database("myDatabase.db");
exports.app.use("/api/v1/users", userRouter);
// app.get("/books", (req, res) => {
//   db.run(
//     "CREATE TABLE IF NOT EXISTS profileDetails (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, email TEXT)",
//     (err) => {
//       if (err) {
//         return console.error(err.message);
//       }
//       console.log("Books table created successfully");
//       res.send("Books table created successfully");
//     }
//   );
// });
const add = (a, b) => {
    return a + b;
};
// app.post("/books", (req:any, res) => {
//   const { name, email } = req.body;
//   const insertQuery = `INSERT INTO profileDetails (name, email) VALUES ('${name}', '${email}')`;
//   db.run(insertQuery, (err) => {
//     if (err) {
//       return console.error(err.message);
//     }
//     console.log(`Row inserted successfully: ${name}, ${email}`);
//     res.send(`Row inserted successfully: ${name}, ${email}`);
//   });
// });
exports.app.listen(3000, () => {
    console.log("Server is running at port 3000");
});
