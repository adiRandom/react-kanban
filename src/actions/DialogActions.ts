/**
 * Created by Adrian Pascu at 22-Sep-20
 */
import {DialogType} from "../models/Dialog";

export type DialogActionType = "SHOW_DIALOG" | "DISPOSE_DIALOGS" | "SET_CONTEXT_TARGET" | "SET_CONTEXT_POSITION"

export type DialogAction = {
    type: DialogActionType,
    payload?: DialogType | ContextDialogPayload
}

export type ContextDialogPayload = {
    x?: number,
    y?: number,
    targetListId?: string,
    targetItemId?: string
}

export function isContextDialogPayload(obj: any): obj is ContextDialogPayload {
    return (obj.x && obj.y) || (obj.targetListId && obj.targetItemId)
}


