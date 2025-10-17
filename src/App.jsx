import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import './styles.css'

import AgentIcon from './components/AgentIcon'

function App() {
  const [count, setCount] = useState(0)
  const agentNames = ['astra', 'breach', 'brimstone', 'chamber', 'clove', 'cypher', 'deadlock', 'fade', 'gekko', 'harbor', 'iso', 'jett', 'kay-o', 'killjoy', 'neon', 'omen', 'phoenix', 'raze', 'reyna', 'sage', 'skye', 'sova', 'tejo', 'viper', 'vyse', 'waylay', 'yoru']
  const [currentTeam, setCurrentTeam] = useState([]) //max 4 agents

  const handleAgentClick = (agent) => {
    if (currentTeam.length < 4) {
        setCurrentTeam([...currentTeam, agent]);
        console.log(currentTeam);
    }

  };

  const handleRemoveAgent = (index) => {
    setCurrentTeam(currentTeam.filter((_, i) => i !== index));
  };

  return (
    <>
        <div className="grid grid-cols-5 gap-4 mb-8">
      {[0, 1, 2, 3, 4].map(index => (
        <div 
          key={index}
          className="aspect-square bg-slate-800 flex items-center justify-center"
          onClick={() => currentTeam[index] && handleRemoveAgent(index)}
        >
          {currentTeam[index] ? (
            <AgentIcon agent={currentTeam[index]} className="w-full h-full object-contain" />
          ) : (
            <AgentIcon agent={null} className="w-full h-full object-contain"/>
          )}
        </div>
      ))}
    </div>
        <div className='agent-select-table'>
            {agentNames.map((name) => (
                <AgentIcon key={name} agent={name} onClick={() => handleAgentClick(name)} isSelected = {currentTeam.includes(name)}/>
            ))}
        </div>
    </>
  )
}

export default App
