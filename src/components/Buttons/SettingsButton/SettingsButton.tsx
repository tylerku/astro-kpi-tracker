import Image from 'next/image'

interface SettingsButtonProps {
  className?: string
}

const SettingsButton: React.FC<SettingsButtonProps> = (props) => {
  return (
    <div className={`hover:bg-basic-gray relative h-10 aspect-square p-1 rounded-md hover:scale-95 hover:cursor-pointer ${props.className}`}>
      <div className='w-full h-full relative'>
        <Image src='/settings-icon.svg' alt='settings' fill/>
      </div>
    </div>
  )
}

export default SettingsButton