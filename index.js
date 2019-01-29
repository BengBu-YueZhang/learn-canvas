
import FileSaver from 'file-saver'
import Scissors from './scissors'
import './scissors.css'

const canvas = document.getElementById('canvas')
const canvasWrapper = document.getElementsByClassName('canvas')[0]
const ctx = canvas.getContext('2d')

let steps = []
let tail = null

Scissors.created()

