import type { GetServerSidePropsContext } from 'next';
import { getStore, loadSite, publicSite } from '../../server/database.mjs';
export async function getServerSideProps({ res }: GetServerSidePropsContext) {
  res.setHeader('Cache-Control', 'private, no-store');
  const initialSite = publicSite(await loadSite(await getStore()));
  return { props: { initialSite } };
}
export async function getRoomServerSideProps(context: GetServerSidePropsContext) {
  const result = await getServerSideProps(context);
  const roomId = context.params?.id;
  if (typeof roomId !== 'string' || !result.props.initialSite.rooms.some(room => room.id === roomId)) return { notFound: true };
  return { props: { ...result.props, roomId } };
}
