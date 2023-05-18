const http = require("http");
const Express = require("./lib/express");
const { getAllUser, createUser } = require("./controllers/userController");
const { getAllFoods } = require("./controllers/foodController");
const { getAllOrders, createOrder } = require("./controllers/orderController");

const httpServer = (req, res) => {
  const app = new Express(req, res);

  //get user
  app.get("/users", getAllUser);

  //create user
  app.post("/users", createUser);

  //get foods
  app.get("/foods", getAllFoods);

  //get orders
  app.get("/orders", getAllOrders);

  //create order
  app.post("/orders", createOrder);
};

http
  .createServer(httpServer)
  .listen(5000, () => console.log("Server is running on port " + 5000));
