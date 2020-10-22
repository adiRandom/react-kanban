/**
 * Created by Adrian Pascu at 12-Sep-20
 */
import {Store} from "./Store";
import {DialogType} from "../models/Dialog";
import {getEmptyBoard} from "../utils/functions/EmptyModelGenerators";


const INITIAL_STATE: Store = {
    board: getEmptyBoard(),
    lists: [],
    dialog: {
        type: DialogType.NONE
    }
}

export default INITIAL_STATE