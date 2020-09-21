/**
 * Created by Adrian Pascu at 12-Sep-20
 */
import {ListModel} from "../models/ListModel";

// Push list is used to load lists for an existent board
export type ListActionType = 'CREATE_LIST' | 'PUSH_LISTS'

export type ListAction = {
    type: ListActionType,
    //Lists to be loaded in the board retrieved from the backend
    payload?:ListModel[]
}