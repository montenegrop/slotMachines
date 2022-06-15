import { RollResult } from '../../types'
import rollData from './victorious.example.json'

const roll: RollResult = rollData as RollResult

export const getRollResult = (): RollResult => roll
