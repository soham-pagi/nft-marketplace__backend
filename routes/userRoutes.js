const express = require("express");
const router = express.Router();
const multer = require("multer");
const userController = require("../controllers/userController");

const upload = multer().single("image");

// Create or update a user
router.post("/", upload, userController.createUser);

// Get user by wallet address
router.get("/:metamaskWalletAddress", userController.getUserByWalletAddress);

module.exports = router;
