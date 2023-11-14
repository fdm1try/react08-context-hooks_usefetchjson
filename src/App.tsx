import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { Widget } from './components/Widget';

function App() {
  return (
    <>
      <Widget title='Данные получены' url='http://localhost:7070/data' />
      <Widget title='Ошибка' url='http://localhost:7070/error' />
      <Widget title='Длительная загрузка' url='http://localhost:7070/loading' />
    </>
  )
}

export default App
