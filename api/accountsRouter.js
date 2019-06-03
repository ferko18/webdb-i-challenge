const router = require("express").Router();
const db = require("../data/accounts-model");

//get all
router.get("/", async (req, res) => {
  try {
    const entry = await db.find();
    res.status(200).json({ success: true, entry });
  } catch (err) {
    res.status(500).json({ success: false, error: " could not be retrived" });
  }
});

//get by id
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const entry = await db.findById(id);

    if (!entry) {
      res.status(404).json({
        error: "The entry with the specified ID does not exist"
      });
    } else {
      res.status(200).json({
        success: true,
        entry
      });
    }
  } catch (err) {
     res.status(500).json({
      success: false,
      error: " could not be retrieved"
    });
  }
});

module.exports = router;
