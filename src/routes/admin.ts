import AdminJS from 'adminjs'
import AdminJSExpress from '@adminjs/express'

const adminJs = new AdminJS({
  databases: [],
  rootPath: '/admin'
})
const router = AdminJSExpress.buildRouter(adminJs)
export default router
