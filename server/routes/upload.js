const express = require('express')
const router = express.Router();

router.get("/am", (req, res) => {
  res.send("YUPPPPPPPPP")
})

module.exports = router;