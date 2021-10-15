export const registerReducer = (state = {}, action) => {
    switch (action.type) {
        case 'start':
            return {
                cedula: action.payload.cedula,
            };
        case 'fillForm':
            return {
                ...state,
                cedula: action.payload.cedula,
                name: action.payload.name,
                lastname: action.payload.lastname,
                phone: action.payload.phone,
                company: action.payload.company,
                plateNumber: action.payload.plateNumber,
                registerDate: action.payload.registerDate,
                initialTime: action.payload.initialTime,
                endTime: action.payload.endTime,
            };
        case 'finish':
            return {};

        default:
            return state;
    }
};
