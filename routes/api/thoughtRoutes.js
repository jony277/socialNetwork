const router = require('express').Router();
const {
  getAllThought,
  getThoughtId,
  createThought,
  updateThought,
  deleteThought,
  addReaction,
  removeReaction,
} = require('../../controllers/thougthController');

router.route('/').get(getAllThought).post(createThought);

router.route("/:id").get(getThoughtId).put(updateThought).delete(deleteThought);

router.route("/:thoughtId/reactions").post(addReaction);

router.route("/:thoughtId/reactions/:reactionId").delete(removeReaction);

module.exports = router;