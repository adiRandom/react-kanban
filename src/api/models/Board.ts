/**
 * Created by Adrian Pascu at 15-Oct-20
 */

import {Board as a_Board} from "../../models/Board"
import {ListModel} from "../../models/ListModel";

export type Board = {
    [k in keyof a_Board]: a_Board[k]
} & {
    lists: {
        [k: string]: ListModel
    }
}