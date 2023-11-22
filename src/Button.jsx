import React, { useEffect, useState } from 'react'

export default function Button({ icon, kanji }) {
  const [display, setDisplay] = useState(icon)
  const [answer, setAnswer] = useState('test')
  useEffect(() => {
    console.log(display);
    console.log(kanji[0].character);
    setAnswer(kanji[0].character)
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
  }

  function handleClick2(e) {
    e.preventDefault
    console.log(e.currentTarget.innerHTML);
    if (e.currentTarget.innerHTML === answer) {
      e.currentTarget.disabled = true;
      e.currentTarget.classList.add("correct")
    }
    else {
      e.currentTarget.disabled = true;
      e.currentTarget.classList.add("wrong")
    }
  }
  if (kanji === 'wait') {
    return (
      <>

        {
          icon.map((i, index) => {
            {
              return <button className="option" key={index} onClick={handleClick}>{i.icon}</button>
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
