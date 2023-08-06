import prismaService from "../prisma/prisma.service";
import { JwtPayload } from "../../common/types/auth-request.types";
import { UpdateUserDto } from "./dto/index";
import createHttpError from "http-errors";

export const updateUserService = async (userData: UpdateUserDto, user: JwtPayload) => {

  const updatedUser = await prismaService.user.update({
    where: { id: user.id },
    data: {
      name:userData.name,
    },include:{fcmTokens:true},
  })

const fcmToken = await prismaService.fCMTokens.create({data:{user_id:user.id,token:userData.fcmToken}})
console.log(updatedUser.fcmTokens)
return updatedUser
}



