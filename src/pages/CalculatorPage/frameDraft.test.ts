import { describe, expect, it } from 'vitest'

import { defaultFrame } from '@/features/frames/defaultFrame'

import { isLengthInput, parseDraft, toDraft, toFrame } from './frameDraft'

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

describe('parseDraft', () => {
  const draft = toDraft(defaultFrame)

  it('accepts a draft', () => {
    expect(parseDraft(JSON.parse(JSON.stringify(draft)))).toEqual(draft)
  })

  it('reads a draft kept before pieces could go unframed as framed', () => {
    const { framed: _, ...older } = { ...draft, framed: false }
    expect(parseDraft(older)).toEqual({ ...draft, framed: true })
  })

  it.each([
    ['nothing', null],
    ['a string', 'draft'],
    ['a missing length', { ...draft, overlap: undefined }],
    ['a number for a length', { ...draft, width: 48 }],
    ['a length that is not one', { ...draft, width: 'wide' }],
    ['a framed that is not a boolean', { ...draft, framed: 'no' }],
    ['an unknown wood', { ...draft, wood: 'maple' }],
  ])('rejects %s', (_, value) => {
    expect(parseDraft(value)).toBeNull()
  })
})
