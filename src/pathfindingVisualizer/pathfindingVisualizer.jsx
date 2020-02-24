import React, { Component } from "react";
import Node from "./node/node.jsx";

import "./pathfindingVisualizer.css";
import { dijkstra, getShortestPath } from "../algorithms/dijkstra";

const WIDTH = 50;
const HEIGHT = 20;
const START_ROW = 10;
const FINISH_ROW = 10;
const START_COL = 5;
const FINISH_COL = 45;

const createNode = (col, row) => {
  return {
    col,
    row,
    isStart: row === START_ROW && col === START_COL,
    isFinish: row === FINISH_ROW && col === FINISH_COL,
    distance: Infinity,
    isVisited: false,
    isWall: false,
    previousMode: null
  };
};

const initGrid = () => {
  const grid = [];
  for (let row = 0; row < HEIGHT; row++) {
    const curRow = [];
    for (let col = 0; col < WIDTH; col++) {
      curRow.push(createNode(col, row));
    }
    grid.push(curRow);
  }
  return grid;
};

class PathfindingVisualizer extends Component {
  state = {
    grid: []
  };

  componentDidMount() {
    const grid = initGrid();
    this.setState({ grid });
  }

  visualizeDijkstra() {
    const { grid } = this.state;
    const startNode = grid[START_ROW][START_COL];
    const finishNode = grid[FINISH_ROW][FINISH_COL];
    const visitedNodes = dijkstra(grid, startNode, finishNode);
    console.log(finishNode);
    const shortestPath = getShortestPath(finishNode);
    this.animateDijkstra(visitedNodes, shortestPath);
  }

  animateDijkstra(visitedNodes, shortestPath) {
    for (let i = 1; i < visitedNodes.length - 1; i++) {
      if (i === visitedNodes.length - 2) {
        setTimeout(() => {
          this.animateShortestPath(shortestPath);
        }, 5 * i);
        return;
      }
      setTimeout(() => {
        const node = visitedNodes[i];
        document.getElementById(`node-${node.row}-${node.col}`).className =
          "node node-visited";
      }, 5 * i);
    }
  }

  animateShortestPath(shortestPath) {
    for (let i = 0; i < shortestPath.length - 1; i++) {
      setTimeout(() => {
        const node = shortestPath[i];
        document.getElementById(`node-${node.row}-${node.col}`).className =
          "node node-shortest-path";
      }, 50 * i);
    }
  }

  render() {
    const { grid } = this.state;
    console.log(grid);
    return (
      <div>
        <div className="grid">
          {grid.map((row, rowIdx) => {
            return (
              <div key={rowIdx} className="row">
                {row.map((node, nodeIdx) => {
                  const { row, col, isStart, isFinish } = node;
                  return (
                    <Node
                      key={nodeIdx}
                      row={row}
                      col={col}
                      isStart={isStart}
                      isFinish={isFinish}
                    ></Node>
                  );
                })}
              </div>
            );
          })}
        </div>
        <div>
          <button
            className="btn btn-primary"
            onClick={() => this.visualizeDijkstra()}
          >
            Dijkstra
          </button>
        </div>
      </div>
    );
  }
}

export default PathfindingVisualizer;
