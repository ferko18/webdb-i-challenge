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

//post endpoint 

router.post("/", async (req, res) => {
    try {
        // console.log(req.body)
    const { name, budget } = req.body;
    const newEntry = req.body;
    if (!name || !budget) {
    res.status(400).json({errorMessage: "Please provide name and budget"});
    
    } else {
    const entry = await db.add(newEntry);
    res.status(201).json({success: true, entry});
    }
    
    } catch {
    res.status(500).json({
    success: false,
    error: "could not be saved to the database"
    });
    }
    });


//put end point 
router.put('/:id', async (req, res)=>{
    const { name, budget } = req.body;
          if (!name || !budget) {
              return res.status(400).json({
                errorMessage: "Please provide name and budget "
              });}
      try{
        const { id } = req.params;
        const incomingChanges = req.body;
        const updatedEntry = await db.update(id, incomingChanges);
        if (!updatedEntry){
          res.status(404).json({
                    success: false,
                    message: " the specified Id does not exist."
                  });
        }else{
          res.status(201).json({
                  success: true,
                  updatedEntry
                });
        }
    
      }
      catch(err){
        res.status(500).json({
                error: err,
                errorMessage: "could not be updated."
              });
      }
    })
module.exports = router;
