const mongoose = require('mongoose');
const { Schema } = mongoose;

const CommentSchema = new Schema({
  user: { 
    type: Schema.Types.ObjectId, 
    ref: 'User', 
    required: [true, 'User reference is required'] 
  },
  cocktail: { 
    type: Schema.Types.ObjectId, 
    ref: 'Cocktail',
    required: [true, 'Cocktail reference is required']
  },
  text: { 
    type: String, 
    required: [true, 'Comment text is required'],
    trim: true,
    minlength: [1, 'Comment must be at least 1 character'],
    maxlength: [500, 'Comment cannot exceed 500 characters']
  },
  parentComment: {
    type: Schema.Types.ObjectId,
    ref: 'Comment',
    default: null
  },
  replies: [{ 
    type: Schema.Types.ObjectId, 
    ref: 'Comment' 
  }],
  likes: [{ 
    type: Schema.Types.ObjectId, 
    ref: 'User' 
  }],
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Virtual for like count
CommentSchema.virtual('likeCount').get(function() {
  return this.likes.length;
});

// Virtual for reply count
CommentSchema.virtual('replyCount').get(function() {
  return this.replies.length;
});

// Indexes for better performance
CommentSchema.index({ cocktail: 1, createdAt: -1 });
CommentSchema.index({ user: 1 });
CommentSchema.index({ parentComment: 1 });

module.exports = mongoose.model('Comment', CommentSchema);