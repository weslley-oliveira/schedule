import React, { useContext} from 'react'
import Switch from '@material-ui/core/Switch'
import { Context } from '../contexts/Context';

function SwitchOnOff() {

    const {
        isOn, 
        onOff
      } = useContext(Context);

    return (
        <div>
            <span>Off</span>
            <Switch
                checked={isOn}
                onChange={onOff}
                color="default"
                name="checkedB"
                inputProps={{ 'aria-label': 'primary checkbox' }}
            />
            <span>On</span>
        </div>
    )
}

export default SwitchOnOff
