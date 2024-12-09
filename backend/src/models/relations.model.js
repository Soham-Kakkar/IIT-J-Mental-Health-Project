import mongoose from "mongoose";

const coachSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  specialization: {
    type: String,
    required: true
  },
  yearsOfExperience: {
    type: Number,
    required: true
  },
  availableSlots: [{
    day: String,
    time: String
  }],
  rating: {
    type: Number,
    min: 0,
    max: 5,
    default: 0
  }
});

const Coach = mongoose.model('Coach', coachSchema);

const buddySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  interests: [String],
  availableHours: {
    type: Number,
    required: true
  },
  experienceAsBuddy: {
    type: Number,
    default: 0
  },
  rating: {
    type: Number,
    min: 0,
    max: 5,
    default: 0
  }
});

const Buddy = mongoose.model('Buddy', buddySchema);

const userSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
    unique: true
  },
  joinDate: {
    type: Date,
    default: Date.now
  },
  preferredTopics: [String],
  sessionHistory: [{
    date: Date,
    type: {
      type: String,
      enum: ['coach', 'buddy']
    },
    partnerId: mongoose.Schema.Types.ObjectId
  }]
});

const User = mongoose.model('User', userSchema);

export {Coach, User, Buddy}