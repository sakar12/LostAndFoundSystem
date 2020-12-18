const express = require("express");

const db = require("../db");

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    let results = await db.all(req.query.type);
    res.json(results);
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
});

router.get("/completed", async (req, res, next) => {
  try {
    let results = await db.completedItems();
    res.json(results);
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
});

router.get("/filterCompleted", async (req, res, next) => {
  try {
    let results = await db.filterCompletedItems(req.query.type);
    res.json(results);
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
});

//VERIFY STUDENT LOGIN
router.get("/studentLogin", async (req, res, next) => {
  try {
    let results = await db.studentLogin(req.query.uid, req.query.password);
    res.json(results);
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
});

//VERIFY ADMIN LOGIN
router.get("/adminLogin", async (req, res, next) => {
  try {
    let results = await db.adminLogin(req.query.uid, req.query.password);
    res.json(results);
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    let results = await db.one(req.params.id);
    res.json(results);
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
});

router.post("/", async (req, res, next) => {
  try {
    let results = await db.postLost(
      req.query.uid,
      req.query.type,
      req.query.title,
      req.query.description,
      req.query.image,
      req.query.location
    );
    res.json(results);
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
});

module.exports = router;
