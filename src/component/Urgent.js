import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { useSelector, useDispatch } from 'react-redux';
import { setUrgency} from '../store/greet';

export default function UrgentContr(props) {
  const {speed, id} = props
  console.log(speed)
  const [value, setValue] = React.useState(speed);
  const [inputValue, setInputValue] = React.useState('');
  const options = ["Regular", "Urgent", "Top Urgent"]
  const dispatch = useDispatch()
  return (
    <div>
      <Autocomplete
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue)
          dispatch(setUrgency({id:id, value:newValue}))
        }}
        inputValue={inputValue}
        onInputChange={(event, newInputValue) => {
          setInputValue(newInputValue);
        }}
        id="controllable-states-demo"
        options={ options}
        renderInput={(params) => <TextField {...params} label="Speed" />}
      />
    </div>
  );
}