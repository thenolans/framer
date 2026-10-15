import { describe, expect, it } from 'vitest'

import { defaultFrame } from '@/features/frames/defaultFrame'

import { isLengthInput, toDraft, toFrame } from './frameDraft'

describe('toFrame', () => {
  it('reads back the frame a draft was made from', () => {
    expect(toFrame(toDraft(defaultFrame))).toEqual(defaultFrame)
  })

  it('reads empty and unfinished lengths as 0', () => {
    const draft = { ...toDraft(defaultFrame), width: '', overlap: '.' }
    expect(toFrame(draft)).toMatchObject({ width: 0, overlap: 0 })
  })

  it('reads a trailing decimal point as the whole number', () => {
    expect(toFrame({ ...toDraft(defaultFrame), height: '12.' }).height).toBe(12)
  })
})

describe('isLengthInput', () => {
  it.each(['', '12', '1.5', '.5', '12.'])('accepts %j', (value) => {
    expect(isLengthInput(value)).toBe(true)
  })

  it.each(['-1', '1.2.3', 'a', '1/2', '1 2'])('rejects %j', (value) => {
    expect(isLengthInput(value)).toBe(false)
  })
})
