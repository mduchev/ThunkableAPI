const mongoose = require("mongoose");
const Schema = mongoose.Schema;
 
const NumberSchema = new Schema({
  value: Number,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});
 
module.exports = mongoose.model("generatedNumber", NumberSchema);