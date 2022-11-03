import { Router } from "express"
import fs from "fs"
import { freeSpinsWinnings, normalWinnings } from "./services/victorious"
import path from "path"



const dir = path.join(__dirname, '../players')

if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir)
}

fs.writeFileSync(
    path.join(__dirname, '../players/playerApiZombie.json'),
    JSON.stringify({
        id: 2,
        balance: 1000,
        free_spins: 0,
        screen: ['EFS', 'DEJ', 'GDB', 'FCJ', 'SCJ']
    })
)

const router = Router()


router.get('/api', (req, res) => {
    const file = fs.readFileSync(
        path.join(__dirname, '../players/playerApiZombie.json'),
        'utf-8'
    )
    const userData = JSON.parse(file)
    if (userData.free_spins !== 0) {
        const resultFreeSpin = freeSpinsWinnings()
        userData.free_spins += resultFreeSpin.free_spins - 1
        userData.balance += (resultFreeSpin.total_win * 1.0) / 25
        userData.screen = resultFreeSpin.screen
        fs.writeFileSync(
            path.join(__dirname, '../players/player2.json'),
            JSON.stringify(userData)
        )
        fs.writeFileSync(
            path.join(__dirname, '../players/player2.json'),
            JSON.stringify(userData)
        )
        res.status(200).json({
            spin_results: resultFreeSpin,
            balance: userData.balance,
            free_spins_left: userData.free_spins
        })
    } else {
        let arr: number[] = []
        if (req.query.arr?.length !== undefined) {
            arr = (req.query.arr as string).split(',').map(function (item) {
                return parseInt(item, 10)
            })
        }
        const resultNormal = normalWinnings(arr)
        // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
        userData.balance +=
            (resultNormal.total_win * 1.0) / 25 - parseInt(req.query.bet as string)
        // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
        userData.free_spins += resultNormal.free_spins
        userData.screen = resultNormal.screen

        fs.writeFileSync(
            path.join(__dirname, '../players/player2.json'),
            JSON.stringify(userData)
        )
        res.status(200).json({
            spin_results: resultNormal,
            balance: userData.balance,
            free_spins_left: userData.free_spins
        })
    }
})

export default router
