export type StateType = {
    age: number
    childrenCount: number
    name: string
}

export type ActionType = {
    type: string
    [key: string]: any
}


export function userReducer(state: StateType, action: ActionType): StateType {
    switch (action.type) {
        case 'INCREMENT-AGE':
            return {...state, age: state.age + 1};
        case 'INCREMENT-CHILDREN-COUNT':
            return {...state, childrenCount: state.childrenCount + 1};
        case 'CHANGE-NAME':
            return {...state, name:action["key"]};
        default:
            throw new Error("I don't understand this action type")
    }
}