const router = require("express").Router();
const express = require("express");

const mongoose = require("mongoose");
const locationRf = require("../models/LocationRF.js");

router.get("/", async (req, res) => {
  // get data from table devices
  const locationRfData = await locationRf.find();
  res.json(locationRfData);
});

router.post("/add", async (req, res) => {
  const { modelo, localizacao, rec, data } = req.body;
  console.log(req.body);
  const location = { modelo, localizacao, rec, data };

  try {
    await locationRf.create(location);
    res.status(201).json({ msg: "dado enviado com sucesso" });
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

router.get("/location/:location", async (req, res) => {
  const { location } = req.params;

  try {
    const room = await locationRf.find({ localizacao: location });
    if (!room) {
      res.status(424).json({ msg: "Não encontrado" });
      return;
    }
    res.status(200).json(room);
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

router.patch("/:id", async (req, res) => {
  const id = req.params.id;

  const { modelo, localizacao, rec, data } = req.body;

  const idLocation = { modelo, localizacao, rec, data };
  try {
    const updateLoc = await locationRf.updateOne({ _id: id }, location);
    if (updateLoc.matchedCount === 0) {
      res.status(424).json({ msg: "Não encontrado" });
      return;
    }
    res.status(200).json(JSON.stringify(idLocation));
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

router.delete("/delete/:id", async (req, res) => {
  const id = req.params.id;

  try {
    const deleteLoc = await locationRf.deleteOne({ _id: id });
    if (deleteLoc.deletedCount === 0) {
      res.status(424).json({ msg: "Não encontrado" });
      return;
    }
    res.status(200).json({ msg: "Deletado com sucesso" });
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

module.exports = router;
