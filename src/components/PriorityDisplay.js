const PriorityDisplay = ( priority ) => {  

  return (
    <div className="priority-display">
      <div className="star-content">
        <h3 style={{color: priority.priority >= 1 ? 'yellow' : ''}}>★</h3>
        <h3 style={{color: priority.priority >= 2 ? 'yellow' : ''}}>★</h3>
        <h3 style={{color: priority.priority >=3 ? 'yellow' : ''}}>★</h3>
        <h3 style={{color: priority.priority >=4 ? 'yellow' : ''}}>★</h3>
        <h3 style={{color: priority.priority >=5 ? 'yellow' : ''}}>★</h3>
      </div>
    </div>
  )
}

export default PriorityDisplay
