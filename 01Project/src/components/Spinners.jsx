// src/components/CustomSpinner.jsx
function CustomSpinner() {
  return (
    <div className="flex justify-center items-center h-64">
      <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
    </div>
  );
}
export default CustomSpinner;

// we can always make the spinner more complex with animations, colors, etc.
// This is a simple spinner component that can be used in various parts of the application.