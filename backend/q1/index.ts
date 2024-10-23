type TreeNode = {
  val: number,
  left: TreeNode | null,
  right: TreeNode | null
};

function treeNode(val: number = 0, left: TreeNode | null = null, right: TreeNode | null = null)
{
  return {
    val,
    left,
    right
  };
}

// constraint: do not use dfs.
function invertTree(root: TreeNode | null): TreeNode | null {
  if (root === null) return null;

  const queue: TreeNode[] = [];
  queue.push(root);

  while (queue.length > 0)
  {
    const curNode = queue.shift() as TreeNode;
    const left = curNode.left;
    curNode.left = curNode.right;
    curNode.right = left;

    if (curNode.left !== null) queue.push(curNode.left);
    if (curNode.right !== null) queue.push(curNode.right);
  }
  return root;
}
