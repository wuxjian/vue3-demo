import { defineStore } from "pinia";
import { ref } from "vue";
import { store } from './index'

const usernameKey = 'usernameKey'

export const useUserStore = defineStore('user', () => {

    const username = ref(sessionStorage.getItem(usernameKey) || '')

    const isLogin = () => {
        if (username.value != "") {
            return true
        }
        return false
    }


    const login = (name: string) => {
        return new Promise<void>((resole, reject) => {
            username.value = name
            sessionStorage.setItem(usernameKey, name)
            resole()
        });
        
    }

    const loginOut = () => {
      username.value = ''
      sessionStorage.removeItem(usernameKey)
    }

    return { username, isLogin, login, loginOut }
})


export function usePermissionStoreHook() {
    return useUserStore(store);
}