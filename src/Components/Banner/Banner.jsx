

const Banner = () => {
    return (
        <div>
            <div className="hero min-h-[600px]">
                <div className="hero-content text-center">
                    <div className="max-w-5xl space-y-3">
                        <h1 className="text-5xl font-bold text-black">Sherpur Polytechnic Institute</h1>
                        <p className="py-6 text-lg">
                            Welcome to Sherpur Polytechnic Institute! Founded with a vision to nurture technical excellence, we offer high-quality education in engineering and technology. Our skilled faculty, state-of-the-art facilities, and industry-driven curriculum prepare students for a successful future.
                        </p>
                        <button className='btn'><a href="#goFooter">Contact Us</a></button>
                    </div>
                </div>
            </div>
        </div>
    );
};

Banner.propTypes = {

};

export default Banner;