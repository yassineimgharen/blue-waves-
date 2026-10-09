import { SiteView } from '../../App';
export default function Page() { return <SiteView screen="stay" />; }
export { getServerSideProps } from '../../server/page-data';
