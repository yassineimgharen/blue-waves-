import { SiteView } from '../App';
export default function Page() { return <SiteView screen="home" />; }
export { getServerSideProps } from '../server/page-data';
