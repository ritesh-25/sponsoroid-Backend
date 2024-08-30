const express = require("express");
const router = express.Router();
const companyController = require("../controllers/company");
const upload = require("../config/multer");

router.get("/company",function(req,res){
    res.send("Working Fine for company");
});

router.post("/company/register",upload.single('avatar'),companyController.register);
router.post("/company/login",companyController.login);
router.get("/company/getAll",companyController.getAll);   
router.get("/company/getSingle/:id",companyController.getSingle); 
module.exports = router;