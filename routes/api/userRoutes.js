const router = require('express').Router();

const {
  getAllUser,
  getUserId,
  createUser,
  updateUser,
  deleteUser,
  addFriend,
  removeFriend,
} = require('../../controllers/userController');

router.route('/').get(getAllUser).post(createUser);

router.route('/:id').get(getUserId).put(updateUser).delete(deleteUser);

router.route('/:userId/friends/:friendId').post(addFriend).delete(removeFriend);

module.exports = router;