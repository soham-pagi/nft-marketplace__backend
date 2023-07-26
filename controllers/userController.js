const User = require("../models/User");

// Create or update a user
const createUser = async (req, res) => {
  const { username, metamaskWalletAddress } = req.body;
  const imageFile = req.file;
  console.log({ username, metamaskWalletAddress });

  // Check if a user with the same wallet address exists
  User.findOne({ metamaskWalletAddress })
    .then((existingUser) => {
      console.log({ existingUser });
      if (existingUser) {
        // Update the existing user's username and image
        existingUser.username = username;

        if (imageFile) {
          existingUser.image = {
            data: imageFile.buffer, // Save the uploaded image data as a Buffer
            contentType: imageFile.mimetype,
          };
        }

        // Save the updated user document
        existingUser
          .save()
          .then((updatedUser) => {
            console.log("User updated:", updatedUser);
            res.status(200).json(updatedUser);
          })
          .catch((error) => {
            console.error("Error updating user:", error);
            res.status(500).json({ error: "Failed to update user" });
          });
      } else {
        // Create a new user document
        const newUser = new User({
          username,
          metamaskWalletAddress,
        });
        console.log({ newUser });
        console.log({ file: req.file });

        if (imageFile) {
          newUser.image = {
            data: imageFile.buffer, // Save the uploaded image data as a Buffer
            contentType: imageFile.mimetype,
          };
        }

        // Save the new user document
        newUser
          .save()
          .then((savedUser) => {
            console.log("User saved:", savedUser);
            res.status(201).json(savedUser);
          })
          .catch((error) => {
            console.error("Error saving user:", error);
            res.status(500).json({ error: "Failed to save user" });
          });
      }
    })
    .catch((error) => {
      console.error("Error finding user:", error);
      res.status(500).json({ error: "Failed to find user" });
    });
};

// Get user by wallet address
const getUserByWalletAddress = async (req, res) => {
  const { metamaskWalletAddress } = req.params;

  // Find the user document based on the wallet address
  User.findOne({ metamaskWalletAddress })
    .then((user) => {
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      const { username, image } = user;
      res.status(200).json({ username, image });
    })
    .catch((error) => {
      console.error("Error retrieving user:", error);
      return res.status(500).json({ error: "Failed to retrieve user" });
    });
};

module.exports = { createUser, getUserByWalletAddress };
