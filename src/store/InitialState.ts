/**
 * Created by Adrian Pascu at 12-Sep-20
 */
import {Store} from "./Store";
import getId from "../utils/IdGenerator";

const INITIAL_STATE: Store = {
    board: {
        id: getId(8),
        title: "New board"
    },
    lists: []
}

export default INITIAL_STATE