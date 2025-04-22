// Reset button Props
interface ResetButtonProps {
  setResetState: () => void;
}
// Reset button component
const ResetButton: React.FC<ResetButtonProps> = ({ setResetState }) => {
  return (
    <button
      type="reset"
      className="text-3xl hover:cursor-pointer md:hover:text-4xl transition-all duration-400 ease-in-out"
      onClick={setResetState}
    >
      🔄
    </button>
  );
};
export default ResetButton;
