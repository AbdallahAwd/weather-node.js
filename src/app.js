const express = require("express");
const path = require("path");
const hbs = require("hbs");
const geocode = require("../src/utils/geocode");
const forecast = require("../src/utils/forecast");
const app = express();

//paths
const publicDir = path.join(__dirname, "../public");
const tempDir = path.join(__dirname, "../templete/views");
const parDir = path.join(__dirname, "../templete/partials");
//load hbs instead of view Engine
app.set("view engine", "hbs");
//change built in named directory views to this path
app.set("views", tempDir);
//register parthials path
hbs.registerPartials(parDir);
//To  give the clint the permission to see this path which is public css and js
app.use(express.static(publicDir));
//handlebars//
//render to meake html pages dynamic pages
app.get("/", (req, res) => {
  res.render("index", {
    title: "Weather",
    name: "Abdullah",
  });
});
//setup routes to another dynamic pages
app.get("/about", (req, res) => {
  res.render("about", {
    title: "About",
    name: "Abdullah",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help",
    name: "Abdullah",
  });
});
app.get("/weather", (req, res) => {
  if (req.query.address) {
    return geocode(
      req.query.address,
      (error, { latitude, longitude, location } = {}) => {
        if (error) {
          return res.send({ error });
        }
        forecast(latitude, longitude, (error, forecastData) => {
          if (error) {
            return res.send({ error });
          }
          res.send({
            latitude,
            longitude,
            location,
            forecast: forecastData,
          });
        });
      }
    );
  }
  res.send({
    error: "Address have ot passed",
  });
});
app.get("/help/*", (req, res) => {
  res.render("error", {
    error: "Help article not found",
  });
});
app.get("/*", (req, res) => {
  res.render("error", {
    title: "404",
    error: "Page Not Found",
    name: "Abdullah",
  });
});

app.listen(3000, () => console.log(`Example app listening on port 3000!`));
