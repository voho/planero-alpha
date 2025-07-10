import { LoginStatus } from './user/LoginStatus';

function App() {
  return (
    <div>
      <p>Hello!</p>
      <p>{JSON.stringify(import.meta.env) } + {JSON.stringify(process.env)}</p>
      <LoginStatus />
    </div>
  )
}

export default App;
