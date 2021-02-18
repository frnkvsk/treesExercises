/** BinaryTreeNode: node for a general tree. */

class BinaryTreeNode {
  constructor(val, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

class BinaryTree {
  constructor(root = null) {
    this.root = root;
  }

  /** minDepth(): return the minimum depth of the tree -- that is,
   * the length of the shortest path from the root to a leaf. */

  minDepth() {
    let res = Infinity;
    const findMin = (node, level=1) => {
      if(node && node.left) {
        findMin(node.left, level +1);
      } else {
        res = Math.min(res, level);
      }
      if(node && node.right) {
        findMin(node.right, level +1);
      } else {
        res = Math.min(res, level);
      }
    }
    findMin(this.root);
    return this.root ? res : 0;
  }

  /** maxDepth(): return the maximum depth of the tree -- that is,
   * the length of the longest path from the root to a leaf. */

  maxDepth() {
    let res = 0;
    const findMax = (node, level=0) => {
      if(node && node.left) {
        findMax(node.left, level +1);
      } else if(node) {
        res = Math.max(res, 1 + level);
      }
      if(node && node.right) {
        findMax(node.right, level +1);
      } else if(node) {
        res = Math.max(res, 1 + level);
      }
    }
    findMax(this.root);
    return res;
  }

  /** maxSum(): return the maximum sum you can obtain by traveling along a path in the tree.
   * The path doesn't need to start at the root, but you can't visit a node more than once. */

  maxSum() {
    let res = 0;
    const findMax = (node) => {
      if(!node) return 0;
      const leftSum = findMax(node.left);
      const rightSum = findMax(node.right);
      res = Math.max(res, node.val + leftSum + rightSum);
      return Math.max(0, leftSum + node.val, rightSum + node.val);
    }
    findMax(this.root);
    return res;
  }

  /** nextLarger(lowerBound): return the smallest value in the tree
   * which is larger than lowerBound. Return null if no such value exists. */

  nextLarger(lowerBound) {
    const findNextLarger = (node, curr=Infinity) => {
      if(!node) return 0;
      const leftVal = findNextLarger(node.left, curr);
      const rightVal = findNextLarger(node.right, curr);
      curr = node.val > lowerBound ? Math.min(curr, node.val) : curr;
      curr = leftVal > lowerBound ? Math.min(curr, leftVal) : curr;
      curr = rightVal > lowerBound ? Math.min(curr, rightVal) : curr;
      return curr
    }
    const res = findNextLarger(this.root);
    return res && res < Infinity ? res : null;
  }

  /** Further study!
   * areCousins(node1, node2): determine whether two nodes are cousins
   * (i.e. are at the same level but have different parents. ) */

  areCousins(node1, node2) {
    let obj = {};
    const findAreCousins = (node, level=0, parent=null) => {
      if(!node) return true;
      if(node.val === node1.val) obj['node1'] = [level, parent];
      if(node.val === node2.val) obj['node2'] = [level, parent];
      if(obj['node1'] && obj['node2']) return obj['node1'][0] === obj['node2'][0] && obj['node1'][1] !== obj['node2'][1];
      return findAreCousins(node.left, level+1, node.val) && findAreCousins(node.right, level+1, node.val);
    }
    return findAreCousins(this.root);
  }

  /** Further study!
   * serialize(tree): serialize the BinaryTree object tree into a string. */

  
  static serialize() {
    let queue = [];
    const preOrderTraversal = (node) => {
      queue.push(node ? node.val : node);
      if(node) preOrderTraversal(node.left);
      if(node) preOrderTraversal(node.right);
    }
    preOrderTraversal(arguments[0].root);
    return queue.join();
  }

  /** Further study!
   * deserialize(stringTree): deserialize stringTree into a BinaryTree object. */

  static deserialize() {
    const queue = arguments[0].split(',').map(e => e ? +e : null);
    const root = new BinaryTreeNode(queue.shift());
    let curr = root
    const preOrderTraversal = (node) => {
      if(node && queue.length) {
        let val = queue.shift();
        if(val) {
          node.left = new BinaryTreeNode(val);
          preOrderTraversal(node.left);
        }
        val = queue.shift();
        if(val) {
          node.right = new BinaryTreeNode(val);
          preOrderTraversal(node.right);
        }        
      }
    }
    preOrderTraversal(curr);
    return new BinaryTree(root);
  }

  /** Further study!
   * lowestCommonAncestor(node1, node2): find the lowest common ancestor
   * of two nodes in a binary tree. */

  lowestCommonAncestor(node1, node2) {
    const depth = [];
    const nodes = [];
    const last = {};
    const eulerianPath = (node, level=0) => {
      if(node) {
        depth.push(level);
        nodes.push(node)
        last[node.val] = nodes.length-1;
        if(node.left) {
          eulerianPath(node.left, level+1);
          depth.push(level);
          nodes.push(node);
          last[node.val] = nodes.length-1;
        }
        if(node.right) {
          eulerianPath(node.right, level+1);
          depth.push(level);
          nodes.push(node);
          last[node.val] = nodes.length-1;
        }        
      }
    }

    eulerianPath(this.root);

    let index1 = last[node1.val],
      index2 = last[node2.val],
      lca;

    if(index1 < index2) {
      let min = Infinity, minIndex = -1;
      for(;index1 <= index2; index1++) {
        min = Math.min(min, depth[index1])
        minIndex = min !== depth[index1] ? minIndex : index1;
      }
      lca = nodes[minIndex];
    } else {
      let min = Infinity, minIndex = -1;
      for(;index2 <= index1; index2++) {
        min = Math.min(min, depth[index2])
        minIndex = min !== depth[index2] ? minIndex : index2;
      }
      lca = nodes[minIndex];
    }
    
    return lca;
  }
}

module.exports = { BinaryTree, BinaryTreeNode };
