import express from "express";

const router = express.Router();

// Define your routes
router.get("/home", async (req, res) => {
  return res.render("home");
});

export default router;
