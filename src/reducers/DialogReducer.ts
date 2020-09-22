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
            return {type: DialogType.NONE}
        case "SHOW_DIALOG":
            if (isContextDialogPayload(action.payload))
                return {
                    contextX: action.payload.x,
                    contextY: action.payload.y,
                    type: DialogType.CONTEXT,
                    contextTargetItemId: action.payload.targetItemId,
                    contextTargetListId: action.payload.targetListId
                }
            else
                return {
                    type: action.payload!!,
                }
        default:
            return state
    }
}

export default DialogReducer