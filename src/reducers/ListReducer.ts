/**
 * Created by Adrian Pascu at 12-Sep-20
 */

import {Reducer} from 'redux'
import {ListModel} from "../models/ListModel";
import {
    ListAction,
    RenameListPayload,
    SaveEditItemPayload,
    ModifyItemPayload,
    MoveItemPayload
} from "../actions/ListAction";
import INITIAL_STATE from "../store/InitialState";
import getId from "../utils/functions/IdGenerator";

const ListReducer: Reducer<ListModel[], ListAction> = (state = INITIAL_STATE.lists, action) => {
    switch (action.type) {
        case "CREATE_LIST":
            const newList: ListModel = {
                id: getId(32),
                title: "New list",
                items: []
            }
            return [...state, newList]
        case "PUSH_LISTS": {
            return [...state, ...action.payload as ListModel[]]
        }
        case "RENAME_LIST": {
            const {id, title} = (action.payload as RenameListPayload)
            return state.map(val => {
                if (val.id === id)
                    return {
                        ...val,
                        title
                    }
                else
                    return val
            })
        }
        case "ADD_ITEM": {
            const id = action.payload as string
            //Add item to the specified list
            return state.map(val => {
                if (val.id === id)
                    return {
                        ...val,
                        items: [...val.items, {
                            content: "New item",
                            id: getId(32),
                            isEditing: true,
                            parentId: id
                        }]
                    }
                else
                    return val
            })
        }
        case "START_EDIT_ITEM": {
            const payload = action.payload as ModifyItemPayload
            //Toggle the editing flag on the specified item
            return state.map(val => {
                if (val.id !== payload.listId)
                    return val
                else return {
                    ...val,
                    items: val.items.map(item => {
                        if (item.id !== payload.itemId)
                            return item
                        else return {
                            ...item,
                            isEditing: true
                        }
                    })
                }
            })
        }
        case "SAVE_EDIT_ITEM": {
            const payload = action.payload as SaveEditItemPayload
            //Find the item to be changed and change its content
            return state.map(val => {
                if (val.id !== payload.listId)
                    return val
                else return {
                    ...val,
                    items: val.items.map(item => {
                        if (item.id !== payload.itemId)
                            return item
                        //    Change item content
                        else return {
                            ...item,
                            content: payload.content,
                            isEditing: false
                        }
                    })
                }
            })
        }
        case "DELETE_ITEM": {
            const payload = action.payload as ModifyItemPayload
            return state.map(val => {
                if (val.id !== payload.listId)
                    return val
                else return {
                    ...val,
                    items: val.items.filter(item => item.id !== payload.itemId)
                }
            })
        }
        case "MOVE_ITEM": {
            const payload = action.payload as MoveItemPayload
            const item = state.find(val => val.id === payload.sourceListId)?.items.find(val => val.id === payload.itemListId)


            //Move the item
            if (item) {
                //Change item parent
                item.parentId = payload.targetListId
                return state.map(list => {
                    // Remove the item from the source list
                    if (list.id === payload.sourceListId)
                        return {
                            ...list,
                            items: list.items.filter(val => val.id !== payload.itemListId)
                        } as ListModel

                    // Add it to the target list
                    else if (list.id === payload.targetListId)
                        return {
                            ...list,
                            items: [...list.items.slice(0, payload.pos), item, ...list.items.slice(payload.pos, list.items.length)]
                        } as ListModel
                    else return list;
                })
            } else return state
        }
        default:
            return state
    }
}

export default ListReducer