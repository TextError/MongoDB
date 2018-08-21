const mongoose = require('mongoose');
const Scheema = mongoose.Schema;

//Create Scheema
const PostScheema = new Scheema({
  user: {
    type: Scheema.Types.ObjectId,
    ref: 'users'
  },
  text: {
    type: String,
    required: true
  },
  name: {
    type: String,
  },
  avatar: {
    type: String
  },
  likes: [
    {
      user: {
        type: Scheema.Types.ObjectId,
        ref: 'users'
      }
    }
  ],
  comments: [
    {
      user: {
        type: Scheema.Types.ObjectId,
        ref: 'users'
      },
      text: {
        type: String,
        required: true
      },
      name: {
        type: String
      },
      avatar: {
        type: String
      },
      date: {
        type: Date,
        default: Date.now
      }
    }
  ],
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Post_Scheema = mongoose.model('post', PostScheema);