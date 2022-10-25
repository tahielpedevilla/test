const statik = require("node-static");

const file = new statik.Server("./public");

require("http")
  .createServer(function (request, response) {
    request
      .addListener("end", function () {
        file.serve(request, response, function (err, res) {
          if (err) {
            // An error has occurred
            console.error(
              "> Error serving " + request.url + " - " + err.message
            );
            response.writeHead(err.status, err.headers);
            response.end();
          } else {
            // The file was served successfully
            console.log("> " + request.url + " - " + res.message);
          }
        });
      })
      .resume();
  })
  .listen(8000);

console.log("> node-static is listening on http://127.0.0.1:8000");
