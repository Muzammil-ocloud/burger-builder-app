import React from "react";
import ToolBar from "../../components/main-menu/ToolBar/ToolBar";
const layout = (props: any) => (
  <div>
    <ToolBar />
    <main>{props.children}</main>
  </div>
);
export default layout;
