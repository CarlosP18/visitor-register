const ErrMsg = ({ msg, detail }) => {
    return (
        <div className='rounded grid items-center w-full  bg-red-100 h-16'>
            <div>
                <p className='font-bold text-xs ml-3.5 text-red-700'>{msg}</p>
                <p className='text-red-700 text-xs ml-3.5'> {detail}</p>
            </div>
        </div>
    );
};

export default ErrMsg;
