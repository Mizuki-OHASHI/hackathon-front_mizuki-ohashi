import { FC } from "react";

const arr = [
  { re: /^\s*#\s+/, cn: "text-4xl", id: 0 },
  { re: /^\s*##\s+/, cn: "text-3xl", id: 0 },
  { re: /^\s*###\s+/, cn: "text-2xl", id: 0 },
  { re: /^\s*-\s+/, cn: "text-xl", id: 1 },
  { re: /^\s*-{3,}\s*$/, cn: "", id: 2 },
];

type Props = {
  lines: string;
};

export const Parser: FC<Props> = (lines) => {
  const lineArr = lines.lines.split(/\n/);

  const lineParser = (line: string): JSX.Element => {
    for (let i = 0; i < arr.length; i++) {
      if (arr[i].re.test(line)) {
        switch (arr[i].id) {
          case 0:
            return (
              <div className={`${arr[i].cn}`}>
                {line.replace(arr[i].re, "")}
              </div>
            );
          case 1:
            return (
              <li className={`${arr[i].cn}`}>{line.replace(arr[i].re, "")}</li>
            );
          case 2:
            return <hr />;
        }
      }
    }
    return <div className="test-xl">{line.replace(/\s*$/, "")}</div>;
  };

  return (
    <div>
      {lineArr.map((line) => {
        return lineParser(line);
      })}
    </div>
  );
};
