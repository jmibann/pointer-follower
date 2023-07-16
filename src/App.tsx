import { useState, useEffect } from 'react'

type PositionType = {
  x: number, 
  y: number,
}

function App() {
  const [isEnabled, setIsEnabled] = useState(false);
  const [position, setPosition] = useState<PositionType>({});

  const handleMove = (event: MouseEvent) => {
    const {clientX, clientY} = event;
    setPosition({ x: clientX, y: clientY });
  }

  useEffect(() => {
    if(isEnabled){
      window.addEventListener('pointermove', handleMove);

      return () => {
        window.removeEventListener('pointermove', handleMove);
      }
    }
  }, [isEnabled]);

  useEffect(() => {
    document.body.classList.toggle('no-cursor', isEnabled);

    return () => {
      document.body.classList.remove('no-cursor');
    }
  }
  ,[isEnabled]);

  const handleOnClick = () => setIsEnabled(prev => !prev);
  const buttonText = isEnabled ? 'Disable' : 'Enable';

  return (
    <main>
      <div style={{
        width: 50,
        height: 50,
        borderRadius: '50%',
        backgroundColor: 'rgba(0,0,0, 0.5)',
        opacity:0.8,
        position: 'absolute',
        pointerEvents: 'none',
        left: -25,
        top: -25,
        transform: `translate(${position.x}px, ${position.y}px)`
      }} />

      <button onClick={handleOnClick}>{buttonText} pointer follower</button>
    </main>
  )
}

export default App
