import { chivasLoudExtraBold } from "@/fonts";
import { classNames } from "@/utils";

interface SwitchProps {
  toggle: boolean;
  toggleTextTrue?: string;
  toggleTextFalse?: string;
  onClick?: () => void;
  disable?: boolean;
}

const Switch: React.FC<SwitchProps> = ({ toggle, toggleTextTrue, toggleTextFalse, onClick, disable, ...props }) => {
  const toggleClass = "transform translate-x-[32px]";

  return (
    <div
      className={classNames(
        disable ? "cursor-not-allowed opacity-70" : "",
        "relative flex h-[30px] w-[72px] cursor-pointer items-center overflow-hidden rounded-full p-[2px] uppercase shadow-inner",
        toggle ? "bg-[#E2C17E]" : "bg-[#979797]",
        chivasLoudExtraBold.className
      )}
      onClick={onClick}
      {...props}
    >
      {toggle && <span className="absolute left-2 z-10 text-xs text-white">{toggleTextTrue || "ON"}</span>}
      {!toggle && <span className="absolute right-2 z-10 text-xs text-white">{toggleTextFalse || "OFF"}</span>}

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
