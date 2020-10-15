/**
 * Created by Adrian Pascu at 12-Sep-20
 */
import {BackgroundType, Store} from "../store/Store";
import {Dispatch} from 'redux'
import ReactKanbanApi from "../api/ReactKanbanApi";


export type BoardActionType =
    "SET_BOARD_ID"
    | "RENAME_BOARD"
    | "CHANGE_BACKGROUND"
    | "START_SYNCING"
    | "MARK_SYNC_DONE"
    | "SYNC_FAILED"

export type BoardAction = {
    type: BoardActionType,
    payload?: string | ChangeBackgroundPayload
}

export type ChangeBackgroundPayload = {
    background: string,
    backgroundType: BackgroundType
}

export function syncRenameBoard(name: string) {
    return async (dispatch: Dispatch, getState: () => Store) => {
        dispatch({type: "START_SYNCING"} as BoardAction)
        const {board} = getState()
        const {id} = board
        await ReactKanbanApi.getInstance()?.renameBoard(id, name)
        dispatch({type: "MARK_SYNC_DONE"} as BoardAction)
    }
}
