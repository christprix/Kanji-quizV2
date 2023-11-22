import { useEffect, useState, useRef } from 'react'
import './App.css'
import Button from './Button'
import Question from './Question'
import axios from 'axios'
import ninja from './ninjagif.gif'
import salaryman from './salaryman.gif'
import dragon from './dragon.gif'
import student from './kidA.gif'
import game from './game.gif'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserTie, faChildren, faDragon, faUserNinja } from '@fortawesome/free-solid-svg-icons';

function App() {
  const [gameStart, setGameStart] = useState(false)
  const [kanji, setKanji] = useState('wait')
  const [message, setMessage] = useState('Choose your Path "Difficulty"')
  const [icons, setIcons] = useState(ICONS)
  const [answer, setAnswer] = useState('')
  const score = useRef(0)
  const [next, setNext] = useState('Start Game')
  const [chances, setChances] = useState(2)
  const [difficulty, setDifficulty] = useState(null)
  const [image, setImage] = useState(GAME)



  function start(e) {
    if (difficulty != null) {
      axios.get(`https://kanjiapi.dev/v1/kanji/${difficulty}`)
        .then(res => {
          const multiplier = res.data.length
          let num = Math.floor(Math.random() * multiplier)
          function getnum() {
            return Math.floor(Math.random() * multiplier)
          }
          axios.get(`https://kanjiapi.dev/v1/kanji/${res.data[`${num}`]}`)
            .then(response => {
              let kanji_data = response.data
              setKanji([{
                id: kanji_data.unicode,
                character: kanji_data.kanji,
                meaning: decodeString(kanji_data.meanings['0']),
                options: [res.data[getnum()], res.data[getnum()], res.data[getnum()], kanji_data.kanji].sort(() => Math.random() - 0.5)
              }
              ]);
              setGameStart(true)
              setAnswer(kanji_data.kanji)
              setMessage('')
              console.log(answer);
              document.querySelector('.progress').style.width = '100%'
              document.querySelector('.progress').style.borderColor = 'black'
              document.querySelector('.progress').style.opacity = "1"
              document.querySelector('.btn').style.backgroundColor = 'blue'
              document.querySelectorAll(".option").forEach((div) => {
                div.classList.remove('selected')
              })
              setChances(2)
              setNext('Next')
            })
        })
    }
    else {
      setMessage("Pick a difficulty dummy!")
    }
  }

  function decodeString(str) {
    const textArea = document.createElement('textarea')
    textArea.innerHTML = str
    return textArea.value
  }
  return (
    <>
      <div className='wrapper'>
        <div className="header">
          <p className='title'>Kanji 漢字 Warrior 戦士</p>
        </div>
        <div className="container">
          <Question kanji={kanji[0].meaning} key={kanji} />
          <img className='mainImage' src={image} alt="" />
          <div className="progress">
            <div className="progress_fill"></div>
          </div >
          <p className='message'>{message}</p>
          <div className='options'>
            <Button kanji={kanji} key={1} icon={icons} gameStart={gameStart} score={score} answer={answer} chances={chances} setChances={setChances} setDifficulty={setDifficulty} setImage={setImage} />
          </div>
          <button className='btn' onClick={start}>{next}</button>
        </div>
      </div>
    </>
  )
}

const ICONS = [
  { icon: <FontAwesomeIcon icon={faChildren} size='xl' />, kanjiLevel: 'grade-2', path: 'Path of the Child - Easy', image: student },
  { icon: <FontAwesomeIcon icon={faUserTie} size='xl' />, kanjiLevel: 'kyoiku', path: 'Path of the Salaryman - Medium', image: salaryman },
  { icon: <FontAwesomeIcon icon={faUserNinja} size='xl' />, kanjiLevel: 'joyo', path: 'Path of the Ninja - Hard', image: ninja },
  { icon: <FontAwesomeIcon icon={faDragon} size='xl' />, kanjiLevel: 'grade-8', path: 'Path of the Dragon - Good luck buddy', image: dragon }
]

const GAME = game
export default App
