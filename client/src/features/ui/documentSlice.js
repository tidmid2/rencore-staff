import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import apiAxios from '../../config/axiosConfig'

export const fetchAllDocument = createAsyncThunk('products/fetchAllDocument', async () => {
        const response = await apiAxios.get('/document')
        const document = {}
        response.data.forEach(documents =>
            document[document.id] = documents)
        return document
})

export const documentSlice = createSlice({
    name: 'document',
    initialState: {
        fetchAllDocumentStatus: 'idle',
        allDocument: {}
    },
    extraReducers: {
        //Reducers for fetching Document
        [fetchAllDocument.pending]: (state, action) => {
            state.fetchAllDocumentStatus = 'loading'
          },
          [fetchAllDocument.fulfilled]: (state, action) => {
            state.fetchAllDocumentStatus = 'succeeded'
            state.allDocument = action.payload
          },
          [fetchAllDocument.rejected]: (state, action) => {
            state.fetchAllDocumentStatus = 'failed'
          },
    }
})

export const selectDocumentById = (state, documentId) => state.document.allDocument[documentId]

export default documentSlice.reducer