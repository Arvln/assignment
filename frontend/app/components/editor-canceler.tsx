export const EditorCanceler = () => {
  return (
    <div className="relative w-6 h-6 cursor-pointer">
      <div className="absolute inset-0 w-full h-0.5 bg-black transform rotate-45" />
      <div className="absolute inset-0 w-full h-0.5 bg-black transform -rotate-45" />
    </div>
  );
}