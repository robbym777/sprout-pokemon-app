interface ProgressBarComponentProps {
  progress: number;
}

const ProgressBarComponent = ({ progress }: ProgressBarComponentProps) => {
  return (
    <div className="h-2 sm:h-4 w-full bg-secondary rounded-full overflow-hidden">
      <div
        style={{
          width: `${progress}%`,
        }}
        className="h-2 sm:h-4 bg-primary transition-transform duration-500 rounded-full"
      ></div>
    </div>
  );
};
export default ProgressBarComponent;
