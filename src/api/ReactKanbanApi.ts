/**
 * Created by Adrian Pascu at 14-Oct-20
 */

import {firestore, storage} from 'firebase'
import {Board} from './models/Board'
import {BackgroundType} from "../store/Store";
import {ListModel} from "../models/ListModel";
import {getEmptyBoard, getEmptyItem} from "../utils/functions/EmptyModelGenerators";
import {Item} from "../models/Item";
import {convertItemToApiItem} from "./models/Item";
import moveItem from "../reducers/util/MoveItem";

const BOARDS_COLLECTION = "boards"

export default class ReactKanbanApi {
    private static db?: firestore.Firestore = undefined;
    private static boardsCollectionRef: firestore.CollectionReference;
    private static storageBucket: storage.Storage

    private constructor(_db: firestore.Firestore) {
        ReactKanbanApi.db = _db
        ReactKanbanApi.boardsCollectionRef = _db.collection(BOARDS_COLLECTION);
        ReactKanbanApi.storageBucket = storage()
    }

    static instance?: ReactKanbanApi = undefined

    static getInstance(db?: firestore.Firestore) {
        if (ReactKanbanApi.instance)
            return ReactKanbanApi.instance
        else if (db) {
            ReactKanbanApi.instance = new ReactKanbanApi(db)
        } else throw new Error("No db provided")
    }

    async createBoard(id: string) {
        return ReactKanbanApi.boardsCollectionRef.doc(id).set({
            ...getEmptyBoard(id),
            lists: []
        } as Board)
    }

    async renameBoard(id: string, name: string) {
        return ReactKanbanApi.boardsCollectionRef.doc(id).update({
            title: name
        } as Board)
    }

    async changeBackgroundColor(id: string, color: string) {
        return ReactKanbanApi.boardsCollectionRef.doc(id).update({
            background: color,
            backgroundType: BackgroundType.COLOR
        } as Board)
    }

    async createList(boardId: string, list: ListModel) {
        return ReactKanbanApi.boardsCollectionRef.doc(boardId).update({
            lists: firestore.FieldValue.arrayUnion(list) as any
        } as Partial<Board>)
    }

    async renameList(boardId: string, list: ListModel) {
        const board = await ReactKanbanApi.boardsCollectionRef.doc(boardId).get().then(doc => doc.data() as Board | undefined)
        if (board) {
            const oldLists = board.lists
            const updatedList = oldLists.map(val => {
                if (val.id === list.id)
                    return {
                        ...val,
                        title: list.title
                    }
                else return val
            })
            return ReactKanbanApi.boardsCollectionRef.doc(boardId).update({
                lists: updatedList
            } as Partial<Board>)
        }
    }

    async changeBackgroundImage(id: string, backgroundImage: File) {
        const storageRef: storage.Reference = await ReactKanbanApi.storageBucket.ref(id).put(backgroundImage).then(res => res.ref)
        const downloadUrl: string = await storageRef.getDownloadURL()
        return ReactKanbanApi.boardsCollectionRef.doc(id).update({
            background: downloadUrl,
            backgroundType: BackgroundType.IMAGE
        } as Board)

    }

    async addItemToList(boardId: string, listId: string, itemId: string) {
        const apiItem = convertItemToApiItem(getEmptyItem(listId, itemId));
        console.log(this)
        const lists = await this.getListsFromBoard(boardId);
        if (lists) {
            // Add an item to the specified list
            const updatedLists = lists.map(list => {
                if (list.id !== listId)
                    return list
                else
                    return {
                        ...list,
                        items: [...list.items, apiItem]
                    }
            })
            return ReactKanbanApi.boardsCollectionRef.doc(boardId).update({
                lists: updatedLists
            } as Partial<Board>)
        }

    }

    private getListsFromBoard(boardId: string): Promise<ListModel[] | undefined> {
        return ReactKanbanApi.boardsCollectionRef.doc(boardId).get().then(doc => doc.data() as Board | undefined).then(data => data?.lists);
    }

    async changeItemContent(boardId: string,item: Item) {
        const lists = await this.getListsFromBoard(boardId);
        if (lists) {
            const updatedLists = lists.map(list => {
                if (list.id !== item.parentId) {
                    return list;
                }
                else {
                    return {
                        ...list,
                        items: list.items.map(_item => {
                            if (_item.id !== item.id)
                                return _item;
                            else return {
                                ..._item,
                                content: item.content
                            }
                        })
                    }
                }
            })
            return ReactKanbanApi.boardsCollectionRef.doc(boardId).update({
                lists: updatedLists
            } as Partial<Board>)
        }
    }

    async updateListAfterItemMoved(boardId: string, sourceListId: string, targetList: ListModel, item: Item, pos: number) {
        const lists = await this.getListsFromBoard(boardId);
        if (lists) {
            const sourceList = lists.find(list => list.id === sourceListId);
            if (sourceList) {
                const [mappedSourceList, mappedTargetList] = moveItem(sourceList, targetList, item, pos);
                if (mappedSourceList && mappedTargetList) {
                    const updatedLists = lists.map(list => {
                        if (list.id === mappedTargetList.id)
                            return mappedTargetList
                        else if (list.id === mappedSourceList.id)
                            return mappedSourceList;
                        else return list;
                    })
                    return ReactKanbanApi.boardsCollectionRef.doc(boardId).update({
                        lists: updatedLists
                    } as Partial<Board>)
                }
            }
        }
    }

}