/**
 * Created by Adrian Pascu at 22-Sep-20
 */
import {DialogType} from "../models/Dialog";

export type DialogActionType = "SHOW_DIALOG" | "DISPOSE_DIALOGS"

export type DialogAction = {
    type: DialogActionType,
    payload?: DialogType | ContextDialogPayload
}

export type ContextDialogPayload = {
    x: number,
    y: number
}

export function isContextDialogPayload(obj: any): obj is ContextDialogPayload {
    return (obj.x && obj.y)
}


