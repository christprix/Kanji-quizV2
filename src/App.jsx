import { useState } from 'react'
import './App.css'
import student from '/student.gif'


function App() {

  return (
    <>
      <div className='wrapper'>
        <h1>Kanji Learner</h1>
        <img className='mainImage' src={student} alt="" />
        <p className='message'>Select a Difficulty</p>
        <div className='options'>
          <button className='option'>1</button>
          <button className='option'>2</button>
          <button className='option'>3</button>
          <button className='option'>4</button>
        </div>
        <button className='btn'>Start Game</button>
      </div>
    </>
  )
}

export default App
