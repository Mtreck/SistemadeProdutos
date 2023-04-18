import React from 'react';

function ExcluirItem(props) {
    const { onClick = () => {} } = props;

    return (
      <button onClick={() => onClick(props.item)}>Excluir</button>
    );
}  
export default ExcluirItem;