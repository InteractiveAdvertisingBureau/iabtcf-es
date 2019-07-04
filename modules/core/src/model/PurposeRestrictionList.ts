import {LinkNodeOrNo} from './LinkNode';
import {LinkedList} from './LinkedList';
import {PurposeRestriction} from './PurposeRestriction';

export class PurposeRestrictionList extends LinkedList<PurposeRestriction> {

  public remove(value: PurposeRestriction): void {

    // if no head then the loop won't run
    let node: LinkNodeOrNo<PurposeRestriction> = this.head;
    let prev: LinkNodeOrNo<PurposeRestriction>;

    while (node) {

      prev = node;
      if (node.value.isSameAs(value)) {

        // remove it
        prev.next = node.next;
        node = null;

      } else {

        // keep on truckin'
        node = node.next;

      }

    }

  }

}
