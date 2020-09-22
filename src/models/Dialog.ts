/**
 * Created by Adrian Pascu at 22-Sep-20
 */

export enum DialogType {
    SETTINGS,
    LOAD,
    CONTEXT,
    SHARE,
    NONE
}

export type Dialog = {
    type:DialogType,
    // Coordinates of dialog if is context menu
    contextX?:number,
    contextY?:number
}