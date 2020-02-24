import React, { Component } from "react";

import "./node.css";

class Node extends Component {
  state = {};

  getNodeType(isStart, isFinish) {
    if (isStart) return "node-start";
    else if (isFinish) return "node-finish";
    return "";
  }

  render() {
    const { isStart, isFinish } = this.props;
    const nodeType = this.getNodeType(isStart, isFinish);
    return <div className={`node ${nodeType}`}></div>;
  }
}

export default Node;
