/** TreeNode: node for a general tree. */

class TreeNode {
  constructor(val, children = []) {
    this.val = val;
    this.children = children;
  }
}

class Tree {
  constructor(root = null) {
    this.root = root;
  }

  /** sumValues(): add up all of the values in the tree. */

  sumValues() {
    let queue = this.root ? [this.root] : [], total = 0;
    while(queue.length) {
      let curr = queue.shift();
      total += curr.val;
      for(let child of curr.children)
        queue.push(child);
    }
    return total;
  }

  /** countEvens(): count all of the nodes in the tree with even values. */

  countEvens() {
    let queue = this.root ? [this.root] : [], total = 0;
    while(queue.length) {
      let curr = queue.shift();
      total += curr.val % 2 ? 0 : 1;
      for(let child of curr.children)
        queue.push(child);
    }
    return total;
  }

  /** numGreater(lowerBound): return a count of the number of nodes
   * whose value is greater than lowerBound. */

  numGreater(lowerBound) {
    let queue = this.root ? [this.root] : [], total = 0;
    while(queue.length) {
      let curr = queue.shift();
      total += curr.val > lowerBound ? 1 : 0;
      for(let child of curr.children)
        queue.push(child);
    }
    return total;
  }
}

module.exports = { Tree, TreeNode };
