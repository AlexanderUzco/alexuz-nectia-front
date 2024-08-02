import { PlusIcon } from '@heroicons/react/16/solid';

interface IElevatedHeaderProps {
  title: string;
  actionButton?: () => void;
}

const ElevatedHeader = ({ title, actionButton }: IElevatedHeaderProps) => {
  return (
    <div className='relative overflow-hidden flex justify-center flex justify-center'>
      <div className='fixed top-20 z-10 bg-white shadow-md py-4 px-6 xl:w-[80%] md:w-[70%] w-[90%]'>
        <div className='flex items-center justify-between w-full'>
          <h2 className='text-2xl font-bold'>{title}</h2>

          {actionButton && (
            <button
              onClick={actionButton}
              className='flex items-center bg-blue-500 text-white px-4 py-2 rounded'
            >
              <PlusIcon className='w-5 h-5' />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ElevatedHeader;
