"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.freeSpinsWinnings = exports.normalWinnings = void 0;
const forRolls_1 = require("../../utils/forRolls");
// const wild = 'K'
// const freeSpin = 'S'
// reels normal len 168 171 175 171 165
const reelsNormal = ['FCDBACSAEHDAEBSDEAGCBDIAFDJCDBGCDGEBSDCFBCIDFGDBIECJEDBEFSBAEHCBESDEBHCBIDFCJECFEBDGCBEDBGECIBCSDCBEAFCJCIDFBDEBCEDGBSEDCIJEBDICFDGBCEASDBCGCEBFDEGCEDBEFGBDCSECGBSCDIAB',
    'GDSADGFAHFCBHAIFHDEIAHEIAJDWBHADFHAEHBWABSADWEJBACDSFGDFGDFESFDGCDEWGECFBGFASFCBHCDESADIAHEAIFDSHDEJBSADHFIDASDAWEJAEJDAHFWDGFAIAGEFSDGFDSFGDADSIAEFDGAFDBAJFEADISADHAGDAJE',
    'SCAEGDBCFHCBADHACEDCBAGCFDHEDIBAHBFGDFSADHFBJEACFJDBGEBHEDCEDGECFAEGCAECGBAFGCFICBFCASCAEGABCFHCBADHACEDCBAJCFDHEDIBAHBFHDFSDCSADHFBJEACFJDBGEASEDIEDHECFAEGCAECHBAFGCFICBFCASC',
    'WDJECHBCGEAHFBCHECBAFCDHFCGFCWAEICBHAFGBCHAFBEHFAGEBGFDHEAJDBHFCJDBHFAIBWDJCAIBWDJCIBWDJECHBCSEAHBCGFCEBFCDHFAGFCJAEICBHAFGBCHAFBEHFBGEBIFDHEAJDBWAFJBDWFAIBWDCJAIBWDJFIBWD',
    'HFEJDHBCJDSBGFIBSCJDSAGBSAHBAJFHAIDHEJDGBJFDICHFBGFSBIFEJDHBCJDBGABIFSCJDSAGBSAIBAJDHAIDHFJDGAJFDICHEAGFSBHFEDAJFCBJFADGCSADIHJABJIGAFBIJHDSCABHGDFIJHFBJSDGBHJDHFJAB'];
// sets_lengths normal spins: 0 69 78 55 68 84
const lengthsNormal = reelsNormal.map(r => r.length);
const paymentsNormal = {
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
};
const freeSpinsNormal = [0, 0, 15, 20, 25];
// lengths = [168, 171, 165, 139, 165]
const reelsFreeSpin = ['ABCEFGESCBDEHCIEBIACEFGCEBDESHCEIAJEICGBDCEDICFBEDCASDJSCBDHEDACBGJDSEBCDECDEBDAGDCGBHEDFBGCIDAGBDESBDSJCIDFBDEBCEDGBSEDCIJEBDICFDGBCEASDBCGCEBFDEGCEDBEFGBDCSECGBSCDIAB',
    'JEBFDGJASCHGAEDHBAFDIHFAIECGDFAGBHASJEFAHDISAFBGAHIECWDFAWJDHSEBAJWIFGWHCEDWAGWFJSBDAFGEIWDCFHADSEAFGIWDAJWCBAJEDHSEAFGDAIJAIWDBHJDAGFEAHDWEHADSIAEFDGAFDBAJFEADISADHAGDAJE',
    'DABEACFDGCEASBDFGAFDEAFSAFBDSEDBCFADEFDGCHADECBDAFBDFAECDBFCEDBHADCBIACHDFECDSFEADSGABSDCHEBCDAFSECGSEFDEFAHDJCAHBEDFHECDAJHBFEADCSHBJDEADBAFEDBSFEJHAIESCEAIFBHEACDA',
    'BADFCGHBIEDJHWBHEFBICJADBGFICHBFGAFCDBICJFBHFWJCFEAWIFHCGBWDHJCAIFJHCWDBJCIWFHBGDCBAECGHCFSAFDCIBJHCBGIJDBFDAEFBACGJFBCJAGDFBIAFBCEBHDFAHBA',
    'ABFGJCSAHFIJBDACFEBSJHBJGCIJBSFJDFBHDSIABJIGDFIJAECJBIDASFDHGFABJICSHICFGEHDAJHDSJIABJCFGBSHAJIDACDHFAJIFHCJEDAJFCBJFADGCSADIHJABJIGAFBIJHDSCABHGDFIJHFBJSDGBHJDHFJAB'];
// sets_lengths free_spins: 69 98 74 89 97
const lengthsFreeSpin = reelsFreeSpin.map(r => r.length);
const paymentsFreeSpin = {
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
};
const freeSpinsFreeSpin = [0, 0, 15, 20, 25];
function normalWinnings() {
    // const bet = 1
    const randomRoll = (0, forRolls_1.roll)(lengthsNormal);
    const reelsNormalRound = (0, forRolls_1.reelsRound)(reelsNormal);
    const screenNormal = (0, forRolls_1.visibles)(reelsNormalRound, randomRoll);
    const chainsNormal = (0, forRolls_1.winningChains)(screenNormal);
    const winningsNormal = (0, forRolls_1.winnings)(chainsNormal, paymentsNormal, freeSpinsNormal);
    winningsNormal.screen = screenNormal;
    return winningsNormal;
}
exports.normalWinnings = normalWinnings;
function freeSpinsWinnings() {
    // const bet = 1
    const randomRoll = (0, forRolls_1.roll)(lengthsFreeSpin);
    const reelsFreeSpinRound = (0, forRolls_1.reelsRound)(reelsFreeSpin);
    const screenFreeSpin = (0, forRolls_1.visibles)(reelsFreeSpinRound, randomRoll);
    const chainsFreeSpin = (0, forRolls_1.winningChains)(screenFreeSpin);
    const winningsFreeSpin = (0, forRolls_1.winnings)(chainsFreeSpin, paymentsFreeSpin, freeSpinsFreeSpin);
    winningsFreeSpin.screen = screenFreeSpin;
    return winningsFreeSpin;
}
exports.freeSpinsWinnings = freeSpinsWinnings;
