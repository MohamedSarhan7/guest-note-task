import prismaService from "../../modules/prisma/prisma.service"
export const insertNoteTypesIfNotExists = async () => {
  const typesCount = await prismaService.noteType.count();
  if (typesCount !== 0) {
    await prismaService.noteType.createMany({
      data: [
        { name: 'invitation' },
        { name: 'congrats' },
      ]
    })
  }

}