import React from "react";

import "./Image.css";

const image = (props) => {
  // console.log(props);
  const img = props.imageUrl.split("\\").join("/");
  console.log(img);

  // console.log({ imgUrl: props.imageUrl });
  // console.log({ imgUrl1: img });
  // console.log("testtttt::::::", `url('http://localhost:8080/${img}')`);
  const temp = `${props.imageUrl}`;
  console.log(temp);
  return (
    // <img className="image" src={props.imageUrl} alt="test" />
    <div
      className="image"
      style={{
        backgroundImage: `url("${img}")`,
        backgroundSize: props.contain ? "contain" : "cover",
        backgroundPosition: props.left ? "left" : "center",
      }}
    />
  );
};

export default image;
