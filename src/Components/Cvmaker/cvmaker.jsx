import React, { useState, useEffect } from 'react';
import { db, auth } from '../../firebase';
import { doc, getDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { jsPDF } from 'jspdf';

const Cvmaker = () => {
  const navigate = useNavigate();

  const [userData, setUserData] = useState({
    name: '',
    email: '',
    address: '',
    photo: '', // User photo URL from Firestore Storage
  });

  const [education, setEducation] = useState([
    { degree: "Bachelor's Degree", school: 'University Name', year: '2018 - 2022' }
  ]);

  const [skills, setSkills] = useState(['JavaScript', 'React']);
  const [projects, setProjects] = useState([{ title: 'Project 1', description: 'Description of Project 1' }]);

  const [isEditing, setIsEditing] = useState(false);

  // Fetch user data from Firestore
  useEffect(() => {
    const fetchUserData = async () => {
      const user = auth.currentUser;
      if (user) {
        try {
          const docRef = doc(db, 'users', user.uid);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            setUserData(docSnap.data());
          } else {
            console.error('No user data found!');
          }
        } catch (error) {
          console.error('Error fetching user data:', error.message);
        }
      } else {
        navigate('/login');
      }
    };

    fetchUserData();
  }, [navigate]);

  // Download CV as PDF using jsPDF
  const downloadPDF = () => {
    const doc = new jsPDF();

    // Add User Photo (if exists)
    const photo = userData.photo || 'https://via.placeholder.com/150';
    const img = new Image();
    img.src = photo;

    img.onload = () => {
      // Add Image to PDF (with specific coordinates and size)
      doc.addImage(img, 'JPEG', 20, 20, 50, 50); // Adjust the size and position as needed

      // Set up font size and other properties
      doc.setFontSize(16);
      doc.text(20, 80, `Name: ${userData.name}`);
      doc.text(20, 90, `Email: ${userData.email}`);
      doc.text(20, 100, `Address: ${userData.address}`);

      // Education section
      doc.text(20, 120, 'Education:');
      education.forEach((edu, index) => {
        doc.text(20, 130 + index * 10, `${edu.degree} - ${edu.school} (${edu.year})`);
      });

      // Skills section
      doc.text(20, 160, 'Skills:');
      skills.forEach((skill, index) => {
        doc.text(20, 170 + index * 10, skill);
      });

      // Projects section
      doc.text(20, 200, 'Projects:');
      projects.forEach((project, index) => {
        doc.text(20, 210 + index * 10, `${project.title}: ${project.description}`);
      });

      // Save the PDF
      doc.save('cv.pdf');
    };
  };

  // Handle adding new section (Education, Skills, Projects)
  const addSection = (sectionType) => {
    if (sectionType === 'education') {
      setEducation([...education, { degree: '', school: '', year: '' }]);
    } else if (sectionType === 'skills') {
      setSkills([...skills, '']);
    } else if (sectionType === 'projects') {
      setProjects([...projects, { title: '', description: '' }]);
    }
  };

  // Handle updates to dynamic fields (Education, Skills, Projects)
  const updateSection = (sectionType, index, field, value) => {
    if (sectionType === 'education') {
      const updatedEducation = [...education];
      updatedEducation[index][field] = value;
      setEducation(updatedEducation);
    } else if (sectionType === 'skills') {
      const updatedSkills = [...skills];
      updatedSkills[index] = value;
      setSkills(updatedSkills);
    } else if (sectionType === 'projects') {
      const updatedProjects = [...projects];
      updatedProjects[index][field] = value;
      setProjects(updatedProjects);
    }
  };

  return (
    <div className="bg-gray-100 p-8 font-sans">
      <div
        id="cv-container"
        className={`bg-white p-8 rounded-lg shadow-lg ${isEditing ? '' : 'cv-view-mode'}`}
      >
        {/* CV Header Section */}
        <div className="flex items-center mb-8">
          <img
            src={userData.photo || 'https://via.placeholder.com/150'}
            alt="User Photo"
            className="w-32 h-32 rounded-full border-4 border-gray-300"
          />
          <div className="ml-6">
            {isEditing ? (
              <>
                <input
                  type="text"
                  value={userData.name}
                  onChange={(e) => setUserData({ ...userData, name: e.target.value })}
                  placeholder="Name"
                  className="w-full p-2 mb-2 border rounded-md"
                />
                <input
                  type="email"
                  value={userData.email}
                  onChange={(e) => setUserData({ ...userData, email: e.target.value })}
                  placeholder="Email"
                  className="w-full p-2 mb-2 border rounded-md"
                />
                <input
                  type="text"
                  value={userData.address}
                  onChange={(e) => setUserData({ ...userData, address: e.target.value })}
                  placeholder="Address"
                  className="w-full p-2 mb-2 border rounded-md"
                />
              </>
            ) : (
              <>
                <h1 className="text-3xl font-bold text-gray-800">{userData.name || 'User Name'}</h1>
                <p className="text-lg text-gray-600">{userData.email || 'user@example.com'}</p>
                <p className="text-lg text-gray-600">{userData.address || '1234 Elm St, Springfield'}</p>
              </>
            )}
          </div>
        </div>

        {/* Education Section */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">Education</h2>
          {education.map((edu, index) => (
            <div key={index} className="p-4 border rounded-lg mb-4 bg-gray-50">
              {isEditing ? (
                <>
                  <input
                    type="text"
                    value={edu.degree}
                    onChange={(e) => updateSection('education', index, 'degree', e.target.value)}
                    placeholder="Degree"
                    className="w-full p-2 mb-2 border rounded-md"
                  />
                  <input
                    type="text"
                    value={edu.school}
                    onChange={(e) => updateSection('education', index, 'school', e.target.value)}
                    placeholder="School"
                    className="w-full p-2 mb-2 border rounded-md"
                  />
                  <input
                    type="text"
                    value={edu.year}
                    onChange={(e) => updateSection('education', index, 'year', e.target.value)}
                    placeholder="Year"
                    className="w-full p-2 border rounded-md"
                  />
                </>
              ) : (
                <>
                  <p><strong>{edu.degree}</strong> - {edu.school} ({edu.year})</p>
                </>
              )}
            </div>
          ))}
          {isEditing && (
            <button
              onClick={() => addSection('education')}
              className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
            >
              Add Education
            </button>
          )}
        </section>

        {/* Skills Section */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">Skills</h2>
          <div className="flex flex-wrap gap-4 mb-4">
            {skills.map((skill, index) => (
              <div key={index} className="w-full md:w-1/2 lg:w-1/3">
                {isEditing ? (
                  <input
                    type="text"
                    value={skill}
                    onChange={(e) => updateSection('skills', index, null, e.target.value)}
                    placeholder="Skill"
                    className="w-full p-2 border rounded-md bg-gray-50"
                  />
                ) : (
                  <span className="inline-block p-2 bg-gray-200 text-gray-800 rounded-lg">{skill}</span>
                )}
              </div>
            ))}
          </div>
          {isEditing && (
            <button
              onClick={() => addSection('skills')}
              className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
            >
              Add Skill
            </button>
          )}
        </section>

        {/* Projects Section */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">Projects</h2>
          {projects.map((project, index) => (
            <div key={index} className="p-4 border rounded-lg mb-4 bg-gray-50">
              {isEditing ? (
                <>
                  <input
                    type="text"
                    value={project.title}
                    onChange={(e) => updateSection('projects', index, 'title', e.target.value)}
                    placeholder="Project Title"
                    className="w-full p-2 mb-2 border rounded-md"
                  />
                  <textarea
                    value={project.description}
                    onChange={(e) => updateSection('projects', index, 'description', e.target.value)}
                    placeholder="Project Description"
                    className="w-full p-2 mb-2 border rounded-md"
                  />
                </>
              ) : (
                <>
                  <h3 className="font-semibold text-gray-700">{project.title}</h3>
                  <p className="text-gray-600">{project.description}</p>
                </>
              )}
            </div>
          ))}
          {isEditing && (
            <button
              onClick={() => addSection('projects')}
              className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
            >
              Add Project
            </button>
          )}
        </section>

        {/* Edit/Preview & Download Buttons */}
        <div className="flex justify-between">
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="bg-green-500 text-white p-2 rounded-md hover:bg-green-600"
          >
            {isEditing ? 'Preview CV' : 'Edit CV'}
          </button>
          <button
            onClick={downloadPDF}
            className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
          >
            Download PDF
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cvmaker;
