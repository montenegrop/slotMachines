import { Payments } from '../../types'
import { reelsRound, roll, visibles, winningChains, winnings } from '../../utils/forRolls'

// const wild = 'K'
// const freeSpin = 'S'

// reels normal len 168 171 175 171 165
const reelsNormal: string[] = ['FCDBACSAEHDAEBSDEAGCBDIAFDJCDBGCDGEBSDCFBCIDFGDBIECJEDBEFSBAEHCBESDEBHCBIDFCJECFEBDGCBEDBGECIBCSDCBEAFCJCIDFBDEBCEDGBSEDCIJEBDICFDGBCEASDBCGCEBFDEGCEDBEFGBDCSECGBSCDIAB',
  'GDSADGFAHFCBHAIFHDEIAHEIAJDWBHADFHAEHBWABSADWEJBACDSFGDFGDFESFDGCDEWGECFBGFASFCBHCDESADIAHEAIFDSHDEJBSADHFIDASDAWEJAEJDAHFWDGFAIAGEFSDGFDSFGDADSIAEFDGAFDBAJFEADISADHAGDAJE',
  'SCAEGDBCFHCBADHACEDCBAGCFDHEDIBAHBFGDFSADHFBJEACFJDBGEBHEDCEDGECFAEGCAECGBAFGCFICBFCASCAEGABCFHCBADHACEDCBAJCFDHEDIBAHBFHDFSDCSADHFBJEACFJDBGEASEDIEDHECFAEGCAECHBAFGCFICBFCASC',
  'WDJECHBCGEAHFBCHECBAFCDHFCGFCWAEICBHAFGBCHAFBEHFAGEBGFDHEAJDBHFCJDBHFAIBWDJCAIBWDJCIBWDJECHBCSEAHBCGFCEBFCDHFAGFCJAEICBHAFGBCHAFBEHFBGEBIFDHEAJDBWAFJBDWFAIBWDCJAIBWDJFIBWD',
  'HFEJDHBCJDSBGFIBSCJDSAGBSAHBAJFHAIDHEJDGBJFDICHFBGFSBIFEJDHBCJDBGABIFSCJDSAGBSAIBAJDHAIDHFJDGAJFDICHEAGFSBHFEDAJFCBJFADGCSADIHJABJIGAFBIJHDSCABHGDFIJHFBJSDGBHJDHFJAB']
// sets_lengths normal spins: 0 69 78 55 68 84

const lengthsNormal: number[] = reelsNormal.map(r => r.length)

const paymentsNormal: Payments = {
  A: { 0: 0, 1: 0, 2: 3, 3: 6, 4: 25, 5: 80 },
  B: { 0: 0, 1: 0, 2: 3, 3: 6, 4: 25, 5: 80 },
  C: { 0: 0, 1: 0, 2: 0, 3: 6, 4: 25, 5: 100 },
  D: { 0: 0, 1: 0, 2: 0, 3: 6, 4: 25, 5: 100 },
  E: { 0: 0, 1: 0, 2: 0, 3: 12, 4: 40, 5: 150 },
  F: { 0: 0, 1: 0, 2: 0, 3: 12, 4: 80, 5: 200 },
  G: { 0: 0, 1: 0, 2: 0, 3: 20, 4: 100, 5: 400 },
  H: { 0: 0, 1: 0, 2: 0, 3: 30, 4: 200, 5: 500 },
  I: { 0: 0, 1: 0, 2: 0, 3: 50, 4: 400, 5: 1000 },
  J: { 0: 0, 1: 0, 2: 0, 3: 100, 4: 500, 5: 1500 },
  S: { 0: 0, 1: 0, 2: 0, 3: 125, 4: 500, 5: 1250 },
  W: { 0: 0, 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 }
}
const freeSpinsNormal = [0, 0, 15, 20, 25]

// lengths = [168, 171, 165, 139, 165]
const reelsFreeSpin: string[] = ['ABCEFGESCBDEHCIEBIACEFGCEBDESHCEIAJEICGBDCEDICFBEDCASDJSCBDHEDACBGJDSEBCDECDEBDAGDCGBHEDFBGCIDAGBDESBDSJCIDFBDEBCEDGBSEDCIJEBDICFDGBCEASDBCGCEBFDEGCEDBEFGBDCSECGBSCDIAB',
  'JEBFDGJASCHGAEDHBAFDIHFAIECGDFAGBHASJEFAHDISAFBGAHIECWDFAWJDHSEBAJWIFGWHCEDWAGWFJSBDAFGEIWDCFHADSEAFGIWDAJWCBAJEDHSEAFGDAIJAIWDBHJDAGFEAHDWEHADSIAEFDGAFDBAJFEADISADHAGDAJE',
  'DABEACFDGCEASBDFGAFDEAFSAFBDSEDBCFADEFDGCHADECBDAFBDFAECDBFCEDBHADCBIACHDFECDSFEADSGABSDCHEBCDAFSECGSEFDEFAHDJCAHBEDFHECDAJHBFEADCSHBJDEADBAFEDBSFEJHAIESCEAIFBHEACDA',
  'BADFCGHBIEDJHWBHEFBICJADBGFICHBFGAFCDBICJFBHFWJCFEAWIFHCGBWDHJCAIFJHCWDBJCIWFHBGDCBAECGHCFSAFDCIBJHCBGIJDBFDAEFBACGJFBCJAGDFBIAFBCEBHDFAHBA',
  'ABFGJCSAHFIJBDACFEBSJHBJGCIJBSFJDFBHDSIABJIGDFIJAECJBIDASFDHGFABJICSHICFGEHDAJHDSJIABJCFGBSHAJIDACDHFAJIFHCJEDAJFCBJFADGCSADIHJABJIGAFBIJHDSCABHGDFIJHFBJSDGBHJDHFJAB']
// sets_lengths free_spins: 69 98 74 89 97

const lengthsFreeSpin: number[] = reelsFreeSpin.map(r => r.length)

const paymentsFreeSpin: Payments = {
  A: { 0: 0, 1: 0, 2: 3, 3: 6, 4: 25, 5: 80 },
  B: { 0: 0, 1: 0, 2: 3, 3: 6, 4: 25, 5: 80 },
  C: { 0: 0, 1: 0, 2: 0, 3: 6, 4: 25, 5: 100 },
  D: { 0: 0, 1: 0, 2: 0, 3: 6, 4: 25, 5: 100 },
  E: { 0: 0, 1: 0, 2: 0, 3: 12, 4: 40, 5: 150 },
  F: { 0: 0, 1: 0, 2: 0, 3: 12, 4: 80, 5: 200 },
  G: { 0: 0, 1: 0, 2: 0, 3: 20, 4: 100, 5: 400 },
  H: { 0: 0, 1: 0, 2: 0, 3: 30, 4: 200, 5: 500 },
  I: { 0: 0, 1: 0, 2: 0, 3: 50, 4: 400, 5: 1000 },
  J: { 0: 0, 1: 0, 2: 0, 3: 100, 4: 500, 5: 1500 },
  S: { 0: 0, 1: 0, 2: 0, 3: 125, 4: 500, 5: 1250 },
  W: { 0: 0, 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 }
}
const freeSpinsFreeSpin = [0, 0, 15, 20, 25]

export function normalWinnings (arr: number[] = []): any {
  let randomRoll
  if (arr.length === 0) {
    randomRoll = roll(lengthsNormal)
  } else {
    randomRoll = arr
  }
  const reelsNormalRound = reelsRound(reelsNormal)
  const screenNormal = visibles(reelsNormalRound, randomRoll)
  const chainsNormal = winningChains(screenNormal)
  const winningsNormal = winnings(chainsNormal, paymentsNormal, freeSpinsNormal)
  winningsNormal.screen = screenNormal
  return winningsNormal
}

export function freeSpinsWinnings (): any {
  const randomRoll = roll(lengthsFreeSpin)
  const reelsFreeSpinRound = reelsRound(reelsFreeSpin)
  const screenFreeSpin = visibles(reelsFreeSpinRound, randomRoll)
  const chainsFreeSpin = winningChains(screenFreeSpin)
  const winningsFreeSpin = winnings(chainsFreeSpin, paymentsFreeSpin, freeSpinsFreeSpin)
  winningsFreeSpin.screen = screenFreeSpin
  return winningsFreeSpin
}
