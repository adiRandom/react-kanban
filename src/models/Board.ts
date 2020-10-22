import {BackgroundType} from "../store/Store";
import getId from "../utils/functions/IdGenerator";
import COLORS from "../res/theme/BackgroundColors";

/**
 * Created by Adrian Pascu at 22-Sep-20
 */
export type Board = {
    title: string,
    id: string,
    background: string,
    backgroundType: BackgroundType,
    isSynced: boolean
}
