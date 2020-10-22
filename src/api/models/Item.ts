/**
 * Created by Adrian Pascu at 16-Oct-20
 */

import {Item as m_Item} from '../../models/Item'

export type Item = {
    id: string,
    content: string,
    parentId: string
}

export function convertItemToApiItem({parentId, content, id}: m_Item): Item {
    return {
        parentId,
        content,
        id
    }
}