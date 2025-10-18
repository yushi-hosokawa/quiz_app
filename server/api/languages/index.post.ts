import { prisma } from '~/server/utils/prisma'

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event)

    if (!body.name || typeof body.name !== 'string') {
      throw createError({
        statusCode: 400,
        statusMessage: '言語名が必要です'
      })
    }

    const language = await prisma.language.create({
      data: {
        name: body.name
      }
    })

    return language
  } catch (error: any) {
    if (error.code === 'P2002') {
      throw createError({
        statusCode: 409,
        statusMessage: 'この言語はすでに登録されています'
      })
    }

    throw createError({
      statusCode: 500,
      statusMessage: '言語の登録に失敗しました'
    })
  }
})
