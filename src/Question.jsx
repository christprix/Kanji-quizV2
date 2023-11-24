import React from 'react'

export default function Question({ kanji }) {

  if (kanji === undefined) {
    return (
      <>
        <p className='welcome'>Welcome weary traveller to the Kanji Dojo!</p>
      </>
    )
  }
  else {
    return (
      <>
        <p className='welcome'>Which Kanji means &quot;{kanji}&quot;</p>
      </>
    )
  }
}
