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
    MoveItemPayload, AddItemPayload
} from "../actions/ListAction";
import INITIAL_STATE from "../store/InitialState";
import {getEmptyItem, getEmptyList} from "../utils/functions/EmptyModelGenerators";
import moveItem from "./util/MoveItem";

const ListReducer: Reducer<ListModel[], ListAction> = (state = INITIAL_STATE.lists, action) => {
    switch (action.type) {
        case "CREATE_LIST":
            const newList: ListModel = getEmptyList(action.payload as string)
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
            const {parentId, itemId} = action.payload as AddItemPayload
            //Add item to the specified list
            return state.map(val => {
                if (val.id === parentId)
                    return {
                        ...val,
                        items: [...val.items, getEmptyItem(parentId, itemId)]
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

                const sourceList = state.find(list => list.id === payload.sourceListId);
                const targetList = state.find(list => list.id === payload.targetListId);

                if (sourceList && targetList) {
                    const [mappedSourceList, mappedTargetList] = moveItem(sourceList, targetList, item, payload.pos);
                    return state.map(list => {
                        if (list.id === mappedTargetList.id)
                            return mappedTargetList
                        else if (list.id === mappedSourceList.id)
                            return mappedSourceList;
                        else return list;
                    })
                }
            }
            return state;
        }
        default:
            return state
    }
}

export default ListReducer