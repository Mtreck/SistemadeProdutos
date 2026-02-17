import React from 'react';

function ExcluirItem(props) {
  const { onClick = () => { } } = props;

  const buttonStyle = {
    background: 'rgba(255, 77, 77, 0.1)',
    color: '#ff4d4d',
    border: '1px solid rgba(255, 77, 77, 0.2)',
    padding: '0.4rem 0.8rem',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '0.8rem',
    fontWeight: '600',
    transition: 'all 0.3s ease',
    display: 'inline-flex',
    alignItems: 'center',
    gap: '4px'
  };

  return (
    <button
      style={buttonStyle}
      onMouseOver={(e) => {
        e.currentTarget.style.background = 'rgba(255, 77, 77, 0.2)';
        e.currentTarget.style.borderColor = '#ff4d4d';
      }}
      onMouseOut={(e) => {
        e.currentTarget.style.background = 'rgba(255, 77, 77, 0.1)';
        e.currentTarget.style.borderColor = 'rgba(255, 77, 77, 0.2)';
      }}
      onClick={() => onClick(props.item)}
    >
      <span className="material-icons-round" style={{ fontSize: '1rem' }}>delete_outline</span>
      Excluir
    </button>
  );
}
export default ExcluirItem;