import {configureStore} from '@reduxjs/toolkit'
import ShortURLReducer from '../src/Slices/URLslice.js'
const store = configureStore({
reducer:ShortURLReducer
})
