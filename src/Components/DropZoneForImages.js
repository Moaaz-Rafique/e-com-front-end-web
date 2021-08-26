import React, { useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";

function DropZoneForImages({ setSelectedImage, imgError }) {
  const [files, setFiles] = useState([]);
  const thumbsContainer = {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 16,
    justifyContent: "center",
  };
  const container = {
    border: "1.9px dashed #bbb",
    borderColor: imgError && files.length < 1 ? "red" : "#bbb",
    borderRadius: 5,
    textAlign: "center",
    margin: 10,
    marginTop: -10,
    //   width: "95%",
    justifyContent: "center",
  };
  let thumb = {
    display: "inline-flex",
    borderRadius: 2,
    border: "1px solid #eaeaea",
    marginBottom: 8,
    marginRight: 8,
    maxWidth: "90%",
    width: "auto",
    height: 300,
    padding: 4,
    //   alignItems: "right",
    boxSizing: "border-box",
  };

  const thumbInner = {
    display: "flex",
    minWidth: 0,
    overflow: "hidden",
  };

  const img = {
    display: "block",
    width: "auto",
    height: "100%",
  };
  const { getRootProps, getInputProps } = useDropzone({
    accept: "image/*",
    maxFiles: 1,
    onDrop: (acceptedFiles) => {
      setSelectedImage(acceptedFiles[0] || null);
      setFiles(
        acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        )
      );
    },
  });

  const thumbs = files.map((file) => (
    <div style={thumb} key={file.name}>
      <div style={thumbInner}>
        <img src={file.preview} style={img} />
      </div>
    </div>
  ));

  useEffect(
    () => () => {
      // Make sure to revoke the data uris to avoid memory leaks
      files.forEach((file) => URL.revokeObjectURL(file.preview));
    },
    [files]
  );

  return (
    <section {...getRootProps({ className: "dropzone" })} style={container}>
      <div>
        <input {...getInputProps()} />
        <p>Click to Select Image</p>
        {imgError && files.length < 1 ? (
          <p style={{ color: "red" }}>Please Select Image</p>
        ) : (
          ""
        )}
      </div>
      <aside style={thumbsContainer}>{thumbs}</aside>
    </section>
  );
}

export default DropZoneForImages;
