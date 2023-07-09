const express = require('express');
const jwt = require('jsonwebtoken');
const mysql = require('mysql2/promise');
const multer = require('multer');
const router = express.Router();

function checkAuthorization(req, res, next) {

    if (!req.headers.authorization) {
      return res.status(401).send({ error: 'No token provided' });
    }
    const token = req.headers.authorization.split(' ')[1];
  
    const jwtSecret = 'Secret';
    jwt.verify(token, jwtSecret, (err, decoded) => {
      if (err) {
        return res.status(403).send({ error: "Wrong token" });
      }
      const decodedToken = decoded;
      req.decodedToken = decodedToken;
      return next();
    });
  }

// set the connection with mysql server
const pool = require('../utils/mysql');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'static/image'); 
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname + '_' + Date.now() + '.png'); 
    }
});
  

const upload = multer({ storage: storage });

router.put('/', checkAuthorization, upload.single('picture'), async (req, res) => {
    const decodedToken = req.decodedToken;
    const id = decodedToken.id;
    if (!req.file) {
        return res.status(400).json({ error: 'No image file uploaded' });
    }
    const fileName = req.file.originalname;
    const picturePAth = 'http://13.210.26.62/api/1.0/images/' + fileName;

    const [result] = await pool.query('UPDATE users SET picture = ? WHERE id = ?', [picturePAth, id]);
    

    console.log(picturePAth);   
    return res.status(200).json({ picture: picturePAth });
});

module.exports = router;
