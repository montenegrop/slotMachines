import Player from '../models/Player'

export async function findOrCreatePlayer(username: string) {
  const player = await Player.findOne({ username: username })
  if (!player) {
    const new_player = await Player.create({ username: username })
    return new_player
  }
  return player
}
// return Player.findOne({ username: username }).then((player) => {
//   if (!player) {
//     Player.create({ username: username }).then((new_player) => {
//       return new_player
//     })
//   }
//   return player
// })
