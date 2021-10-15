import React from 'react';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import { PrimaryButton } from '../buttons/PrimaryButton';
import Logo from '../../Icons/Fracttal.png';
import moment from 'moment';
import 'moment/locale/es-mx';
import 'animate.css';
import { useForm } from '../../hooks/useForm';
import { useDispatch } from 'react-redux';
import { finishRegistration, registerStartPost } from '../../actions/actions';
import { useHistory } from 'react-router';

export const RegisterForm = () => {
    const [isInVehicle, setIsInVehicle] = useState(false);

    const [isChecked, setIsChecked] = useState('');

    const { cedula, name, lastname, phone, company } = useSelector(
        state => state.register
    );
    const dispatch = useDispatch();
    const history = useHistory();

    const date = moment().locale('es-mx').format('LL');

    const [inputValues, handleInputChange, reset] = useForm({
        id: cedula,
        nombre: name,
        apellido: lastname,
        telefono: phone,
        empresa: company,
        matricula: '',
        registerDate: date,
        initialTime: '',
        endTime: '',
    });

    const {
        id,
        nombre,
        apellido,
        telefono,
        empresa,
        matricula,
        registerDate,
        initialTime,
        endTime,
    } = inputValues;

    const handleRegister = async e => {
        e.preventDefault();
        dispatch(
            await registerStartPost(
                id,
                nombre,
                apellido,
                telefono,
                empresa,
                matricula,
                registerDate,
                initialTime,
                endTime
            )
        );
        reset();
        dispatch(finishRegistration());
        history.push('/');
    };
    const isFormValid = () => {
        if (id.length < 5) {
            return false;
        } else if (nombre?.length === 0) {
            return false;
        } else if (apellido?.length === 0) {
            return false;
        } else if (telefono?.length !== 9) {
            return false;
        } else if (empresa?.length === 0) {
            return false;
        } else if (initialTime?.length === 0) {
            return false;
        } else if (endTime?.length === 0) {
            return false;
        } else if (isInVehicle) {
            if (matricula?.length === 0) {
                return false;
            }
        }
        return true;
    };

    const inputClassName =
        'h-12 w-full text-center mt-3 focus:ring-0 rounded-md border outline-none  border-gray-400';

    return (
        <div className='w-full flex justify-center '>
            <form
                className='rounded-md flex   bg-white w-96 shadow-2xl p-6'
                onSubmit={handleRegister}
            >
                <div className='w-full'>
                    <img
                        src={Logo}
                        className='w-20 mx-auto mb-5'
                        alt='Fracttal logo'
                    />
                    <h1 className='mx-auto text-center mb-3 text-xl font-bold'>
                        Completa el formulario para finalizar el registro
                    </h1>

                    <input
                        type='text'
                        className={inputClassName}
                        placeholder='Numero de cedula'
                        name='cedula'
                        autoComplete='off'
                        readOnly
                        value={id}
                        onChange={handleInputChange}
                    />
                    <input
                        type='text'
                        className={inputClassName}
                        placeholder='Nombre'
                        name='nombre'
                        autoComplete='off'
                        onChange={handleInputChange}
                        value={nombre}
                    />
                    <input
                        type='text'
                        className={inputClassName}
                        placeholder='Apellido'
                        name='apellido'
                        autoComplete='off'
                        onChange={handleInputChange}
                        value={apellido}
                    />
                    <input
                        type='number'
                        className={inputClassName}
                        placeholder='Telefono'
                        name='telefono'
                        autoComplete='off'
                        onChange={handleInputChange}
                        value={telefono}
                    />
                    <input
                        type='text'
                        className={inputClassName}
                        placeholder='Nombre de empresa'
                        name='empresa'
                        autoComplete='off'
                        onChange={handleInputChange}
                        value={empresa}
                    />

                    <div>
                        <p className='mt-8 mb-3'>¿Ingresa con vehiculo?</p>
                        <div className='flex'>
                            <label
                                className={`inline-flex cursor-pointer ${
                                    isChecked === 'si'
                                        ? 'bg-green-100 border-green-400'
                                        : 'border-gray-400'
                                } hover:bg-green-100 hover:border-green-400 items-center h-12 border  rounded-md w-1/2`}
                                onClick={e => setIsChecked(e.target.value)}
                            >
                                <input
                                    type='radio'
                                    className='form-radio h-5 w-5 ml-5 focus:ring-0 text-green-500'
                                    name='vehicle'
                                    value='si'
                                    onChange={() => setIsInVehicle(true)}
                                />
                                <span className='ml-2'>Si</span>
                            </label>
                            <label
                                className={`inline-flex cursor-pointer ${
                                    isChecked === 'no'
                                        ? 'bg-green-100 border-green-400'
                                        : 'border-gray-400'
                                } hover:bg-green-100 hover:border-green-400 items-center h-12 border ml-2  rounded-md w-1/2`}
                                onClick={e => setIsChecked(e.target.value)}
                            >
                                <input
                                    type='radio'
                                    className='form-radio h-5 w-5 ml-5 focus:ring-0 outline-none text-green-500'
                                    name='vehicle'
                                    value='no'
                                    onChange={() => setIsInVehicle(false)}
                                />
                                <span className='ml-2'>No</span>
                            </label>
                        </div>
                    </div>
                    {isInVehicle && (
                        <input
                            type='text'
                            className='h-12 w-full animate__fadeInDown animate__animated animate__fast	900ms text-center mt-3 rounded-md border outline-none  focus:ring-0  border-gray-400'
                            placeholder='Numero de matrícula'
                            name='matricula'
                            autoComplete='off'
                            onChange={handleInputChange}
                            value={matricula}
                        />
                    )}

                    <input
                        type='text'
                        className='h-12 w-full text-center mt-3 focus:ring-0 rounded-md border outline-none  border-gray-400'
                        name='date'
                        disabled
                        value={registerDate}
                        onChange={handleInputChange}
                    />

                    <div className='flex w-full'>
                        <div className='w-1/2 mt-3'>
                            <label htmlFor='initialTime'>Hora de entrada</label>
                            <input
                                type='time'
                                id='initialTime'
                                className='h-12 w-full text-center mt-1 focus:ring-0 rounded-md border outline-none  border-gray-400'
                                name='initialTime'
                                onChange={handleInputChange}
                                value={initialTime}
                            />
                        </div>
                        <div className='w-1/2 ml-2 mt-3'>
                            <label htmlFor='endTime'>Hora de salida</label>
                            <input
                                type='time'
                                id='endTime'
                                className='h-12  text-center mt-1 w-full focus:ring-0 rounded-md border outline-none  border-gray-400'
                                name='endTime'
                                onChange={handleInputChange}
                                value={endTime}
                            />
                        </div>
                    </div>

                    <PrimaryButton text='Registrar' disabled={!isFormValid()} />
                </div>
            </form>
        </div>
    );
};
