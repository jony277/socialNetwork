const router = require('express').Router();
const {
  getThoughts,
  getSingleThought,
  createThought,
  updateThought,
  deleteThought,
  addReaction,
  removeReaction,
} = require('../../controllers/thoughtController.js');


// /api/users
router.route('/').get(getThoughts).post(createThought);

// /api/users/:userId
router.route('/:thoughtId').get(getSingleThought).delete(deleteThought).put(updateThought);

// /api/users/:userId/friends/:friendId
router.route('/:thoughtId/reactions').delete(removeReaction).post(addReaction);

module.exports = router;