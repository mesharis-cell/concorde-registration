import { displayFontExtraBold } from "@/fonts";
import { classNames } from "@/utils";

interface SwitchProps {
  toggle: boolean;
  toggleTextTrue?: string;
  toggleTextFalse?: string;
  onClick?: () => void;
  disable?: boolean;
}

const Switch: React.FC<SwitchProps> = ({
  toggle,
  toggleTextTrue,
  toggleTextFalse,
  onClick,
  disable,
  ...props
}) => {
  const toggleClass = "transform translate-x-[32px]";

  return (
    <div
      className={classNames(
        disable ? "cursor-not-allowed opacity-70" : "",
        "relative flex h-[30px] w-[72px] cursor-pointer items-center overflow-hidden rounded-full p-[2px] shadow-inner",
        toggle ? "bg-[#d4a574]" : "bg-[#979797]",
        displayFontExtraBold.className
      )}
      onClick={onClick}
      {...props}
    >
      {toggle && (
        <span className="absolute left-2 z-10 text-[11px] text-white">{toggleTextTrue || "Yes"}</span>
      )}
      {!toggle && (
        <span className="absolute right-2 z-10 text-[11px] text-white">
          {toggleTextFalse || "No"}
        </span>
      )}

      <div
        className={
          "relative z-20 ml-0.5 size-5 transform rounded-full bg-white shadow duration-300 ease-in-out" +
          (toggle ? toggleClass : "")
        }
      />
    </div>
  );
};

export default Switch;
