const userSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
  membershipType: {
    type: String,
    enum: ['A', 'B', 'C'],
    default: 'A',
  },
}, {
  timestamps: true,
});
