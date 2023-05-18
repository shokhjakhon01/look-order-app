const { read, write } = require("../models/model");

exports.getAllUser = (req, res) => {
  try {
    const data = read("users");
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.writeHead(200, { "Content-type": "application/json" });
    res.end(
      JSON.stringify({
        status: 200,
        success: true,
        users: data,
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

exports.createUser = async (req, res) => {
  try {
    const users = read("users");
    const { phone, username } = JSON.parse(await req.body);
    const id = users.at(-1).userId + 1;
    const newUser = {
      userId: id,
      username,
      phone,
    };

    users.push(newUser);
    write("users", users);
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.writeHead(201, { "Content-type": "application/json" });
    res.end(JSON.stringify({ status: 201, success: true, user: newUser }));
  } catch (error) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.writeHead(404, { "Content-type": "application/json" });
    res.end(
      JSON.stringify({ status: 404, success: false, message: error.message })
    );
  }
};
