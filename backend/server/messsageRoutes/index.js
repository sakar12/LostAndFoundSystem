const moment = require("moment");
const express = require("express");

const db = require("../db");

const router = express.Router();

router.get("/checkFound", async (req, res, next) => {
  try {
    let results = await db.checkFound(req.query.uid, req.query.itemId);
    res.json(results);
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
});

router.post("/", async (req, res, next) => {
  try {
    let results = await db.postMessage(
      req.query.date,
      req.query.uid,
      req.query.itemId,
      req.query.message,
      req.query.sender
    );
    res.json(results);
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
});

//POST TO CLAIMS
router.post("/postClaim", async (req, res, next) => {
  try {
    let results = await db.postClaim(
      req.query.date,
      req.query.uid,
      req.query.itemId
    );
    res.json(results);
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
});

//UPDATE EMAIL AND PHONE
router.put("/updateEmail", async (req, res, next) => {
  try {
    let results = await db.updateEmail(
      req.query.uid,
      req.query.email,
      req.query.phone
    );
    res.json(results);
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
});

router.get("/", async (req, res, next) => {
  try {
    let results = await db.getMessage(req.query.uid);
    res.json(results);
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
});

router.get("/getmessagetest", async (req, res, next) => {
  try {
    let results = await db.getMessage1(req.query.uid);
    res.json(results);
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
});

router.get("/getAdminMessage", async (req, res, next) => {
  try {
    let results = await db.getAdminMessage();
    res.json(results);
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
});

router.get("/itemMessage", async (req, res, next) => {
  try {
    let results = await db.getItemMessage(req.query.uid, req.query.itemId);
    res.json(results);
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
});

router.get("/unreadCount", async (req, res, next) => {
  try {
    let results = await db.getUnreadCount(req.query.uid);
    res.json(results);
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
});

router.get("/adminUnreadCount", async (req, res, next) => {
  try {
    let results = await db.getAdminUnreadCount();
    res.json(results);
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
});

router.put("/updateUnread", async (req, res, next) => {
  try {
    let results = await db.putUpdateUnread(req.query.messageId);
    res.json(results);
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
});

//REJECT ALL CLAIMS
router.put("/rejectClaim", async (req, res, next) => {
  try {
    let results = await db.rejectClaim(req.query.uid, req.query.itemId);
    res.json(results);
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
});

//ACCEPT CLAIM
router.put("/acceptClaim", async (req, res, next) => {
  try {
    let results = await db.acceptClaim(req.query.uid, req.query.itemId);
    res.json(results);
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
});

//SET ITEM STATUS AS COMPLETED
router.put("/itemCompleted", async (req, res, next) => {
  try {
    let results = await db.itemCompleted(req.query.itemId);
    res.json(results);
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
});

//DELETE ITEM
router.put("/deleteItem", async (req, res, next) => {
  try {
    let results = await db.deleteItem(req.query.itemId);
    res.json(results);
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
});

//UPDATE ITEM DETAILS WITH IMAGE
router.put("/updateItem", async (req, res, next) => {
  try {
    let results = await db.updateItem(
      req.query.itemId,
      req.query.title,
      req.query.description,
      req.query.location,
      req.query.image
    );
    res.json(results);
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
});

//UPDATE ITEM DETAILS WITHOUT IMAGE
router.put("/updateItemWithoutImage", async (req, res, next) => {
  try {
    let results = await db.updateItemWithoutImage(
      req.query.itemId,
      req.query.title,
      req.query.description,
      req.query.location
    );
    res.json(results);
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
});

router.get("/search", async (req, res, next) => {
  try {
    let results = await db.search(req.query.key, req.query.currentPage);
    res.json(results);
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
});

router.get("/searchMyItem", async (req, res, next) => {
  try {
    let results = await db.searchMyItem(
      req.query.key,
      req.query.currentPage,
      req.query.uid
    );
    res.json(results);
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
});

router.get("/myItems", async (req, res, next) => {
  try {
    let results = await db.myItems(req.query.uid, req.query.type);
    res.json(results);
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
});

router.get("/getClaims", async (req, res, next) => {
  try {
    let results = await db.getClaims();
    res.json(results);
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
});

router.get("/searchClaims", async (req, res, next) => {
  try {
    let results = await db.searchClaims(req.query.key, req.query.currentPage);
    res.json(results);
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
});

router.get("/getClaimsCompleted", async (req, res, next) => {
  try {
    let results = await db.getClaimsCompleted();
    res.json(results);
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
});

router.get("/getClaimants", async (req, res, next) => {
  try {
    let results = await db.getClaimants(req.query.itemId);
    res.json(results);
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
});

router.get("/getClaimant", async (req, res, next) => {
  try {
    let results = await db.getClaimant(req.query.uid, req.query.itemId);
    res.json(results);
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
});

router.get("/getUserInfo", async (req, res, next) => {
  try {
    let results = await db.getUserInfo(req.query.uid);
    res.json(results[0]);
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
});

module.exports = router;
