import mongoose from 'mongoose'

const playerSchema = new mongoose.Schema({
  username: String
})

export default mongoose.model('Player', playerSchema)
