const { read, write } = require("../models/model");

exports.getAllOrders = (req, res) => {
  try {
    const orders = read("orders");
    const foods = read("foods");
    if (req.query && req.query.userId !== undefined) {
      const filtered = orders.filter(
        (order) => order.userId === Number(req.query.userId)
      );
      let results = [];

      for (let value of filtered) {
        const filteredId = value.foodId;

        for (let key of foods) {
          const foodId = key.foodId;
          if (filteredId === foodId) {
            results.push({
              userId: value.userId,
              count: value.count,
              food: key,
            });
          }
        }
      }
      res.setHeader("Access-Control-Allow-Origin", "*");
      res.writeHead(200, { "Content-type": "application/json" });
      res.end(JSON.stringify({ status: 200, success: true, results }));
    }
  } catch (error) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.writeHead(404, { "Content-type": "application/json" });
    res.end(
      JSON.stringify({ status: 404, success: false, message: error.message })
    );
  }
};

exports.createOrder = async (req, res) => {
  let orders = read("orders");

  try {
    const newOrder = JSON.parse(await req.body);

    let existUser = orders.filter((u) => u.userId == +newOrder.userId);

    if (existUser.length == 0) {
      orders.push(newOrder);
      write("orders", orders);
    } else if (existUser.length > 0) {
      const existFood = existUser.filter((f) => f.foodId == newOrder.foodId);

      if (existFood.length !== 0) {
        const data = orders.filter((e) => e.foodId != newOrder.foodId);
        data.push({ ...existFood[0], count: newOrder.count });
        write("orders", data);
      } else {
        orders.push(newOrder);
        write("orders", orders);
      }
    }

    res.setHeader("Access-control-allow-origin", "*");
    res.writeHead(201, { "content-type": "application/json" });
    res.end(JSON.stringify({ status: 201, success: true }));
  } catch (error) {
    res.setHeader("content-type", "application/json");
    res.end(JSON.stringify([{ error: error.message }]));
  }
};
