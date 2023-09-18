const connection = require('../config/connection');
const { User, Thought } = require('../models');

connection.on('error', (err) => err);

connection.once('open', async () => {
  console.log('connected');
  
  let usersCheck = await connection.db.listCollections({ name: 'users' }).toArray();
  if (usersCheck.length) {
    await connection.dropCollection('users');
  }

  let thoughtsCheck = await connection.db.listCollections({ name: 'thoughts' }).toArray();
  if (thoughtsCheck.length) {
    await connection.dropCollection('thoughts');
  }

  const thoughts = await Thought.collection.insertMany(thoughtData)

  const userData = [
    {
      "username": "Funky_Buddha",
      "email": "goodvibes@fb.org",
      "thoughts": [thoughts.insertedIds['0']._id],
      "friends": []
    },
    {
      "username": "RushOffCoding",
      "email": "starcoder@rfc.com",
      "thoughts": [thoughts.insertedIds['2']._id],
      "friends": []
    }
  ]

  const users = await User.collection.insertMany(userData)
  console.log(users)

  const userWithFriend = {
    "username": "happyTreeFriend",
    "email": "safetheplanet@cc.net",
    "friends": [users.insertedIds['0']._id],
    "thoughts": [thoughts.insertedIds['1']._id]
  }

  await User.collection.insertOne(userWithFriend)

  console.table(userData);
  console.table(thoughtData);

  console.info('Seeding complete! 🌱');
  process.exit(0);
});

const thoughtData = [
  {
   "thoughtText": "Frankely, there are not enough trees around Miami. More trees would make the area nicer and smell wonderful! :)",
   "username": "happyTreeFriend",
   "reactions": [
    {
      "reactionBody": ":((",
      "username": "RushOffCoding", 
     },
   ], 
  },
  {
    "thoughtText": "Folks we need argue less and work together. No need to put out negative energies everyday. Let's all be chill.",
    "username": "Funky_Buddha", 
    "reactions": [
      {
        "reactionBody": ":))",
        "username": "happyTreeFriend", 
       },
     ],
   },
   {
    "thoughtText": "I NEED TO CODE! Please give me suggestions on what you would like to see me build next!",
    "username": "RushOffCoding", 
    "reactions": [
      {
        "reactionBody": ":()",
        "username": "Funky_Buddha", 
       }
     ],
   }
]