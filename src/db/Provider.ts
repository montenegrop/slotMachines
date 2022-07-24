import mongoose from 'mongoose'

const providerSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true
  }
})

export default mongoose.model('Provider', providerSchema)
