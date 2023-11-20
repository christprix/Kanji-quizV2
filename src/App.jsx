import { useState } from 'react'
import './App.css'
import student from '/student.gif'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserTie, faChildren, faDragon, faUserNinja } from '@fortawesome/free-solid-svg-icons';

function App() {

  function handleClick(e) {
    e.preventDefault
    console.log(e.currentTarget);
    document.querySelectorAll(".option").forEach((div) => {
      div.classList.remove('selected')
    })
    e.currentTarget.classList.add("selected")
  }
  return (
    <>
      <div className='wrapper'>
        <h1 className='title'>Kanji Learner</h1>
        <img className='mainImage' src={student} alt="" />
        <p className='message'>Select a Difficulty</p>
        <div className='options'>
          <button className='option' onClick={handleClick}><FontAwesomeIcon icon={faChildren} size='xl' /></button>
          <button className='option' onClick={handleClick}><FontAwesomeIcon icon={faUserTie} size='xl' /></button>
          <button className='option' onClick={handleClick}><FontAwesomeIcon icon={faUserNinja} size='xl' /></button>
          <button className='option' onClick={handleClick}><FontAwesomeIcon icon={faDragon} size='xl' /></button>
        </div>
        <button className='btn'>Start Game</button>
      </div>
    </>
  )
}

export default App
