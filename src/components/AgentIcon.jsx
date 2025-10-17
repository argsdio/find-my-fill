import React from 'react';
import { useState } from 'react'
import '../Styles.css';

function AgentIcon({ agent, onClick, isSelected }) {
    const id = agent

    function toggleOnTeam() {
        setOnTeam(!onTeam);
    }
    return (
        <>
            <div className={isSelected ? "agent-selected-icon" : "agent-icon"} onClick = {onClick}>
                <img className='icon' src={agent ? `src/icons/${id.toLowerCase()}.webp` : 'src/icons/qmark.png'} alt={id}/>
            </div>
        </>
    )
}

export default AgentIcon;