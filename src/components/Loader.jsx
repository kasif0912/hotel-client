import React, { useState, useEffect } from "react";
import HashLoader from "react-spinners/HashLoader";

const Loader = () => {
  let [loading, setLoading] = useState(true);

  // useEffect to stop loading after 3 seconds (or any event)
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false); // Stop loading after 3 seconds
    }, 3000); 

    // Cleanup the timeout when component unmounts
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="sweet-loading text-center">
      {/* Display loader as long as loading is true */}
      <HashLoader color="#000" loading={loading} size={80} />
    </div>
  );
};

export default Loader;
