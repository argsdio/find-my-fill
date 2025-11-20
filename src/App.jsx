import { useState, useEffect } from 'react'
import './Styles.css'

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
  const [currentTeam, setCurrentTeam] = useState([]);
  const [recommendedAgent, setRecommendedAgent] = useState(null);
  const [showWelcome, setShowWelcome] = useState(true);

  const handleAgentClick = (agent) => {
    if (currentTeam.length < 4 && !currentTeam.includes(agent)) {
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

    // look at non-selected agents, rate based on how much they provide the remaining needs
    let bestAgent = null;
    let bestScore = -1;
    
    agentNames.forEach(agentName => {
        if (currentTeam.includes(agentName)) return; // skips already selected agents
        const data = agentData[agentName];
        let score = 0;

        // scoring system (weighted based on general importance)
        // in the future: will also ask for map, and data will have statistics regarding the 
        // winrate of each agent on that map to use in determining the best player
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

  const getContributions = (agentName) => {
    const data = agentData[agentName];
    const contributions = [];
    
    // again very tedious/hard coded but works for now
    if (data.hasBlind) contributions.push("Blind");
    if (data.hasSmoke) contributions.push("Smoke");
    if (data.hasCrowdControl) contributions.push("Crowd Control");
    if (data.hasCripple) contributions.push("Cripple");
    if (data.hasDeterrent) contributions.push("Deterrent");
    if (data.hasIntel) contributions.push("Intel");
    if (data.hasMobility) contributions.push("Mobility");
    if (data.hasHeal) contributions.push("Heal");

    return contributions.join(", ");
  }

  return (
    <>
        {showWelcome && (
        <div 
            className="popup"
        >
        <div className="bg-slate-800 rounded-lg p-8 max-w-md mx-4 relative">
        
        {/* Content */}
        <h2>
            welcome to <h1>find my fill!</h1>
        </h2>
        <p>
            stuck in a comp lobby where you're the last one to lock? figure out the best agent to play based on your team's composition!
        </p>
        <p>
            this program analyzes roles, abilities, and team synergy to find the optimal last agent to maximize your advantage in winning.
        </p>
        
        <button 
            onClick={() => setShowWelcome(false)}
            className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 rounded-lg"
        >
            get started
        </button>
        </div>
  </div>
)}
        <div className="site-container">
            <div className="app-container">
                <div className="agent-select-wrapper">
                    <div className="agent-select-table">
                    {agentNames.map((name) => (
                        <AgentIcon key={name} agent={name} onClick={() => handleAgentClick(name)} isSelected = {currentTeam.includes(name)}/>
                    ))}
                    </div>
                </div>
                <div className="selected-agent-wrapper">
                    <div className="selected-agent-table">
                    {[0, 1, 2, 3].map(index => (
                        <div key={index} onClick={() => currentTeam[index] && handleRemoveAgent(index)}>
                            {currentTeam[index] ? (
                                <AgentIcon agent={currentTeam[index]}/>
                            ) : (
                                <AgentIcon agent={null}/>
                            )}
                        </div>
                    ))}
                
                </div>
                </div>
                
                
                <div className="recommendation-wrapper">
                    <div className = "recommendation-agent-title-wrapper">
                        { recommendedAgent ? (
                            <>
                                <h1>{recommendedAgent.charAt(0).toUpperCase() + recommendedAgent.slice(1)}</h1>
                                <h2>{agentData[recommendedAgent]["role"].toUpperCase()}</h2>
                            </>
                        ) : <>
                                <h2>Select 4 agents to get a recommendation!</h2>
                            </>
                        }
                    </div>

                    <div className = "recommendation-icon">
                        {recommendedAgent ? (
                    <AgentIcon agent={recommendedAgent}/>
                    ) : (
                        <AgentIcon agent={null}/>
                    )}
                    </div>
                    
                    <div className = "recommendation-text">
                        { recommendedAgent ? (
                            <>
                            
                            <p>Provides: {getContributions(recommendedAgent)}</p>

                            </>
                        ) : 
                            <>
                            </>
                        }
                    </div>
                </div>
            
            
            
            </div>
        </div>
    </>
  )
}

export default App
