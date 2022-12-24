const mongoose = require("mongoose");

const ticketSchema = new mongoose.Schema(
  {
    caterogy: { type: String, required: true,enum:["Coding","DSA","CSBT","Evaluation"] },
    title: { type: String, required: true },
    message: { type: String, required: true },
  },
  { timestamps: true }
  
);

const Ticket = mongoose.model("ticket", ticketSchema);

module.exports = Ticket;
