const express = require("express");
const router = express.Router();
const companyController = require("../controllers/company");

router.get("/company",function(req,res){
    res.send("Working Fine for company");
});

router.post("/company/register",companyController.register);
router.post("/company/login",companyController.login);
router.get("/company/getAll",companyController.getAll);    
module.exports = router;