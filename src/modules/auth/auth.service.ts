import prismaService from '../prisma/prisma.service';
import { LoginDto, RegisterDto } from './dto/index';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt'
import createExeption from 'http-errors';
import { UserDto } from '../user/dto';


export const authLogin = async (loginDto: LoginDto) => {
  const user = await prismaService.user.findUnique({
    where: {
      email: loginDto.email
    }
  })
  if (!user) throw createExeption(401, 'Invalid credentials')
  const isValidPassword = await bcrypt.compare(loginDto.password, user.password);
  if (!isValidPassword) throw createExeption(401, 'Invalid credentials')
  const access_token = signAccessToken(user);
  delete user.password

  return new UserDto({ ...user, access_token });
}

export const authRegister = async (registerDto: RegisterDto) => {
  const emailExists = await prismaService.user.findUnique({
    where: {
      email: registerDto.email
    }
  })

  if (emailExists) throw createExeption(401, 'Email already exists')

  const salt = await bcrypt.genSalt();
  const hashedPassword = await bcrypt.hash(registerDto.password, salt)
  
  const user = await prismaService.user.create({ data: { ...registerDto, password: hashedPassword } })
  const access_token = signAccessToken(user);
delete user.password
  return new UserDto({ ...user, access_token });
}

const signAccessToken = (user: any) => {
  const token = jwt.sign(
    {
      user_id: user._id,
      email: user.email,
    },
    process.env.TOKEN_KEY,
    {
      expiresIn: process.env.TOKEN_EXPIRES_IN,
    }
  );
  return token
}

// export const findUser = async(user: Partial<UserDto>) => {
//   return await prismaService.user.findUnique({
//     where: {
//       : user.email
//     }
//   })
// };
// export type JwtPayload = {
//   email: string;
//   id: number;
//   iat?: number;
//   exp?: number;
// };