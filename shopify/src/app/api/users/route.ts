import { createUser, getUsers, getUsersById } from '@/db/models/user';
import { request } from 'http';
import { NextRequest } from 'next/server';

export type detailUserParam = {
  params: {
    id: string;
  };
};

export const GET = async () => {
  const users = await getUsers();

  return Response.json({ users });
};
