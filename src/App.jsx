import { useState, useEffect } from 'react'
import './App.css'
import './styles.css'

import AgentIcon from './components/AgentIcon'

function App() {
  const agentNames = ['astra', 'breach', 'brimstone', 'chamber', 'clove', 'cypher', 'deadlock', 'fade', 'gekko', 'harbor', 'iso', 'jett', 'kay-o', 'killjoy', 'neon', 'omen', 'phoenix', 'raze', 'reyna', 'sage', 'skye', 'sova', 'tejo', 'viper', 'vyse', 'waylay', 'yoru']

  // collapse for brevity!
  const agentData = {
  'astra': { role: 'controller', hasBlind: false, hasSmoke: true, hasCrowdControl: true, hasCripple: true, hasDeterrent: false, hasIntel: false, hasMobility: false, hasHeal: false },
  'breach': { role: 'initiator', hasBlind: true, hasSmoke: false, hasCrowdControl: true, hasCripple: false, hasDeterrent: true, hasIntel: false, hasMobility: false, hasHeal: false },
  'brimstone': { role: 'controller', hasBlind: false, hasSmoke: true, hasCrowdControl: false, hasCripple: false, hasDeterrent: true, hasIntel: false, hasMobility: false, hasHeal: false },
  'chamber': { role: 'sentinel', hasBlind: false, hasSmoke: false, hasCrowdControl: true, hasCripple: false, hasDeterrent: false, hasIntel: true, hasMobility: true, hasHeal: false },
  'clove': { role: 'controller', hasBlind: false, hasSmoke: true, hasCrowdControl: false, hasCripple: true, hasDeterrent: false, hasIntel: false, hasMobility: true, hasHeal: true },
  'cypher': { role: 'sentinel', hasBlind: false, hasSmoke: false, hasCrowdControl: true, hasCripple: false, hasDeterrent: false, hasIntel: true, hasMobility: false, hasHeal: false },
  'deadlock': { role: 'sentinel', hasBlind: false, hasSmoke: false, hasCrowdControl: true, hasCripple: false, hasDeterrent: false, hasIntel: true, hasMobility: false, hasHeal: false },
  'fade': { role: 'initiator', hasBlind: true, hasSmoke: false, hasCrowdControl: true, hasCripple: true, hasDeterrent: false, hasIntel: true, hasMobility: false, hasHeal: false },
  'gekko': { role: 'initiator', hasBlind: true, hasSmoke: false, hasCrowdControl: false, hasCripple: false, hasDeterrent: true, hasIntel: true, hasMobility: false, hasHeal: false },
  'harbor': { role: 'controller', hasBlind: false, hasSmoke: true, hasCrowdControl: true, hasCripple: false, hasDeterrent: false, hasIntel: true, hasMobility: false, hasHeal: false },
  'iso': { role: 'duelist', hasBlind: false, hasSmoke: false, hasCrowdControl: true, hasCripple: true, hasDeterrent: false, hasIntel: false, hasMobility: false, hasHeal: false },
  'jett': { role: 'duelist', hasBlind: false, hasSmoke: true, hasCrowdControl: false, hasCripple: false, hasDeterrent: false, hasIntel: false, hasMobility: true, hasHeal: false },
  'kay-o': { role: 'initiator', hasBlind: true, hasSmoke: false, hasCrowdControl: false, hasCripple: false, hasDeterrent: true, hasIntel: true, hasMobility: false, hasHeal: false },
  'killjoy': { role: 'sentinel', hasBlind: false, hasSmoke: false, hasCrowdControl: true, hasCripple: true, hasDeterrent: true, hasIntel: true, hasMobility: false, hasHeal: false },
  'neon': { role: 'duelist', hasBlind: false, hasSmoke: false, hasCrowdControl: true, hasCripple: false, hasDeterrent: false, hasIntel: false, hasMobility: true, hasHeal: false },
  'omen': { role: 'controller', hasBlind: true, hasSmoke: true, hasCrowdControl: false, hasCripple: false, hasDeterrent: false, hasIntel: false, hasMobility: true, hasHeal: false },
  'phoenix': { role: 'duelist', hasBlind: true, hasSmoke: false, hasCrowdControl: false, hasCripple: false, hasDeterrent: true, hasIntel: false, hasMobility: false, hasHeal: false },
  'raze': { role: 'duelist', hasBlind: false, hasSmoke: false, hasCrowdControl: false, hasCripple: false, hasDeterrent: true, hasIntel: true, hasMobility: true, hasHeal: false },
  'reyna': { role: 'duelist', hasBlind: true, hasSmoke: false, hasCrowdControl: false, hasCripple: false, hasDeterrent: false, hasIntel: false, hasMobility: true, hasHeal: true },
  'sage': { role: 'sentinel', hasBlind: false, hasSmoke: false, hasCrowdControl: true, hasCripple: false, hasDeterrent: false, hasIntel: false, hasMobility: false, hasHeal: true },
  'skye': { role: 'initiator', hasBlind: true, hasSmoke: false, hasCrowdControl: true, hasCripple: false, hasDeterrent: false, hasIntel: true, hasMobility: false, hasHeal: true },
  'sova': { role: 'initiator', hasBlind: false, hasSmoke: false, hasCrowdControl: false, hasCripple: false, hasDeterrent: true, hasIntel: true, hasMobility: false, hasHeal: false },
  'tejo': { role: 'initiator', hasBlind: false, hasSmoke: false, hasCrowdControl: true, hasCripple: false, hasDeterrent: true, hasIntel: false, hasMobility: false, hasHeal: false },
  'viper': { role: 'controller', hasBlind: false, hasSmoke: true, hasCrowdControl: false, hasCripple: true, hasDeterrent: true, hasIntel: false, hasMobility: false, hasHeal: false },
  'vyse': { role: 'sentinel', hasBlind: true, hasSmoke: false, hasCrowdControl: true, hasCripple: false, hasDeterrent: false, hasIntel: true, hasMobility: false, hasHeal: false },
  'waylay': { role: 'duelist', hasBlind: false, hasSmoke: false, hasCrowdControl: true, hasCripple: false, hasDeterrent: false, hasIntel: false, hasMobility: true, hasHeal: false },
  'yoru': { role: 'duelist', hasBlind: true, hasSmoke: false, hasCrowdControl: false, hasCripple: false, hasDeterrent: false, hasIntel: false, hasMobility: true, hasHeal: false }
};
  const [currentTeam, setCurrentTeam] = useState([]) //max 4 agents
  const [recommendedAgent, setRecommendedAgent] = useState(null);
  const handleAgentClick = (agent) => {
    if (currentTeam.length < 4) {
        setCurrentTeam([...currentTeam, agent]);
        console.log(currentTeam);
    }

  };

  useEffect(() => {
  if (currentTeam.length === 4) {
    calculateBestAgent(currentTeam);
  }
  else {
    setRecommendedAgent(null);
  }
}, [currentTeam]);

  const calculateBestAgent = (currentTeam) => {
    // look at roles already in the team
    // return the best agent to complement the team

    const needs = {
        role: ['controller', 'initiator', 'sentinel', 'duelist'],
        hasBlind: true,
        hasSmoke: true,
        hasCrowdControl: true,
        hasCripple: true,
        hasDeterrent: true,
        hasIntel: true,
        hasMobility: true,
        hasHeal: true,
    }

    // parse through the four selected agents, remove what is seen
    currentTeam.forEach(agentName => {
        const data = agentData[agentName];
        needs.role = needs.role.filter(r => r !== agentName.role);

        // bit tedious but works for now!
        if (data.hasBlind) needs.hasBlind = false;
        if (data.hasSmoke) needs.hasSmoke = false;
        if (data.hasCrowdControl) needs.hasCrowdControl = false;
        if (data.hasCripple) needs.hasCripple = false;
        if (data.hasDeterrent) needs.hasDeterrent = false;
        if (data.hasIntel) needs.hasIntel = false;
        if (data.hasMobility) needs.hasMobility = false;
        if (data.hasHeal) needs.hasHeal = false;
    });

    // looks at non-selected agents, rates based on how much they provide the remaining needs
    let bestAgent = null;
    let bestScore = -1;
    
    agentNames.forEach(agentName => {
        if (currentTeam.includes(agentName)) return; // skip already selected agents
        const data = agentData[agentName];
        let score = 0;

        // role, certain abilities are more important
        if (needs.role.includes(data.role)) score += 3;
        if (needs.hasBlind && data.hasBlind) score += 2;
        if (needs.hasSmoke && data.hasSmoke) score += 2;
        if (needs.hasCrowdControl && data.hasCrowdControl) score += 1;
        if (needs.hasCripple && data.hasCripple) score += 1;
        if (needs.hasDeterrent && data.hasDeterrent) score += 1;
        if (needs.hasIntel && data.hasIntel) score += 2;
        if (needs.hasMobility && data.hasMobility) score += 1;
        if (needs.hasHeal && data.hasHeal) score += 1;

        if (score > bestScore) {
            bestScore = score;
            bestAgent = agentName;
        }
    });
    setRecommendedAgent(bestAgent);
  }

  const handleRemoveAgent = (index) => {
    setCurrentTeam(currentTeam.filter((_, i) => i !== index));
    
  };

  return (
    <>
        <div className="app-container">
        <div className="selected-agent-table">
            {[0, 1, 2, 3].map(index => (
                <div 
                key={index}
                className="aspect-square bg-slate-800 flex items-center justify-center"
                onClick={() => currentTeam[index] && handleRemoveAgent(index)}
                >
                {currentTeam[index] ? (
                    <AgentIcon agent={currentTeam[index]}/>
                ) : (
                    <AgentIcon agent={null}/>
                )}
                </div>
            ))}
            <div className="aspect-square bg-slate-800 flex items-center justify-center">
                {recommendedAgent ? (
                <AgentIcon agent={recommendedAgent}/>
                ) : (
                    <AgentIcon agent={null}/>
                )}
            </div>
        </div>
        <div className='agent-select-table'>
            {agentNames.map((name) => (
                <AgentIcon key={name} agent={name} onClick={() => handleAgentClick(name)} isSelected = {currentTeam.includes(name)}/>
            ))}
        </div>
        </div>
        
    </>
  )
}

export default App
