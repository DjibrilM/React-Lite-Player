import React from "react";

interface Props {
  // eslint-disable-next-line
  visible: boolean | any;
  children: React.ReactNode;
}

const Visible: React.FC<Props> = ({ visible, children }) => {
  return visible ?  children : <></>;
};

export default Visible;
