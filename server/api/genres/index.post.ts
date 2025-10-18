import { prisma } from '~/server/utils/prisma'

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event)

    if (!body.name || typeof body.name !== 'string') {
      throw createError({
        statusCode: 400,
        statusMessage: 'ジャンル名が必要です'
      })
    }

    const genre = await prisma.genre.create({
      data: {
        name: body.name
      }
    })

    return genre
  } catch (error: any) {
    if (error.code === 'P2002') {
      throw createError({
        statusCode: 409,
        statusMessage: 'このジャンルはすでに登録されています'
      })
    }

    throw createError({
      statusCode: 500,
      statusMessage: 'ジャンルの登録に失敗しました'
    })
  }
})
