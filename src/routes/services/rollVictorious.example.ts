import { RollResult } from '../../types'
import rollData from './rollVictorious.data.example.json'

const roll: RollResult = rollData as RollResult

export const getRollResult = (): RollResult => roll
