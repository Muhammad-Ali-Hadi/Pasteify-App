import { createSlice } from '@reduxjs/toolkit'
import toast from 'react-hot-toast'

const initialState = {
  pastes: localStorage.getItem('pastes') ? JSON.parse(localStorage.getItem('pastes')) : []
}

export const pasteSlice = createSlice({
  name: 'pastes',
  initialState,
  reducers: {
    addToPastes: (state,action) => {
      const newPaste=action.payload;

      if(state.pastes.some(paste=>paste.title===newPaste.title))
      {
        toast.error('Paste with this Title Already Exists!');
        return;
      }
      state.pastes.push(newPaste);
      localStorage.setItem('pastes',JSON.stringify(state.pastes));
      toast.success('Paste Created Successfully!');
    },
    updateToPastes: (state,action) => {
      const paste=action.payload;
      const index=state.pastes.findIndex((item)=>item.id===paste.id);

      if(index>=0)
      {
        state.pastes[index]=paste;
        localStorage.setItem('pastes',JSON.stringify(state.pastes));

        toast.success('Paste Updated Successfully!');
      }
      else
      {
        toast.error('Paste with this Title Does not Exist!');
      }
    },
    resetAllPastes: (state, action) => {
      state.pastes=[];
      localStorage.removeItem('pastes');
    },
    removeFromPastes: (state, action) => {
      const pasteId=action.payload;

      console.log(pasteId);
      const index=state.pastes.findIndex((item)=>item.id===pasteId);

      if(index>=0)
      {
        state.pastes.splice(index,1);
        localStorage.setItem('pastes',JSON.stringify(state.pastes));
      }
    },
  },
})

// Action creators are generated for each case reducer function
export const { addToPastes, updateToPastes, resetAllPastes, removeFromPastes } = pasteSlice.actions

export default pasteSlice.reducer