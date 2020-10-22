/**
 * Created by Adrian Pascu at 22-Oct-20
 */
import {ListModel} from "../../models/ListModel";
import {Item} from "../../models/Item";
import {Item as ApiItem} from "../../api/models/Item"

// Returns a tuple with a mapping of the sourceList and targetList after the item was moved to pos
// Inside the tuple, the first item is the mapped source and the second is the mapped target
export default function moveItem(sourceList: ListModel, targetList: ListModel, item: Item|ApiItem, pos: number): [ListModel, ListModel] {

    // Special case for moving the item inside the same list
    if (sourceList.id === targetList.id) {
        // Remove it from it's current position
        const filteredItems = sourceList.items.filter(val => val.id !== item.id)
        const mappedList = {
            ...sourceList,
            // Splice the item in the new position
            items: [...filteredItems.slice(0, pos), item, ...filteredItems.slice(pos, sourceList.items.length)]
        } as ListModel;
        return [mappedList, mappedList];
    }

    // Add it to the target list
    const mappedTargetList = {
        ...targetList,
        items: [...targetList.items.slice(0, pos), item, ...targetList.items.slice(pos, targetList.items.length)]
    } as ListModel;

    // Remove the item from the source list
    const mappedSourceList = {
        ...sourceList,
        items: sourceList.items.filter(val => val.id !== item.id)
    } as ListModel;
    return [mappedSourceList, mappedTargetList];

}