"use client";
import React from "react";
import { Box } from "@chakra-ui/react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

interface QuillEditorProps {
  width?: string;
  ref?: React.Ref<null>;
  handletextEditorChange: (value: string) => void;
  value?: string;
  isError?: boolean;
  placeholder?: string;
  readOnly?: boolean;
  className?: string;
  name?: string;
  minH?: string;
}

const QuillEditorRaw: React.FC<QuillEditorProps> = ({
  width,
  ref,
  handletextEditorChange,
  value,
  isError,
  placeholder = "",
  readOnly,
  className,
  minH = "auto",
  name,
  ...others
}) => {
  const formats: string[] = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "link",
    "align",
    // "image",
  ];

  const modules = {
    toolbar: [
      [{ header: [1, 2, false] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [
        { align: [] },
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" },
      ],
      ["link"],
      ["clean"],
    ],
  };

  return (
    <Box pos="relative" width={width ? width : "100%"}>
      <ReactQuill
        className={`${className}`}
        placeholder={placeholder}
        //@ts-expect-error ignore
        ref={ref}
        theme="snow"
        value={value}
        onChange={(e) => handletextEditorChange(e)}
        modules={modules}
        formats={formats}
        style={{
          border: isError ? "2px solid #FC8181" : "2px solid #E6E7E9",
          height: "100%",
          minHeight: minH,
        }}
        readOnly={readOnly}
        // name={name}
        id={name}
        {...others}
        onBlur={() => null}
      />
      {isError && (
        <Box color={"#E53E3E"} fontSize={"11px"}>
          {
            //@ts-expect-error ignore
            isError?.message || "Enter a valid value"
          }
        </Box>
      )}
    </Box>
  );
};

export default QuillEditorRaw;
