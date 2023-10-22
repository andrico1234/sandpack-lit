import React from 'react'
import { createComponent } from '@lit/react'
import Sandpack from './sandpack.js'

export const SandpackLitComponent = createComponent({
  tagName: 'sandpack-preset',
  elementClass: Sandpack,
  react: React,
})