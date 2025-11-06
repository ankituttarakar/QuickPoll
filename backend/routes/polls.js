const express = require("express");
const router = express.Router();
const Poll = require("../models/Poll");
const shortid = require("shortid");

// Create a new poll
router.post("/", async (req, res) => {
  try {
    const { question, options } = req.body;
    const newPoll = new Poll({
      shortId: shortid.generate(),
      question,
      options: options.map((text) => ({ text })),
    });
    await newPoll.save();
    res.json({ pollId: newPoll.shortId });
  } catch (err) {
    console.error("Error creating poll:", err);
    res.status(500).json({ error: "Failed to create poll" });
  }
});

module.exports = router;
