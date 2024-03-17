import "../../styles/icon.css";

function IconRender({
  className = "",
  path,
  width = "24px",
  height = "20px",
  iwidth = "20px",
  iheight = "20px",
  addstyle = {},
  addistyle = {},
}) {
  // console.log(path);
  // console.log(width);
  // console.log(typeof width);
  return (
    <div
      className={className + " icon"}
      style={{
        width: width,
        height: height,
        ...addstyle,
      }}
    >
      <img
        style={{
          width: iwidth,
          height: iheight,
          ...addistyle,
          // overflow: "visible",
          // opacity: 1,
          // zIndex: 1,
          // fill: "rgb(3, 3, 3)",
        }}
        src={path}
      />
    </div>
  );
}

export default IconRender;
