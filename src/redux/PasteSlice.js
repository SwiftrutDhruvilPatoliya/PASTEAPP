import { createSlice } from '@reduxjs/toolkit';
import toast from 'react-hot-toast';


const loadPastesFromLocalStorage = () => {
    const storedPastes = localStorage.getItem("pastes");
    try {
        return storedPastes ? JSON.parse(storedPastes) : [];
    } catch (error) {
        console.error("Failed to parse pastes from localStorage:", error);
        return []; 
    }
};


const initialState = {
    pastes: loadPastesFromLocalStorage(),
};


export const PasteSlice = createSlice({
    name: 'paste',
    initialState,
    reducers: {

        addToPastes: (state, action) => {
            const paste = action.payload;
            state.pastes.push(paste);
            localStorage.setItem("pastes", JSON.stringify(state.pastes));
            toast.success("Paste added successfully");
        },

        updateToPastes: (state, action) => {
            const updatedPaste = action.payload;
            const index = state.pastes.findIndex((item) => item._id === updatedPaste._id);

            if (index >= 0) {
                state.pastes[index] = updatedPaste;
                localStorage.setItem("pastes", JSON.stringify(state.pastes));
                toast.success("Paste updated successfully");
            } else {
                toast.error("Paste not found");
            }
        },

        resetAllPastes: (state) => {
            state.pastes = [];
            localStorage.removeItem("pastes");
            toast.success("All pastes reset successfully");
        },

        removeFromPastes: (state, action) => {
            const pasteId = action.payload;
            const index = state.pastes.findIndex((item) => item._id === pasteId);

            if (index >= 0) {
                state.pastes.splice(index, 1);
                localStorage.setItem("pastes", JSON.stringify(state.pastes));
                toast.success("Paste deleted successfully");
            } else {
                toast.error("Paste not found");
            }
        },
    },
});

export const { addToPastes, updateToPastes, resetAllPastes, removeFromPastes } = PasteSlice.actions;

export default PasteSlice.reducer;
