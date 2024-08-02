import React, { FC } from 'react';

type ModalBaseProps = {
  title: string;
  children: React.ReactNode;
  successAction?: () => void;
  successButton?: string;
  open: boolean;
  closeModal: () => void;
};

const ModalBase: FC<ModalBaseProps> = ({
  title,
  children,
  successAction,
  successButton,
  open,
  closeModal,
}) => {
  if (!open) return null;

  return (
    <div
      className='fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-20'
      onClick={closeModal}
    >
      <div
        className='bg-white rounded-lg p-6 w-1/3'
        onClick={(e) => e.stopPropagation()}
      >
        <div className='flex justify-between items-center border-b pb-3'>
          <h2 className='text-lg font-semibold'>{title}</h2>
          <button
            onClick={closeModal}
            className='text-gray-500 hover:text-gray-700'
          >
            &times;
          </button>
        </div>
        <div className='mt-4'>{children}</div>
        <div className='mt-6 flex justify-end'>
          <button
            onClick={successAction}
            className='bg-blue-500 text-white px-4 py-2 rounded mr-2'
          >
            {successButton}
          </button>
          <button
            onClick={closeModal}
            className='bg-gray-500 text-white px-4 py-2 rounded'
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalBase;
