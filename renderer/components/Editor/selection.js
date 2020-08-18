
class SelectionUtils {
    getCaretSelection (targetNode) {
        const selection = document.getSelection()

        if (this.rangeCount) {
            const selectRange = selection.getRangeAt(0)
            const currentBlockInput = targetNode

            selectRange.deleteContents()

            if (currentBlockInput) {
                const range = selectRange.cloneRange()

                range.selectNodeContents(currentBlockInput)
                range.setStart(selectRange.endContainer, selectRange.endOffset)

                return range.extractContents()
            }
        }

        return null
    }

    get rect() {
        let sel = document.getSelection()
        let range;

        let rect = {
            x: 0,
            y: 0,
            width: 0,
            height: 0,
        };

        if (!window.getSelection) {
            _.log('Method window.getSelection is not supported', 'warn');
            return rect;
        }

        sel = window.getSelection();

        if (sel.rangeCount === null || isNaN(sel.rangeCount)) {
            _.log('Method SelectionUtils.rangeCount is not supported', 'warn');
            return rect;
        }

        if (sel.rangeCount === 0) {
            return rect;
        }

        range = sel.getRangeAt(0).cloneRange();

        if (range.getBoundingClientRect) {
            rect = range.getBoundingClientRect();
        }
        // Fall back to inserting a temporary element
        if (rect.x === 0 && rect.y === 0) {
            const span = document.createElement('span');

            if (span.getBoundingClientRect) {
                // Ensure span has dimensions and position by
                // adding a zero-width space character
                span.appendChild(document.createTextNode('\u200b'));
                range.insertNode(span);
                rect = span.getBoundingClientRect();

                const spanParent = span.parentNode;

                spanParent.removeChild(span);

                // Glue any broken text nodes back together
                spanParent.normalize();
            }
        }

        return rect;
    }  

    findParentTag(tagName, className, searchDepth = 10) {
        const selection = window.getSelection();
        let parentTag = null;
    
        /**
         * If selection is missing or no anchorNode or focusNode were found then return null
         */
        if (!selection || !selection.anchorNode || !selection.focusNode) {
          return null;
        }
    
        /**
         * Define Nodes for start and end of selection
         */
        const boundNodes = [
          /** the Node in which the selection begins */
          selection.anchorNode,
          /** the Node in which the selection ends */
          selection.focusNode,
        ];
    
        /**
         * For each selection parent Nodes we try to find target tag [with target class name]
         * It would be saved in parentTag variable
         */
        boundNodes.forEach((parent) => {
          /** Reset tags limit */
          let searchDepthIterable = searchDepth;
    
          while (searchDepthIterable > 0 && parent.parentNode) {
            /**
             * Check tag's name
             */
            if (parent.tagName === tagName) {
              /**
               * Save the result
               */
              parentTag = parent;
    
              /**
               * Optional additional check for class-name mismatching
               */
              if (className && parent.classList && !parent.classList.contains(className)) {
                parentTag = null;
              }
    
              /**
               * If we have found required tag with class then go out from the cycle
               */
              if (parentTag) {
                break;
              }
            }
    
            /**
             * Target tag was not found. Go up to the parent and check it
             */
            parent = parent.parentNode;
            searchDepthIterable--;
          }
        });
    
        /**
         * Return found tag or null
         */
        return parentTag;
      }

    collapseToEnd() {
        const sel = window.getSelection();
        const range = document.createRange();
    
        range.selectNodeContents(sel.focusNode);
        range.collapse(false);
        sel.removeAllRanges();
        sel.addRange(range);
    }
    

    expandToTag(element) {
        const selection = window.getSelection();
    
        selection.removeAllRanges();
        const range = document.createRange();
    
        range.selectNodeContents(element);
        selection.addRange(range);
    }
    
    /* 
    
        _getCaretSelection (event) {
      const selection = document.getSelection()

      if (selection.rangeCount){
        const selectRange = selection.getRangeAt(0)
        const currentBlockInput = event.target

        selectRange.deleteContents()

        if ( currentBlockInput ) {
          const range = selectRange.cloneRange()

          range.selectNodeContents(currentBlockInput)
          range.setStart(selectRange.endContainer, selectRange.endOffset)

          return range.extractContents()
        }
      }

      return null
    }*/
}

export default SelectionUtils