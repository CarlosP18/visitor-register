import { fetchHelper } from '../utils/fetch';
import Swal from 'sweetalert2';

export const startRegistration = cedula => ({
    type: 'start',
    payload: {
        cedula,
    },
});

export const getPrevData = () => {
    return async dispatch => {
        const resp = await fetchHelper();
        const body = await resp.json();

        return body.registros;
    };
};

export const registerStartPost = (
    cedula,
    name,
    lastname,
    phone,
    company,
    plateNumber,
    registerDate,
    initialTime,
    endTime
) => {
    return async dispatch => {
        try {
            const resp = await fetchHelper(
                {
                    cedula,
                    name,
                    lastname,
                    phone,
                    company,
                    plateNumber,
                    registerDate,
                    initialTime,
                    endTime,
                },
                'POST'
            );

            const body = await resp.json();

            dispatch(finishRegistration());

            console.log(body);
        } catch (error) {
            console.log(error);
        }
    };
};

export const fillFormiWithPrevData = (
    cedula,
    name,
    lastname,
    phone,
    company
) => ({
    type: 'fillForm',
    payload: {
        cedula,
        name,
        lastname,
        phone,
        company,
    },
});

const finishRegistration = () => {
    Swal.fire(
        'Regitro Exitoso',
        'Visitante fue regitrado correctamente',
        'success'
    );
    return { type: 'finish' };
};
