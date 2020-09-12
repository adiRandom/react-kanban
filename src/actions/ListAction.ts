/**
 * Created by Adrian Pascu at 12-Sep-20
 */
import {ListModel} from "../models/ListModel";

export type ListActionType = 'CREATE_LIST' | 'PUSH_LISTS'

export type ListAction = {
    type: ListActionType,
    payload?: ListModel | ListModel[]
}