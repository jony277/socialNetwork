const { User } = require('../models/user');

const userController = {
  getAllUser(req, res) {
    User.find({})
      .populate({
        path: "friends",
        select: "-__v",
      })
      .select("-__v")
      .sort({ _id: -1 })
      .then((userData) => res.json(userData))
      .catch((err) => {
        console.log(err);
        res.sendStatus(400);
      });
  },

  getUserId({ params }, res) {
    User.findOne({ _id: params.id })
      .populate({
        path: "thoughts",
        select: "-__v",
      })
      .populate({
        path: "friends",
        select: "-__v",
      })
      .select("-__v")
      .then((userId) => {
        if (!userId) {
          return res
            .status(404);
        }
        res.json(userId);
      })
      .catch((err) => {
        console.log(err);
        res.sendStatus(400);
      });
  },
  
  createUser({ body }, res) {
    User.create(body)
      .then((createUser) => res.json(createUser))
      .catch((err) => res.json(err));
  },

  updateUser({ params, body }, res) {
    User.findOneAndUpdate({ _id: params.id }, body, {
      new: true,
      runValidators: true,
    })
      .then((updateUser) => {
        if (!updateUser) {
          res.status(404).json();
          return;
        }
        res.json(updateUser);
      })
      .catch((err) => res.json(err));
  },

  deleteUser({ params }, res) {
    User.findOneAndDelete({ _id: params.id })
      .then((deleteUser) => {
        if (!deleteUser) {
          return res.status(404).json();
        }})
        res.sendStatus(200)
      .catch((err) => res.json(err));
  },

  addFriend({ params }, res) {
    User.findOneAndUpdate(
      { _id: params.userId },
      { $addToSet: { friends: params.friendId } },
      { new: true, runValidators: true }
    )
      .then((addFriend) => {
        if (!addFriend) {
          res.status(404);
          return;
        }
        res.json(addFriend);
      })
      .catch((err) => res.json(err));
  },

  removeFriend({ params }, res) {
    User.findOneAndUpdate(
      { _id: params.userId },
      { $pull: { friends: params.friendId } },
      { new: true }
    )
      .then((removeFriend) => {
        if (!removeFriend) {
          return res.status(404);
        }
        res.sendStatus(200)
      })
      .catch((err) => res.json(err));
  },
};


module.exports = userController;