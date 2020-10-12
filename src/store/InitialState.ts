/**
 * Created by Adrian Pascu at 12-Sep-20
 */
import {BackgroundType, Store} from "./Store";
import getId from "../utils/functions/IdGenerator";
import COLORS from "../res/theme/BackgroundColors";
import {DialogType} from "../models/Dialog";

const INITIAL_STATE: Store = {
    board: {
        id: getId(8),
        title: "New board",
        background: COLORS[0],
        backgroundType: BackgroundType.COLOR
    },
    lists: [],
    dialog: {
        type:DialogType.NONE
    }
}

export default INITIAL_STATE