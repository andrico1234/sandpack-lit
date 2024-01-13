import { css } from "lit";

export const syntaxHighlightingStyles = css`
.sp-syntax-plain {
  color: var(--sp-syntax-plain);
}

.sp-syntax-keyword {
  color: var(--sp-syntax-keyword);
  font-weight: 500;
}

.sp-syntax-static {
  color: var(--sp-syntax-static);
}

.sp-syntax-definition {
  color: var(--sp-syntax-definition);
  font-weight: 500;
}

.sp-syntax-property {
  color: var(--sp-syntax-property);
}

.sp-syntax-attribute {
  color: var(--sp-syntax-attribute);
}

.sp-syntax-string {
  color: var(--sp-syntax-string);
}

.sp-syntax-punctuation {
  color: var(--sp-syntax-punctuation);
}

.sp-syntax-comment {
  color: var(--sp-syntax-comment-color);
  font-style: var(--sp-syntax-comment-fontStyle);
}
`
