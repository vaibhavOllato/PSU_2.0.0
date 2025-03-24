import { CheckCircle, Loader, Clock } from "lucide-react";

export default function Dashboard() {
  const processSteps = [
    {
      step: "Select Package",
    //   status: "Completed",
      icon: <CheckCircle size={24} className="text-green-500" />,
    },
    {
      step: "Make Assessment",
    //   status: "In Progress",
      icon: <Loader size={24} className="text-yellow-500 animate-spin" />,
    },
    {
      step: "Show Result",
    //   status: "Pending",
      icon: <Clock size={24} className="text-gray-500" />,
    },
    {
      step: "Book Session",
    //   status: "Pending",
      icon: <Clock size={24} className="text-gray-500" />,
    },
    {
      step: "Counselors",
    //   status: "Pending",
      icon: <Clock size={24} className="text-gray-500" />,
    },
  ];

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>

      {/* Profile Card */}
      <div className="bg-white shadow-md rounded-lg p-6 mb-6">
        <h1 className="text-2xl font-bold mb-4">Profile</h1>
        <hr className="my-4 border-gray-300" />

        <div className="flex items-center space-x-6 border-b pb-4">
         
          <div>
            <h2 className="text-xl font-semibold">John Doe</h2>
            <p className="text-gray-600">Software Engineer</p>
            <p className="mt-2 text-gray-700">
              Passionate about building scalable web applications and improving
              user experiences.lorem50orem Ipsum is simply dummy text of the
              printing and typesetting industry. Lorem Ipsum has been the
              industry's standard dummy text ever since the 1500s, when an
              unknown printer took a galley of type and scrambled it to make a
              type specimen book. It has survived not only five centuries, but
              also the leap into electronic typesetting, remaining essentially
              unchanged. It was popularised in the 1960s with the release of
              Letraset sheets containing Lorem Ipsum passages, and more recently
              with desktop publishing software like Aldus PageMaker including
              versions of Lorem Ipsu
            </p>
          </div>
        </div>
      </div>

      {/* Process UI */}
      <div className="bg-white shadow-md rounded-lg p-6">
        <h1 className="text-2xl font-bold mb-4">Your Progress</h1>
        <hr className="my-4 border-gray-300" />

        {/* Process Steps as Small Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {processSteps.map((item, index) => (
            <div
              key={index}
              className="bg-gray-100 p-6 rounded-lg shadow flex flex-col items-center text-center space-y-3"
            >
              <div className="w-12 h-12 flex items-center justify-center bg-white rounded-full shadow">
                {item.icon}
              </div>
              <span className="text-lg font-medium">{item.step}</span>
              {/* <span className="text-sm text-gray-600">{item.status}</span> */}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
