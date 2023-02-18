import {Cloneable} from '../Cloneable.js';

interface TreeNode {
  value: number;
  right: TreeNode | null;
  left: TreeNode | null;
}

type TreeNodeMaybe = TreeNode | null;

export class BinarySearchTree extends Cloneable<BinarySearchTree> {

  private root: TreeNodeMaybe = null;

  public getRoot(): TreeNodeMaybe {

    return this.root;

  }

  public isEmpty(): boolean {

    // if root is undefined or null then by definition this is empty
    return !(this.root);

  }

  public add(value: number): void {

    // create new node object
    const node: TreeNode = {
      value: value,
      left: null,
      right: null,
    };

    let current;

    // first item?
    if (this.isEmpty()) {

      this.root = node;

    } else {

      // start at the root
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

          } else {

            /**
             * if there's something there already, we'll reset the pointer and
             * wait for the next loop to do something ie. keep traversing
             */
            current = current.left;

          }

        } else if (value > current.value) {

          // if the value is greater than our current value; go right
          if (current.right === null) {

            // there's nothing to the right, so put it here
            current.right = node;
            break;

          } else {

            /**
             * if there's something there already, we'll reset the pointer and
             * wait for the next loop to do something ie. keep traversing
             */

            current = current.right;

          }

        } else {

          /**
           * If it's neither greater than the right or less than the right then
           * it is equal to the current nodes value.  In that case we won't do
           * anything with it because we will only insert unique values.
           */

          break;

        }

      }

    }

  }

  /**
   * performs Morris in-order traversal
   * @return {number[]} sorted array
   */
  public get(): number[] {

    const retr: number[] = [];
    let current: TreeNodeMaybe = this.root;

    while (current) {

      if (!current.left) {

        retr.push(current.value); // if there is no left child, visit current node
        current = current.right; // then we go the right branch

      } else {

        // find the right most leaf of root.left node.
        let pre: TreeNodeMaybe = current.left;

        // when pre.right == null, it means we go to the right most leaf
        // when pre.right == current, it means the right most leaf has been visited in the last round
        while (pre.right && pre.right != current) {

          pre = pre.right;

        }

        // this means the pre.right has been set, it's time to go to current node
        if (pre.right == current) {

          pre.right = null;

          // means the current node is pointed by left right most child
          // the left branch has been visited, it's time to push the current node
          retr.push(current.value);
          current = current.right;

        } else {

          // the fist time to visit the pre node, make its right child point to current node
          pre.right = current;
          current = current.left;

        }

      }

    }

    return retr;

  }

  public contains(value: number): boolean {

    let retr = false;
    let current: TreeNodeMaybe = this.root;

    while (current) {

      if (current.value === value) {

        retr = true;
        break;

      } else if (value > current.value) {

        current = current.right;

      } else if (value < current.value) {

        current = current.left;

      }

    }

    return retr;

  }

  public min(current: TreeNodeMaybe = this.root): number {

    let retr;

    while (current) {

      if (current.left) {

        current =current.left;

      } else {

        retr = current.value;
        current = null;

      }

    }

    return retr;

  }

  public max(current: TreeNodeMaybe = this.root): number {

    let retr;

    while (current) {

      if (current.right) {

        current =current.right;

      } else {

        retr = current.value;
        current = null;

      }

    }

    return retr;

  }

  public remove(value: number, current: TreeNodeMaybe = this.root ): void {

    // we start at the root, so the parent is null
    let parent: TreeNodeMaybe = null;
    let parentSide = 'left';

    while (current) {

      if (value < current.value) {

        // set our parent to the current value
        parent = current;

        // value is less than current value, so go left
        current = current.left;
        parentSide = 'left';

      } else if (value > current.value) {

        // set our parent to the current value
        parent = current;

        // value is greater than current value, so go right
        current = current.right;
        parentSide = 'right';

      } else {

        /**
           * if it's neither greater than or less than, then it's equal so BINGO!
           * we've found it
           *
           * If we have children, we've got to figure out what to do with
           * them once we are no longer around...  Woah, code is like real
           * life...
           *
           * There are three cases we care about when it comes to this removal
           * process:
           *
           * 1. No children -- If not children we just delete an do nothing
           * else, no harm no foul.
           *
           * 2. One child -- Just link the parent's link to current to the
           * child.
           *
           * 3. Two children --  Find the minimum value from the right subtree
           * replace us with the minimum value and of course remove that
           * minimum value from the right stubtree
           */

        if (!current.left && !current.right) {

          // case 1 there are no children easy peasy lemon squeezy
          if (parent) {

            parent[parentSide] = null;

          } else {

            this.root = null;

          }

        } else if (!current.left) {

          // no left side only right, so link right
          if (parent) {

            parent[parentSide] = current.right;

          } else {

            this.root = current.right;

          }

        } else if (!current.right) {

          // no right side only left, so link left
          if (parent) {

            parent[parentSide] = current.left;

          } else {

            this.root = current.left;

          }

        } else {

          /**
           * case 3 just like real life, if you delete a parent the more kids
           * that parent has the more complicated things get... in this case we
           * have two children.  We're gonna have to figure out who goes where.
           */

          const minVal = this.min(current.right);

          // little bit of recursion...
          this.remove(minVal, current.right);
          current.value = minVal;

        }

        current = null;

      }

    }

  }

  /**
   * Build Binary Search Tree from the ordered number array
   * @param {number[]} values number array in ascending order
   * @return {BinarySearchTree} Binary Search Tree
   */
  static build(values?: number[]): BinarySearchTree | null {

    if (!values || values.length === 0) {

      return null;

    } else if (values.length === 1) {

      const tree = new BinarySearchTree();

      tree.add(values[0]);

      return tree;

    } else {

      const rootIndex = values.length >> 1;

      const tree = new BinarySearchTree();

      tree.add(values[rootIndex]);

      const root = tree.getRoot();

      if (root) {

        if (rootIndex + 1 < values.length) {

          const rightTree = BinarySearchTree.build(values.slice(rootIndex + 1));

          root.right = rightTree ? rightTree.getRoot() : null;

        }

        if (rootIndex - 1 > 0 ) {

          const leftTree = BinarySearchTree.build(values.slice(0, rootIndex - 1));

          root.left = leftTree ? leftTree.getRoot(): null;

        }

      }

      return tree;

    }

  }

}
