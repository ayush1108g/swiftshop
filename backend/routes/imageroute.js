const express = require("express");
const router = express.Router();
const axios = require("axios");

router.get("/", async (req, res) => {
  const query = req.query;
  const imglink = Object.keys(query)[0];
  try {
    const response = await axios.get(imglink, { responseType: "arraybuffer" });

    res.setHeader("Content-Type", response.headers["content-type"]);
    res.send(Buffer.from(response.data, "binary"));
  } catch (error) {
    res.status(500).json({
      status: "fail",
      message: "Internal Server Error",
      error,
    });
  }
});

module.exports = router;
