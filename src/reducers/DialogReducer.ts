/**
 * Created by Adrian Pascu at 22-Sep-20
 */
import {DialogAction, isContextDialogPayload} from "../actions/DialogActions";
import {Reducer} from "redux"
import {Dialog, DialogType} from "../models/Dialog";
import INITIAL_STATE from "../store/InitialState";

const DialogReducer: Reducer<Dialog, DialogAction> = (state: Dialog = INITIAL_STATE.dialog, action: DialogAction) => {
    switch (action.type) {
        case "DISPOSE_DIALOGS":
            return {...state, type: DialogType.NONE}
        case "SHOW_DIALOG":
            return {
                ...state,
                type: action.payload as DialogType,
            }
        case "SET_CONTEXT_POSITION":
            if (isContextDialogPayload(action.payload))
                return {
                    ...state,
                    contextX: action.payload.x,
                    contextY: action.payload.y
                }
            else
                return state;
        case "SET_CONTEXT_TARGET": {
            if (isContextDialogPayload(action.payload))
                return {
                    ...state,
                    contextTargetItemId: action.payload.targetItemId,
                    contextTargetListId: action.payload.targetListId
                }
            else
                return state;
        }
        default:
            return state
    }
}

export default DialogReducer