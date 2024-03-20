import React from "react";
import PaintEditor from "../_components/paintEditor/PaintEditor";
import WriteForm from "../_components/paintEditor/WriteForm";

const PaintEditorPage = () => {
  return (
    <section className="bg-gray-100 flex gap-5 p-5 justify-center items-start">
      <PaintEditor />
      <WriteForm />
    </section>
  );
};

export default PaintEditorPage;
