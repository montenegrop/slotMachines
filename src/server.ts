import 'dotenv/config'
import app from './app'

import rollRouter from './routes/rolls'

const PORT = process.env.PORT ?? '3000'

app
  .listen(PORT, () => {
    console.log('servidor escuchando en el puerto ' + PORT)
  })
  .on('error', (error) => {
    console.log('el error es: ', error)
  })

app.use('/api/roll', rollRouter)
