  import { use } from "react";


  export default function Sidebar({users }) {
    console.log(users);
    return (
      <div className="w-1/5 py-4 px-2 overflow-y-auto border-r border-r-gray-300 bg-gray-300/60">
        <h2 className="text-lg font-semibold mb-4 text-black">Group Members</h2>
        {users.map((user) => (
          <div
            key={user.id}
            className="p-3 flex items-center gap-3 mb-2 rounded bg-gray-300/90 hover:bg-gray-400/90 transition"
          >
            {/* Profile Image */}
            <div className="relative">
              <img
                src={`https://i.pravatar.cc/40?u=${user.name}`}
                alt={user.name}
                className="w-10 h-10 rounded-full object-cover border border-white shadow-sm"
              />
              {/* Online Status Dot */}
              <span
                className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white ${
                  user.online ? "bg-green-400" : "bg-gray-500"
                }`}
              />
            </div>

            {/* Username */}
            <span className="font-medium text-black">{user.name}</span>
          </div>
        ))}
      </div>
    );
  }
