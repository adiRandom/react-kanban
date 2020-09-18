/**
 * Created by Adrian Pascu at 12-Sep-20
 */
import {ListModel} from "../models/ListModel";

export type Store = {
    lists: ListModel[],
    board: Board
}
export enum BackgroundType {
    COLOR,
    IMAGE
}

export type Board = {
    title: string,
    id: string,
    background: string,
    backgroundType: BackgroundType
}


