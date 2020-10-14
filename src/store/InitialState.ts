/**
 * Created by Adrian Pascu at 12-Sep-20
 */
import { Store} from "./Store";
import {DialogType} from "../models/Dialog";
import {EMPTY_BOARD} from "../models/Board";


const INITIAL_STATE: Store = {
    board: EMPTY_BOARD,
    lists: [],
    dialog: {
        type: DialogType.NONE
    }
}

export default INITIAL_STATE