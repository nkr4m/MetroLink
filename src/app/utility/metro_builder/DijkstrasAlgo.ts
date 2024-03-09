import { StationLinks } from "../types/stationLinks";
import { Stations } from "../types/stations";
import { ToLinks } from "../types/toLinks";

import { stationLinks } from './StationsLinks';


export class Graph {
  private adjacencyList: Record<number, ToLinks[]> = {};
  private stations: Record<number, Stations> = {};

  constructor(stationLinks: StationLinks[], stations: Stations[]) {
    stationLinks.forEach(station => {
      this.adjacencyList[station.fromCode] = station.to;
    });

    stations.forEach(station => {
      this.stations[station.stationCode] = station;
    });
  }

  dijkstraWithLeastLineTypeChanges(startNode: number, endNode: number): { distance: number, path: { node: number, lineType: string, stationName: string }[], stationChanges: number } {
    const distances: Record<number, number> = {};
    const stationChanges: Record<number, number> = {};
    const previousNodes: Record<number, number | null> = {};
    const visited: Record<number, boolean> = {};
    const priorityQueue: number[] = [];

    // Initialize distances and stationChanges and add the start node to the priority queue
    for (const node in this.adjacencyList) {
      distances[node] = node === startNode.toString() ? 0 : Infinity;
      stationChanges[node] = node === startNode.toString() ? 0 : Infinity;
      previousNodes[node] = null;
      priorityQueue.push(parseInt(node));
    }

    // Main Dijkstra's algorithm loop
    while (priorityQueue.length > 0) {
      priorityQueue.sort((a, b) => stationChanges[a] - stationChanges[b]);

      const currentNode = priorityQueue.shift() as number;

      if (currentNode === endNode) {
        // We have reached the end node, no need to explore further
        break;
      }

      if (!visited[currentNode]) {
        visited[currentNode] = true;

        const neighbors = this.adjacencyList[currentNode] || [];

        for (const neighbor of neighbors) {
          const totalDistance = distances[currentNode] + 1; // Assuming unit distance for simplicity
          const totalStationChanges = stationChanges[currentNode] + 1;

          if (totalStationChanges < stationChanges[neighbor.toCode]) {
            distances[neighbor.toCode] = totalDistance;
            stationChanges[neighbor.toCode] = totalStationChanges;
            previousNodes[neighbor.toCode] = currentNode;
          }
        }
      }
    }

    // Reconstruct the path
    const path: { node: number, lineType: string, stationName: string }[] = [];
    let currentNode: number | null = endNode;
    while (currentNode !== null) {
      if (this.stations[currentNode] && !this.stations[currentNode].underConstruction) {
        path.unshift({
          node: currentNode,
          lineType: this.getLineType(currentNode) || '',
          stationName: this.stations[currentNode].stationName,
        });
      }
      currentNode = previousNodes[currentNode];
    }

    return {
      distance: distances[endNode],
      path,
      stationChanges: stationChanges[endNode],
    };
  }

  private getLineType(node: number): string | null {
    const links = this.adjacencyList[node];
    return links && links.length > 0 ? links[0].lineType : null;
  }
}