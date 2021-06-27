import { v4 as uuidv4 } from 'uuid'

export const paymentTypes = [
  {
    id: uuidv4(),
    value: 0,
    text: '無料',
  },
  {
    id: uuidv4(),
    value: 1,
    text: '有料',
  },
]
