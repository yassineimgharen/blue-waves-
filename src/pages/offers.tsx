import { SiteView } from '../App';
export default function Page() { return <SiteView screen="offers" />; }
export { getServerSideProps } from '../server/page-data';
