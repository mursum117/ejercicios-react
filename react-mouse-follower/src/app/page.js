"use client";
import { useEffect, useState } from "react";

const FollowMouse = () => {
  //useEffect - Permite ejecutar código cuando se monta el componente en el DOM y cada vez que cambian las dependecias que indiquemos.
  const [enabled, setEnabled] = useState(false)
  const [position, setPosition] = useState({x: 0, y: 0})
  useEffect(() => {

    const handleMove = (e) =>{
      const {clientX, clientY} = e
      setPosition({x: clientX, y:clientY})
    }

    if(enabled){
      window.addEventListener('pointermove', handleMove)
    }
    //Se ejecuta cuando el componente se desmonta o cuando cambian las dependencias
    return() =>{
      window.removeEventListener('pointermove', handleMove)
    }
  }, [enabled])

  return (
    <>
      <div style={{
        position: 'absolute',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        border: '1px solid #fff',
        borderRadius: '50%',
        opacity: 0.8,
        pointerEvents: 'none',
        left: -25,
        top: -25,
        width: 50,
        height: 50,
        transform: `translate(${position.x}px, ${position.y}px)`
      }}></div>
      <button onClick={() => setEnabled(!enabled)}>{enabled ? "Desactivar" : "Activar"} seguir el puntero</button>
    </>
  );
}

export default function Home() {
  return(
    <main>
      <FollowMouse/>
    </main>
  )
}