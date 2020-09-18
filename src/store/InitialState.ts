/**
 * Created by Adrian Pascu at 12-Sep-20
 */
import {BackgroundType, Store} from "./Store";
import getId from "../utils/IdGenerator";
import COLORS from "../res/theme/BackgroundColors";

const INITIAL_STATE: Store = {
    board: {
        id: getId(8),
        title: "New board",
        background:COLORS[0],
        backgroundType:BackgroundType.COLOR
    },
    lists: []
}

export default INITIAL_STATE