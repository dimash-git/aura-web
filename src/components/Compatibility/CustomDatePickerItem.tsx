import React, { useEffect, useRef, useState } from "react";

const ITEM_HEIGHT = 40; // Height of each date item

interface DatePickerItemProps {
  data: string[];
  selectedValue: string;
  onSelect: (value: string) => void;
  unit: string;
}

function useIsMobile() {
  const [isMobile, setIsMobile] = useState<boolean>(false);

  useEffect(() => {
    setIsMobile(window.matchMedia("(max-width: 600px)").matches);
  }, []);

  return isMobile;
}

const DatePickerItem: React.FC<DatePickerItemProps> = ({
  data,
  selectedValue,
  onSelect,
  unit,
}) => {
  const isMobile = useIsMobile();
  const scrollRef = useRef<HTMLDivElement | null>(null);

  const [touchY, setTouchY] = useState<number>(0);
  const [translateY, setTranslateY] = useState<number>(
    data.indexOf(selectedValue) * -ITEM_HEIGHT
  );

  const handleTouchStart = (event: React.TouchEvent<HTMLDivElement>) => {
    setTouchY(event.touches[0].clientY);
  };

  const handleTouchMove = (event: React.TouchEvent<HTMLDivElement>) => {
    if (isMobile && touchY !== null) {
      const deltaY = event.touches[0].clientY - touchY;
      wheelScroll(deltaY);
      setTouchY(event.touches[0].clientY);
    }
  };

  const handleTouchEnd = () => {
    if (isMobile && scrollRef.current) {
      const selectedIndex = Math.round(-translateY / ITEM_HEIGHT);
      onSelect(data[selectedIndex]);

      // Limit the translateY to ensure it aligns with a valid item
      setTranslateY(-selectedIndex * ITEM_HEIGHT);
      setTouchY(0);
    }
  };

  const wheelScroll = (deltaY: number) => {
    const newTranslateY = translateY + deltaY;

    // Calculate the maximum and minimum translateY values based on the data length
    const minTranslateY = -ITEM_HEIGHT * (data.length - 1);
    const maxTranslateY = 0;

    // Ensure the newTranslateY stays within the valid range
    if (newTranslateY < minTranslateY) {
      setTranslateY(minTranslateY);
    } else if (newTranslateY > maxTranslateY) {
      setTranslateY(maxTranslateY);
    } else {
      setTranslateY(newTranslateY);
    }
  };

  //   const handleMouseDown = (event: React.MouseEvent<HTMLDivElement>) => {
  //     if (!isMobile) {
  //       setTouchY(event.clientY);
  //       document.addEventListener("mousemove", handleMouseMove);
  //       document.addEventListener("mouseup", handleMouseUp);
  //     }
  //   };

  //   const handleMouseMove = (event: MouseEvent) => {
  //     const deltaY = event.clientY - touchY;
  //     handleScroll(deltaY);
  //     setTouchY(event.clientY);
  //   };

  //   const handleMouseUp = () => {
  //     resetMouseState();
  //   };

  //   const resetTouchState = () => {
  //     if (isMobile && scrollRef.current) {
  //       const selectedIndex = Math.round(-translateY / ITEM_HEIGHT);
  //       onSelect(data[selectedIndex]);

  //       // Limit the translateY to ensure it aligns with a valid item
  //       setTranslateY(-selectedIndex * ITEM_HEIGHT);
  //       setTouchY(0);
  //     }
  //   };

  //   const resetMouseState = () => {
  //     document.removeEventListener("mousemove", handleMouseMove);
  //     document.removeEventListener("mouseup", handleMouseUp);
  //     resetTouchState();
  //   };

  //   useEffect(() => {
  //     // Clean up mouse event listeners when the component unmounts
  //     return () => {
  //       resetMouseState();
  //     };
  //   }, []);

  return (
    <div className="date-picker-viewport">
      <div className="date-picker-wheel">
        <div
          className="date-picker-scroll"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          //   onMouseDown={handleMouseDown}
          ref={scrollRef}
          style={{
            transform: `translateY(${translateY}px)`,
          }}
        >
          {data.map((item, index) => (
            <div
              className={`date-picker-item ${
                item === selectedValue ? "selected" : ""
              }`}
              key={`${unit}-${index}`}
            >
              {item}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DatePickerItem;
