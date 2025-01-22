import { useState, useEffect, useRef } from "react";
import { Download, RefreshCw, Edit3, Check, X, Sun, Moon } from "lucide-react";
import html2canvas from "html2canvas";
import axios from "axios";

const Card = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [editableUser, setEditableUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [cardColor, setCardColor] = useState("#ffffff");
  const [darkMode, setDarkMode] = useState(false);

  const componentRef = useRef();

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const resp = await axios.get("https://randomuser.me/api/?results=6");
      const data = await resp.data;
      const formattedUsers = data.results.map((user) => ({
        id: user.login.uuid,
        name: `${user.name.first} ${user.name.last}`,
        email: user.email,
        location: `${user.location.city}, ${user.location.country}`,
        picture: user.picture.large,
        designation: "Software Engineer",
        company: "Tech Corp",
      }));
      setUsers(formattedUsers);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setError("Failed to fetch users");
      setLoading(false);
    }
  };

  const handleUserSelect = (user) => {
    setSelectedUser(user);
    setEditableUser(user);
    setIsEditing(false);
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    setSelectedUser(editableUser);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditableUser(selectedUser);
    setIsEditing(false);
  };

  const handleInputChange = (e, field) => {
    setEditableUser((prev) => ({
      ...prev,
      [field]: e.target.value,
    }));
  };

  const handleReset = () => {
    setSelectedUser(null);
    setEditableUser(null);
    setIsEditing(false);
    setCardColor("#ffffff");
  };

  const handleDownload = async () => {
    if (!selectedUser) return;

    const element = componentRef.current;
    const canvas = await html2canvas(element);

    const link = document.createElement("a");
    link.download = `${selectedUser.name}-profile.png`;
    link.href = canvas.toDataURL();
    link.click();
  };

  return (
    <div
      className={`min-h-screen ${
        darkMode ? "bg-gray-900 text-white" : "bg-gray-50 text-gray-900"
      }`}
    >
      <nav
        className={`py-4 px-6 ${
          darkMode ? "bg-gray-800" : "bg-white"
        } shadow-md`}
      >
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <h1 className="text-xl font-bold">Employee Card Generator</h1>
          <button
            onClick={() => setDarkMode(!darkMode)}
            className={`p-2 rounded-lg ${
              darkMode ? "hover:bg-gray-700" : "hover:bg-gray-100"
            }`}
          >
            {darkMode ? (
              <Sun className="w-5 h-5" />
            ) : (
              <Moon className="w-5 h-5" />
            )}
          </button>
        </div>
      </nav>

      <div className="p-4 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* User List */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">User Profiles</h2>
              <button
                onClick={fetchUsers}
                className={`flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-colors
                  ${
                    darkMode
                      ? "bg-gray-700 hover:bg-gray-600"
                      : "bg-white hover:bg-gray-50 border border-gray-200"
                  }`}
              >
                <RefreshCw className="w-4 h-4 mr-2" />
                Refresh
              </button>
            </div>

            {loading ? (
              <div className="flex justify-center items-center p-8">
                <div className="w-8 h-8 border-4 border-t-blue-500 rounded-full animate-spin"></div>
              </div>
            ) : error ? (
              <div className="p-4 bg-red-500 text-white rounded-lg">
                {error}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {users.map((user) => (
                  <div
                    key={user.id}
                    onClick={() => handleUserSelect(user)}
                    className={`cursor-pointer rounded-lg transition-all
                      ${
                        darkMode
                          ? "bg-gray-800 hover:bg-gray-700"
                          : "bg-white hover:shadow-md"
                      }
                      ${
                        selectedUser?.id === user.id
                          ? "ring-2 ring-blue-500"
                          : ""
                      }
                    `}
                  >
                    <div className="p-4 flex items-center space-x-4">
                      <img
                        src={user.picture}
                        alt={user.name}
                        className="w-16 h-16 rounded-full"
                      />
                      <div>
                        <h3 className="font-medium">{user.name}</h3>
                        <p
                          className={`text-sm ${
                            darkMode ? "text-gray-400" : "text-gray-500"
                          }`}
                        >
                          {user.designation}
                        </p>
                        <p
                          className={`text-sm ${
                            darkMode ? "text-gray-400" : "text-gray-500"
                          }`}
                        >
                          {user.company}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Profile Card Preview */}
          <div className="lg:col-span-1">
            <div className="space-y-4 sticky top-4">
              <h2 className="text-2xl font-bold">Profile Card</h2>

              {selectedUser && (
                <>
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Background Color
                    </label>
                    <input
                      type="color"
                      value={cardColor}
                      onChange={(e) => setCardColor(e.target.value)}
                      className="w-full h-10 rounded cursor-pointer"
                    />
                  </div>

                  <div
                    ref={componentRef}
                    className="rounded-lg shadow-lg overflow-hidden"
                    style={{ backgroundColor: cardColor }}
                  >
                    <div className="p-6 text-center">
                      <img
                        src={selectedUser?.picture || ""}
                        alt={selectedUser?.name}
                        className="w-24 h-24 rounded-full mx-auto mb-4 ring-2 ring-blue-500 ring-offset-2"
                      />

                      {isEditing ? (
                        <div className="space-y-3">
                          <input
                            type="text"
                            value={editableUser.name}
                            onChange={(e) => handleInputChange(e, "name")}
                            className={`w-full px-3 py-2 rounded border focus:outline-none focus:ring-2 focus:ring-blue-500
                              ${
                                darkMode
                                  ? "bg-gray-700 border-gray-600"
                                  : "bg-white border-gray-300"
                              }`}
                            placeholder="Name"
                          />
                          <input
                            type="text"
                            value={editableUser.designation}
                            onChange={(e) =>
                              handleInputChange(e, "designation")
                            }
                            className={`w-full px-3 py-2 rounded border focus:outline-none focus:ring-2 focus:ring-blue-500
                              ${
                                darkMode
                                  ? "bg-gray-700 border-gray-600"
                                  : "bg-white border-gray-300"
                              }`}
                            placeholder="Designation"
                          />
                          <input
                            type="text"
                            value={editableUser.company}
                            onChange={(e) => handleInputChange(e, "company")}
                            className={`w-full px-3 py-2 rounded border focus:outline-none focus:ring-2 focus:ring-blue-500
                              ${
                                darkMode
                                  ? "bg-gray-700 border-gray-600"
                                  : "bg-white border-gray-300"
                              }`}
                            placeholder="Company"
                          />
                        </div>
                      ) : (
                        <>
                          <h2 className="text-xl font-bold mb-2">
                            {selectedUser.name}
                          </h2>
                          <p className="text-lg mb-1">
                            {selectedUser.designation}
                          </p>
                          <p
                            className={`${
                              darkMode ? "text-gray-400" : "text-gray-600"
                            }`}
                          >
                            {selectedUser.company}
                          </p>
                          <div className="my-4 border-t border-gray-200"></div>
                          <div className="text-sm">
                            <p
                              className={`${
                                darkMode ? "text-gray-400" : "text-gray-600"
                              }`}
                            >
                              {selectedUser.email}
                            </p>
                            <p
                              className={`${
                                darkMode ? "text-gray-400" : "text-gray-600"
                              }`}
                            >
                              {selectedUser.location}
                            </p>
                          </div>
                        </>
                      )}
                    </div>
                  </div>

                  <div className="flex gap-2">
                    {isEditing ? (
                      <>
                        <button
                          onClick={handleSave}
                          className="flex-1 flex items-center justify-center px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                        >
                          <Check className="w-4 h-4 mr-2" />
                          Save
                        </button>
                        <button
                          onClick={handleCancel}
                          className={`flex-1 flex items-center justify-center px-4 py-2 rounded-lg transition-colors
                            ${
                              darkMode
                                ? "bg-gray-700 hover:bg-gray-600"
                                : "bg-gray-100 hover:bg-gray-200"
                            }`}
                        >
                          <X className="w-4 h-4 mr-2" />
                          Cancel
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          onClick={handleEdit}
                          className={`flex-1 flex items-center justify-center px-4 py-2 rounded-lg transition-colors
                            ${
                              darkMode
                                ? "bg-gray-700 hover:bg-gray-600"
                                : "bg-gray-100 hover:bg-gray-200"
                            }`}
                        >
                          <Edit3 className="w-4 h-4 mr-2" />
                          Edit
                        </button>
                        <button
                          onClick={handleDownload}
                          className="flex-1 flex items-center justify-center px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                        >
                          <Download className="w-4 h-4 mr-2" />
                          Download
                        </button>
                      </>
                    )}
                  </div>
                  <button
                    onClick={handleReset}
                    className={`w-full px-4 py-2 rounded-lg border transition-colors
                      ${
                        darkMode
                          ? "border-gray-600 hover:bg-gray-800"
                          : "border-gray-200 hover:bg-gray-50"
                      }`}
                  >
                    Reset
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
