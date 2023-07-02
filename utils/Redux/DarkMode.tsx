import {createSlice} from "@reduxjs/toolkit";

interface defaultValue {
    mode: string,
}

// Define the initial state using that type
// const theme = localStorage.getItem("theme") as string if (typeof window !== 'undefined') {
const initialState: defaultValue = {
    mode: typeof window !== 'undefined' ? localStorage.getItem("theme") as string : 'light',
}
export const DarkModeSlice = createSlice({
    name: 'darkMode',
    initialState,
    reducers: {
        toggleDarkMode: (state) => {
            state.mode = state.mode === 'dark' ? 'light' : 'dark'
            localStorage.setItem('theme', state.mode)
        },
    }
})
export const { toggleDarkMode } = DarkModeSlice.actions;
export default DarkModeSlice.reducer

