import { SiteView } from '../App';
export default function Page() { return <SiteView screen="booking" />; }
export { getServerSideProps } from '../server/page-data';
