import React, { useEffect, useState } from "react";
import Text from "./Text";

function Navbar() {
  const items = [
    { name: "Contact us", container: "#Contact_Container", another: 0 },
    { name: "Competition", container: "Competitions", another: 1 },
    { name: "Sponsors", container: "Sponsors", another: 2 },
    { name: "Home", container: "", another: 5 },
    { name: "About", container: "#about_container", another: 0 },
    { name: "Figures", container: "#figures_container", another: 0 },
    { name: "Events", container: "#Events_container", another: 0 },
    { name: "Team", container: "team", another: 6 },
  ];
  

  const middleIndex = 3;
  const [rotatedValues, setRotatedValues] = useState(items);

  const [rotationOccurred, setRotationOccurred] = useState(false);

  const [page, SetPage] = useState(false);

  const [Arr, setArr] = useState([]);

  useEffect(() => {
    if (rotatedValues[3].another === 1 || rotatedValues[3].another === 2 || rotatedValues[3].another === 6) {
      SetPage(true);
    } else {
      SetPage(false);
    }

    const arr = [];
    if (items[3].another !== 2 && items[3].another !== 1 && items[3].another !== 6) {
      if (rotatedValues[3].another === 0 || rotatedValues[3].another === 5) {
        let j = 0;
        for (let i = 0; i < 7; i++) {
          if (items[i].another === 0) {
            const about = document.getElementById(
              items[i].container.replace(/^#/, "")
            );
            const a = about ? about.offsetTop : 0;
            arr[j] = a;
            j++;
          }
        }
        console.log(arr);
        setArr(arr.map((element) => element - 300));
      }
    }

    const handleScroll = () => {
      const scrollY = window.scrollY;

      let targetPage;
      if (scrollY < Arr[1]) {
        targetPage = "Home";
      } else if (scrollY > Arr[1] && scrollY < Arr[2]) {
        targetPage = "About";
      } else if (scrollY > Arr[2] && scrollY < Arr[3]) {
        targetPage = "Figures";
      } else if (scrollY > Arr[3] && scrollY < Arr[0]) {
        targetPage = "Events";
      } else if (scrollY > Arr[0]) {
        targetPage = "Contact us";
      }

      if (
        rotatedValues[3].another === 0 ||
        rotatedValues[3].another === 5 ||
        rotatedValues[3].another === 1 ||
        rotatedValues[3].another === 2 ||
        rotatedValues[3].another === 6
      ) {
        setRotatedValues(rotateArrayToTarget(items, targetPage));
      }
    };

    const handlePopstate = () => {
      // Reset to initial state
      setRotatedValues(items);

      // Use a setTimeout to ensure that the state is updated before handling the scroll
      setTimeout(() => {
        handleScroll();
        setRotationOccurred(false);
      }, 0);
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("popstate", handlePopstate);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("popstate", handlePopstate);
    };
  }, [items, rotatedValues, Arr]);

  const handleonclick = (value) => {
    if (rotatedValues[3].another === 0 || rotatedValues[3].another === 5) {
      if (value !== "Home" && value !== "Contact us") {
        // Move all items with another as 0 to Home position
        const updatedValues = rotatedValues.map((item) => {
          if (item.another === 0) {
            return { ...item, another: 5 };
          }
          return item;
        });
        setRotatedValues(rotateArrayToTarget(updatedValues, "Home"));
        SetPage(false); // Set page to false when non-Home item is clicked
      } else {
        setRotatedValues(rotateArrayToTarget(items, value));
        SetPage(value !== "Contact us"); // Set page based on the clicked item
      }
    }
  };
  

  const rotateArrayToTarget = (arr, target) => {
    const targetIndex = arr.findIndex((item) => item.name === target);

    // Calculate the number of rotations needed to bring the target to the 4th position
    const rotations = (targetIndex - 3 + arr.length) % arr.length;

    // Rotate the array
    const rotatedArray = [...arr.slice(rotations), ...arr.slice(0, rotations)];
    setRotationOccurred(true);
    return rotatedArray;
  };

  return (
    <>
      <div className={`menu ${rotationOccurred ? "rotate-container" : ""}`}>
        <div className="line"></div>
        {rotatedValues.slice(0, middleIndex).map((value, index) => (
          <Text
            key={index}
            value={value.name}
            container={value.container}
            page={page}
            onClick={() => handleonclick(value.name)}
            style={{ fontSize: `${12 + index * 3}px` }}
          />
        ))}
        <div className="eclipse_container">
          <div className="eclipse"></div>
          <div className="eclipse1"></div>
        </div>
        <div className="text hf">
          <Text
            container={rotatedValues[3].container}
            value={rotatedValues[3].name}
          ></Text>
        </div>
        <div className="eclipse_container">
          <div className="eclipse1"></div>
          <div className="eclipse"></div>
        </div>
        {rotatedValues.slice(middleIndex + 1, 8).map((value, index) => (
          <Text
            key={index}
            value={value.name}
            container={value.container}
            onClick={() => handleonclick(value.name)}
            style={{ fontSize: `${17 - index * 3}px` }}
          />
        ))}
        <div className="line"></div>
      </div>
    </>
  );
}

export default Navbar;
