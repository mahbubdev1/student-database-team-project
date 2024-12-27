import AwesomeSlider from 'react-awesome-slider';
import 'react-awesome-slider/dist/styles.css';
import banner1 from '../../assets/banner/banner1.jpg'
import banner2 from '../../assets/banner/banner2.jpg'
import banner3 from '../../assets/banner/banner3.jpg'
import { Link } from 'react-router-dom';

import withAutoplay from 'react-awesome-slider/dist/autoplay';
import 'react-awesome-slider/dist/styles.css'
import { Fade, Zoom } from 'react-awesome-reveal';

const AutoplaySlider = withAutoplay(AwesomeSlider);

const BannerLatest = () => {
    return (
        <div className='mb-20'>
            <AutoplaySlider
                play={true}
                cancelOnInteraction={false}
                interval={2000}
                className='w-full md:h-[600px] h-[450px]' >
                <div
                    className="hero min-h-screen"
                    style={{
                        backgroundImage: `url(${banner1})`,
                        backgroundRepeat: 'no-repeat',
                        backgroundSize: 'cover'
                    }}>
                    <div className="hero-overlay bg-opacity-60"></div>
                    <div className="hero-content text-neutral-content text-center">
                        <div className="max-w-3xl">
                            <Fade direction='down'>
                                <h1 className="mb-5 text-5xl font-bold">Sherpur Polytechnic Institute</h1>
                            </Fade>
                            <Fade duration={2000} direction='up'>
                                <p className="mb-5">
                                    Welcome to Sherpur Polytechnic Institute! Founded with a vision to nurture technical excellence, we offer high-quality education in engineering and technology. Our skilled faculty, state-of-the-art facilities, and industry-driven curriculum prepare students for a successful future.
                                </p>
                            </Fade>
                            <Link to='/' >
                                <Zoom >
                                    <button className="bg-[rgb(37,168,214)] py-3 px-8  text-white font-bold hover:bg-[rgb(10,132,176)] transition-colors">
                                        See More
                                    </button>
                                </Zoom>
                            </Link>
                        </div>
                    </div>
                </div>
                <div
                    className="hero min-h-screen"
                    style={{
                        backgroundImage: `url(${banner2})`,
                        backgroundRepeat: 'no-repeat',
                        backgroundSize: 'cover'
                    }}>
                    <div className="hero-overlay bg-opacity-60"></div>
                    <div className="hero-content text-neutral-content text-center">
                        <div className="max-w-3xl">
                            <Fade direction='down'>
                                <h1 className="mb-5 text-5xl font-bold">Sherpur Polytechnic Institute</h1>
                            </Fade>
                            <Fade direction='up' duration={2000}>
                                <p className="mb-5">
                                    Welcome to Sherpur Polytechnic Institute! Founded with a vision to nurture technical excellence, we offer high-quality education in engineering and technology. Our skilled faculty, state-of-the-art facilities, and industry-driven curriculum prepare students for a successful future.
                                </p>
                            </Fade>
                            <Link to='/'>
                                <Zoom>
                                    <button className="bg-[rgb(37,168,214)] py-3 px-8  text-white font-bold hover:bg-[rgb(10,132,176)] transition-colors">
                                        See More
                                    </button>
                                </Zoom>
                            </Link>
                        </div>
                    </div>
                </div>
                <div
                    className="hero min-h-screen"
                    style={{
                        backgroundImage: `url(${banner3})`,
                        backgroundRepeat: 'no-repeat',
                        backgroundSize: 'cover'
                    }}>
                    <div className="hero-overlay bg-opacity-60"></div>
                    <div className="hero-content text-neutral-content text-center">
                        <div className="max-w-3xl">
                            <Fade direction='down'>
                                <h1 className="mb-5 text-5xl font-bold">Sherpur Polytechnic Institute</h1>
                            </Fade>
                            <Fade direction='up' duration={2000}>
                                <p className="mb-5">
                                    Welcome to Sherpur Polytechnic Institute! Founded with a vision to nurture technical excellence, we offer high-quality education in engineering and technology. Our skilled faculty, state-of-the-art facilities, and industry-driven curriculum prepare students for a successful future.
                                </p>
                            </Fade>
                            <Link to='/'>
                                <Zoom>
                                    <button className="bg-[rgb(37,168,214)] py-3 px-8  text-white font-bold hover:bg-[rgb(10,132,176)] transition-colors">
                                        See More
                                    </button>
                                </Zoom>
                            </Link>
                        </div>
                    </div>
                </div>
            </AutoplaySlider>

        </div>
    );
};

export default BannerLatest;