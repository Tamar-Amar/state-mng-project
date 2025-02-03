import React, { useState } from 'react';

const HelloButton: React.FC = () => {
  const [message, setMessage] = useState('');

  return (
    <div>
      <button onClick={() => setMessage('Hello, Tamar!')}>Click Me</button>
      {message && <p>{message}</p>}
    </div>
  );
};

export default HelloButton;
