import mongoose from 'mongoose'

const playerSchema = new mongoose.Schema({
  username: String,
  gameBalances: [
    {
      game: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Game'
      },
      publisher: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Publisher'
      },
      lastBet: Number,
      balance: {
        type: Number,
        default: 0
      },
      freeSpins: {
        type: Number,
        default: 0
      }
    }
  ]
})

export default mongoose.model('Player', playerSchema)
