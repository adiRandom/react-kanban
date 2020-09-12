/**
 * Created by Adrian Pascu at 12-Sep-20
 */


export type BoardActionType = "SET_BOARD_ID" | "RENAME_BOARD"

export type BoardAction = {
    type:BoardActionType,
    payload:string
}