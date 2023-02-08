import React, { useState } from "react";
import ReactQuill, { Quill } from "react-quill";
import "react-quill/dist/quill.snow.css";
import { convert } from "html-to-text";

export const RichText = () => {
  const [value, setValue] = useState("");

  const handleChange = (e) => {
    setValue(e);
    console.log(convert(e));
  };

  // react quill
  // rewrite the css as well, look at  index.scss file
  const Size = Quill.import("attributors/style/size");
  Size.whitelist = ["12px", "14px", "16px", "18px", "20px"];
  Quill.register(Size, true);

  return (
    <div style={{ display: "flex", flexDirection: "column", padding: "20px" }}>
      <h4>Text Editor</h4>
      <div
        style={{
          display: "flex",
          margin: "0 auto",
          width: "80%",
          gap: "20px",
          minHeight: "400px",
        }}
      >
        <div style={{ width: "50%" }}>
          <ReactQuill
            theme="snow"
            // value={value}
            onChange={handleChange}
            style={{ height: "100%" }}
            modules={{
              toolbar: [
                [{ size: Size.whitelist }],
                ["bold", "italic", "underline", "strike"],
                [{ list: "ordered" }, { list: "bullet" }],
              ],
            }}
          />
        </div>
        <div style={{ width: "30%", border: "1px solid #000" }}>{value}</div>
      </div>
    </div>
  );
};
