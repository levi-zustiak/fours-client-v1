import { createMachine, assign } from 'xstate';
import { io } from 'socket.io-client';

import LobbyApi from '@common/LobbyApi;';

import type { Context, Events, States, Ack, Joined } from './types';

// const handleAck = (ack: Ack, { resolve, reject }: Promise) => {
//     ack.response === 200 ? resolve(ack.data) : reject('Error emitting to server')
// }

export const machine = 
/** @xstate-layout N4IgpgJg5mDOIC5SzrAlgewHYDo0QBswBiAYQCUBRAQQBVLFQAHDdAF0y0ZAA9EBmHPwCMAJgCsABgDs44ePGjRATgAcwgDQgAngIBsqnKOHTh-PXuHLpq5XoC+9rSljpsOAMYAnMAEM2JBDYYHhYAG4YANYh3n4B3CzsnNx8CNJ60jim8soALJK5oqoZylq6CGo4qvz8ornihbm5qi3Sjs6onJ4+-iRgXl4YXjhMBP4AZkMAtt1xYAmsaBzYKYiiNTi5esrieoXGNdJqZYiV1bX1jc0tqo5OIFgYEHDcLm64+EQLSStIvIiFE4IYQgqo1UQ2Yx5NSidogN5dWK9b5LZJ-VKXIyiSQQhTKYSSEF6IHFITgpR6KQmAwOe4I9wAd18qKwUBRyy46MQBMsWXEplU4n4shqqiBIOEYNqkKsuTUJjh9M5zEWHNWCAAtNicAZpHK6qomtJpDjxYIarUJHLhKpsaZ+Hd7EA */
createMachine<Context, Events, States>({
  context: {
    socket: io(process.env.REACT_APP_SERVER_URL || "localhost:3001"),
    gameId: undefined,
    peer: undefined,
  },
  id: "session",
  initial: "idle",
  states: {
    idle: {
      on: {
        CREATE: {
            target: "create",
            cond: "validCreate",
        },
        JOIN: {
            target: "join",
            cond: "validJoin",
        }
      },
    },
    create: {
      invoke: {
          id: "create",
          src: "connect",
        onDone: {
            target: "waiting",
            actions: { type: "setGameId" },
        },
        onError: {
            target: "idle",
            actions: { type: "error" },
        },
      },
    },
    join: {
        entry: { type: "setGameId" },
        invoke: {
            id: "join",
            src: "connect",
            onDone: {
                target: "connected",
                actions: { type: "setPeer" },
            },
            onError: {
                target: "idle",
                actions: { type: "error" },
            },
        },
    },
    waiting: {
        invoke: {
            id: "wait",
            src: "wait",
            onError: {
                target: "idle",
                actions: { type: "error" },
            }
        },
        on: {
            JOINED: {
                target: "connected",
                actions: { type: "setPeer"},
            }
        }
    },
    connected: {},
  },
},
  {
    actions: {
      setGameId: assign({ gameId: (ctx, { data }: any) => data.gameId }),
      setPeer: assign({ peer: (ctx, { data }: any) => data.peer }),
      resetCtx: assign({
        gameId: (ctx, e) => undefined,
        peer: (ctx, e) => undefined
      }),
      error: (ctx, event) => console.error("Error", ctx, event)
    },
    guards: {
      validCreate: (ctx, { data }: any) => (data?.user?.id ?? false),
      validJoin: (ctx, { data }: any) => ((data?.gameId?.trim() && data?.user?.id) ?? false),
    },
    services: {
      connect: async (ctx: any, e: any) => {
        const data = LobbyApi.connect(e.data);
        console.log(data);
        
        return data;
      },
        // connect: async (ctx: any, e: any) => {            
        //     return await new Promise((resolve, reject) => {
        //         ctx.socket.emit(e.type, { ...e.data }, ({ response, data, error }: Ack) => {
        //             response === 200 ? resolve(data) : reject(error)
        //         });
        //     })
        // },
        wait: (ctx: any, e: any) => (send: any) => {
            ctx.socket.on('player-joined', ({ user }: Joined) => {
                send({ type: "JOINED", data: { user } })
            })

            return () => {
                ctx.socket.off('player-joined')
            }
        }
    }
  });