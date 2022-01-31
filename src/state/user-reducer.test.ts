import {ActionType, userReducer} from './user-reducer';

test('user reducer should increment only age', () => {
    const startState = { age: 20, childrenCount: 2, name: 'Dimych' };

    const endState = userReducer(startState, { type: 'INCREMENT-AGE' })

    expect(endState.age).toBe(21);
    expect(endState.childrenCount).toBe(2);
});

test('user reducer should increment only childrenCount', () => {
    const startState = { age: 20, childrenCount: 2, name: 'Dimych' };

    const example = userReducer(startState,{type:'INCREMENT-CHILDREN-COUNT'})

    expect(example.childrenCount).toBe(3)
    expect(example.age).toBe(20)
    expect(startState.childrenCount).toBe(2)
});

test('user reducer should only change the name', () => {
    const startState = { age: 20, childrenCount: 2, name: 'Dimych' };

    const example = userReducer(startState,{type:'CHANGE-NAME',["key"]:'Aleksandr'})

    expect(example.name).toBe("Aleksandr")
});
