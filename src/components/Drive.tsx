import React from 'react';

interface DriveProps {
  name: string;
  color: string;
  space: number;
  
}

function Drive({ name, color, space, onClick }: DriveProps) {
  const pStyle = {
    width: `${space}%`,
  };

  return (
    <div className="drive-container mt-3 ms-3 p-1"  style={{ cursor: 'pointer' }}>
      <h5>{name}</h5>
      <div className="progress mb-2" role="progressbar">
        <div className={`progress-bar progress-bar-striped bg-${color}`} style={pStyle}>
          {space}%
        </div>
      </div>
    </div>
  );
}

export default Drive;
