import { Button, ListItem, ListItemIcon, ListItemText, ListItemSecondaryAction, IconButton, Checkbox } from "@material-ui/core"
import { makeStyles } from '@material-ui/core/styles';
import DeleteIcon from '@material-ui/icons/Delete';

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

const TodoItem = ({ item, toggleTodo, deleteTodo }) => {
  const classes = useStyles();

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