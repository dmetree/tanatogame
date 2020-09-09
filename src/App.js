import React, { useState, useEffect } from 'react';
import Medal from './media/medal.svg'
import './App.css';
import { gsap } from 'gsap'
import SplitText from './gsap/SplitText'


function App() {

  const [game, setGame] = useState(true)
  const [dice, setDice] = useState(0)
  const [step, setStep] = useState(0);
  const [line, setLine] = useState(1);
  const [xc, setX] = useState(0);
  const [yc, setY] = useState(0);
  const [guidance, setGuidance] = useState('Click center for a spin');


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
    } else if ((step > 10 || step === 10) && line === 2) {
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
    if (step < 5) {
      setY(yc - dice * 100);
    } else if (step < 10) {
      setX(xc + dice * 100)
    } else if (step < 15) {
      setY(yc + dice * 100)
    } else if (step < 20) {
      setX(xc - dice * 100)
    }

  }, [dice])


  useEffect(() => {
    let tl = gsap.timeline()
    tl.to(".heart", { duration: 1, rotation: step * 18 })
      .to("#Medal", { duration: 1, rotation: step * -72 }, '-=1')
      .to(".player", { duration: 1, x: xc, y: yc })

    setTimeout(() => {
      if (step === 0) {
        setGuidance('Click center for a spin')
      }
      if (step === 5) {
        setGuidance('Your infancy is over. Meditate');
        setTimeout(() => { setGuidance('It`s time for a spin') }, 5000);
      }
      if (step === 10) {
        setGuidance('Your childhood is over. Meditate')
        setTimeout(() => { setGuidance('It`s time for a spin') }, 5000);
      }
      if (step === 15) {
        setGuidance('Your adulthood is over. Meditate')
        setTimeout(() => { setGuidance('It`s time for a spin') }, 5000);
      }
      if (step === 20) {
        setGuidance('Your old age is over. Meditate');
        setTimeout(() => { setGuidance('Start a new Life? Click center') }, 5000);
      }
    }, 2000);

  }, [xc, yc, step])

  useEffect(() => {
    let animateText = new gsap.timeline(),
      mySplitText = new SplitText(".guidance", { type: "words,chars" }),
      chars = mySplitText.chars;
    gsap.set(".guidance", { perspective: 400 });
    animateText.staggerFrom(chars, 1, { delay: 1, duration: 0.6, scale: 4, opacity: 0, rotationX: -180, transformOrigin: "100% 50%", ease: "back.out", stagger: 0.02 });
  }, [guidance])

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
  if (!game) {
    actionBtn = (
      <div onClick={newGame} className="heart">
        <img src={Medal} alt="Medal" id="Medal" />
      </div>
    )
  }


  return (
    <div className="App">
      <h1 className="guidance">{guidance}</h1>
      <div className="game">
        <div className="gameCenter">

          <h3 className='Line_1 lifeStage'>Infancy</h3>
          <h3 className='Line_2 lifeStage'>Childhood</h3>
          <h3 className='Line_3 lifeStage'>Adulthood</h3>
          <h3 className='Line_4 lifeStage'>Old age</h3>
          {actionBtn}

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



