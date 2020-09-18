/**
 * Created by Adrian Pascu at 12-Sep-20
 */

import {Reducer} from 'redux'
import {Board} from "../store/Store";
import {BoardAction, ChangeBackgroundPayload} from "../actions/BoardActions";
import INITIAL_STATE from "../store/InitialState";

const BoardReducer: Reducer<Board, BoardAction> = (state = INITIAL_STATE.board, action) => {
    switch (action.type) {
        case "RENAME_BOARD":
            return {
                ...state,
                title: action.payload as string
            }
        case "SET_BOARD_ID":
            return {
                ...state,
                id: action.payload as string
            }
        case "CHANGE_BACKGROUND":
            const {background, backgroundType} = action.payload as ChangeBackgroundPayload
            return {
                ...state,
                backgroundType,
                background
            }
        default:
            return state
    }
}

export default BoardReducer