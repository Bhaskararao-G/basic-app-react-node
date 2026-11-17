import express from "express";

import {
  getMembers,
  addMember,
  updateMember,
  deleteMember,
} from "../controllers/memberController.js";

const router = express.Router();

// Get all members
router.get("/all-members", getMembers);

// Add member
router.post("/add-member", addMember);

// Update member
router.put("/update/:id", updateMember);

// Delete member
router.delete("/delete/:id", deleteMember);

export default router;