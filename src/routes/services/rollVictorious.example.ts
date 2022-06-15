import { RollResult } from '../../types'
import rollData from './victoriousData.example.json'

const roll: RollResult = rollData as RollResult

export const getRollResult = (): RollResult => roll
