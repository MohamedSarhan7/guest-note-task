import prismaService from "../prisma/prisma.service";
import { JwtPayload } from "../../common/types/auth-request.types";
import { UpdateUserDto } from "./dto/index";
import createHttpError from "http-errors";

export const updateUserService = async (userData: UpdateUserDto, user: JwtPayload) => {
  const updateObj = {};
  if (userData.name) {
    updateObj['name'] = userData.name
  }
  if (userData.receive_daily_notifi) {
    updateObj['receive_daily_notifi'] = userData.receive_daily_notifi
  }
  const updatedUser = await prismaService.user.update({
    where: { id: user.id },
    data: updateObj
    , include: { fcmTokens: true },
  })
  // console.log(userData.fcmToken)
  const fcmToken = (userData.fcmToken && (await prismaService.fCMTokens.create({
    data: {
      user_id: user.id,
      token: userData.fcmToken
    }, include: { user: { include: { fcmTokens: true } } }
  })));
  // }
  // console.log(updatedUser.fcmTokens)
  return fcmToken ? fcmToken.user : updatedUser
}



export const timelineService = async (user: JwtPayload, types: number[] | undefined, take: number, skip: number) => {

  const currentDate = new Date();
  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

  const queryWithTypes = {
    where: {
      deleted: false,
      notes: {
        some: {
          user_id: user.id,
          avilable: true
        }
      },
      type_id: { in: types },
      created_at: { gt: thirtyDaysAgo, lte: currentDate },
    }
    ,
    skip: (skip - 1) * take,
    take,
    include: { media: { select: { url: true } } }

  }
  const queryWithoutTypes = {
    where: {
      deleted: false,
      notes: {
        some: {
          user_id: user.id,
          avilable: true
        }
      },
      type_id: { in: types },
      created_at: { gt: thirtyDaysAgo, lte: currentDate }
    },
    skip: (skip - 1) * take,
    take,
    include: { media: {select:{url:true}} }

  }

  const [notes, totalCount] = await Promise.all([
    prismaService.note.findMany(types ? queryWithTypes : queryWithoutTypes),
    prismaService.note.count({where:queryWithoutTypes.where})
  ])

  return {notes, totalCount}
}


export const deleteReceivedNotesService=async(notes_ids:number[],user:JwtPayload)=>{
  const res= await prismaService.noteToUser.updateMany({
    where:{note_id:{in:notes_ids},user_id:user.id,avilable:true},
    data:{avilable:false}
  })
  if (!res.count) throw createHttpError(404,"Not Found or already deleted")
return {message:`${res.count} notes deleted` ,count:res.count}
}
