import Editor from '../_components/paintEditor/Editor';

const PaintEditorPage = () => {
  return (
    <section className="min-h-full bg-gray-100 flex p-10 justify-center items-start">
      <Editor />
    </section>
  );
};
export const dynamic = 'force-dynamic';
export default PaintEditorPage;
