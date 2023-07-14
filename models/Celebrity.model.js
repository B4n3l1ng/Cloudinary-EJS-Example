const { Schema, model } = require("mongoose");
const celebritySchema = new Schema({
  name: { type: String, required: true },
  occupation: { type: String, required: true },
  catchPhrase: String,
  image: String,
});

const Celebrity = model("Celebrity", celebritySchema);

module.exports = Celebrity;
