import axios from 'axios';
import { ref, unref, type Ref } from 'vue'


const instance = axios.create({
    baseURL: import.meta.env.VITE_APP_BASE_API,
    timeout: 50000,
    headers: { 'Content-Type': 'application/json;charset=utf-8' }
})

// // 请求拦截器
// instance.interceptors.request.use(
//     (config) => {
//       const userStore = useUserStoreHook();
//       if (userStore.token) {
//         config.headers.Authorization = userStore.token;
//       }
//       return config;
//     },
//     (error: any) => {
//       return Promise.reject(error);
//     }
//   );
  
//   // 响应拦截器
//   instance.interceptors.response.use(
//     (response) => {
//       const { code, msg } = response.data;
//       if (code === '00000') {
//         return response.data;
//       }
//       // 响应数据为二进制流处理(Excel导出)
//       if (response.data instanceof ArrayBuffer) {
//         return response;
//       }
  
//       ElMessage.error(msg || '系统出错');
//       return Promise.reject(new Error(msg || 'Error'));
//     },
//     (error: any) => {
//       if (error.response.data) {
//         const { code, msg } = error.response.data;
//         // token 过期,重新登录
//         if (code === 'A0230') {
//           ElMessageBox.confirm('当前页面已失效，请重新登录', '提示', {
//             confirmButtonText: '确定',
//             type: 'warning'
//           }).then(() => {
//             localStorage.clear();
//             window.location.href = '/';
//           });
//         } else {
//           ElMessage.error(msg || '系统出错');
//         }
//       }
//       return Promise.reject(error.message);
//     }
//   );


const http = {
    get: <T>(url: string) => {
        return new Promise<T>((resole, reject) => {
            instance.get(url).then(result => {
                resole(result as T)
            })
            .catch(reject)
        });
    }
}


function useHttp<T> (url: string | Ref<string>, method: string, params: any) {
    const data = ref<T>()
    const error = ref<Error>()
    const loding = ref(true)
    const first = ref(true)


    function fethcData() {
        reset()
        instance.request({
            url: unref(url),
            method: method,
            params: params
        }).then(result => {
            data.value = result.data as T
        }).catch(e => error.value = e)
        .finally(() => {
            loding.value = false
            first.value = false
        })
    }

    function reset() {
        if (!first.value){
            error.value = undefined
            loding.value = true
            data.value = undefined
        }
    }


    fethcData()
    
    return { data, error, loding, fethcData }
}

export default useHttp