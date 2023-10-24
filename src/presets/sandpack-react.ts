import React from 'react'
import { createComponent } from '@lit/react'
import Sandpack from './sandpack.js'

export const SandpackPresetComponent = createComponent({
  tagName: 'sandpack-preset',
  elementClass: Sandpack,
  react: React,
})

export const SandpackLitComponent = SandpackPresetComponent