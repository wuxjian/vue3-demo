import router from './router'
import { usePermissionStoreHook } from './stores/user'

const whilteList = ['/login']

const store = usePermissionStoreHook()

router.beforeEach((to, from, next) => {
    if (whilteList.indexOf(to.path) > -1) {
        if (to.path == '/login' && store.isLogin()) {
            next('/')
            return
        } else {
            next()
            return
        }
    }
    if (!store.isLogin()) {
        next(`/login?redirectUrl=${to.path}`)
        return
    } else {
        next()
        return
    }
})