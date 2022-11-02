import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { useSelector, useDispatch } from 'react-redux';
import { getNames , setAssign, getAssign} from '../store/greet';

export default function ControllableStates(props) {
  const {assign, id} = props
  const val = useSelector(state => getAssign(state, id))
  const [value, setValue] = React.useState(assign);
  const [inputValue, setInputValue] = React.useState('');
  const options = useSelector(state => getNames(state))
  const dispatch = useDispatch()
  return (
    <div>
      <Autocomplete
        value={val?val:"Hold"}
        onChange={(event, newValue) => {
          setValue(newValue)
          dispatch(setAssign({id:id, name:newValue}))
        }}
        inputValue={inputValue}
        onInputChange={(event, newInputValue) => {
          setInputValue(newInputValue);
        }}
        id="controllable-states-demo"
        options={ ["Hold", ...options]}
        renderInput={(params) => <TextField {...params} label="Assign" />}
      />
    </div>
  );
}