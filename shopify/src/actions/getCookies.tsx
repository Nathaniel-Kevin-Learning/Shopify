import { DataToken } from '@/interfaces';
import { cookies } from 'next/headers';
export async function getCookie() {
  return cookies().get('authorization');
}
