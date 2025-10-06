import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import './styles.css'

import AgentIcon from './components/AgentIcon'

function App() {
  const [count, setCount] = useState(0)
  const agentNames = ['astra', 'breach', 'brimstone', 'chamber', 'clove', 'cypher', 'deadlock', 'fade', 'gekko', 'harbor', 'iso', 'jett', 'kay-o', 'killjoy', 'neon', 'omen', 'phoenix', 'raze', 'reyna', 'sage', 'skye', 'sova', 'tejo', 'viper', 'vyse', 'waylay', 'yoru']

  return (
    <>
        <div>
            {agentNames.map((name) => (
                <AgentIcon agent={name} />
            ))}
        </div>
    </>
  )
}

export default App
