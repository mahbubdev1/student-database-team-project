import React, { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../../firebase";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

const CVMaker = () => {
  const [userData, setUserData] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({});
  const [sections, setSections] = useState({
    education: [],
    skills: [],
    projects: [],
  });

  useEffect(() => {
    const fetchUserData = async () => {
      const user = auth.currentUser;
      if (user) {
        try {
          const docRef = doc(db, "users", user.uid);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            setUserData(docSnap.data());
            setEditData(docSnap.data());
          } else {
            console.error("No user data found!");
          }
        } catch (error) {
          console.error("Error fetching user data:", error.message);
        }
      }
    };

    fetchUserData();
  }, []);

  const handleDownloadPDF = async () => {
    const cvElement = document.getElementById("cv-preview");
    const canvas = await html2canvas(cvElement);
    const imgData = canvas.toDataURL("image/png");

    const pdf = new jsPDF("p", "mm", "a4");
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

    pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
    pdf.save("CV.pdf");
  };

  const handleAddSection = (type) => {
    const newSections = { ...sections };
    newSections[type].push({ title: "", description: "" });
    setSections(newSections);
  };

  return (
    <div className="container mx-auto p-4">
      {!isEditing ? (
        <div id="cv-preview" className="bg-white shadow-md p-6">
          {/* User Photo */}
          <div className="text-center">
            <img
              src={userData.photo || "/default-profile.png"}
              alt="Profile"
              className="w-32 h-32 rounded-full mx-auto"
            />
            <h1 className="text-3xl font-bold">{userData.name || "Your Name"}</h1>
            <p className="text-gray-600">{userData.email || "you@example.com"}</p>
          </div>

          {/* Education Section */}
          <section className="mt-6">
            <h2 className="text-xl font-semibold border-b pb-2">Education</h2>
            {sections.education.length > 0 ? (
              sections.education.map((edu, idx) => (
                <div key={idx} className="mt-4">
                  <h3 className="font-bold">{edu.title || "Degree"}</h3>
                  <p className="text-gray-600">{edu.description || "School Name"}</p>
                </div>
              ))
            ) : (
              <p className="text-gray-500">No education details available.</p>
            )}
          </section>

          {/* Skills Section */}
          <section className="mt-6">
            <h2 className="text-xl font-semibold border-b pb-2">Skills</h2>
            {sections.skills.length > 0 ? (
              sections.skills.map((skill, idx) => (
                <div key={idx} className="mt-4">
                  <p className="text-gray-600">{skill || "Skill Name"}</p>
                </div>
              ))
            ) : (
              <p className="text-gray-500">No skills listed.</p>
            )}
          </section>

          {/* Projects Section */}
          <section className="mt-6">
            <h2 className="text-xl font-semibold border-b pb-2">Projects</h2>
            {sections.projects.length > 0 ? (
              sections.projects.map((proj, idx) => (
                <div key={idx} className="mt-4">
                  <h3 className="font-bold">{proj.title || "Project Name"}</h3>
                  <p className="text-gray-600">{proj.description || "Project Description"}</p>
                </div>
              ))
            ) : (
              <p className="text-gray-500">No projects listed.</p>
            )}
          </section>

          {/* Buttons */}
          <div className="mt-6 flex justify-between">
            <button
              onClick={() => setIsEditing(true)}
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              Edit CV
            </button>
            <button
              onClick={handleDownloadPDF}
              className="bg-green-500 text-white px-4 py-2 rounded"
            >
              Download PDF
            </button>
          </div>
        </div>
      ) : (
        <div className="bg-white shadow-md p-6">
          <h2 className="text-xl font-semibold">Edit CV</h2>
          {/* Editable Form */}
          <form>
            {/* Name */}
            <div className="mt-4">
              <label className="block text-sm font-medium">Name</label>
              <input
                type="text"
                className="w-full border rounded px-4 py-2"
                value={editData.name || ""}
                onChange={(e) =>
                  setEditData({ ...editData, name: e.target.value })
                }
              />
            </div>
            {/* Education */}
            <div className="mt-6">
              <button
                onClick={() => handleAddSection("education")}
                className="bg-blue-500 text-white px-4 py-2 rounded"
              >
                Add Education
              </button>
            </div>
          </form>
          {/* Buttons */}
          <div className="mt-6 flex justify-between">
            <button
              onClick={() => setIsEditing(false)}
              className="bg-gray-500 text-white px-4 py-2 rounded"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CVMaker;
