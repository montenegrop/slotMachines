import Player from '../models/Player'

export function findOrCreatePlayer(username: string) {
  return Player.findOne({ username: username }).then((player) => {
    if (!player) {
      return Player.save({ username: username })
    }
    return player
  })
}
