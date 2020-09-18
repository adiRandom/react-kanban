/**
 * Created by Adrian Pascu at 12-Sep-20
 */
import {BackgroundType} from "../store/Store";


export type BoardActionType = "SET_BOARD_ID" | "RENAME_BOARD" | "CHANGE_BACKGROUND"

export type BoardAction = {
    type: BoardActionType,
    payload: string | ChangeBackgroundPayload
}

export type ChangeBackgroundPayload = {
    background: string,
    backgroundType: BackgroundType
}

