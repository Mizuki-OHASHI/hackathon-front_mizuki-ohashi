import { FC } from "react";
import "katex/dist/katex.min.css";
import katex from "katex";

const arr = [
  { re: /^\s*#\s+/, cn: "text-4xl", id: 0 },
  { re: /^\s*##\s+/, cn: "text-3xl", id: 0 },
  { re: /^\s*###\s+/, cn: "text-2xl", id: 0 },
  { re: /^\s*-\s+/, cn: "text-base list-inside", id: 1 },
  { re: /^\s*-{3,}\s*$/, cn: "h-0.5 border-none bg-blue-200", id: 2 },
  { re: /^\s*\$\s+/, cn: "", id: 3 },
];

type Props = {
  lines: string;
};

export const Parser: FC<Props> = (props) => {
  const lineArr = props.lines.replace(/\s*\\\n/, " ").split(/\n/);

  const renderKaTeX = (text: string) => {
    const renderedHTML = katex.renderToString(text, {
      throwOnError: false,
    });
    return <div dangerouslySetInnerHTML={{ __html: renderedHTML }} />;
  };

  const lineParser = (line: string): JSX.Element => {
    for (let i = 0; i < arr.length; i++) {
      if (arr[i].re.test(line)) {
        switch (arr[i].id) {
          case 0:
            return (
              <div key={line} className={`${arr[i].cn}`}>
                {line.replace(arr[i].re, "")}
              </div>
            );
          case 1:
            return (
              <li className={`${arr[i].cn}`}>{line.replace(arr[i].re, "")}</li>
            );
          case 2:
            return <hr className={`${arr[i].cn}`} />;
          case 3:
            return (
              <div key={line}>{renderKaTeX(line.replace(arr[i].re, ""))}</div>
            );
        }
      }
    }
    return <div className="test-xl">{line.replace(/\s*$/, "")}</div>;
  };

  return (
    <div key={props.lines}>
      {lineArr.map((line) => {
        return lineParser(line);
      })}
    </div>
  );
};
