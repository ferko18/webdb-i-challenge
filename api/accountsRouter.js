const router = require("express").Router();
const db = require("../data/accounts-model");

router.get("/", async (req, res) => {
  try {
    const actions = await db.find();
    res.status(200).json({ success: true, actions });
  } catch (err) {
    res
      .status(500)
      .json({ success: false, error: "The actions could not be retrived" });
  }
});

module.exports = router