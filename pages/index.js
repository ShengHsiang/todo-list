import { Container, CssBaseline, List } from '@material-ui/core'
import { useQuery, useMutation } from '@apollo/client'
import { initializeApollo } from '../apollo/client'
import { makeStyles, ThemeProvider, createTheme } from '@material-ui/core/styles';
import TodoItem from '../component/todoItem'
import TodoInput from '../component/todoInput';
import { TodoQuery, ADD_TODO, TOGGLE_TODO, DELETE_TODO } from './api/todo'

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
  const { data: { todos } } = useQuery(TodoQuery)
  const [addTodo] = useMutation(ADD_TODO)
  const [toggleTodo] = useMutation(TOGGLE_TODO)
  const [deleteTodo] = useMutation(DELETE_TODO)

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="sm">
        <h1 className={classes.todoTitle}>Todo List</h1>

        <TodoInput addTodo={addTodo} />

        <List className={classes.listWrapper}>
          {
            todos.map((item, index) => (
              <TodoItem
                key={index}
                item={item}
                toggleTodo={toggleTodo}
                deleteTodo={deleteTodo}
              />
            ))
          }
        </List>
      </Container>
    </ThemeProvider>
  )
}

export async function getStaticProps() {
  const apolloClient = initializeApollo()

  await apolloClient.query({
    query: TodoQuery,
  })

  return {
    props: {
      initialApolloState: apolloClient.cache.extract(),
    },
  }
}

export default Index
