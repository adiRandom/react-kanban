/**
 * Created by Adrian Pascu at 22-Sep-20
 */

export enum DialogType {
    SETTINGS,
    LOAD,
    CONTEXT,
    NONE
}

export type Dialog = {
    type:DialogType,
    // Info about dialog if is context menu
    contextX?:number,
    contextY?:number,
    contextTargetItemId?:string,
    contextTargetListId?:string
}