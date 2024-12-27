import { Bounce, Fade, Zoom } from "react-awesome-reveal";


const AboutUs = () => {
    return (
        <div className=''>
            <div className='py-10'>
                <Zoom>
                    <div className='text-center max-w-6xl mx-auto space-y-3 p-2 mb-12'>
                        <h1 className='text-5xl font-bold'>About Us</h1>
                        <p className='text-lg'> Sherpur Polytechnic Institute is a renowned technical institution committed to delivering quality education and practical skills. With a focus on hands-on learning, experienced faculty, and industry partnerships, it equips students for successful careers in engineering, technology, and vocational fields, fostering innovation and growth. </p>
                    </div>
                </Zoom>

                <div className='grid md:grid-cols-3 justify-items-center   items-center my-5 gap-5'>
                    <div className=''>
                        <div className="card rounded-lg h-full card-compact bg-white shadow-xl transition hover:scale-105 overflow-hidden pb-4">
                            <Zoom>
                                <figure>
                                    <img
                                        className='p-5 rounded-2xl w-full h-[350px] object-cover'
                                        src="https://i.postimg.cc/CLXFGPC7/Whats-App-Image-2024-11-07-at-4-58-26-PM.jpg"
                                        alt="Shoes" />
                                </figure>
                            </Zoom>
                            <div className="card-body">
                                <Bounce duration={12000}>
                                    <h2 className="card-title">Our Mission 🎯</h2>
                                </Bounce>
                                <Fade direction="up">
                                    <p>To empower students with quality technical education, fostering innovation and practical skills to prepare them for successful careers in technology and engineering fields in the world</p>
                                </Fade>
                            </div>
                        </div>
                    </div>
                    <div >
                        <div className="card rounded-lg h-full card-compact bg-white shadow-xl transition hover:scale-105 overflow-hidden pb-4">
                            <Zoom>
                                <figure>
                                    <img
                                        className='p-5 rounded-2xl w-full h-[350px] object-cover'
                                        src="https://i.postimg.cc/wBcgd9C4/Whats-App-Image-2024-11-07-at-4-59-48-PM.jpg"
                                        alt="Shoes" />
                                </figure>
                            </Zoom>
                            <div className="card-body">
                                <Bounce duration={12000}>
                                    <h2 className="card-title">Our History 💹 </h2>
                                </Bounce>
                                <Fade direction="up">
                                    <p>Founded to advance technical education, Sherpur Polytechnic has a rich legacy of excellence, evolving to meet industry demands while maintaining a focus on student success.</p>
                                </Fade>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div className="card rounded-lg h-full card-compact bg-white shadow-xl transition hover:scale-105 overflow-hidden pb-4">
                            <Zoom>
                                <figure>
                                    <img
                                        className='p-5 rounded-2xl w-full h-[350px] object-cover'
                                        src="https://i.postimg.cc/mrbC4gct/Whats-App-Image-2024-11-07-at-5-28-17-PM.jpg"
                                        alt="Shoes" />
                                </figure>
                            </Zoom>
                            <div className="card-body">
                                <Bounce duration={12000}>
                                    <h2 className="card-title">Educational Approach 📚</h2>
                                </Bounce>
                                <Fade direction="up">
                                    <p>We emphasize hands-on learning through practical workshops, industry collaborations, and real-world projects, ensuring students gain skills directly applicable to their careers.</p>
                                </Fade>
                            </div>
                        </div>
                    </div>




                </div>
            </div>
        </div>
    );
};

AboutUs.propTypes = {

};

export default AboutUs;