/**
 * Created by Adrian Pascu at 12-Sep-20
 */

import {combineReducers} from 'redux'
import {Store} from "../store/Store";
import BoardReducer from "./BoardReducer";
import ListReducer from "./ListReducer";
import {DialogType} from "../models/Dialog";
import DialogReducer from "./DialogReducer";

const ROOT_REDUCER = combineReducers<Store>({
    board: BoardReducer,
    lists: ListReducer,
    dialog: DialogReducer
})

export default ROOT_REDUCER;