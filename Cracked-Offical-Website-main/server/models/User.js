const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please add a name'],
    trim: true,
    maxlength: [50, 'Name cannot be more than 50 characters']
  },
  email: {
    type: String,
    required: [true, 'Please add an email'],
    unique: true,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      'Please add a valid email'
    ]
  },
  password: {
    type: String,
    required: [true, 'Please add a password'],
    minlength: [6, 'Password must be at least 6 characters'],
    select: false
  },
  role: {
    type: String,
    enum: ['student', 'admin', 'instructor'],
    default: 'student'
  },
  avatar: {
    type: String,
    default: ''
  },
  isVerified: {
    type: Boolean,
    default: false
  },
  verificationToken: String,
  verificationExpire: Date,
  resetPasswordToken: String,
  resetPasswordExpire: Date,
  subscription: {
    type: {
      type: String,
      enum: ['free', 'premium', 'enterprise'],
      default: 'free'
    },
    startDate: {
      type: Date,
      default: Date.now
    },
    endDate: {
      type: Date
    },
    isActive: {
      type: Boolean,
      default: true
    }
  },
  preferences: {
    notifications: {
      email: {
        type: Boolean,
        default: true
      },
      push: {
        type: Boolean,
        default: true
      }
    },
    studyReminders: {
      type: Boolean,
      default: true
    },
    targetScore: {
      type: Number,
      min: 400,
      max: 1600,
      default: 1500
    }
  },
  stats: {
    totalStudyTime: {
      type: Number,
      default: 0
    },
    testsCompleted: {
      type: Number,
      default: 0
    },
    averageScore: {
      type: Number,
      default: 0
    },
    bestScore: {
      type: Number,
      default: 0
    },
    streakDays: {
      type: Number,
      default: 0
    },
    lastStudyDate: {
      type: Date
    }
  }
}, {
  timestamps: true
});

// Encrypt password using bcrypt
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// Sign JWT and return
userSchema.methods.getSignedJwtToken = function() {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE || '30d'
  });
};

// Match user entered password to hashed password in database
userSchema.methods.matchPassword = async function(enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Generate and hash password token
userSchema.methods.getResetPasswordToken = function() {
  // Generate token
  const resetToken = crypto.randomBytes(20).toString('hex');

  // Hash token and set to resetPasswordToken field
  this.resetPasswordToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex');

  // Set expire
  this.resetPasswordExpire = Date.now() + 10 * 60 * 1000; // 10 minutes

  return resetToken;
};

// Generate verification token
userSchema.methods.getVerificationToken = function() {
  const verificationToken = crypto.randomBytes(20).toString('hex');

  this.verificationToken = crypto
    .createHash('sha256')
    .update(verificationToken)
    .digest('hex');

  this.verificationExpire = Date.now() + 24 * 60 * 60 * 1000; // 24 hours

  return verificationToken;
};

// Update study stats
userSchema.methods.updateStudyStats = function(studyTime, score = null) {
  this.stats.totalStudyTime += studyTime;
  
  if (score) {
    this.stats.testsCompleted += 1;
    
    // Update average score
    const totalScore = (this.stats.averageScore * (this.stats.testsCompleted - 1)) + score;
    this.stats.averageScore = totalScore / this.stats.testsCompleted;
    
    // Update best score
    if (score > this.stats.bestScore) {
      this.stats.bestScore = score;
    }
  }
  
  // Update streak
  const today = new Date();
  const lastStudy = this.stats.lastStudyDate;
  
  if (!lastStudy || this.isConsecutiveDay(today, lastStudy)) {
    this.stats.streakDays += 1;
  } else {
    this.stats.streakDays = 1;
  }
  
  this.stats.lastStudyDate = today;
};

// Helper method to check if two dates are consecutive
userSchema.methods.isConsecutiveDay = function(date1, date2) {
  const oneDay = 24 * 60 * 60 * 1000;
  const diffTime = Math.abs(date1 - date2);
  const diffDays = Math.ceil(diffTime / oneDay);
  return diffDays <= 1;
};

module.exports = mongoose.model('User', userSchema); 