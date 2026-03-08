// No-op socket mock — Vercel is serverless and does not support persistent WebSocket connections.
// Real-time features (social feed, messaging) use REST polling instead.
const noop = () => {};

const socket = {
    on: noop,
    off: noop,
    emit: noop,
    join: noop,
    disconnect: noop,
};

export default socket;
