/**
 * Created by Adrian Pascu at 12-Sep-20
 */
import {BackgroundType} from "../store/Store";
import {Dispatch} from 'redux'
import {getState} from "./Types";


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

type SyncMiddleware = (...args: any) => Promise<any>

//Action creator that mutates the state to reflect the sycn process and executes a middleware which is the actual sync logic
// Injects the args to the middleware and the board id as the first arg of the middleware
export function syncToBackend(middleware?: SyncMiddleware, ...args: any) {
    return async (dispatch: Dispatch, getState: getState) => {
        dispatch({type: "START_SYNCING"} as BoardAction)
        const {board} = getState()
        const {id} = board
        if (middleware)
            await middleware(id, ...args)
        dispatch({type: "MARK_SYNC_DONE"} as BoardAction)
    }
}

