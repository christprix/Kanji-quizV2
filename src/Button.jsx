import React, { useEffect, useState } from 'react'

export default function Button({ icon, kanji, score, answer, chances, setChances, setDifficulty }) {
  const [display] = useState(icon)

  useEffect(() => {
    console.log(kanji[0].character);
    document.querySelector(".progress_fill").style.width = `${score.current * 10}%`
    document.querySelectorAll(".option").forEach((div) => {
      div.classList.remove('selected');
      div.classList.remove('wrong');
      div.classList.remove('correct');
      div.disabled = false;
    })
  }, [kanji])

  function handleClick(e) {
    e.preventDefault
    document.querySelectorAll(".option").forEach((div) => {
      div.classList.remove('selected')
    })
    e.currentTarget.classList.add("selected")
    setDifficulty(e.currentTarget.id)
    console.log(e.currentTarget.id);
  }

  function handleClick2(e) {
    if (chances > 0) {
      setChances(chances - 1)
      console.log(e.currentTarget.innerHTML);
      if (e.currentTarget.innerHTML === answer) {
        e.currentTarget.disabled = true;
        e.currentTarget.classList.add("correct")
        score.current = score.current + 1
        document.querySelector(".progress_fill").style.width = `${score.current * 10}%`
        setChances(0)
      }
      else {
        if (score.current > 0) {
          e.currentTarget.disabled = true;
          e.currentTarget.classList.add("wrong")
          score.current = score.current - 1
          document.querySelector(".progress_fill").style.width = `${score.current * 10}%`
        }
        else {
          e.currentTarget.disabled = true;
          e.currentTarget.classList.add("wrong")
        }
      }
    }
  }
  if (kanji === 'wait') {
    return (
      <>

        {
          icon.map((i, index) => {
            {
              return <button className="option" key={index} id={i.kanjiLevel} onClick={handleClick}>{i.icon}
                <div className='difficulty'>{i.path}</div>
              </button>
            }
          })
        }
      </>
    )
  }
  else {
    return (
      <>
        {
          kanji[0].options.map((k, index) => {
            return <button className="option" key={index} onClick={handleClick2}>{k}</button>
          })
        }
      </>
    )
  }
}
