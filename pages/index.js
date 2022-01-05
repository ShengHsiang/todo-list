import TodoInput from '../component/todoInput';
import TodoItem from '../component/todoItem'
import { useState } from 'react';
import { Container, CssBaseline, List } from '@material-ui/core'
import { makeStyles, ThemeProvider, createTheme } from '@material-ui/core/styles';
import { blue, red } from '@material-ui/core/colors';

const useStyles = makeStyles((theme) => ({
  todoTitle: {
    color: theme.palette.primary.main,
  },
  listWrapper: {
    padding: '20px 0',
  },
}));

const theme = createTheme({
  palette: {
    // type: 'dark',
    // primary: {
    //   main: blue[500],
    // },
    // danger: {
    //   main: red[500],
    // },
  },
});

const Index = () => {
  const classes = useStyles();
  const [list, setList] = useState([])

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="sm">
        <h1 className={classes.todoTitle}>Todo List</h1>

        <TodoInput addTodo={setList} />

        <List className={classes.listWrapper}>
          {
            list.map((item, index) => (
              <TodoItem
                key={index}
                item={item}
                setList={setList}
              />
            ))
          }
        </List>
      </Container>
    </ThemeProvider>
  )
}

export default Index
