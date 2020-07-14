import knex from "knex";

const env = process.env.NODE_ENV || "development";
const config = require("../../knexfile.ts")[env];

export const db = knex(config);
