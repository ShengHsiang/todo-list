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

const TodoItem = ({ item, setList }) => {
  const classes = useStyles();

  function handleDeleteItem() {
    setList(function (prev) {
      return prev.filter(i => item.id !== i.id)
    })
  }

  function handleToggleChecked() {
    setList(function (prev) {
      return prev.map(i => {
        if (i.id === item.id) {
          i.checked = !i.checked
        }
        return i
      })
    })
  }

  return (
    <ListItem key={item.id} role={undefined} dense>
      <ListItemIcon>
        <Checkbox
          edge="start"
          checked={item.checked}
          onChange={handleToggleChecked}
          tabIndex={-1}
          disableRipple
        />
      </ListItemIcon>
      <ListItemText id={item.id} primary={item.note} className={item.checked ? classes.isCheck : ''} />
      <ListItemSecondaryAction>
        <IconButton edge="end" aria-label="comments" onClick={handleDeleteItem}>
          <DeleteIcon />
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>
  )
}

export default TodoItem