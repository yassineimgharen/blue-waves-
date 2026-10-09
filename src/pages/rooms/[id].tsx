import { SiteView } from '../../App';
export default function RoomPage({ roomId }: { roomId: string }) { return <SiteView screen="room" roomId={roomId} />; }
export { getRoomServerSideProps as getServerSideProps } from '../../server/page-data';
