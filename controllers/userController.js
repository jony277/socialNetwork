// ObjectId() method for converting studentId string into an ObjectId for querying database
const { ObjectId } = require('mongoose').Types;
const { User } = require('../models');
const { use } = require('../routes');

const headCount = async () => {
  const numberOfUsers = await User.aggregate()
    .count('userCount');
  return numberOfUsers;
}


// Execute the aggregate method on the Student model and calculate the overall grade by using the $avg operator

module.exports = {
  // Get all students
  async getUsers(req, res) {
    try {
      const users = await User.find();

      res.json(users);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },
  // Get a single student
  async getSingleUser(req, res) {
    try {
      const user = await User.findOne({ _id: req.params.userId })
        .select('-__v');

      if (!user) {
        return res.status(404).json({ message: 'No thought with that ID' });
      }

      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // create a new user
  async createUser(req, res) {
    try {
      const user = await User.create(req.body);
      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // Delete a student and remove them from the course
  async deleteUser(req, res) {
    try {
      const user = await User.findOneAndDelete({ _id: req.params.userId });

      if (!user) {
        return res.status(404).json({ message: 'No such user exists' })
      }


      res.json({ message: 'Student successfully deleted' });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },

  async updateUser(req, res){
    try{
      const user = await User.findOneAndUpdate(
        {name: req.params.userId},
        {new: true}
      );
      res.status(200).json(user);
    }catch(err){
      console.log(err);
      res.status(500).json(err);
    }
  },

  async addFriend (req, res){
    console.log("You are adding a friend");
    console.log(req.body);

    try{
      const user = await User.findOneAndUpdate(
        {_id: req.params.userId},
        { $addToSet: {friends: req.body}},
        {runValidators: true, new: true }
      );

      if(!user){
        return res.status(404).json({message: 'No student found with id'});
      }
      res.json(user);
    }catch(err){
      console.log(err);
      res.status(500).json(err);
    }
  },

  async removeFriend (req, res){
    try{
      const user = await User.findOneAndUpdate(
        {_id: req.params.userId},
        { $pull: {friends: { friendsId: req.params.friendsId}}},
        { runValidators: true, new: true}
      );

      if(!user){
        return res.status(404).json({ message: "No student found with that ID :( "});
      }
      res.json(user);
    }catch (err) {
      res.status(500).json(err);
    }
  }

};