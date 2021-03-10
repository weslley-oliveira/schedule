import Image from 'next/image'
import { useContext } from 'react';
import { Context } from '../contexts/Context';

function Lamp() {
    const { isOn } = useContext(Context);

    return (
        <div >
            {isOn?(
                <Image                
                src="/onOff.svg"
                alt="Picture of the author"
                width={280}
                height={450}
                />
            ):(
                <Image                
                src="/lamp-off.png"
                alt="Picture of the author"
                width={280}
                height={450}
                />
            )}
        </div>
    )
}

export default Lamp
