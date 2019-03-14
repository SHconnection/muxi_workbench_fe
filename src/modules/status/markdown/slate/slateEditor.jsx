import React, { Component } from "react";
import Plain from "slate-plain-serializer";
import PropTypes from "prop-types";
import ReactSVG from "react-svg";
import { Editor } from "muxi-slate-react";
// import { Value } from "slate";
import { isKeyHotkey } from "is-hotkey";
import Html from "slate-html-serializer";
import { Button, Toolbar } from "../menu";
import Italic from "../../../../assets/svg/MenuIcon/italic.svg";
import Bold from "../../../../assets/svg/MenuIcon/bold.svg";
import Underline from "../../../../assets/svg/MenuIcon/underline.svg";
import Code from "../../../../assets/svg/MenuIcon/code.svg";
import Quote from "../../../../assets/svg/MenuIcon/quote.svg";
import Ulist from "../../../../assets/svg/MenuIcon/ulist.svg";
import Orderlist from "../../../../assets/svg/MenuIcon/orderlist.svg";

const DEFAULT_NODE = "paragraph";

// 快捷键
const isBoldHotkey = isKeyHotkey("mod+b");
const isItalicHotkey = isKeyHotkey("mod+i");
const isUnderlinedHotkey = isKeyHotkey("mod+u");
const isCodeHotkey = isKeyHotkey("mod+`");

const BLOCK_TAGS = {
  blockquote: "block-quote",
  p: "paragraph",
  pre: "code",
  ol: "numbered-list",
  ul: "bulleted-list",
  li: "list-item",
  h1: "heading-one",
  h2: "heading-two",
  h3: "heading-three",
  h4: "heading-four",
  h5: "heading-five",
  h6: "heading-six",
  hr: "hr"
};

// Add a dictionary of mark tags.
const MARK_TAGS = {
  em: "italic",
  strong: "bold",
  u: "underline",
  code: "code"
};

const rules = [
  {
    deserialize(el, next) {
      const type = BLOCK_TAGS[el.tagName.toLowerCase()];
      if (type) {
        return {
          object: "block",
          type,
          data: {
            className: el.getAttribute("class")
          },
          nodes: next(el.childNodes)
        };
      }
    },
    serialize(obj, children) {
      if (obj.object === "block") {
        switch (obj.type) {
          case "code":
            return (
              <pre>
                <code>{children}</code>
              </pre>
            );
          case "paragraph":
            return <p className={obj.data.get("className")}>{children}</p>;
          case "block-quote":
            return <blockquote>{children}</blockquote>;
          case "list-item":
            return <li>{children}</li>;
          case "numbered-list":
            return <ol>{children}</ol>;
          case "bulleted-list":
            return <ul>{children}</ul>;
          case "heading-one":
            return <h1>{children}</h1>;
          case "heading-two":
            return <h2>{children}</h2>;
          case "heading-three":
            return <h3>{children}</h3>;
          case "heading-four":
            return <h4>{children}</h4>;
          case "heading-five":
            return <h5>{children}</h5>;
          case "heading-six":
            return <h6>{children}</h6>;
          case "hr":
            return <hr />;
          default:
            break;
        }
      }
    }
  },
  // Add a new rule that handles marks...
  {
    deserialize(el, next) {
      const type = MARK_TAGS[el.tagName.toLowerCase()];
      if (type) {
        return {
          object: "mark",
          type,
          nodes: next(el.childNodes)
        };
      }
    },
    serialize(obj, children) {
      if (obj.object === "mark") {
        switch (obj.type) {
          case "bold":
            return <strong>{children}</strong>;
          case "italic":
            return <em>{children}</em>;
          case "underline":
            return <u>{children}</u>;
          case "code":
            return <code>{children}</code>;
          default:
            return null;
        }
      }
    }
  }
];

// Create a new serializer instance with our `rules` from above.
const html = new Html({ rules });

// Define our app...
class SlateEditor extends Component {
  // Set the initial value when the app is first constructed.
  path = window.location.href.split("/");

  initialValue =
    this.path.pop() === "edit" || this.path.pop() === "newDoc"
      ? "<p></p>"
      : localStorage.getItem("content");

  state = {
    value: html.deserialize(this.initialValue)
  };

  componentWillReceiveProps(nextProps) {
    const { readOnly, inner, content } = nextProps;
    // console.log(content);
    if (readOnly && !inner) {
      this.setState({
        value: html.deserialize(content)
      });
    }
  }

  getType = chars => {
    switch (chars) {
      case "*":
      case "-":
      case "+":
        return "list-item";
      case ">":
        return "block-quote";
      case "#":
        return "heading-one";
      case "##":
        return "heading-two";
      case "###":
        return "heading-three";
      case "####":
        return "heading-four";
      case "#####":
        return "heading-five";
      case "######":
        return "heading-six";
      case "---":
        return "hr";
      default:
        return null;
    }
  };

  onSpace = (event, editor, next) => {
    const { value } = editor;
    const { selection } = value;
    if (selection.isExpanded) return next();

    const { startBlock } = value;
    const { start } = selection;
    const chars = startBlock.text.slice(0, start.offset).replace(/\s*/g, "");
    const type = this.getType(chars);
    if (!type) return next();
    if (type === "list-item" && startBlock.type === "list-item") return next();
    event.preventDefault();

    editor.setBlocks(type);

    if (type === "list-item") {
      editor.wrapBlock("bulleted-list");
    }

    editor.moveFocusToStartOfNode(startBlock).delete();
  };

  onBackspace = (event, editor, next) => {
    const { value } = editor;
    const { selection } = value;
    if (selection.isExpanded) return next();
    if (selection.start.offset !== 0) return next();

    const { startBlock } = value;
    if (startBlock.type === "paragraph") return next();

    event.preventDefault();
    editor.setBlocks("paragraph");

    if (startBlock.type === "list-item") {
      editor.unwrapBlock("bulleted-list");
      editor.unwrapBlock("numbered-list");
    }
  };

  onEnter = (event, editor, next) => {
    const { value } = editor;
    const { selection } = value;
    const { start, end, isExpanded } = selection;
    if (isExpanded) return next();

    const { startBlock } = value;
    if (start.offset === 0 && startBlock.text.length === 0)
      return this.onBackspace(event, editor, next);
    if (end.offset !== startBlock.text.length) return next();

    if (
      startBlock.type !== "heading-one" &&
      startBlock.type !== "heading-two" &&
      startBlock.type !== "heading-three" &&
      startBlock.type !== "heading-four" &&
      startBlock.type !== "heading-five" &&
      startBlock.type !== "heading-six"
      // && startBlock.type != 'block-quote'
    ) {
      return next();
    }

    event.preventDefault();
    editor.splitBlock().setBlocks("paragraph");
  };

  // On change, update the app's React state with the new editor value.
  onChange = ({ value }) => {
    // const content = JSON.stringify(this.state.value.toJSON())
    const {
      value: { document: stateDocument }
    } = this.state;
    if (value.document !== stateDocument) {
      const string = html.serialize(value);
      localStorage.setItem("content", string);
    }
    this.setState({ value });
  };

  onKeyDown = (event, editor, next) => {
    // console.log(event.key);
    switch (event.key) {
      case " ":
        return this.onSpace(event, editor, next);
      case "Backspace":
        return this.onBackspace(event, editor, next);
      case "Enter":
        return this.onEnter(event, editor, next);
      default:
        // return next();
        break;
    }

    let mark;

    if (isBoldHotkey(event)) {
      mark = "bold";
    } else if (isItalicHotkey(event)) {
      mark = "italic";
    } else if (isUnderlinedHotkey(event)) {
      mark = "underline";
    } else if (isCodeHotkey(event)) {
      mark = "code";
    } else {
      return next();
    }

    event.preventDefault();
    editor.toggleMark(mark);
  };

  hasMark = type => {
    const { value } = this.state;
    return value.activeMarks.some(mark => mark.type === type);
  };

  hasBlock = type => {
    const { value } = this.state;
    return value.blocks.some(node => node.type === type);
  };

  onClickMark = (event, type) => {
    event.preventDefault();
    this.editor.toggleMark(type);
  };

  onClickBlock = (event, type) => {
    event.preventDefault();

    const { editor } = this;
    const { value } = editor;
    const { document } = value;

    // Handle everything but list buttons.
    if (type !== "bulleted-list" && type !== "numbered-list") {
      const isActive = this.hasBlock(type);
      const isList = this.hasBlock("list-item");

      if (isList) {
        editor
          .setBlocks(isActive ? DEFAULT_NODE : type)
          .unwrapBlock("bulleted-list")
          .unwrapBlock("numbered-list");
      } else {
        editor.setBlocks(isActive ? DEFAULT_NODE : type);
      }
    } else {
      // Handle the extra wrapping required for list buttons.
      const isList = this.hasBlock("list-item");
      const isType = value.blocks.some(
        block =>
          !!document.getClosest(block.key, parent => parent.type === type)
      );

      if (isList && isType) {
        editor
          .setBlocks(DEFAULT_NODE)
          .unwrapBlock("bulleted-list")
          .unwrapBlock("numbered-list");
      } else if (isList) {
        editor
          .unwrapBlock(
            type === "bulleted-list" ? "numbered-list" : "bulleted-list"
          )
          .wrapBlock(type);
      } else {
        editor.setBlocks("list-item").wrapBlock(type);
      }
    }
  };

  renderNode = (props, editor, next) => {
    const { attributes, children, node } = props;

    switch (node.type) {
      case "block-quote":
        return <blockquote {...attributes}>{children}</blockquote>;
      case "bulleted-list":
        return <ul {...attributes}>{children}</ul>;
      case "list-item":
        return <li {...attributes}>{children}</li>;
      case "numbered-list":
        return <ol {...attributes}>{children}</ol>;
      case "heading-one":
        return <h1 {...attributes}>{children}</h1>;
      case "heading-two":
        return <h2 {...attributes}>{children}</h2>;
      case "heading-three":
        return <h3 {...attributes}>{children}</h3>;
      case "heading-four":
        return <h4 {...attributes}>{children}</h4>;
      case "heading-five":
        return <h5 {...attributes}>{children}</h5>;
      case "heading-six":
        return <h6 {...attributes}>{children}</h6>;
      case "hr":
        return (
          <span {...attributes}>
            <hr />
            {children}
          </span>
        );
      default:
        return next();
    }
  };

  renderMark = (props, editor, next) => {
    const { children, mark, attributes } = props;

    switch (mark.type) {
      case "bold":
        return <strong {...attributes}>{children}</strong>;
      case "code":
        return <code {...attributes}>{children}</code>;
      case "italic":
        return <em {...attributes}>{children}</em>;
      case "underline":
        return <u {...attributes}>{children}</u>;
      default:
        return next();
    }
  };

  renderMarkButton = (type, icon) => {
    const isActive = this.hasMark(type);

    return (
      <Button
        title={type}
        active={isActive}
        onMouseDown={event => this.onClickMark(event, type)}
      >
        <ReactSVG className="menu-icon" path={icon} />
      </Button>
    );
  };

  renderBlockButton = (type, icon) => {
    let isActive = this.hasBlock(type);

    if (["numbered-list", "bulleted-list"].includes(type)) {
      const {
        value: { document, blocks }
      } = this.state;

      if (blocks.size > 0) {
        const parent = document.getParent(blocks.first().key);
        isActive = this.hasBlock("list-item") && parent && parent.type === type;
      }
    }

    return (
      <Button
        active={isActive}
        onMouseDown={event => this.onClickBlock(event, type)}
      >
        <ReactSVG className="menu-icon" path={icon} />
      </Button>
    );
  };

  ref = editor => {
    this.editor = editor;
  };

  // Render the editor.
  render() {
    const { readOnly, inner, content } = this.props;
    const { value } = this.state;
    let style;

    if (readOnly) {
      style = {};
    } else {
      style = {
        width: "880px",
        minHeight: "650px"
      };
    }

    const textareaStyle = {
      width: "100%",
      height: "130px",
      background: "#fff",
      border: "none",
      padding: "0"
    };

    return (
      <div>
        {!readOnly && (
          <Toolbar>
            {this.renderMarkButton("bold", Bold)}
            {this.renderMarkButton("italic", Italic)}
            {this.renderMarkButton("underline", Underline)}
            {this.renderMarkButton("code", Code)}
            {/* {this.renderBlockButton('heading-one', 'looks_one')}
            {this.renderBlockButton('heading-two', 'looks_two')} */}
            {this.renderBlockButton("block-quote", Quote)}
            {this.renderBlockButton("numbered-list", Orderlist)}
            {this.renderBlockButton("bulleted-list", Ulist)}
          </Toolbar>
        )}
        {inner ? (
          <textarea
            disabled
            style={textareaStyle}
            defaultValue={Plain.serialize(html.deserialize(content))}
          />
        ) : (
          <Editor
            className="slateEditor"
            readOnly={readOnly}
            value={value}
            onChange={this.onChange}
            onKeyDown={this.onKeyDown}
            renderNode={this.renderNode}
            renderMark={this.renderMark}
            style={style}
            ref={this.ref}
          />
        )}
      </div>
    );
  }
}

SlateEditor.propTypes = {
  readOnly: PropTypes.bool,
  inner: PropTypes.bool,
  content: PropTypes.string
};

SlateEditor.defaultProps = {
  readOnly: false,
  inner: false,
  content: ""
};

export default SlateEditor;
