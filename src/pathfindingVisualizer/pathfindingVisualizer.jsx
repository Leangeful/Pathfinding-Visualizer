import React, { Component } from "react";
import Node from "./node/node.jsx";

import "./pathfindingVisualizer.css";

const WIDTH = 50;
const HEIGHT = 20;

class PathfindingVisualizer extends Component {
  state = {
    nodes: []
  };

  componentDidMount() {
    const nodes = [];
    for (let row = 0; row < HEIGHT; row++) {
      const curRow = [];
      for (let col = 0; col < WIDTH; col++) {
        const curNode = {
          col,
          row,
          isStart: row === 10 && col === 5,
          isFinish: row === 10 && col === 45
        };
        curRow.push(curNode);
      }
      nodes.push(curRow);
    }
    this.setState({ nodes });
  }
  render() {
    const { nodes } = this.state;
    console.log(nodes);
    return (
      <div className="grid">
        {nodes.map((row, rowIdx) => {
          return (
            <div key={rowIdx} className="row">
              {row.map((node, nodeIdx) => {
                const { isStart, isFinish } = node;
                return (
                  <Node
                    key={nodeIdx}
                    isStart={isStart}
                    isFinish={isFinish}
                  ></Node>
                );
              })}
            </div>
          );
        })}
      </div>
    );
  }
}

export default PathfindingVisualizer;
