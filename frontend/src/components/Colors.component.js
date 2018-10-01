// @flow
import React from 'react'
import type { ColorsProps } from './../types'
import './../styles/colors.css'

export default function Colors({ colors }: ColorsProps) {
  return (
    <div className="colors-container">
      {colors.map(color => (
        <div key={color} style={{ color }}>
          {color}
        </div>
      ))}
    </div>
  )
}
