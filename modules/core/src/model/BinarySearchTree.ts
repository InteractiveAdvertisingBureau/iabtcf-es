type TreeNodeOrNull = TreeNode | null;
interface TreeNode {
  value: number;
  right: TreeNodeOrNull;
  left: TreeNodeOrNull;
}
export class BinarySearchTree {

  private root: TreeNodeOrNull = null;;

  public isEmpty(): boolean {

    // if root is undefined or null thne by definition this is empty
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
    let current: TreeNodeOrNull = this.root;

    while (current) {

      if (!current.left) {

        retr.push(current.value);
        current = current.right;

      } else {

        let subCurrent: TreeNodeOrNull = current.left;

        while (subCurrent.right && subCurrent.right !== current) {

          subCurrent = subCurrent.right;

        }
        if (!subCurrent.right) {

          subCurrent.right = current;
          current = current.left;

        } else {

          subCurrent.right = null;
          retr.push(current.value);
          current = current.right;

        }

      }

    }

    return retr;

  }

  public remove(value: number, current: TreeNodeOrNull = this.root ): void {

    // we start at the root, so the parent is null
    let parent: TreeNode;
    let parentSide: string;

    while (current) {

      // set our parent to the current value
      parent = current;
      parentSide = 'left';

      if (current === this.root) {

        // we have to handle the root more specially

        if (value === current.value) {
          // delete root

        }

      } else if (value < current.value) {

        // value is less than current value, so go left
        current = current.left;


      } else if (value > current.value) {

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

          parent[parentSide] = null;

        } else if (!current.left) {

          // no left side only right, so link right

          parent[parentSide] = current.right;

        } else if (!current.right) {

          // no right side only left, so link left

          parent[parentSide] = current.left;

        } else {

          /**
           * case 3 just like real life, if you delete a parent the more kids
           * that parent has the more complicated things get... in this case we
           * have two children.  We're gonna have to figure out who goes where.
           */
          let subCurrent: TreeNodeOrNull = current.right;
          let subParent = current;
          let min = current.value;

          while (subCurrent) {

            min = subCurrent.value;

            if (subCurrent.left) {

              subParent = subCurrent;
              subCurrent = subCurrent.left;

            } else {

              current.value = min;
              subParent.left = null;
              subCurrent = null;

            }

          }
          current = null;

        }

      }


    }

  }

}
