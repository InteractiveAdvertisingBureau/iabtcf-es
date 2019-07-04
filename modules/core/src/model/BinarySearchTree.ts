type TreeNodeOrNull = TreeNode | null;
interface TreeNode {
  value: number;
  right: TreeNodeOrNull;
  left: TreeNodeOrNull;
}
export class BinarySearchTree {

  private root: TreeNode;

  public insert(value: number): void {

    // create new node object
    const node: TreeNode = {
      value: value,
      left: null,
      right: null,
    };

    // used as a pointer to the node we need
    let current;

    // Special case, no items in the tree yet: ie. we're root
    if (this.root === null) {

      this.root = node;

    } else {

      current = this.root;

      // infinite loop, figure out where to put it
      while (true) {

        // if the value is less than current value; go left
        if (value < current.value) {

          // if it's empty, we can insert
          if (current.left === null) {

            // insert on the left
            current.left = node;

            // our work is done here
            break;

            // if there's something there already, we'll reset the
            // pointer and wait for the next loop to do something
            // aka keep traversing

          } else {

            current = current.left;

          }

          // if the value is greater than our current value; go right

        } else if (value > current.value) {

          // if the right slot is open, we can insert there
          if (current.right === null) {

            current.right = node;
            break;

            // otherwise, we need to keep looping

          } else {

            current = current.right;

          }

          // They're equal meaning it's the same value, (no duplicates allowed in a BST)
          // We'll just ignore it and be done

        } else {

          break;

        }

      }

    }

  }
  public delete(value: number): void {

    // first flag for finding
    let found = false;

    // we start at the root, so the parent is null
    let parent: TreeNodeOrNull = null;

    // start at the root
    let current: TreeNodeOrNull = this.root;

    // Make sure there's a node to search
    while (!found && current) {

      // if the value is less than the current node's; go left
      if (value < current.value) {

        // set our parent to the current value
        parent = current;

        // set our current to the left value
        current = current.left;

        // if the value is greater than the current node's; go right

      } else if (value > current.value) {

        // set our parent to the current value
        parent = current;

        // set current to the right value
        current = current.right;

        // if it's equal, then we've found it

      } else {

        // when found is set to true, we'll break
        found = true;

        // if not a parent then this is the root node
        if (parent === null) {

          // delete root node!  ahhhhh!!
        } else {

          if (parent.right && parent.right.value === value) {

            parent.right = (current.left !== null) ? current.left : current.right;

          } else if (parent.left && parent.left.value === value) {

            parent.left = (current.right !== null) ? current.right : current.left;

          }

        }

      }

    }

  }

}
