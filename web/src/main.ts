import { app } from '@app/app'

async function bootstrap () {
  app.listen(process.env.PORT, () => {
    console.log('server is successfully started on port= ', process.env.PORT)
  })
}

bootstrap()

export { bootstrap }
