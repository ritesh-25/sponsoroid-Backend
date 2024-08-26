const express = require("express");
const router = express.Router();
const creatorController = require("../controllers/creator");

router.get("/creator",function(req,res){
res.send("Working Fine");
});

router.post("/creator/register",creatorController.register);
router.post("/creator/login",creatorController.login);
router.get("/creator/getAll",creatorController.getAll);
module.exports = router;