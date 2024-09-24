import MainLayout from "layouts/MainLayout";
import { ReactNode } from "react";


const HomePage = () => {
    console.log('HomePage component rendered');
    return (
        <div>
            <h1>Hello World!</h1>
        </div>
    );
};

HomePage.getLayout = (page: ReactNode) => (
    <MainLayout>{page}</MainLayout>
);

export default HomePage;
