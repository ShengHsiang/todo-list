import gql from 'graphql-tag'
import { Button, TextField } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useState } from 'react';
import { v4 } from 'uuid';
import { useMutation } from '@apollo/client'

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

const ADD_TODO = gql`
  mutation AddTodo($id: ID!, $note: String!) {
    addTodo(id: $id, note: $note) {
      id
      note
      complete
    }
  }
`

const TodoInput = () => {
  const classes = useStyles();
  const [note, setNote] = useState('');
  const [addTodo] = useMutation(ADD_TODO)

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
