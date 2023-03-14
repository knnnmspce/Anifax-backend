const express = require('express');
const { showTitles } = require('../service/home-service');
const router = express.Router();

router.get('/', async (req, res) => {
    try{
        const data = await showTitles();
        res.status(200).json(data);
    } catch(error){
        if(error.name === 'UnableToLoadError'){
            res.statusCode = 500;
        } else {
            res.statusCode = 500;
            console.log(error);
        }
        res.json({ error: error.message });
    }
});

module.exports = router;