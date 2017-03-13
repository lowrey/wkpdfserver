const express = require("express");
const path = require("path");
const bodyparser = require("body-parser");
const wkhtmltopdf = require('wkhtmltopdf');

const port = process.env.PORT || 3088;
const prefix = process.env.URL_PREFIX || "";
const app = express();
app.use(bodyparser.json({limit: '50mb'})); 
app.use('/client', express.static('client'))

const resolve = res => (err, result) => err ? res.json(err) : res.json(result);

app.post(prefix + "/pdf/create", (req, res) => {
  const options = req.body.options ? req.body.options : {};
  wkhtmltopdf(req.body.body, options)
      .pipe(res);
}); 

app.get('/', (req, res) => res.redirect('/client/'));

app.get("/*", (req, res) => {
  res.send("Are you lost?");
});

const server = app.listen(port, () => {
    // var host = server.address().address;
  const port = server.address().port;
  console.log("This express app is listening on port:" + port);
});
