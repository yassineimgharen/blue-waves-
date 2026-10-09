import handler from '../../../server/api.mjs';
export const config = { api: { bodyParser: false, responseLimit: '8mb' } };
export default handler;
