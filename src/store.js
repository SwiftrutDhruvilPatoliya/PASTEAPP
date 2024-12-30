import { configureStore } from '@reduxjs/toolkit'
import pasteReducer from './redux/PasteSlice'; 


 const store = configureStore({
    reducer: {
        paste: pasteReducer,
    },
})
export default store;
