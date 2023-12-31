const http = require("http");
const fs = require("fs");
const _ = require("lodash");
const { hostname } = require("os");

let server = http.createServer((req, res) => {
  // lodash
  let num = _.random(100_000, 999_999);
  let array = [];
  array.push(num);
  console.log(...array);

  let hello = _.once(() => {
    console.log("Hello!");
  });

  hello();
  hello();

  // path
  let path = "./www/";

  // switch pages
  switch (req.url) {
    case "/":
      path += "index.html";
      res.statusCode = 200;
      break;
    case "/about":
      path += "about.html";
      res.statusCode = 200;
      break;
    case "/about-me":
      res.statusCode = 301;
      res.setHeader("Location", "/about");
      res.end();
      break;

    default:
      path += "404.html";
      res.statusCode = 404;
      break;
  }

  // resHeader
  res.setHeader("Content-Type", "text/html");

  fs.readFile(path, (err, data) => {
    if (err) {
      console.log(err);
    } else {
      res.write(data);
      res.end();
    }
  });
});

// server.listen(3000, "localhost", () => {
//   console.log("listening on port http://localhost:3000");
// });

server.listen(3000, () => {
  console.log("listening on port http://localhost:3000");
});
