import React from 'react'
import Quiz from '../components/Quiz/Quiz'
import { jsQuizz } from '../constants'

const Play = () => {
  return (
    <Quiz questions = {jsQuizz.test.question} />
  )
}

export default Play
