import { api, rekeyFieldErrors } from '@/lib/api'

import type { NewFrame, SavedFrame, Wood } from './types'

/** A frame as the API sends it. */
type FrameResponse = {
  id: number
  name: string
  artist: string
  width: number
  height: number
  framed: boolean
  frame_width: number
  mat_width: number
  overlap: number
  wood: Wood
  artwork: string | null
  created_at: string
  updated_at: string
}

function toSavedFrame(response: FrameResponse): SavedFrame {
  return {
    id: response.id,
    name: response.name,
    artist: response.artist,
    width: response.width,
    height: response.height,
    framed: response.framed,
    frameWidth: response.frame_width,
    matWidth: response.mat_width,
    overlap: response.overlap,
    wood: response.wood,
    artwork: response.artwork,
    createdAt: response.created_at,
  }
}

/** The user's collection, newest first. */
export async function fetchFrames() {
  const frames = await api.get<FrameResponse[]>('/framer/frames/')
  return frames.map(toSavedFrame)
}

export async function createFrame(frame: NewFrame) {
  const response = await api
    .post<FrameResponse>('/framer/frames/', toFrameRequest(frame))
    .catch((error: unknown) => {
      throw rekeyFieldErrors(error, {
        frame_width: 'frameWidth',
        mat_width: 'matWidth',
      })
    })
  return toSavedFrame(response)
}

/** The request body: JSON, or multipart when there's a picture of the artwork to send. */
function toFrameRequest(frame: NewFrame) {
  const fields = {
    name: frame.name,
    artist: frame.artist,
    width: frame.width,
    height: frame.height,
    framed: frame.framed,
    frame_width: frame.frameWidth,
    mat_width: frame.matWidth,
    overlap: frame.overlap,
    wood: frame.wood,
  }
  if (!frame.artwork) return fields

  const body = new FormData()
  for (const [field, value] of Object.entries(fields))
    body.set(field, String(value))
  body.set('artwork', frame.artwork)
  return body
}

export function deleteFrame(id: number) {
  return api.delete<void>(`/framer/frames/${id}/`)
}
