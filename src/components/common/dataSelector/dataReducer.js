
export const dataReducer = (state=[], action) => {
    switch (action.type) {
        case 'add':
            return [...state, action.payload]
        case 'remove':
            return state.filter(item => item.id != action.payload)
        case 'clear':
            return []
        default:
            return state;
    }

}