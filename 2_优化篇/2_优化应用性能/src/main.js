import Hello from './components/Add/index.ts'
import {ref} from 'cengfan'

console.log('Hello Main!')

Hello()

const a = ref('cengfan')
console.log(window)
console.log(a)