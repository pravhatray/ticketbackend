const express = require("express");
// const port = 8000;
const cors=require("cors")
const dbConnect = require("../src/config/db");
const UserRoute=require("./Routes/User.route")
const ticketRoute=require("./Routes/ticket.route")



require('dotenv').config();
const PORT = process.env.PORT || 8000;

const app = express();

app.use(cors())
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/user",UserRoute)
app.use("/ticket",ticketRoute)







app.get("/", (req, res) => {
  res.send("ticketing system");
});

app.listen(PORT, async () => {
  await dbConnect()
  console.log(`server started at http://localhost:${PORT}`);
});
