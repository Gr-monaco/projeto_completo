const express = require('express');
const router = express.Router();
const Admin = require('../models/Admin.js')
router.post("/",)

router.post('/', getAdminUser, (req, res) => {
    console.log("Get de admin");
    res.json({isAdmin:true});
})


async function getAdminUser(req, res, next){
    let admin;
    try {
        admin = await Admin.find({email: req.body.email});
        console.log(typeof admin);
        
        if(admin.length == 0){
            return res.status(200).json({isAdmin:false})
        }
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }

    res.admin = admin;
    next();
}

module.exports = router;