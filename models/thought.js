const { Schema, model } = require('mongoose');


// Schema to create Student model
const thoughtsSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      min_length: 1,
      max_length: 280,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    username: {
      type: String,
      required: true,
    },
    reactions:[
      {
        type: Schema.Types.ObjectId,
        ref: 'reactionSchema'
       }
  ],
  },
  {
    toJSON: {
      getters: true,
    },
  }
);

thoughtsSchema
.virtual('reactionCount')
.get(function () {
  return this.reactions.length;
})


const Thought = model('thought', thoughtsSchema);

module.exports = Thought;