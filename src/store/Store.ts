/**
 * Created by Adrian Pascu at 12-Sep-20
 */
import {ListModel} from "../models/ListModel";
import {Board} from "../models/Board";
import {Dialog} from "../models/Dialog";


export type Store = {
    lists: ListModel[],
    board: Board,
    dialog: Dialog
}


export enum BackgroundType {
    COLOR,
    IMAGE
}




