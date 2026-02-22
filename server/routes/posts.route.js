const express = require('express');
const router = express.Router();


router.get("/", (req, res)=>{
    res.send("Hello World 1_24_3 Posts");
})

module.exports = router;