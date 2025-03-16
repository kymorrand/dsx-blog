import { Auth } from '@auth/core'
import type { APIContext } from 'astro'
import config from '../../../auth'

export async function GET(context: APIContext) {
  const request = context.request
  return await Auth(request, config)
}

export async function POST(context: APIContext) {
  const request = context.request
  return await Auth(request, config)
}
