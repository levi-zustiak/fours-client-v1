import { useCallback, useMemo } from 'react';
import { io, Socket } from 'socket.io-client';

const useSocket = () => {
    const socket: Socket = useMemo(() => {
        return io(process.env.REACT_APP_SERVER_URL || 'localhost:3001');
    }, []);

    const close = useCallback(() => {
        socket?.close();
    }, []);

    return {
        socket,
        close,
    }
}

export default useSocket;