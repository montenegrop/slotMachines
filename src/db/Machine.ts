import mongoose from 'mongoose'

const machineSchema = new mongoose.Schema({
  name: String,
  reels: Number
})

export default mongoose.model('machine', machineSchema)
