import { getUsers, getUsersById } from '@/db/models/user';
import { detailUserParam } from '../route';

export const GET = async (_request: Request, { params }: detailUserParam) => {
  const user = await getUsersById(params.id);

  return Response.json({ user });
};
