import react from '@vitejs/plugin-react'
import tsconfigPaths from 'vite-tsconfig-paths'
import {defineConfig, loadEnv} from "vite";
import * as fs from "fs";
import * as path from "node:path";
import mkcert from 'vite-plugin-mkcert'

export default ({ mode }) => {
    process.env = {...process.env, ...loadEnv(mode, process.cwd())};

    return defineConfig({
        base: "/frontend",
        server: {
            host: true,
            proxy: {
                "/api": {
                    target: process.env.VITE_API_URL
                },
                "/graphql": {
                    target: process.env.VITE_API_URL
                }
            },
            https:{
                key: fs.readFileSync(path.resolve(__dirname, 'cert.key')),
                cert: fs.readFileSync(path.resolve(__dirname, 'cert.crt')),
            },
        },
        plugins: [
            react(),
            mkcert(),
            tsconfigPaths()
        ]
    });
}