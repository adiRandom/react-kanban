/**
 * Created by Adrian Pascu at 12-Sep-20
 */

import {Reducer} from 'redux'
import {ListModel} from "../models/ListModel";
import {ListAction} from "../actions/ListAction";
import INITIAL_STATE from "../store/InitialState";
import getId from "../utils/IdGenerator";

const ListReducer: Reducer<ListModel[], ListAction> = (state = INITIAL_STATE.lists, action) => {
    switch (action.type) {
        case "CREATE_LIST":
            const newList: ListModel = {
                id: getId(32),
                title: "New list",
                items: []
            }
            return [...state, newList]
        case "PUSH_LISTS": {
            return [...state, ...action.payload as ListModel[]]
        }
        default:
            return state
    }
}

export default ListReducer