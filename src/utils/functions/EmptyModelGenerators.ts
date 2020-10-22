import getId from "./IdGenerator";
import COLORS from "../../res/theme/BackgroundColors";
import {BackgroundType} from "../../store/Store";
import {ListModel} from "../../models/ListModel";
import {Board} from "../../models/Board";
import {Item} from "../../models/Item";

/**
 * Created by Adrian Pascu at 15-Oct-20
 */

export function getEmptyList(id?: string): ListModel {
    return {
        id: id ?? getId(32),
        title: "New list",
        items: []
    }
}

export function getEmptyBoard(id?: string): Board {
    return {
        id: id ?? getId(8),
        title: "New board",
        background: COLORS[0],
        backgroundType: BackgroundType.COLOR,
        isSynced: true
    }
}

export function getEmptyItem(parentId: string,id?: string): Item {
    return {
        content: "New item",
        id: id?? getId(32),
        isEditing: true,
        parentId: parentId
    }
}