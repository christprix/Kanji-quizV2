import { useEffect, useState } from 'react'
import './App.css'
import Button from './Button'
import axios from 'axios'
import student from '/student.gif'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserTie, faChildren, faDragon, faUserNinja } from '@fortawesome/free-solid-svg-icons';

function App() {
  const [gameStart, setGameStart] = useState(false)
  const [kanji, setKanji] = useState('wait')
  const [message, setMessage] = useState('')
  const [icons, setIcons] = useState(ICONS)

  function start(e) {
    axios.get(`https://kanjiapi.dev/v1/kanji/kyoiku`)
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
            console.log(kanji);
            console.log(icons);
            setGameStart(true)
          })
      })
  }

  function decodeString(str) {
    const textArea = document.createElement('textarea')
    textArea.innerHTML = str
    return textArea.value
  }

  function handleClick(e) {
    console.log(kanji);
    e.preventDefault
    document.querySelectorAll(".option").forEach((div) => {
      div.classList.remove('selected')
    })
    e.currentTarget.classList.add("selected")
  }
  return (
    <>
      <div className='wrapper'>
        <div className="header">
          <p className='title'>Kanji 漢字 Warrior 戦士</p>
        </div>
        <div className="container">
          <p className='welcome'>Welcome weary traveller to Kanji Warrior!</p>
          {/* <img className='mainImage' src={student} alt="" /> */}
          <p className='message'>Select your Destiny &quot;Difficuly&quot;</p>
          <div className='options'>
            <Button kanji={kanji} key={1} icon={icons} gameStart={gameStart} />
          </div>
          <button className='btn' onClick={start}>Start Game</button>
        </div>
      </div>
    </>
  )
}

const ICONS = [
  { icon: <FontAwesomeIcon icon={faChildren} size='xl' /> },
  { icon: <FontAwesomeIcon icon={faUserTie} size='xl' /> },
  { icon: <FontAwesomeIcon icon={faUserNinja} size='xl' /> },
  { icon: <FontAwesomeIcon icon={faDragon} size='xl' /> }
]
export default App
