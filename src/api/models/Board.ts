/**
 * Created by Adrian Pascu at 15-Oct-20
 */

import {Board as a_Board} from "../../models/Board"
import {ListModel} from "../../models/ListModel";

export type Board = a_Board | {
    lists: ListModel[]
}