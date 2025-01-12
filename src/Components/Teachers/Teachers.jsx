import PropTypes from 'prop-types';
import principal from '../../assets/principal.jpg';
import { useLoaderData } from 'react-router-dom';
import Teacher from '../Teacher/Teacher';
import { useEffect, useState } from 'react';
import { Fade } from 'react-awesome-reveal';

// ReUse Filter 
const FilterButton = ({ status, label, activeShift, onClick }) => {
    return (
        <button
            onClick={() => onClick(status)}
            className={`font-bold rounded-lg p-2 w-full hover:bg-[rgb(10,132,176)] ${activeShift === status ? 'bg-purple-500 text-white' : 'bg-[rgb(37,168,214)] text-white'}`}
        >
            {label}
        </button>
    );
};

// ReUse Teacher Components
const TeacherModal = ({ isOpen, onClose, teacher }) => {
    if (!isOpen) return null;
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-11/12 md:w-1/3 lg:w-1/4">
                <img className="h-52 w-full sm:w-72" src={teacher.image} alt="" />
                <h3 className="font-bold text-lg mt-3">Name: {teacher.name}</h3>
                <div className="space-y-1 text-base mt-2">
                    <p><span className="font-semibold">Designation:</span> {teacher.designation}</p>
                    <p><span className="font-semibold">Contact:</span> {teacher.contact}</p>
                    <p><span className="font-semibold">Email:</span> {teacher.email}</p>
                    <p>Room No: {teacher.roomNo}</p>
                </div>
                <div className="modal-action justify-start mt-2">
                    <button onClick={onClose} className="bg-red-500 text-white px-6 py-3 rounded-lg">Close</button>
                </div>
            </div>
        </div>
    );
};

const Teachers = props => {
    const [allTeachers, setAllTeachers] = useState([]);
    const [activeShift, setActiveShift] = useState('all');
    const allTeachersData = useLoaderData();
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        setAllTeachers(allTeachersData);
    }, [allTeachersData]);

    const handleTeacherCategory = (status) => {
        setActiveShift(status);
        if (status === 'all') {
            setAllTeachers(allTeachersData);
        } else {
            const filterTeachers = allTeachersData.filter((data) => {
                return data.designation === status || data.faculty === status || data.department === status;
            });
            setAllTeachers(filterTeachers);
        }
    };

    return (
        <div className='max-w-[1400px] mx-auto mb-10 md:mb-20'>
            <div className='mt-5 sm:mt-10 flex flex-wrap gap-2 sm:gap-7'>
                <div className="dropdown dropdown-bottom sm:hidden">
                    <div tabIndex={0} role="button" className="bg-purple-500 text-base font-semibold text-white p-3 rounded-xl">
                        Sort By Technology
                    </div>
                    <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-[1] space-y-3 w-52 p-2 shadow">
                        <FilterButton status="Computer Science and Technology" label="Computer Technology" activeShift={activeShift} onClick={handleTeacherCategory} />
                        <FilterButton status="Electronics Technology" label="Electronics Technology" activeShift={activeShift} onClick={handleTeacherCategory} />
                        <FilterButton status="Electrical Technology" label="Electrical Technology" activeShift={activeShift} onClick={handleTeacherCategory} />
                        <FilterButton status="Civil Technology" label="Civil Technology" activeShift={activeShift} onClick={handleTeacherCategory} />
                        <FilterButton status="Environmental Technology" label="Environmental Technology" activeShift={activeShift} onClick={handleTeacherCategory} />
                    </ul>
                </div>
                <div className="dropdown dropdown-bottom sm:hidden">
                    <div tabIndex={0} role="button" className="bg-purple-500 text-base font-semibold text-white p-3 rounded-xl">
                        Sort By Teacher
                    </div>
                    <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-[1] space-y-3 w-52 p-2 shadow">
                        <FilterButton status="all" label="All Teachers" activeShift={activeShift} onClick={handleTeacherCategory} />
                        <FilterButton status="Instructor" label="Instructor" activeShift={activeShift} onClick={handleTeacherCategory} />
                        <FilterButton status="Junior Instructor" label="Junior Instructor" activeShift={activeShift} onClick={handleTeacherCategory} />
                        <FilterButton status="Craft Instructor" label="Craft Instructor" activeShift={activeShift} onClick={handleTeacherCategory} />
                        <FilterButton status="Non-Tech" label="Non-Tech" activeShift={activeShift} onClick={handleTeacherCategory} />
                    </ul>
                </div>
                <div className="max-sm:hidden sm:flex gap-4">
                    <FilterButton status="Computer Science and Technology" label="Computer Technology" activeShift={activeShift} onClick={handleTeacherCategory} />
                    <FilterButton status="Electronics Technology" label="Electronics Technology" activeShift={activeShift} onClick={handleTeacherCategory} />
                    <FilterButton status="Electrical Technology" label="Electrical Technology" activeShift={activeShift} onClick={handleTeacherCategory} />
                    <FilterButton status="Civil Technology" label="Civil Technology" activeShift={activeShift} onClick={handleTeacherCategory} />
                    <FilterButton status="Environmental Technology" label="Environmental Technology" activeShift={activeShift} onClick={handleTeacherCategory} />
                </div>
            </div>
            <div className='sm:flex gap-5'>
                <div className='w-1/5 mt-5 sm:mt-10'>
                    <div className='space-y-3 max-sm:hidden space-x-1'>
                        <FilterButton status="all" label="All Teachers" activeShift={activeShift} onClick={handleTeacherCategory} />
                        <FilterButton status="Instructor" label="Instructor" activeShift={activeShift} onClick={handleTeacherCategory} />
                        <FilterButton status="Junior Instructor" label="Junior Instructor" activeShift={activeShift} onClick={handleTeacherCategory} />
                        <FilterButton status="Craft Instructor" label="Craft Instructor" activeShift={activeShift} onClick={handleTeacherCategory} />
                        <FilterButton status="Non-Tech" label="Non-Tech" activeShift={activeShift} onClick={handleTeacherCategory} />
                    </div>
                </div>
                <div className='w-full sm:w-5/6 mt-5 sm:mt-10'>
                    <div>
                        <div className="card card-compact rounded-lg bg-base-100 shadow-lg md:px-9">
                            <figure className='max-sm:w-full'>
                                <img className='h-96 object-cover' src={principal} alt="Principal" />
                            </figure>

                            <div className="card-body">
                                <h2 className="card-title">Engineer Md. Sakhawat Hossain</h2>
                                <div className='text-base space-y-1'>
                                    <Fade direction='down'>
                                        <p>Designation: Professor</p>
                                        <p>Email: principalspi1966@gmail.com</p>
                                        <p>Phone: 029988-13192</p>
                                    </Fade>
                                    <div>
                                        <button onClick={() => setIsModalOpen(true)} className="bg-[rgb(37,168,214)] text-white p-3 rounded-lg w-1/4 text-xl hover:bg-[rgb(10,132,176)] mt-2">Details</button>
                                    </div>
                                </div>
                            </div>

                        </div>
                        {/* modal start */}
                        <TeacherModal
                            isOpen={isModalOpen}
                            onClose={() => setIsModalOpen(false)}
                            teacher={{
                                name: "Engineer Md. Sakhawat Hossain",
                                designation: "Professor",
                                contact: "029988-13192",
                                email: "principalspi1966@gmail.com",
                                roomNo: "301",
                                image: principal
                            }}
                        />
                        {/* modal end */}
                    </div>
                    <div className='grid grid-cols-1 gap-8 mt-5 sm:mt-10 lg:grid-cols-2'>
                        {
                            allTeachers.map((allTeacher) => <Teacher key={allTeacher.id} allTeacher={allTeacher}></Teacher>)
                        }
                    </div>
                </div>
            </div>
        </div>
    );
};

Teachers.propTypes = {};

export default Teachers;