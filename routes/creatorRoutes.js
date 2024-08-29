const express = require("express");
const router = express.Router();
const creatorController = require("../controllers/creator");
const upload  = require("../config/multer");
router.get("/creator",function(req,res){
res.send("Working Fine");
});

router.post("/creator/register",upload.single("avatar"),creatorController.register);
router.post("/creator/login",creatorController.login);
router.get("/creator/getAll",creatorController.getAll);
module.exports = router;