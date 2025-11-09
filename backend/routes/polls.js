const express = require("express");
const router = express.Router();
const Poll = require("../models/Poll");
const shortid = require("shortid");

// ✅ CREATE a new poll
router.post("/", async (req, res) => {
  try {
    // Get new optional fields from the request body
    const { question, options, multipleAnswers, expiresAt } = req.body;

    if (!question || !options || options.length < 2) {
      return res.status(400).json({ error: "Please provide a question and at least two options." });
    }

    const newPoll = new Poll({
      question,
      options: options.map((text) => ({ text })),
      shortId: shortid.generate(),
      
      // Save new features
      multipleAnswers: multipleAnswers || false,
      expiresAt: expiresAt || null, // Save the date, or null if not provided
    });

    await newPoll.save();
    res.json({ pollId: newPoll.shortId });
  } catch (error) {
    console.error("Error creating poll:", error);
    res.status(500).json({ error: "Failed to create poll" });
  }
});

// ✅ GET a poll by shortId (for viewing)
router.get("/:shortId", async (req, res) => {
  try {
    const poll = await Poll.findOne({ shortId: req.params.shortId });
    if (!poll) return res.status(404).json({ error: "Poll not found" });
    res.json(poll);
  } catch (error) {
    console.error("Error fetching poll:", error);
    res.status(500).json({ error: "Failed to fetch poll" });
  }
});

// ✅ VOTE for an option (or options)
router.post("/:shortId/vote", async (req, res) => {
  try {
    // We now expect an array of indices, e.g. [1] or [0, 2]
    const { optionIndices } = req.body; 
    const poll = await Poll.findOne({ shortId: req.params.shortId });
    const ip = req.ip; // Get the user's IP

    if (!poll) {
      return res.status(404).json({ error: "Poll not found" });
    }

    // --- FEATURE 1: Check Expiration ---
    if (poll.expiresAt && new Date() > poll.expiresAt) {
      return res.status(400).json({ error: "This poll has expired." });
    }

    // --- FEATURE 2: Check IP Address ---
    if (poll.votedIPs.includes(ip)) {
      return res.status(400).json({ error: "You have already voted on this poll." });
    }

    // --- FEATURE 3: Validate Multiple Answers ---
    if (!poll.multipleAnswers && optionIndices.length > 1) {
      return res.status(400).json({ error: "This poll only accepts one answer." });
    }

    // --- Process the vote(s) ---
    let votedSuccessfully = false;
    optionIndices.forEach(index => {
      if (poll.options[index]) {
        poll.options[index].votes += 1;
        votedSuccessfully = true;
      }
    });

    if (!votedSuccessfully) {
      return res.status(400).json({ error: "Invalid option selected." });
    }

    // Add this IP to the list to prevent re-voting
    poll.votedIPs.push(ip);
    
    await poll.save();
    res.json(poll); // Send back the updated poll data

  } catch (error) {
    console.error("Error voting:", error);
    res.status(500).json({ error: "Failed to vote" });
  }
});

module.exports = router;