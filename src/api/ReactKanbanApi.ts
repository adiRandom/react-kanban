/**
 * Created by Adrian Pascu at 14-Oct-20
 */

import {firestore} from 'firebase'
import {EMPTY_BOARD} from '../models/Board'
import {Board} from './models/Board'
import {BackgroundType} from "../store/Store";
import {ListModel} from "../models/ListModel";

const BOARDS_COLLECTION = "boards"

export default class ReactKanbanApi {
    private static db?: firestore.Firestore = undefined;
    private static boardsCollectionRef: firestore.CollectionReference;

    private constructor(_db: firestore.Firestore) {
        ReactKanbanApi.db = _db
        ReactKanbanApi.boardsCollectionRef = _db.collection(BOARDS_COLLECTION);
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
            ...EMPTY_BOARD,
            id,
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
            lists: firestore.FieldValue.arrayUnion(list)
        } as Partial<Board>)
    }

    async renameList(boardId: string, list: ListModel) {
        const oldLists = await ReactKanbanApi.boardsCollectionRef.doc(boardId).get().then(doc => doc.data() as ListModel[] | undefined)
        if (oldLists) {
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

}