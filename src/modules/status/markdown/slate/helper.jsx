import React from "react";
import { Block } from "slate";

/* eslint-disable */
export const schema = {
  document: {
    last: { type: "paragraph" },
    normalize: (editor, { code, node, child }) => {
      switch (code) {
        case "last_child_type_invalid": {
          const paragraph = Block.create("paragraph");
          return editor.insertNodeByKey(node.key, node.nodes.size, paragraph);
        }
      }
    }
  },
  blocks: {
    image: {
      isVoid: true
    }
  }
};
/* eslint-enable */

/**
 * A change helper to standardize wrapping links.
 *
 * @param {Editor} editor
 * @param {String} href
 */

export function wrapLink(editor, href) {
  editor.wrapInline({
    type: "link",
    data: { href }
  });

  editor.moveToEnd();
}

/**
 * A change helper to standardize unwrapping links.
 *
 * @param {Editor} editor
 */

export function unwrapLink(editor) {
  editor.unwrapInline("link");
}

/**
 * A styled image block component.
 *
 * @type {Component}
 */
export const Image = props => {
  const { selected, src } = props;
  return (
    <p style={{ textAlign: "center" }}>
      <img
        {...props}
        src={src}
        alt="img"
        style={{
          maxWidth: "100%",
          maxHeight: "20em",
          boxShadow: `${selected ? "0 0 0 2px rgb(29, 76, 181)" : "none"}`
        }}
      />
    </p>
  );
};

/**
 * A change function to standardize inserting images.
 *
 * @param {Editor} editor
 * @param {String} src
 * @param {Range} target
 */

export function insertImage(editor, src, target) {
  if (target) {
    editor.select(target);
  }

  editor.insertBlock({
    type: "image",
    data: { src }
  });
}
