import Logo from '../../Icons/Fracttal.png';

import { PrimaryButton } from '../buttons/PrimaryButton';
import { useForm } from '../../hooks/useForm';
import { useDispatch } from 'react-redux';
import {
    fillFormiWithPrevData,
    getPrevData,
    startRegistration,
} from '../../actions/actions';
import { useHistory } from 'react-router';

export const HomeScreen = () => {
    const [formValues, handleInputChange, reset] = useForm({
        cedula: '',
    });
    const { cedula } = formValues;

    const dispatch = useDispatch();

    const history = useHistory();

    const handleStartRegister = async e => {
        e.preventDefault();
        dispatch(startRegistration(cedula));
        localStorage.setItem('userData', JSON.stringify(cedula));
        const registerData = await dispatch(getPrevData());
        const prevData = registerData.find(x => x.cedula === cedula);
        if (prevData) {
            dispatch(
                fillFormiWithPrevData(
                    prevData.cedula,
                    prevData.name,
                    prevData.lastname,
                    prevData.phone,
                    prevData.company
                )
            );
        }
        reset();
        history.push('/registro');
    };

    const isFormValid = () => {
        if (cedula.length < 5) {
            return false;
        }

        return true;
    };

    return (
        <div className='w-full flex justify-center '>
            <form
                className='rounded-md flex mt-60  bg-white w-96  shadow-2xl p-6'
                onSubmit={handleStartRegister}
            >
                <div className='w-full'>
                    <img
                        src={Logo}
                        className='w-20 mx-auto mb-5'
                        alt='Fracttal logo'
                    />
                    <h1 className='mx-auto text-center mb-3 text-xl font-bold'>
                        Ingresa el numero de cedula del visitante para iniciar
                        el registro
                    </h1>
                    <input
                        type='number'
                        className='h-12 w-full text-center mt-3 rounded-md border outline-none focus:ring-0  border-gray-400'
                        placeholder='Numero de cedula'
                        name='cedula'
                        autoComplete='off'
                        value={cedula}
                        onChange={handleInputChange}
                    />
                    <PrimaryButton
                        text='Comenzar registro'
                        disabled={!isFormValid()}
                    />
                </div>
            </form>
        </div>
    );
};
