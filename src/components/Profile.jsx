import { useState, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Download, Edit3, Check, X, Upload } from "lucide-react";
import html2canvas from "html2canvas";

function Profile() {
  const location = useLocation();
  const navigate = useNavigate();
  // get user from location state
  const { user } = location.state || {};
  // state to hold the edited user
  const [edituser, setEdituser] = useState(user);
  // state to toggle edit mode
  const [isedit, setIsedit] = useState(false);
  // default background color
  const [bgcolor, setBgcolor] = useState("#ffffff");
  // state to hold error messages
  const [error, setError] = useState("");
  // card ss
  const cardss = useRef();

  const imgupload = useRef();

  // if no user, navigate back to home
  if (!user) {
    navigate("/");
    return null;
  }

  // changes in the inputs
  function handlechange(e, field) {
    setError("");
    setEdituser({ ...edituser, [field]: e.target.value });
  }

  // handle image upload
  function handleimg(e) {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setEdituser({ ...edituser, img: reader.result }); // update the image
      };
      reader.readAsDataURL(file);
    }
  }

  // validation
  function handlesave() {
    if (!edituser.name || !edituser.role || !edituser.work) {
      setError("Please fill all fields");
      return;
    }
    setIsedit(false);
    setError("");
  }

  //Download card
  async function download() {
    const canvas = await html2canvas(cardss.current, {
      useCORS: true,
      backgroundColor: bgcolor,
    });
    const link = document.createElement("a");
    // filename with user name
    link.download = `card.png`;
    link.href = canvas.toDataURL();
    // trigger download
    link.click();
  }

  return (
    <div className="p-4 max-w-xl mx-auto">
      <div className="space-y-4">
        <span>COlor: </span>
        <input
          type="color"
          value={bgcolor}
          onChange={(e) => setBgcolor(e.target.value)}
          className="w-full h-10 rounded"
        />
        <div
          ref={cardss}
          className="shadow-lg overflow-hidden"
          style={{
            backgroundColor: bgcolor,
            width: 400,
            minHeight: 300,
            margin: "0 auto",
          }}
        >
          <div className="p-6 text-center">
            <div className="relative w-24 h-24 mx-auto mb-4">
              <img
                src={edituser.img}
                alt="profile"
                className="w-24 h-24 rounded-full object-cover ring-2 ring-blue-500"
              />
              {isedit && (
                <button
                  onClick={() => imgupload.current.click()}
                  className="absolute bottom-0 right-0 p-1.5 bg-blue-500 rounded-full text-white"
                >
                  <Upload className="w-4 h-4" />
                </button>
              )}
            </div>

            <input
              type="file"
              ref={imgupload}
              onChange={handleimg}
              className="hidden"
            />

            {isedit ? (
              <div className="space-y-3">
                <input
                  value={edituser.name}
                  onChange={(e) => handlechange(e, "name")}
                  className={`w-full p-2 border rounded ${
                    !edituser.name && "border-red-500"
                  }`}
                  placeholder="Name *"
                />
                <input
                  value={edituser.role}
                  onChange={(e) => handlechange(e, "role")}
                  className={`w-full p-2 border rounded ${
                    !edituser.role && "border-red-500"
                  }`}
                  placeholder="Role *"
                />
                <input
                  value={edituser.work}
                  onChange={(e) => handlechange(e, "work")}
                  className={`w-full p-2 border rounded ${
                    !edituser.work && "border-red-500"
                  }`}
                  placeholder="Company *"
                />
                {error && <p className="text-red-500 text-sm">{error}</p>}
              </div>
            ) : (
              <>
                <h2 className="text-xl font-bold mb-2">{edituser.name}</h2>
                <p className="text-lg mb-1">{edituser.role}</p>
                <p className="text-gray-600">{edituser.work}</p>
                <div className="my-4 border-t" />
              </>
            )}
          </div>
        </div>

        <div className="flex flex-col w-full justify-center gap-6">
          {isedit ? (
            <>
              <button
                onClick={handlesave}
                className="flex-1 flex items-center justify-center p-2 bg-black text-white border-black border-2 hover:border-black hover:bg-white hover:text-black transition-all"
              >
                Save
              </button>
              <button
                onClick={() => {
                  setEdituser(user);
                  setIsedit(false);
                  setError("");
                }}
                className="flex-1 flex items-center justify-center p-2 bg-white text-black border-2 border-blue-600 hover:bg-blue-600 hover:text-white transition-all"
              >
                Cancel
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => setIsedit(true)}
                className="flex-1 flex items-center justify-center p-2 bg-black text-white border-black border-2 hover:border-black hover:bg-white hover:text-black transition-all"
              >
                Edit
              </button>

              <button
                onClick={download}
                className="flex-1 flex items-center justify-center p-2 bg-white text-blue-800 border-2 border-blue-600 hover:bg-blue-600 hover:text-white transition-all"
              >
                Download
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Profile;
