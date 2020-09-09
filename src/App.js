import React, { useState, useEffect } from 'react';
// import Game from './components/Game'
import Medal from './media/medal.svg'
// import Medal from './media/gameCenter.svg'
import './App.css';
import { gsap } from 'gsap'

function App() {

  const [game, setGame] = useState(true)
  const [dice, setDice] = useState(0)
  const [step, setStep] = useState(0);
  const [line, setLine] = useState(1);
  const [xc, setX] = useState(0);
  const [yc, setY] = useState(0);
  const [guidance, setGuidance] = useState('');


  let castDice = () => {
    setDice(Math.floor(Math.random() * 5) + 1);
  }

  useEffect(() => {
    setStep(step + dice);
  }, [dice]);


  useEffect(() => {
    if ((step > 5 || step === 5) && line === 1) {
      setStep(5);
      setLine(2);
      setY(-500)
    } else if (( step > 10 || step === 10) && line === 2) {
      setStep(10);
      setLine(3);
      setX(500)
    } else if ((step > 15 || step === 15) && line === 3) {
      setStep(15);
      setLine(4);
      setY(0)
    } else if ((step > 20 || step === 20) && line === 4) {
      setStep(20);
      setLine(5);
      setX(0)
      setGame(false)
    }


  }, [step])
  
  useEffect(() => {
    if (step < 5){
      setY(yc - dice * 100);
    } else if (step < 10){
      setX(xc + dice * 100)
    } else if (step < 15){
      setY(yc + dice *100)
    } else if (step <20){
      setX(xc - dice * 100)
    }
  }, [dice])

  useEffect(() => {
    let tl = gsap.timeline()
    tl.to(".heart", { duration: 1, rotation: step*18 })
      .to("#Medal", { duration: 1, rotation: step * -72 }, '-=1')
      .to(".player", { duration: 1, x: xc, y: yc })


    if (step === 0) {
      setGuidance('Click center to spin')
    }
    if (step === 5) {
      setGuidance('Your infancy is over. Meditate')
    }
    if (step === 10) {
      setGuidance('Your childhood is over. Meditate')
    }
    if (step === 15) {
      setGuidance('Your adulthood is over. Meditate')
    }
    if (step === 20) {
      setGuidance('Your old age is over. Meditate')
    }
  }, [xc, yc, step])


  

  let newGame = () => {
    setGame(true);
    setStep(0);
    setDice(0)
    setLine(1)
  }

  let actionBtn = (
    <div onClick={castDice} className="heart">
      <img src={Medal} alt="Medal" id="Medal" />
    </div>
  )
  if (!game){
    actionBtn = (
      <div onClick={newGame} className="heart">
        <img src={Medal} alt="Medal" id="Medal" />
      </div>
    )
  }


  return (
    <div className="App">
      <h1>{guidance}</h1>
      <div className="game">
        <div className="gameCenter">

          <h3 className='Line_1 lifeStage'>Infancy</h3>
          <h3 className='Line_2 lifeStage'>Childhood</h3>
          <h3 className='Line_3 lifeStage'>Adulthood</h3>
          <h3 className='Line_4 lifeStage'>Old age</h3>
         
          {actionBtn}
          {/* <div className="controls">
            <h3>Your dice is {dice}</h3>
          </div> */}
        </div>
        <div className="player"></div>
      </div>
    </div>
  );
}

export default App;

// Music
// Entrance - limits of control theme

// End of life // sudden death  - deadman theme
// A friend                     - gungrave joy
// Enemy                        - gungrave - overtone?
// Death of a close person      - famouse blue raincoat 
// Love                         - Maria Blondy? Kiss me?
// Teacher                      - 
// Spiritual master             - Sacral nirvana
// Spiritual enlightment        - browser crash?
// You love your job            - 



// Images
// game bg - planet?
// image of the game player - ?



