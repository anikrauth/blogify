import {configureStore} from '@reduxjs/toolkit'
import  darkmodeReducer from '@/utils/Redux/DarkMode'

export default configureStore({
    reducer: {
        darkMode: darkmodeReducer,
    }
})
