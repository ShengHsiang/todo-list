import { Button, TextField } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useState } from 'react';
import { v4 } from 'uuid';

const useStyles = makeStyles((theme) => ({
  wrapper: {
    display: 'flex',
  },
  input: {
    minWidth: '80%',
  },
  button: {
    flex: 1
  }
}));

const TodoInput = ({ addTodo }) => {
  const classes = useStyles();
  const [note, setNote] = useState('');

  function noteChange(e) {
    setNote(e.target.value);
  }

  async function handleAddItem() {
    if(!note.trim()) return;
    try {
      const id = v4();
      await addTodo({ variables: { id, note }, refetchQueries: ['TodoQuery'] })
      setNote('');
    } catch (error) {
      clg(error)
    }
  }

  return (
    <div className={classes.wrapper}>
      <TextField className={classes.input} label="add a new todo..." type="search" variant="outlined" value={note} onChange={noteChange} />
      <Button variant="contained" className={classes.button} onClick={handleAddItem}>Add</Button>
    </div>
  )
}

export default TodoInput
