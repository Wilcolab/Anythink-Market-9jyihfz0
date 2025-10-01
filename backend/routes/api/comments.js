/**
 * Express router for handling comment-related API endpoints.
 * 
 * @module routes/api/comments
 */

 /**
    * GET /
    * Retrieves comments, optionally filtered by itemId or userId.
    *
    * @name GET/comments
    * @function
    * @memberof module:routes/api/comments
    * @param {Object} req - Express request object
    * @param {Object} req.query - Query parameters for filtering
    * @param {string} [req.query.itemId] - Optional item ID to filter comments
    * @param {string} [req.query.userId] - Optional user ID to filter comments
    * @param {Object} res - Express response object
    * @param {Function} next - Express next middleware function
    * @returns {Object[]} 200 - Array of comment objects
    */

 /**
    * DELETE /:id
    * Deletes a comment by its ID.
    *
    * @name DELETE/comments/:id
    * @function
    * @memberof module:routes/api/comments
    * @param {Object} req - Express request object
    * @param {Object} req.params - Route parameters
    * @param {string} req.params.id - ID of the comment to delete
    * @param {Object} res - Express response object
    * @param {Function} next - Express next middleware function
    * @returns {Object} 200 - Success message and deleted comment object
    * @returns {Object} 404 - Error message if comment not found
    */
const router = require("express").Router();
const mongoose = require("mongoose");
const Comment = mongoose.model("Comment");

module.exports = router;

router.get("/", async (req, res, next) => {
  try {
    // Allow filtering by itemId or userId via query params
    const filter = {};
    if (req.query.itemId) {
      filter.itemId = req.query.itemId;
    }
    if (req.query.userId) {
      filter.userId = req.query.userId;
    }
    const comments = await Comment.find(filter);
    res.json(comments);
  } catch (err) {
    next(err);
  }
});

// add another enpoint for deleting a comment
router.delete("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const deletedComment = await Comment.findByIdAndDelete(id);
    if (!deletedComment) {
      return res.status(404).json({ message: "Comment not found" });
    }
    res.json({ message: "Comment deleted successfully", comment: deletedComment });
  } catch (err) {
    next(err);
  }
});