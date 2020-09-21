/**
 * Created by Adrian Pascu at 12-Sep-20
 */
import {ListModel} from "../models/ListModel";

// Push list is used to load lists for an existent board
export type ListActionType = 'CREATE_LIST' | 'PUSH_LISTS' | 'RENAME_LIST' | 'ADD_ITEM'

export type ListAction = {
    type: ListActionType,
    //ListModel[] - Lists to be loaded in the board retrieved from the backend
    //string - Parent list id for the new item
    payload?:ListModel[] | RenameListPayload | string
}

export type RenameListPayload = {
    //List id
    id:string,
    title:string
}