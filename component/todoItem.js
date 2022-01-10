import { Button, ListItem, ListItemIcon, ListItemText, ListItemSecondaryAction, IconButton, Checkbox } from "@material-ui/core"
import { makeStyles } from '@material-ui/core/styles';
import DeleteIcon from '@material-ui/icons/Delete';
import { useMutation } from '@apollo/client'
import gql from 'graphql-tag'

const useStyles = makeStyles((theme) => ({
  itemWrapper: {
    display: 'flex',
    borderColor: theme.palette.primary.main,
    borderWidth: '1px',
    borderStyle: 'solid',
  },
  note: {
    color: theme.palette.primary.main,
    flex: 1,
    padding: '0 10px',
  },
  isCheck: {
    textDecoration: 'line-through',
  }
}));

const TOGGLE_TODO = gql`
  mutation ToggleTodo($id: ID!) {
    toggleTodo(id: $id) {
      id
      note
      complete
    }
  }
`

const DELETE_TODO = gql`
  mutation DeleteTodo($id: ID!) {
    deleteTodo(id: $id) {
      id
    }
  }
`

const TodoItem = ({ item }) => {
  const classes = useStyles();

  const [toggleTodo] = useMutation(TOGGLE_TODO)
  const [deleteTodo] = useMutation(DELETE_TODO)

  function handleDeleteItem() {
    setList(function (prev) {
      return prev.filter(i => item.id !== i.id)
    })
  }

  async function handleToggleChecked() {
    try {
      await toggleTodo({ variables: { id: item.id }, refetchQueries: ['TodoQuery'] })
    } catch (error) {
      console.log(error)
    }
  }

  async function handleDeleteItem () {
    try {
      await deleteTodo({ variables: { id: item.id }, refetchQueries: ['TodoQuery'] })
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <ListItem key={item.id} role={undefined} dense>
      <ListItemIcon>
        <Checkbox
          edge="start"
          checked={item.complete}
          onChange={handleToggleChecked}
          tabIndex={-1}
          disableRipple
        />
      </ListItemIcon>
      <ListItemText id={item.id} primary={item.note} className={item.complete ? classes.isCheck : ''} />
      <ListItemSecondaryAction>
        <IconButton edge="end" aria-label="comments" onClick={handleDeleteItem}>
          <DeleteIcon />
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>
  )
}

export default TodoItem