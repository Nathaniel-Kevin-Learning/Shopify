import { getUserByEmail } from '@/db/models/user';
import { DataLogin } from '@/interfaces';
import { validate } from '@/utils/bcrypt';
import { createToken } from '@/utils/jwt';
import { userLoginSchema } from '@/validators/user.validator';
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

export const POST = async (request: NextRequest) => {
  try {
    const body = (await request.json()) as DataLogin;
    // validation or sanitation
    const data = userLoginSchema.parse(body);

    const userTarget = await getUserByEmail(data.email);

    if (!userTarget) {
      return NextResponse.json(
        { message: 'Invalid username or password' },
        { status: 401 }
      );
    }
    const checkPass = validate(data.password, userTarget.password);
    if (!checkPass) {
      return NextResponse.json(
        { message: 'Invalid username or password' },
        { status: 401 }
      );
    }
    const dataToken = {
      _id: userTarget._id,
      username: userTarget.username,
      email: userTarget.email,
    };

    const token = createToken(dataToken);

    return NextResponse.json({ access_token: token }, { status: 200 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { message: error.errors[0].message },
        { status: 400 }
      );
    }
    return Response.json({ message: 'Internal server error' }, { status: 500 });
  }
};
