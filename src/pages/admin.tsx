import { AdminDashboard } from '../admin/AdminDashboard';
export default AdminDashboard;
// Authentication remains in the API. Dynamic HTML allows a fresh production CSP nonce.
export async function getServerSideProps({ res }) {
  res.setHeader('Cache-Control', 'private, no-store');
  res.setHeader('X-Robots-Tag', 'noindex, nofollow');
  return { props: {} };
}
