import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import type { Project } from "../types";
import { Loader2Icon, PlusIcon, TrashIcon } from "lucide-react";
import { dummyProjects } from "../assets/assets";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";

const Community = () => {
  const [loading, setLoading] = useState(true);
  const [projects, setProjects] = useState<Project[]>([]);
  const navigate = useNavigate();

  const fetchProjects = async () => {
    setProjects(dummyProjects);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchProjects();
  }, []);
  return (
    <>
      <div className="px-4 md:px-16 lg:px-24 xl:px-32">
        {loading ? (
          <div className="flex justify-center items-center h-[80vh]">
            <Loader2Icon className="site-7 animate-spin text-indigo-200" />
          </div>
        ) : projects.length > 0 ? (
          <div className="py-10 min-h-[80vh]">
            <div className="flex items-center justify-between mb-12">
              <h1 className="text-2xl font-medium text-white">Published Projects</h1>
              
            </div>
            <div className="flex flex-wrap gap-3.5">
              {projects.map((project) => (
                <Link key={project.id} to={`/view/${project.id}`} target="_blank"
                  className="w-72 max-sm:mx-auto cursor-pointer bg-gray-900/60 border border-gray-700 rounded-lg overflow-hidden group  hover:border-indigo-800/80 transition-all duration-300"
                >
                  <div className="relative w-full h-40 bg-gray-900 overflow-hidden border-b border-gray-800">
                    {project.current_code ? (
                      <iframe
                        srcDoc={project.current_code}
                        className="absolute top-0 left-0 w-300 h-200 origin-top-left pointer-events-none"
                        sandbox="allow-scripts allow-same-origin"
                        style={{ transform: "scale(0.25)" }}
                      />
                    ) : (
                      <div className="flex items-center justify-center h-full bg-gray-500">
                        <p>No preview available</p>
                      </div>
                    )}
                  </div>
                  <div className="p-4 text-white bg-linear-180 from-transparent group-hover:from-indigo-950 to-transparent transition-colors">
                    <div className="flex items-start justify-between">
                      <h2 className="text-lg font-medium line-clamp-2">
                        {project.name}
                      </h2>
                      <button className="px-2.5 py-0.5 mt-1 ml-2 text-xs bg-gray-800 border border-gray-700 rounded-full">
                        Website
                      </button>
                    </div>
                    <p className="text-gray-400 mt-1 text-sm line-clamp-2">
                      {project.initial_prompt}
                    </p>
                    <div
                      className="flex justify-between items-center mt-6"
                    >
                      <span>
                        {new Date(project.createdAt).toLocaleDateString()}
                      </span>
                      <div className="flex gap-3 text-white text-sm">
                        <button
                          className="px-3 py-1.5 bg-white/10 hover:bg-white/15 rounded-md transition-colors flex items-center gap-2"
                        >
                         <span className="bg-gray-200 size-4.5 rounded-full text-black font-semibold flex items-center justify-center">
                          {project.user?.name?.slice(0,1)}
                         </span>
                         {project.user?.name}
                        </button>
                       
                      </div>
                    </div>
                  </div>
                 
                </Link>
              ))}
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-[80vh]">
            <h1 className="text-3xl font-semibold text-gray-300">
              You have no projects yet.
            </h1>
            <button
              onClick={() => navigate("/")}
              className="mt-8 flex items-center gap-2 text-white px-4 py-2 rounded bg-linear-to-br from-indigo-500 to-indigo-600 hover:opacity-90 active:scale-95 transition-all"
            >
              <PlusIcon size={18} />
              Add Project
            </button>
          </div>
        )}
      </div>
<Footer />
    </>
  );
};

export default Community;
