import { useState, useEffect } from 'react';
import { db } from '../../firebase';
import { collection, getDocs } from 'firebase/firestore';
import Student from '../Student/Student';

const Students = () => {
    const [studentsData, setStudentsData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [activeShift, setActiveShift] = useState('all');
    const [studentLength, setStudentLength] = useState(0);
    const [searchRoll, setSearchRoll] = useState('');
    const [isLoading, setIsLoading] = useState(true);  // Add loading state

    useEffect(() => {
        const fetchData = async () => {
            try {
                setIsLoading(true);  // Start loading
                const querySnapshot = await getDocs(collection(db, 'users'));
                const dataArray = [];
                querySnapshot.forEach((doc) => {
                    dataArray.push({ id: doc.id, ...doc.data() });
                });
                setStudentsData(dataArray);
                setFilteredData(dataArray);
                setStudentLength(dataArray.length);
            } catch (error) {
                console.error('Error fetching data: ', error);
            } finally {
                setIsLoading(false);  // End loading
            }
        };

        fetchData();
    }, []);

    const handleSearch = (e) => {
        const roll = e.target.value;
        setSearchRoll(roll);

        const filtered = studentsData.filter((user) =>
            user.roll.toString().includes(roll)
        );

        setFilteredData(filtered);
        setStudentLength(filtered.length);
    };

    const handleFilter = (shift) => {
        setActiveShift(shift);
        if (shift === 'all') {
            setFilteredData(studentsData);
            setStudentLength(studentsData.length);
        } else {
            const filtered = studentsData.filter((data) => data.shift === shift);
            setFilteredData(filtered);
            setStudentLength(filtered.length);
        }
    };

    if (isLoading) {
        // Render loading spinner or message while data is loading
        return (
            <div className="flex justify-center items-center w-full h-80">
                <p className="text-lg font-bold">Loading...</p>
            </div>
        );
    }

    return (
        <div className="max-w-[1400px] mx-auto max-sm:p-5 mb-10 md:mb-20">
            <div className="sm:flex items-center justify-between mt-4 sm:mt-8">
                <p className="text-lg md:text-xl font-bold bg-green-300 p-2 md:px-12 md:py-4 rounded-lg text-center">
                    Total Student: {studentLength}
                </p>
                <div className="flex gap-4 max-sm:justify-center items-center max-sm:mt-4">
                    <div className="form-control">
                        <input
                            value={searchRoll}
                            onChange={handleSearch}
                            type="text"
                            placeholder="Type Roll Here"
                            className="input rounded-lg input-bordered w-30 md:w-auto"
                        />
                    </div>
                    <button className="font-bold rounded-lg px-4 md:px-6 py-3 hover:bg-[rgb(10,132,176)] text-white bg-[rgb(37,168,214)]">
                        Search
                    </button>
                </div>
            </div>

            <div className="mt-4 sm:mt-8 flex max-sm:flex-col justify-center md:gap-5">
                <div className="md:w-1/5">
                    <div className="flex flex-col space-y-3 sm:space-y-6">
                        <button
                            onClick={() => handleFilter('all')}
                            className={`font-bold rounded-lg p-4 hover:bg-[rgb(10,132,176)] ${activeShift === 'all' ? 'bg-purple-500 text-white' : 'bg-[rgb(37,168,214)] text-white'}`}
                        >
                            All Student
                        </button>
                        <button
                            onClick={() => handleFilter('1st')}
                            className={`font-bold rounded-lg p-4 hover:bg-[rgb(10,132,176)] ${activeShift === '1st' ? 'bg-purple-500 text-white' : 'bg-[rgb(37,168,214)] text-white'}`}
                        >
                            1st shift
                        </button>
                        <button
                            onClick={() => handleFilter('2nd')}
                            className={`font-bold rounded-lg p-4 hover:bg-[rgb(10,132,176)] ${activeShift === '2nd' ? 'bg-purple-500 text-white' : 'bg-[rgb(37,168,214)] text-white'}`}
                        >
                            2nd shift
                        </button>
                    </div>
                </div>

                <div className="max-sm:mt-5 md:w-4/5">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                        {filteredData.map((studentData) => (
                            <Student key={studentData.id} studentData={studentData} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Students;
