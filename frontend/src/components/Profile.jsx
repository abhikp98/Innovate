import { useState } from "react";
import ProfileIcon from "../assets/user.png";
import { useNavigate } from "react-router-dom";
export default function Profile() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="relative">
      {/* Profile Icon */}
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center focus:outline-none"
      >
        <img
          src={ProfileIcon}
          alt="Profile"
          className="w-10 h-10 rounded-full border-2 border-gray-300"
        />
      </button>

      {/* Dropdown Menu */}
      {open && (
        <div className="absolute right-0 mt-2 w-48 bg-white border rounded-lg shadow-lg">
          <button
            onClick={() => {
              alert("Logging out...");
              navigate("/logout/");
            }}
            className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
}
