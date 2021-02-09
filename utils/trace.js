import { complextrace } from 'envtrace'

export const log = complextrace('mindpaste', [
  'info',
  'warn',
  'detail',
  'minutia'
])
