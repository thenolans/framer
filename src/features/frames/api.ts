import { api, rekeyFieldErrors } from '@/lib/api'

import type { NewFrame, SavedFrame, Wood } from './types'

/** A frame as the API sends it. */
type FrameResponse = {
  id: number
  name: string
  artist: string
  width: number
  height: number
  frame_width: number
  mat_width: number
  overlap: number
  wood: Wood
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
    frameWidth: response.frame_width,
    matWidth: response.mat_width,
    overlap: response.overlap,
    wood: response.wood,
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
    .post<FrameResponse>('/framer/frames/', {
      name: frame.name,
      artist: frame.artist,
      width: frame.width,
      height: frame.height,
      frame_width: frame.frameWidth,
      mat_width: frame.matWidth,
      overlap: frame.overlap,
      wood: frame.wood,
    })
    .catch((error: unknown) => {
      throw rekeyFieldErrors(error, {
        frame_width: 'frameWidth',
        mat_width: 'matWidth',
      })
    })
  return toSavedFrame(response)
}

export function deleteFrame(id: number) {
  return api.delete<void>(`/framer/frames/${id}/`)
}
