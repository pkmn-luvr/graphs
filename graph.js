/**
 * 
 * GRAPHS
 * 
 * Graphs are data structures that consists of nodes (VERTICES) and edges that connect them
 * 
 * Nodes can represent points, objects, or abstract concepts,
 * linked by edges (or Arc) that represent relationships or pathways between them
 * 
 * Adjacent - Two nodes are “adjacent” if they share an edge
 * 
 * Weight (optional) - Each edge can have a weight which could represent metrics (ex: price, or distance)
 * 
 * 
 *  - UNDIRECTED: Edges are bidirectional, allowing movement between nodes in both directions
 *  - DIRECTED: Edges have a direction, restricting movement to a specified direction between nodes
 * 
 *
 * Trees are directed, acyclic graphs
 * All trees are graphs, but not all graphs are trees
 * Trees have hierarchy, graphs do not
 * 
 * - Trees: Directed, acyclic graphs with a single root node and hierarchical structure
 * - Linked List: A sequential collection where each node directly connects to the next, forming a simple chain
 * - Circular Linked Lists: Linked lists where the last node is connected back to an earlier node, forming a cycle
 * - Forests: Collections of disjoint trees, each a separate component without a central root node across the forest
 * 
 * Linked List - Nodes have 0 or 1 child; acyclic and directed
 * Tree - Nodes have 0+ children; acyclic and directed; only one designated root node
 * Graphs - Nodes have 0+ connections; cyclic or acyclic; directed or undirected; disconnected or connected; optional weights
 * 
 * Circular Linked Lists - Where a linked list can contain a cycle; These do not have tails, as there’s no single end-point
 * A points to B points to C which points to B
 * 
 * Forests - Collections of directed, acyclic graphs but without a single root node; essentially a set of trees 
 * 
 * OPERATIONS:
 * 
 *  - addVertex(vertex): Adds a single vertex to the graph; O(1)
 * 
 *  - addVertices(vertexArray): Adds multiple vertices to the graph from an array of vertices; O(n), n being the numof vertices
 * 
 *  - addEdge(v1, v2): Connects two vertices with an edge; updates both vertices' adjacency lists; O(1)
 * 
 *  - removeEdge(v1, v2): Removes the edge between two vertices; updates both vertices' adjacency lists; O(1)
 * 
 *  - removeVertex(vertex): Removes a vertex and all edges connected to it;  complexity of removeVertex depends 
 *    on the degree of the vertex because all edges connected must also be removed
 *    O(deg(v)) where deg(v) is degree of the vertex
 * 
 *  - depthFirstSearch(start): Performs a depth-first traversal from a starting vertex, returning an array of values;
 *    O(V + E) where V is the num of vertices and E is the num of edges
 * 
 *  - breadthFirstSearch(start): Performs a breadth-first traversal from a starting vertex, returning an array of values
 *    O(V + E) where V is the num of vertices and E is the num of edges
 * 
 */


class Node {
  constructor(value, adjacent = new Set()) {
    this.value = value;
    this.adjacent = adjacent;
  }
}

class Graph {
  constructor() {
    this.nodes = new Set();
  }

  // this function accepts a Node instance and adds it to the nodes property on the graph
  addVertex(vertex) {
    this.nodes.add(vertex);
  }

  // this function accepts an array of Node instances and adds them to the nodes property on the graph
  addVertices(vertexArray) {
    for (const vertex of vertexArray) {
      this.nodes.add(vertex);
    }
  }

  // this function accepts two vertices and updates their adjacent values to include the other vertex
  addEdge(v1, v2) {
    if (!this.nodes.has(v1) || !this.nodes.has(v2)) {
      return;
    }
    v1.adjacent.add(v2);
    v2.adjacent.add(v1);
  }

  // this function accepts two vertices and updates their adjacent values to remove the other vertex
  removeEdge(v1, v2) {
    if (!this.nodes.has(v1) || !this.nodes.has(v2)) {
      return;
    }
    v1.adjacent.delete(v2);
    v2.adjacent.delete(v1);
  }

  // this function accepts a vertex and removes it from the nodes property, it also updates any adjacency lists that include that vertex
  removeVertex(vertex) {
    if (!this.nodes.has(vertex)) return;
    for (let adjacentVertex of vertex.adjacent) {
      this.removeEdge(vertex, adjacentVertex);
    }
    this.nodes.delete(vertex);
  }

  // this function returns an array of Node values using DFS
  depthFirstSearch(start) {
    const visited = new Set();
    const result = [];

    const dfs = (vertex) => {
      if (!vertex) return;
      visited.add(vertex);
      result.push(vertex.value);
      vertex.adjacent.forEach(neighbor => {
        if (!visited.has(neighbor)) {
          dfs(neighbor);
        }
      });
    };

    dfs(start);
    return result;
  }

  // this function returns an array of Node values using BFS
  breadthFirstSearch(start) {
    const queue = [start];
    const result = [];
    const visited = new Set();
    visited.add(start);

    while (queue.length) {
      const vertex = queue.shift();
      result.push(vertex.value);
      vertex.adjacent.forEach(neighbor => {
        if (!visited.has(neighbor)) {
          visited.add(neighbor);
          queue.push(neighbor);
        }
      });
    }

    return result;
  }
}

module.exports = {Graph, Node}