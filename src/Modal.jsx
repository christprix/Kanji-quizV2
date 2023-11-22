import React from 'react'

export default function Modal({ isOpen, onClose }) {
  if (!isOpen) return null;
  return (
    <div>
      Congrats!
    </div>
  )
}
