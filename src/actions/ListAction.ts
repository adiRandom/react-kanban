/**
 * Created by Adrian Pascu at 12-Sep-20
 */
import {ListModel} from "../models/ListModel";
import {Dispatch} from 'redux'
import {Store} from "../store/Store";
import {BoardAction} from "./BoardActions";
import ReactKanbanApi from "../api/ReactKanbanApi";

// Push list is used to load lists for an existent board
export type ListActionType =
    'CREATE_LIST'
    | 'PUSH_LISTS'
    | 'RENAME_LIST'
    | 'ADD_ITEM'
    | 'START_EDIT_ITEM'
    | 'SAVE_EDIT_ITEM'
    | "DELETE_ITEM"
    | "MOVE_ITEM"

export type ListAction = {
    type: ListActionType,
    //ListModel[] - Lists to be loaded in the board retrieved from the backend
    //string - Parent list id for the new item
    payload?: ListModel[] | RenameListPayload | string | ModifyItemPayload | MoveItemPayload
}

export type RenameListPayload = {
    //List id
    id: string,
    title: string
}

export type ModifyItemPayload = {
    listId: string,
    itemId: string
}

export type SaveEditItemPayload = {
    listId: string,
    itemId: string,
    content: string
}

export type MoveItemPayload = {
    sourceListId: string,
    itemListId: string,
    targetListId: string,
    pos: number
}

export function syncListRename(list: ListModel) {
    return async (dispatch: Dispatch, getState: () => Store) => {
        dispatch({
            type: "START_SYNCING"
        } as BoardAction)
        const {board} = getState()
        const {id} = board

        await ReactKanbanApi.getInstance()?.renameList(id, list)
        dispatch({
            type: "MARK_SYNC_DONE"
        } as BoardAction)
    }
}