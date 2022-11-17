const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const locationSchema = new Schema({
  modelo: String,
  localizacao: String,
  rec: String,
  data: String,
});

const locationRf = mongoose.model("devices", locationSchema);
module.exports = locationRf;
