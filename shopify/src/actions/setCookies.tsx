'use server';

import { DataToken } from '@/interfaces';
import { cookies } from 'next/headers';

export async function setCookies(data: DataToken) {
  cookies().set('authorization', 'Bearer ' + data.access_token);
}
