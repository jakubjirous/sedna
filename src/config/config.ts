export interface IConfig {
    api: {
        baseUrl: string;
    };
}

const config: IConfig = {
    api: {
        baseUrl: process.env.REACT_APP_API_BASE_URL as string,
    },
};

export default config;
