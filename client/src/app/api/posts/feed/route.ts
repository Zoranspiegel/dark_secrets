import { getJWTPayload } from '@/app/utils/auth';
import { getClient } from '@/db';
import { NextResponse } from 'next/server';

export async function GET (request: Request): Promise<NextResponse> {
  const { searchParams } = new URL(request.url);
  const page = Number(searchParams.get('page')) || 0;
  const limit = 10;
  const offset = page * limit;

  const jwtPayload = await getJWTPayload();

  if (!jwtPayload?.sub) {
    return NextResponse.json({ error: 'Unauthenticated' }, { status: 403 });
  }

  const { id } = JSON.parse(jwtPayload.sub);

  const client = getClient();
  await client.connect();

  const feedPostsRes = await client.query(
    `select p.*, u.username, u.avatar, u.is_admin from posts p 
    inner join users u on p.user_id = u.id 
    where user_id in (select user_id from follows where follower_id = $1)
    order by updated_at desc limit $2 offset $3`,
    [id, limit + 1, offset]
  );

  await client.end();

  const pages = feedPostsRes.rows.slice(0, limit);
  const last = feedPostsRes.rows.length < limit + 1;

  return NextResponse.json({ pages, last }, { status: 200 });
}
