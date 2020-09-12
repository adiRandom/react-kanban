/**
 * Created by Adrian Pascu at 12-Sep-20
 */
import {ListModel} from "../models/ListModel";
import {createStore} from 'redux'
import ROOT_REDUCER from "../reducers/RootReducer";

export type Store = {
    lists: ListModel[],
    board: Board
}

export type Board = {
    title: string,
    id: string
}

const STORE = createStore(ROOT_REDUCER)

export default STORE
