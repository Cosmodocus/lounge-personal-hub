import 'next';

declare module 'next' {
    import { NextPage } from 'next';

    type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
        getLayout?: (page: React.ReactNode, query?: any) => React.ReactNode;
    };
}
