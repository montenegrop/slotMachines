// import { RollResult } from '../../types'
// import rollData from './victoriousData.example.json'

// const roll: RollResult = rollData as RollResult

// export const getRollResult = (): RollResult => roll

// const wild = "W"
// const total_reels = 5
// const payments: any = {
//     'A': {"0": 0, '1': 0, '2': 3, '3': 6, '4': 25, '5': 80},
//     'B': {"0": 0, '1': 0, '2': 3, '3': 6, '4': 25, '5': 80},
//     'C': {"0": 0, '1': 0, '2': 0, '3': 6, '4': 25, '5': 100},
//     'D': {"0": 0, '1': 0, '2': 0, '3': 6, '4': 25, '5': 100},
//     'E': {"0": 0, '1': 0, '2': 0, '3': 12, '4': 40, '5': 150},
//     'F': {"0": 0, '1': 0, '2': 0, '3': 12, '4': 80, '5': 200},
//     'G': {"0": 0, '1': 0, '2': 0, '3': 20, '4': 100, '5': 400},
//     'H': {"0": 0, '1': 0, '2': 0, '3': 30, '4': 200, '5': 500},
//     'I': {"0": 0, '1': 0, '2': 0, '3': 50, '4': 400, '5': 1000},
//     'J': {"0": 0, '1': 0, '2': 0, '3': 100, '4': 500, '5': 1500},
//     'S': {"0": 0, '1': 0, '2': 0, '3': 125, '4': 500, '5': 1250},
//     'W': {"0": 0, '1': 0, '2': 0, '3': 0, '4': 0, '5': 0}
// }

// const free_spins_list = [0, 0, 0, 15, 20, 25]
// const free_spins_symbol = "S"

// function compute_combinations_GM(reels_round_set: any, lengths_mult_array: any) {
//     const count0 = [0]

//     // # g, M, count
//     const gmTotal = [0, 0, 0]
//     const initial_chains = {"A": [0, 1], "B": [0, 1], "C": [0, 1], "D": [0, 1], "E": [0, 1], "F": [
//         0, 1], "G": [0, 1], "H": [0, 1], "I": [0, 1], "J": [0, 1], "S": [0, 1], "W": [0, 1]}

//     function combinations_GM(index=0, factor=1, chains=initial_chains) {
//         for (let r of reels_round_set[index]) {

//             const r_factor = factor * r[1]
//             const r_chains: any = structuredClone(chains)
//             let rg = 0
//             let rm = 0

//             const keys = Object.keys(r_chains)
//             if ("W" in r[0][0]) {
//                 for (let key in keys) {
//                     r_chains[key + "w" + String(index)] = [index + 1, r[0][0].count("W") * r_chains[key][1]]
//                 }
//             }

//             for (let key in keys) {
//                 if (key[0] in r[0][0]) {
//                     r_chains[key][0] += 1
//                     if (key[0] == r[0][1]) {
//                         let reps = r[0][0].count(key[0])
//                         r_chains[key][1] *= reps
//                     }
//                 }
//             }

//             for (let key in keys) {
//                 let key_win = 0
//                 let key_spins = 0
//                 if (r_chains[key][0] == index) {
//                     if (!("W" in r[0][0])) {
//                         key_win = payments[key[0]][String(index)] * r_factor * lengths_mult_array[total_reels-index-1] * r_chains[key][1]
//                         rg += key_win
//                         if (key[0] == "S"){
//                             key_spins = free_spins_list[index] * r_factor * lengths_mult_array[total_reels - index-1] * r_chains[key][1]
//                             rm += key_spins
//                         }
//                     }
//                     r_chains.pop(key)
//                 }
//             }
//             if (r_chains) {
//                 if (index < total_reels - 1) {
//                     combinations_GM(
//                         index=index+1, factor=r_factor, chains=r_chains)
//                 }
//                 else {
//                     for (let key in r_chains) {
//                         let key_win = 0
//                         let key_spins = 0
//                         key_win = payments[key[0]][String(index + 1)] * r_factor * lengths_mult_array[total_reels-index-1] * r_chains[key][1]
//                         rg += key_win
//                         if (key[0] == "S") {
//                             key_spins = free_spins_list[index + 1] * r_factor * lengths_mult_array[total_reels - index-1] * r_chains[key][1]
//                             rm += key_spins
//                         }
//                     }
//                     gmTotal[2] += r_factor * lengths_mult_array[total_reels-index-1]
//                 }
//             }
//             else {
//                 gmTotal[2] += r_factor * lengths_mult_array[total_reels-index-1]
//             }
//             gmTotal[0] += rg
//             gmTotal[1] += rm
//             if (index == 0) {
//                 count0[0] += 1
//             }
//         }
//     }
//     combinations_GM()
//     return gmTotal
// }

// // reels normal len 168 171 175 171 165
// const reels = ['FCDBACSAEHDAEBSDEAGCBDIAFDJCDBGCDGEBSDCFBCIDFGDBIECJEDBEFSBAEHCBESDEBHCBIDFCJECFEBDGCBEDBGECIBCSDCBEAFCJCIDFBDEBCEDGBSEDCIJEBDICFDGBCEASDBCGCEBFDEGCEDBEFGBDCSECGBSCDIAB',
//          'GDSADGFAHFCBHAIFHDEIAHEIAJDWBHADFHAEHBWABSADWEJBACDSFGDFGDFESFDGCDEWGECFBGFASFCBHCDESADIAHEAIFDSHDEJBSADHFIDASDAWEJAEJDAHFWDGFAIAGEFSDGFDSFGDADSIAEFDGAFDBAJFEADISADHAGDAJE',
//          'SCAEGDBCFHCBADHACEDCBAGCFDHEDIBAHBFGDFSADHFBJEACFJDBGEBHEDCEDGECFAEGCAECGBAFGCFICBFCASCAEGABCFHCBADHACEDCBAJCFDHEDIBAHBFHDFSDCSADHFBJEACFJDBGEASEDIEDHECFAEGCAECHBAFGCFICBFCASC',
//          'WDJECHBCGEAHFBCHECBAFCDHFCGFCWAEICBHAFGBCHAFBEHFAGEBGFDHEAJDBHFCJDBHFAIBWDJCAIBWDJCIBWDJECHBCSEAHBCGFCEBFCDHFAGFCJAEICBHAFGBCHAFBEHFBGEBIFDHEAJDBWAFJBDWFAIBWDCJAIBWDJFIBWD',
//          'HFEJDHBCJDSBGFIBSCJDSAGBSAHBAJFHAIDHEJDGBJFDICHFBGFSBIFEJDHBCJDBGABIFSCJDSAGBSAIBAJDHAIDHFJDGAJFDICHEAGFSBHFEDAJFCBJFADGCSADIHJABJIGAFBIJHDSCABHGDFIJHFBJSDGBHJDHFJAB']
// // sets_lengths normal spins: 0 69 78 55 68 84

// const lengths = reels.map(r => r.length);

// const lengths_mult = [
//     1,
//     lengths[4],
//     lengths[4] * lengths[3],
//     lengths[4] * lengths[3] * lengths[2],
//     lengths[4] * lengths[3] * lengths[2] * lengths[1],
//     lengths[4] * lengths[3] * lengths[2] * lengths[1] * lengths[0]
// ]

// function reel_round(reel: string = "", visible: number = 3) {
//     return reel + reel.slice(0, visible-1)
// }

// function to_set(reel_round: string[]) {
//     let s = []
//     let reel_round_s = []
//     for (const i in range(reel_round.length - (3-1))) {
//         sym = ""
//         col = reel_round[i: i+3]
//         if len(set(col)) < 3:
//             sym = [s for s in col if col.count(s) > 1][0]
//         reel_round_s.append([set(col), sym])
//     }
//     repeated = []
//     for col_s in reel_round_s:
//         if col_s in repeated:
//             continue
//         repeated.append(col_s)
//         count = reel_round_s.count(col_s)
//         s.append([col_s, count])

//     for col in s:
//         word = ""
//         for sym in col[0][0]:
//             word = word + sym
//         if len(word) < 3:
//             word = word + col[0][1]
//         if len(word) < 3:
//             word = word + col[0][1]
//         col[0][0] = word

//     return s

// }
// visible = [3, 3, 3, 3, 3]

// reels_round_set = [to_set(reel_round(reel, visible[i]))
//                    for (i, reel) in enumerate(reels)]

// print("start")
// gm_Total = [0, 0, 0]
// gm_Total = compute_combinations_GM(
//     reels_round_set=reels_round_set, lengths_mult_array=lengths_mult)
// print("gmtotal", gm_Total)
// tot_file = open("normal_nr.json", "a")
// tot_file.write(str(gm_Total))
// tot_file.close()
// print("end")
