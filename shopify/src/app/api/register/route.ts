import { userSchema } from '@/validators/user.validator';
import {
  createUser,
  getUserByEmail,
  getUserByUsername,
} from '@/db/models/user';
import { z } from 'zod';

export const POST = async (request: Request) => {
  try {
    const body = await request.json();

    const data = userSchema.parse(body);

    const checker2 = await getUserByUsername(data.username);
    if (checker2) {
      return Response.json(
        { message: 'username must be unique' },
        { status: 400 }
      );
    }
    const checker = await getUserByEmail(data.email);
    if (checker) {
      return Response.json(
        { message: 'email needed to be unique' },
        { status: 400 }
      );
    }

    const result = await createUser(data);

    return Response.json(
      { userData: result, message: 'success create user' },
      { status: 201 }
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      return Response.json(
        { message: error.errors[0].message },
        { status: 400 }
      );
    }
    return Response.json({ message: 'Internal server error' }, { status: 500 });
  }
};
