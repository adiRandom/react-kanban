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
// const ITEMS_COLLECTION = "items"

export default class ReactKanbanApi {
    private static db?: firestore.Firestore = undefined;
    private static boardsCollectionRef: firestore.CollectionReference;
    // private static itemsCollectionRef: firestore.CollectionReference;
    private static storageBucket: storage.Storage

    private constructor(_db: firestore.Firestore) {
        ReactKanbanApi.db = _db
        ReactKanbanApi.boardsCollectionRef = _db.collection(BOARDS_COLLECTION);
        // ReactKanbanApi.itemsCollectionRef = _db.collection(ITEMS_COLLECTION);

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
            lists: {}
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
        const updateBoard: any = {};
        updateBoard[`lists.${list.id}.title`] = list.title;
        return ReactKanbanApi.boardsCollectionRef.doc(boardId).update(updateBoard)
    }

    async changeBackgroundImage(id: string, backgroundImage: File) {
        const storageRef: storage.Reference = await ReactKanbanApi.storageBucket.ref(id).put(backgroundImage).then(res => res.ref)
        const downloadUrl: string = await storageRef.getDownloadURL()
        return ReactKanbanApi.boardsCollectionRef.doc(id).update({
            background: downloadUrl,
            backgroundType: BackgroundType.IMAGE
        } as Board)

    }

    async addItemToList(boardId: string, list: ListModel, itemId: string) {
        const apiItem = convertItemToApiItem(getEmptyItem(list.id, itemId));
        // Add an item to the specified list
        const updatedList = {
            ...list,
            items: [...list.items, apiItem]
        }
        const updatedBoard: any = {};
        updatedBoard[`lists.${list.id}`] = updatedList;
        return ReactKanbanApi.boardsCollectionRef.doc(boardId).update(updatedBoard);
    }


    private getListsFromBoard(boardId: string): Promise<{ [key: string]: ListModel } | undefined> {
        return ReactKanbanApi.boardsCollectionRef.doc(boardId).get().then(doc => doc.data() as Board | undefined).then(data => data?.lists);
    }

    async changeItemContent(boardId: string, list: ListModel, item: Item) {
        const updatedList = {
            ...list,
            items: list.items.map(_item => _item.id === item.id ? item : convertItemToApiItem(_item))
        }
        const updatedBoard: any = {};
        updatedBoard[`lists.${item.parentId}`] = updatedList;
        return ReactKanbanApi.boardsCollectionRef.doc(boardId).update(updatedBoard)
    }


    async updateListAfterItemMoved(boardId: string, sourceListId: string, targetList: ListModel, item: Item, pos: number) {
        const lists = await this.getListsFromBoard(boardId);
        if (lists) {
            const sourceList = lists[sourceListId];
            if (sourceList) {
                const [mappedSourceList, mappedTargetList] = moveItem(sourceList, targetList, convertItemToApiItem(item), pos);
                const updatedBoard: any = {};
                updatedBoard[`lists.${mappedTargetList.id}`] = mappedTargetList;
                updatedBoard[`lists.${mappedSourceList.id}`] = mappedSourceList;
                return ReactKanbanApi.boardsCollectionRef.doc(boardId).update(updatedBoard)
            }
        }
    }
}