import { SiteView } from '../App';
export default function Page() { return <SiteView screen="dining" />; }
export { getServerSideProps } from '../server/page-data';
