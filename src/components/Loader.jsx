import React, { useState } from "react";
import HashLoader from "react-spinners/HashLoader";

const Loader = () => {
  let [loading, setLoading] = useState(true);
  let [color, setColor] = useState("#ffffff");
  return (
    <div className="sweet-loading text-center">
      <HashLoader
        color='#000'
        loading={loading}
        cssOverride=''
        size={80}
      />
    </div>
  );
};

export default Loader;
