const mongoose = require("mongoose");
const schema = mongoose.Schema({
  title: String,
  content: String,
});
export default mongoose.model("Post", schema);
