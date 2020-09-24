/**
 * Created by Adrian Pascu at 12-Sep-20
 */

export type Item = {
    id: string,
    content: string,
    //Flag for editing this items content
    isEditing: boolean,
    parentId:string
}