const { read } = require("../models/model");

exports.getAllFoods = (req, res) => {
  const foods = read("foods");
  try {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.writeHead(200, { "Content-type": "application/json" });
    res.end(
      JSON.stringify({
        status: 200,
        success: true,
        foods: foods,
      })
    );
  } catch (error) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.writeHead(404, { "Content-type": "application/json" });
    res.end(
      JSON.stringify({ status: 404, success: false, message: error.message })
    );
  }
};
