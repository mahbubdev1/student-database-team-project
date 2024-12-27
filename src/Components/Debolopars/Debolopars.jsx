/* eslint-disable react/prop-types */

import PropTypes from 'prop-types';
import { Fade, Flip, JackInTheBox, Zoom } from 'react-awesome-reveal';

const Debolopars = ({ deboloparData }) => {

    console.log(deboloparData);


    return (
        <>
            <div className='container mx-auto text-center py-5 max-w-[900px]'>
                <h1 className='text-5xl font-bold mt-10 '>Our Team Members</h1>
                <p>Our team members are a group of dedicated, skilled professionals committed to innovation, collaboration, and excellence. Each member brings unique expertise in areas like development, design, and project management, allowing us to deliver high-quality solutions. Together, we foster a supportive environment focused on growth, creativity, and exceeding expectations.</p>
            </div>
            <div className='container mx-auto grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-6 p-2 mb-20 '>
                {
                    deboloparData.map((debolopars, index) =>

                        <div key={index}

                            className='border-b-2 shadow-xl rounded-xl bg-white  hover:scale-105 overflow-hidden transition-all'>
                            <div className="card">
                                {/* <div className='border-2 border-gray-400 w-8 mx-auto h-3 rounded-lg mt-5'></div> */}
                                <figure>
                                    <Zoom duration={2000}>
                                        <img
                                            className='h-80 w-80 mt-6 rounded-full object-cover pb-0'
                                            src={debolopars.image}
                                            alt="car!" />
                                    </Zoom>
                                </figure>
                                <div className="card-body">
                                    <JackInTheBox duration={2000}>
                                        <h2 className="card-title">{debolopars.name}</h2>
                                    </JackInTheBox>
                                    <Fade direction='up'>
                                        <p className='text-gray-500 font-bold'>{debolopars.title}</p>
                                    </Fade>
                                    <Fade direction='up'>
                                        <p><span className='font-bold'>Student at:</span> {debolopars.student}</p>
                                    </Fade>
                                    <Fade direction='up'>
                                        <p><span className='font-bold'>Phone:</span> {debolopars.phone}</p>
                                    </Fade>
                                    <Fade direction='up'>
                                        <p className='text-sm text-[#49b972]'>Email: {debolopars.email}</p>
                                    </Fade>
                                </div>
                            </div>
                        </div>
                    )
                }
            </div>
        </>
    );
};

Debolopars.propTypes = {

};

export default Debolopars;