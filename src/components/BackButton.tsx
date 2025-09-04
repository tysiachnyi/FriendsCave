interface BackButtonProps {
  onClick: () => void;
  label?: string;
  className?: string;
  containerClassName?: string;
}

export const BackButton = ({
  onClick,
  label = "Back",
  className = "",
  containerClassName = "absolute top-4 left-4",
}: BackButtonProps) => {
  return (
    <div className={containerClassName}>
      <button
        onClick={onClick}
        className={` cursor-pointer text-sm text-gray-600 hover:text-gray-900 flex items-center gap-1 ${className}`}
      >
        ← {label}
      </button>
    </div>
  );
};
