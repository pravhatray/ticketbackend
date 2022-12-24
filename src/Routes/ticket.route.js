const express = require("express");
const ticketSchema=require("../Models/ticket.model")
const app = express.Router();



app.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    let ticketItem = await ticketSchema.findById(id)
    res.status(200).send(ticketItem);
  } catch (er) {
    return res.status(404).send({ msg: er });
  }
});




app.post("/", async (req, res) => {
    try {
      let ticket = new ticketSchema({ ...req.body });
      await ticket.save();
      res.status(200).send(ticket);
    } catch (er) {
      return res.status(500).send({ msg: er.message });
    }
  });
  
  app.get("/", async (req, res) => {
    try {
      let ticket = await ticketSchema.find();
      res.status(200).send(ticket);
    } catch (er) {
      return res.status(404).send({ msg: er.message });
    }
  });

  app.delete("/:id",async(req,res)=>{
    try {
      const id = req.params.id;
      let afterDelete = await ticketSchema.findByIdAndDelete(id);
      return res.status(200).send(afterDelete);
  } catch (e) {
      res.status(401).send(e.message);
  }
  })


module.exports = app;
