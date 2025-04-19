// Reset button Props
interface ResetButtonProps {
  setResetState: () => void;
}
// Reset button component
const ResetButton: React.FC<ResetButtonProps> = ({ setResetState }) => {
  return (
    <button
      type="reset"
      className="text-3xl hover:cursor-pointer"
      onClick={setResetState}
    >
      🔄
    </button>
  );
};
export default ResetButton;
