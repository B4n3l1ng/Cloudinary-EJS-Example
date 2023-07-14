const router = require("express").Router();
const Celebrity = require("../models/Celebrity.model");
const uploader = require("../config/cloudinary.config.js");

// all your routes here
router.get("/", async (req, res) => {
  try {
    const celebrities = await Celebrity.find();
    res.render("celebrities/celebrities", { celebrities });
  } catch (error) {
    console.log(error);
  }
});

router.get("/create", (req, res) => {
  res.render("celebrities/new-celebrity");
});

router.post("/create", uploader.single("imageUrl"), async (req, res) => {
  const { name, occupation, catchPhrase } = req.body;
  const payload = { name, occupation, catchPhrase };
  if (req.file) {
    payload.image = req.file.path;
  }
  try {
    const newCelebrity = await Celebrity.create(payload);
    res.redirect("/celebrities/");
  } catch (error) {
    console.log(error);
    res.render("celebrities/new-celebrity", {
      errorMessage:
        "There was an error creating a celebrity, please try again.",
    });
  }
});

module.exports = router;
