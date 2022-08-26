import mongoose from 'mongoose'

const gameBalanceSchema = new mongoose.Schema({
  game: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'Game'
  },
  publisher: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'Publisher'
  },
  lastScreen: {
    type: [String],
    default: []
  },
  lastBet: {
    type: Number,
    default: 0
  },
  lastBalance: {
    type: Number,
    default: 0
  },
  freeSpinbalance: {
    type: Number,
    default: 0
  },
  freeSpins: {
    type: Number,
    default: 0
  }
})

const playerSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  gameBalances: {
    type: [gameBalanceSchema],
    default: []
  }
})

export default mongoose.model('Player', playerSchema)
