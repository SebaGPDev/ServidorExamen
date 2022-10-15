const path = require("path");
require("dotenv").config({ path: path.join(__dirname, "..", ".env") });
const app = require("./server");

const port = process.env.PORT || process.env.PORT_DEFAULT;


app.listen(port, () => {
  console.log("listening on http://localhost:3000");
});
