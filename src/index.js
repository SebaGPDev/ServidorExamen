const path = require("path");
require("dotenv").config({ path: path.join(__dirname, "..", ".env") });
const app = require("./server");


console.log(process.env.TESTING);

app.listen(app.get("port"), () => {
  console.log("listening on http://localhost:3000");
});
