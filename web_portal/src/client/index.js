import 'core-js/stable'
import 'regenerator-runtime/runtime'
import React from 'react'
import { render } from 'react-dom'

import Main from './Main'

const mount = document.getElementById('root')

render(<Main />, mount)
