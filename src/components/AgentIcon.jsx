import '../Styles.css';

function AgentIcon({ agent }) {
    const id = agent

    return (
        <>
            <div className="agent-icon">
                <img className='icon' src={`src/icons/${id.toLowerCase()}.webp`} alt={id} />
            </div>
        </>
    )
}

export default AgentIcon;