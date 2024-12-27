
// import Banner from '../Banner/Banner';
import AboutUs from '../AboutUs/AboutUs';
import Departments from '../Departments/Departments';
import { useLoaderData } from 'react-router-dom';
import Debolopars from '../Debolopars/Debolopars';
import BannerLatest from '../Banner/BannerLatest';

const Home = () => {

    const deboloparData = useLoaderData();



    return (
        <div>
            {/* Banner  */}
            <div className='!max-w-[1500px] mx-auto'>
                <BannerLatest></BannerLatest>
            </div>
            {/* <Banner></Banner> */}
            {/* About us */}
            <AboutUs></AboutUs>
            {/* Dipartment */}
            <Departments></Departments>

            {/* Debolopar tim data fetch */}
            <div>
                <Debolopars deboloparData={deboloparData}></Debolopars>
            </div>
        </div >
    );
};


export default Home;