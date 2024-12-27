/* eslint-disable react/prop-types */
import { useState } from "react";
import { Fade } from "react-awesome-reveal";

const Student = ({ studentData, isLoading }) => {
    const { name, roll, registration, shift, semester, photo, email, phone, address } = studentData;
    const [isModalOpen, setIsModalOpen] = useState(false);
    
    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    if (isLoading) {
        // Show a loading message or spinner while data is being fetched
        return (
            <div className="flex justify-center items-center w-full h-80">
                <p className="text-lg font-bold">Loading...</p>
            </div>
        );
    }

    return (
        <div>
            <div className="card w-full h-full bg-base-100 gap-4 rounded-lg shadow-xl">
                <figure className="w-full h-[290px] object-cover md:h-72 p-2">
                    <img 
                        className="w-full rounded-xl object-cover" 
                        src={photo || "https://via.placeholder.com/150"} // Default placeholder image if no photo
                        alt={name || "Student Image"} 
                    />
                </figure>
                <div className="pb-5 px-5 text-start space-y-1">
                    <Fade direction="up">
                        <h2 className="card-title">Name: {name}</h2>
                        <p>Roll: {roll}</p>
                        <p>Regi: {registration}</p>
                        <p>Shift: {shift}</p>
                    </Fade>
                    <div className="card-actions justify-center">
                        <button 
                            onClick={openModal} 
                            className="bg-[rgb(37,168,214)] p-3 rounded-lg text-white hover:bg-[rgb(10,132,176)] mt-4 w-full"
                        >
                            Details
                        </button>
                    </div>

                    {/* Modal */}
                    {isModalOpen && (
                        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                            <div className="bg-white p-6 rounded-lg shadow-lg w-11/12 md:w-1/2 lg:w-1/4">
                                <img className="h-52 w-full object-cover sm:w-72" src={photo || "https://via.placeholder.com/150"} alt="Student" />
                                <h3 className="font-bold text-lg mt-3">Name: {name}</h3>
                                <Fade direction="down">
                                    <div className="space-y-1 text-base mt-2">
                                        <p><span className="font-semibold">Roll:</span> {roll}</p>
                                        <p><span className="font-semibold">Registration:</span> {registration}</p>
                                        <p><span className="font-semibold">Semester:</span> {semester}</p>
                                        <p><span className="font-semibold">Shift:</span> {shift}</p>
                                        <p><span className="font-semibold">Email:</span> {email}</p>
                                        <p><span className="font-semibold">Phone:</span> {phone}</p>
                                        <p>Address: {address}</p>
                                    </div>
                                </Fade>
                                <div className="modal-action justify-start mt-2">
                                    <button
                                        onClick={closeModal}
                                        className="bg-red-500 text-white px-6 py-3 rounded-lg w-full hover:bg-red-600"
                                    >
                                        Close
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Student;
