import React from "react";

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
  hr: "hr",
  img: "image"
};

const INLINE_TAGS = {
  a: "link"
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
      let type = BLOCK_TAGS[el.tagName.toLowerCase()];
      if (type) {
        return {
          object: "block",
          type,
          data: {
            href: el.getAttribute("href"),
            src: el.getAttribute("src"),
            className: el.getAttribute("class")
          },
          nodes: next(el.childNodes)
        };
      }
      type = INLINE_TAGS[el.tagName.toLowerCase()];
      if (type) {
        return {
          object: "inline",
          type,
          data: {
            href: el.getAttribute("href"),
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
          case "image":
            return (
              <p className="image-container" style={{ textAlign: "center" }}>
                <img alt="img" className="image" src={obj.data.get("src")} />
              </p>
            );
          default:
            break;
        }
      } else if (obj.object === "inline") {
        switch (obj.type) {
          case "link":
            return (
              <a className="link" href={obj.data.get("href")}>
                {children}
              </a>
            );
          default:
            return <span className="span">{children}</span>;
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

export default rules;
